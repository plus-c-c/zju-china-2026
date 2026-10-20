/**
 * Engineering layout switch.
 *
 * "legacy" — the layout used by ce9a8cf: level-3 tabs above the text panel,
 *            cycle buttons below it, and the DBTL ring beside the panel.
 * "toc"    — the left-hand nested TOC layout.
 *
 * Change DEFAULT_ENGINEERING_LAYOUT to switch the default, or append
 * `?eng-layout=legacy` / `?eng-layout=toc` to preview a layout without a
 * rebuild.
 */
export type EngineeringLayout = "legacy" | "toc";

export const DEFAULT_ENGINEERING_LAYOUT: EngineeringLayout = "legacy";

export function resolveEngineeringLayout(): EngineeringLayout {
  if (typeof window === "undefined") return DEFAULT_ENGINEERING_LAYOUT;
  const value = new URLSearchParams(window.location.search).get("eng-layout");
  return value === "toc" || value === "legacy"
    ? value
    : DEFAULT_ENGINEERING_LAYOUT;
}
