import content from "./function-content.json";

export function FunctionResults({ module }: { module: keyof typeof content }) {
  return (
    <div
      className="wetlab-results__original wetlab-results__function-original"
      // Generated from the supplied English manuscripts with HTML escaping.
      dangerouslySetInnerHTML={{ __html: content[module] }}
    />
  );
}
