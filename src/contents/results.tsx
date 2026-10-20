import { ReferenceArticleHtml } from "../components/References";
import { useEffect, useRef } from "react";
import { SectionJump } from "../components/SectionJump";
import {
  PlatformFunctionSections,
  SharedProjectSections,
} from "../components/PlatformFunctionSections";
import { observeAndWhitenImages } from "../components/whitenImages";
import { Is_Primitive_ExprRes } from "../utils/featureFlags";
import { ResultsPrimitive } from "./resultsPrimitive";
import split from "./results/wetlabSplit";
import "./results/wetlabSplit.css";

// The paired Experiments page carries the same section ids; page-only ids
// fall back to the nearest heading the two pages share.
const experimentsIds = new Set(split.targetIds.experiments);
const fallbacks: Record<string, string> = split.jumpFallbacks.results;
const experimentsImages: Record<string, string[]> =
  split.pageImages.experiments;

export function Results() {
  return Is_Primitive_ExprRes ? <ResultsPrimitive /> : <ResultsPair />;
}

function ResultsPair() {
  const articleRef = useRef<HTMLElement>(null);
  const { introductionEnd, platformEnd, functionEnd } = split.resultTracks;
  useEffect(() => {
    return observeAndWhitenImages(articleRef.current);
  }, []);
  return (
    <article className="wetlab-split" ref={articleRef}>
      <SectionJump
        side="left"
        target="Experiments"
        exit="right"
        resolveTarget={(activeId) => {
          if (!activeId) return { to: "/experiments", preload: [] };
          const id = experimentsIds.has(activeId)
            ? activeId
            : fallbacks[activeId];
          if (!id) return { to: "/experiments", preload: [] };
          return {
            to: `/experiments#${id}`,
            preload: experimentsImages[id] ?? [],
          };
        }}
      />
      <ReferenceArticleHtml
        html={split.results.slice(0, introductionEnd)}
        referenceSource={split.results}
      />
      <PlatformFunctionSections
        id="results"
        platform={
          <ReferenceArticleHtml
            html={split.results.slice(introductionEnd, platformEnd)}
            referenceSource={split.results}
          />
        }
        functionContent={
          <ReferenceArticleHtml
            html={split.results.slice(platformEnd, functionEnd)}
            referenceSource={split.results}
          />
        }
      />
      <SharedProjectSections>
        <ReferenceArticleHtml html={split.results.slice(functionEnd)} />
      </SharedProjectSections>
    </article>
  );
}
