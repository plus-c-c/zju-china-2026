import { AnisotropyContent } from "./anisotropy-content";
import { DeliveryContent } from "./delivery-content";
import { GagContent } from "./gag-content";

/* One content file per supplied manuscript; the renderer only knows how to
   present them. */
const content = {
  anisotropy: AnisotropyContent,
  gag: GagContent,
  delivery: DeliveryContent,
};

type FunctionModule = keyof typeof content;

export function FunctionResults({ module }: { module: FunctionModule }) {
  const Content = content[module];

  return (
    <div className="wetlab-results__original wetlab-results__function-original">
      <Content />
    </div>
  );
}
