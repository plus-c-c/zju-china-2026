import { Fragment, type ReactNode } from "react";
import { PanelFigure } from "./Figure";

function inline(value: string): ReactNode[] {
  return value
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      return <Fragment key={index}>{part}</Fragment>;
    });
}

const IMAGE_URL =
  /^https:\/\/static\.igem\.wiki\/\S+\.(?:avif|jpe?g|png|webp)$/i;

export function ProjectDesignCard({ source }: { source: string }) {
  const blocks = source.split(/\n{2,}/).map((block) => block.trim());
  const content: ReactNode[] = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    if (!block) continue;

    if (/^Figure \d+/i.test(block) && IMAGE_URL.test(blocks[index + 1] ?? "")) {
      content.push(
        <PanelFigure className="project-design-figure" key={`figure-${index}`}>
          <img src={blocks[index + 1]} alt="" loading="lazy" />
          <figcaption>{inline(block)}</figcaption>
        </PanelFigure>,
      );
      index += 1;
      continue;
    }
    if (IMAGE_URL.test(block)) {
      content.push(
        <PanelFigure className="project-design-figure" key={`image-${index}`}>
          <img src={block} alt="" loading="lazy" />
        </PanelFigure>,
      );
      continue;
    }
    if (block.startsWith("### ")) {
      content.push(
        <h3 className="dbtl-section-title" key={`heading-${index}`}>
          {inline(block.slice(4))}
        </h3>,
      );
      continue;
    }
    if (block.startsWith("#### ")) {
      content.push(
        <h4 className="project-design-subheading" key={`subheading-${index}`}>
          {inline(block.slice(5))}
        </h4>,
      );
      continue;
    }
    const lines = block.split("\n");
    if (lines.every((line) => /^- /.test(line))) {
      content.push(
        <ul key={`list-${index}`}>
          {lines.map((line, lineIndex) => (
            <li key={lineIndex}>{inline(line.slice(2))}</li>
          ))}
        </ul>,
      );
      continue;
    }
    const numbered = block.match(/^(\d+)\.\s+([\s\S]+)$/);
    if (numbered) {
      content.push(
        <p className="project-design-numbered" key={`numbered-${index}`}>
          <span>{numbered[1]}.</span> {inline(numbered[2].replace(/\n/g, " "))}
        </p>,
      );
      continue;
    }
    content.push(
      <p key={`paragraph-${index}`}>{inline(block.replace(/\n/g, " "))}</p>,
    );
  }

  return <>{content}</>;
}
