#!/usr/bin/env python3
"""Split the wet-lab HTML into the Experiments and Results halves.

Source files (kept for regeneration, one per supplied manuscript):
  src/contents/results/scaffold-content.tsx      -> the scaffold-group manuscript
  src/contents/results/anisotropy-content.tsx    -> the magnetic-anisotropy manuscript
  src/contents/results/gag-content.tsx           -> the GAG-retention manuscripts
  src/contents/results/delivery-content.tsx      -> the mitochondrial-delivery manuscript

Each <pair> block carries an "Experiment" column and a "Results" column. This
script emits one combined document per page (shared headings, one side of each
pair), promotes the heading levels by one (the page wrappers are gone), wraps
the shared Introduction / Conclusion / References around each page and writes
src/contents/results/wetlabSplit.ts.

Run: python3 scripts/split-wetlab.py
"""

from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src/contents/results"

TAG = re.compile(r"<(/?)h([3-6])([^>]*)>")
DEPTH = re.compile(r'data-toc-depth="(\d+)"')
COLUMN_LABEL = re.compile(
    r'<(?:div|p) class="column-label">(?:Experiment|Results)</(?:div|p)>'
)
IMG_TAG = re.compile(r"<img\b[^>]*/?>")

# Measured once from the hosted figures; reserving the intrinsic size keeps the
# layout stable while the lazy images load (no post-navigation reflow).
IMAGE_SIZES: dict[str, list[int]] = {}
_sizes_file = SRC / "image-sizes.json"
if _sizes_file.exists():
    IMAGE_SIZES = json.loads(_sizes_file.read_text(encoding="utf-8"))


def reserve_image_space(html: str) -> str:
    def replace(match: re.Match[str]) -> str:
        tag = match.group(0)
        # `decoding="async"` lets snapshots outrun decode; leave the default.
        tag = re.sub(r'\s+decoding="async"', "", tag)
        if "width=" in tag:
            return tag
        src = re.search(r'src="([^"]+)"', tag)
        size = IMAGE_SIZES.get(src.group(1)) if src else None
        if not size:
            return tag
        width, height = size
        # An explicit width makes the intrinsic-ratio box layout-reserved even
        # before the lazy image loads (attrs alone are not enough here).
        if 'style="' in tag:
            tag = tag.replace('style="', f'style="width: {width}px; ', 1)
            style = ""
        else:
            style = f' style="width: {width}px;"'
        extra = f' width="{width}" height="{height}"{style}'
        if tag.endswith("/>"):
            return f"{tag[:-2].rstrip()}{extra} />"
        return f"{tag[:-1].rstrip()}{extra}>"

    return IMG_TAG.sub(replace, html)


def div_pair_end(html: str, start: int) -> int:
    """End offset of a <div class="pair"> block, counting nested divs."""
    depth = 0
    for match in re.finditer(r"<(/?)div\b[^>]*>", html[start:]):
        depth += -1 if match.group(1) else 1
        if depth == 0:
            return start + match.end()
    raise ValueError("unbalanced div pair")


def split_pair(seg: str, keep: str) -> str:
    """Return the pair with only the requested column (keep: experiment/results)."""
    if seg.startswith('<section class="pair"'):
        label_end = seg.index('<div class="columns">')
        label = seg[:label_end]
        exp_at = seg.index('<div class="column experiment"')
        res_at = seg.index('<div class="column results"')
        experiment = seg[exp_at:res_at].rstrip()
        results = seg[res_at:]
        assert results.endswith("</div></div></section>")
        results = results[: -len("</div></section>")]
        body = experiment if keep == "experiment" else results
        return f'{label}<div class="columns">{body}</div></section>'

    # Function-module variant: <div class="pair">…two plain columns…</div>
    starts = [m.start() for m in re.finditer(r'<div class="column">', seg)]
    assert len(starts) == 2, "unexpected column layout"
    first = seg[starts[0] : starts[1]].rstrip()
    second = seg[starts[1] :]
    assert second.endswith("</div></div></div>")
    second = second[: -len("</div></div>")]
    assert ">Experiment<" in first, "first column is not the experiment side"
    selected = first if keep == "experiment" else second
    assert selected.startswith('<div class="column">') and selected.endswith("</div>")
    inner = selected[len('<div class="column">') : -len("</div>")]
    sections = re.split(r'(<h5\b[^>]*>.*?</h5>)', inner)
    assert len(sections) >= 3, "function column has no level-three section"

    prefix = sections[0]
    out = []
    for index in range(1, len(sections), 2):
        heading = sections[index]
        content = sections[index + 1]
        label = prefix if index == 1 else ""
        card = (
            '<div class="pair"><div class="columns"><div class="column">'
            f"{label}{content}"
            "</div></div></div>"
        )
        out.append(f"{heading}{card}")
    return "".join(out)


