import { ReferenceArticleHtml } from "../components/References";
import { useEffect, useRef } from "react";
import { SectionJump } from "../components/SectionJump";
import { observeAndWhitenImages } from "../components/whitenImages";
import { Is_Primitive_ExprRes } from "../utils/featureFlags";
import { ExperimentsPrimitive } from "./experimentsPrimitive";
import split from "./results/wetlabSplit";
import "./results/wetlabSplit.css";

// The paired Results page carries the same section ids; page-only ids fall
// back to the nearest heading the two pages share.
const resultsIds = new Set(split.targetIds.results);
const fallbacks: Record<string, string> = split.jumpFallbacks.experiments;
const resultsImages: Record<string, string[]> = split.pageImages.results;

export function Experiments() {
  return Is_Primitive_ExprRes ? <ExperimentsPrimitive /> : <ExperimentsPair />;
}

function ExperimentsPair() {
  const articleRef = useRef<HTMLElement>(null);
  useEffect(() => {
    return observeAndWhitenImages(articleRef.current);
  }, []);
  return (
    <article className="wetlab-split" ref={articleRef}>
      <SectionJump
        side="right"
        target="Results"
        exit="left"
        resolveTarget={(activeId) => {
          if (!activeId) return { to: "/results", preload: [] };
          const id = resultsIds.has(activeId) ? activeId : fallbacks[activeId];
          if (!id) return { to: "/results", preload: [] };
          return {
            to: `/results#${id}`,
            preload: resultsImages[id] ?? [],
          };
        }}
      />
      <ReferenceArticleHtml html={split.experiments} />
    </article>
  );
}
