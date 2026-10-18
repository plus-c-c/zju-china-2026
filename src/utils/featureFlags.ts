/**
 * Page-format switches.
 *
 * Is_Primitive_ExprRes — Experiments / Results page format.
 *
 *   false (default): the paired pages implemented on this branch
 *                    (mirrored TOC + jump control, manuscript content split
 *                    between the two pages).
 *   true:            the original layout kept from main, stored in
 *                    `src/contents/resultsPrimitive.tsx` and
 *                    `src/contents/experimentsPrimitive.tsx`.
 *
 * The two formats share the same content files (scaffold-content.json,
 * anisotropy-content.json, gag-content.json, delivery-content.json), so
 * flipping this constant only changes the presentation.
 */
export const Is_Primitive_ExprRes = false;
