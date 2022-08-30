/**
 * Functions used when updating multiple configs
 */
import {Label} from '../models';

export function intersectLabel(a: Label[], b: Label[]): Label[] {
  const setA = Array.from(new Set(a));
  const setB = Array.from(new Set(b));
  return setA.filter((x: Label) =>
    setB.find((label: Label) => x.key === label.key && x.value === label.value) !== undefined
  );
}
