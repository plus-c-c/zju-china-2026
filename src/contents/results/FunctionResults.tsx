import anisotropy from "./anisotropy-content.json";
import gag from "./gag-content.json";
import delivery from "./delivery-content.json";

/* One content file per supplied manuscript; the renderer only knows how to
   present them. */
const content = {
  anisotropy: anisotropy.anisotropy,
  gag: gag.gag,
  delivery: delivery.delivery,
};

export function FunctionResults({ module }: { module: keyof typeof content }) {
  return (
    <div
      className="wetlab-results__original wetlab-results__function-original"
      // Generated from the supplied English manuscripts with HTML escaping.
      dangerouslySetInnerHTML={{ __html: content[module] }}
    />
  );
}