def split_pairs(html: str, keep: str) -> str:
    out = []
    pos = 0
    while True:
        found = re.search(r'<(section class="pair"|div class="pair")[^>]*>', html[pos:])
        if not found:
            out.append(html[pos:])
            break
        start = pos + found.start()
        if found.group(1).startswith("section"):
            end = html.index("</section>", start) + len("</section>")
        else:
            end = div_pair_end(html, start)
        out.append(html[pos:start])
        out.append(split_pair(html[start:end], keep))
        pos = end
    return "".join(out)


def promote_headings(html: str) -> str:
    """Drop one heading level (h3->h2 …) and set data-toc-depth by nesting."""

    def replace(match: re.Match[str]) -> str:
        slash, level, attrs = match.group(1), int(match.group(2)), match.group(3)
        new_level = level - 1
        if not slash and (
            'data-toc="include"' in attrs or "data-toc-depth=" in attrs
        ):
            depth = f'data-toc-depth="{new_level - 1}"'
            if "data-toc-depth=" in attrs:
                attrs = DEPTH.sub(depth, attrs)
            else:
                attrs = f"{attrs} {depth}"
        return f"<{slash}h{new_level}{attrs}>"

    return TAG.sub(replace, html)


def build(keep: str) -> str:
    documents = [scaffold["platformHtml"]]
    documents += [function[key] for key in ("anisotropy", "gag", "delivery")]
    parts = [promote_headings(split_pairs(part, keep)) for part in documents]
    html = "\n".join(part.strip() for part in parts)
    return add_shared_shell(reserve_image_space(COLUMN_LABEL.sub("", html)))


def add_shared_shell(html: str) -> str:
    """Wrap the shared Introduction / Conclusion / References around a page.

    These blocks are not split (the manuscript's intro, conclusion and
    reference list are page-level), so each page carries the same copy —
    matching the coverage of the original Results layout.
    """
    intro = (
        '<div class="section-heading"><h2 id="wetlab-introduction" '
        'data-toc="include" data-toc-depth="1">Introduction</h2>'
        f'<div class="source-block"><p>{scaffold["intro"]}</p></div></div>'
    )
    conclusion = (
        '<div class="section-heading"><h2 id="wetlab-conclusion" '
        'data-toc="include" data-toc-depth="1">Conclusion</h2>'
        f'<div class="source-block"><p>{scaffold["conclusion"]}</p></div></div>'
    )
    references = (
        '<details class="wetlab-results__references references-list">'
        "<summary>References</summary>"
        f'<div class="wetlab-results__references-content">{scaffold["referencesHtml"]}</div>'
        "</details>"
    )
    return "\n".join([intro, html, conclusion, references])


def render_component(module: str, component: str) -> str:
    return subprocess.run(
        ["node", "scripts/render-result-content.mjs", module, component],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    ).stdout


scaffold = {
    "intro": render_component("scaffold-content.tsx", "ScaffoldIntro"),
    "platformHtml": render_component("scaffold-content.tsx", "ScaffoldContent"),
    "referencesHtml": render_component("scaffold-content.tsx", "ScaffoldReferences"),
    "conclusion": render_component("scaffold-content.tsx", "ScaffoldConclusion"),
}
function = {
    "anisotropy": render_component("anisotropy-content.tsx", "AnisotropyContent"),
    "gag": render_component("gag-content.tsx", "GagContent"),
    "delivery": render_component("delivery-content.tsx", "DeliveryContent"),
}

experiments_html = build("experiment")
results_html = build("results")


