import { MathFormula } from "../../components/MathFormula";

type Formula = {
  latex: string;
  display?: boolean;
};

export function ContentMath({
  formulas,
  index,
}: {
  formulas: readonly Formula[];
  index: number;
}) {
  const formula = formulas[index];
  return (
    <span className={formula.display ? "source-math source-math--display" : "source-math"}>
      <MathFormula display={formula.display}>{formula.latex}</MathFormula>
    </span>
  );
}
