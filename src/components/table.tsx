import type { ReactNode } from "react";
import "./table.css";

/**
 * Unified wiki tables.
 *
 * One look for every table in the wiki, adapted from the 2025 ZJU-China
 * design page's Table 1 and recoloured to the project palette:
 * a filled header (light blue), hairline row separators, a row hover tint,
 * no vertical borders, and a rounded scroll container for narrow screens.
 *
 * `table.css` (imported here, and registered globally by the App shell)
 * carries all table-style code; `DataTable` is the shared renderer for
 * data-driven tables.
 */

interface DataTableProps {
  /** Header cells, one per column. */
  head: ReactNode[];
  /** Body rows; each row lists one cell per column. */
  rows: ReactNode[][];
  /** Accessible label describing the table's content. */
  label?: string;
}

export function DataTable({ head, rows, label }: DataTableProps) {
  return (
    <div className="table-scroll">
      <table aria-label={label}>
        <thead>
          <tr>
            {head.map((cell, index) => (
              <th key={index} scope="col">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