HEADING = re.compile(r"<h([2-5])\b([^>]*)>")
HEADING_ID = re.compile(r'id="([^"]+)"')


def heading_ids(html: str) -> list[str]:
    """Heading ids used by the jump maps (summary headings included)."""
    out: list[str] = []
    for match in HEADING.finditer(html):
        id_match = HEADING_ID.search(match.group(2))
        if id_match:
            out.append(id_match.group(1))
    return out


def section_map(html: str) -> dict[str, str]:
    """Every heading id -> the nearest preceding level-2 section id.

    Level-2 sections are the h3 headings (toc depth 2); headings that sit
    directly under a module (h2) fall back to that module. Summary headings
    (data-toc=exclude) appear as their own entries but neither own sections
    nor reset the module context for the content below them.
    """
    out: dict[str, str] = {}
    level1 = ""
    level2 = ""
    for match in HEADING.finditer(html):
        level = int(match.group(1))
        attrs = match.group(2)
        id_match = HEADING_ID.search(attrs)
        if not id_match:
            continue
        heading_id = id_match.group(1)
        if 'data-toc="exclude"' in attrs:
            out[heading_id] = heading_id
            continue
        if level == 2:
            level1, level2 = heading_id, ""
            section = heading_id
        elif level == 3:
            level2 = heading_id
            section = heading_id
        else:
            section = level2 or level1 or heading_id
        out[heading_id] = section
    return out


def page_images(html: str) -> dict[str, list[str]]:
    """Image urls grouped under the heading they follow (per section).

    Summary headings (data-toc=exclude) appear as owners of any figures that
    follow them. Each section also carries the next section's images so a
    jump lands with roughly one screen of look-ahead already warmed.
    """
    sections: dict[str, list[str]] = {}
    current: str | None = None
    for match in re.finditer(r'<h([2-5])\b([^>]*)>|<img[^>]*src="([^"]+)"', html):
        if match.group(1):
            id_match = HEADING_ID.search(match.group(2))
            if not id_match:
                continue
            current = id_match.group(1)
            sections.setdefault(current, [])
        elif current and match.group(3):
            sections[current].append(match.group(3))
    ids = list(sections)
    out: dict[str, list[str]] = {}
    for index, heading_id in enumerate(ids):
        merged = list(sections[heading_id])
        if index + 1 < len(ids):
            merged.extend(sections[ids[index + 1]])
        if merged:
            out[heading_id] = merged
    return out


def jump_fallbacks(ids: list[str], other: set[str]) -> dict[str, str]:
    """Page-only heading ids -> the nearest heading shared with the other page."""
    out: dict[str, str] = {}
    for index, heading_id in enumerate(ids):
        if heading_id in other:
            continue
        for previous in reversed(ids[:index]):
            if previous in other:
                out[heading_id] = previous
                break
    return out


ids_experiments = heading_ids(experiments_html)
ids_results = heading_ids(results_html)

payload = {
    "experiments": experiments_html,
    "results": results_html,
    "targetIds": {"experiments": ids_experiments, "results": ids_results},
    "jumpFallbacks": {
        "experiments": jump_fallbacks(ids_experiments, set(ids_results)),
        "results": jump_fallbacks(ids_results, set(ids_experiments)),
    },
    "pageImages": {
        "experiments": page_images(experiments_html),
        "results": page_images(results_html),
    },
    "sections": {
        **section_map(experiments_html),
        **section_map(results_html),
    },
}
target = SRC / "wetlabSplit.ts"
target.write_text(
    "// Generated by scripts/split-wetlab.py. Do not edit directly.\n"
    f"const wetlabSplit = {json.dumps(payload)};\n\n"
    "export default wetlabSplit;\n",
    encoding="utf-8",
)

for key in ("experiments", "results"):
    html = payload[key]  # type: ignore[assignment]
    print(
        key,
        "| chars:",
        len(html),
        "| pairs:",
        html.count('class="pair"'),
        "| headings:",
        len(re.findall(r"<h[2-5][ >]", html)),
        "| fallbacks:",
        len(payload["jumpFallbacks"][key]),  # type: ignore[arg-type]
    )
print("written:", target)
