export function intersectString(a: string[], b: string[]): string[] {
  return a.filter((x) => b.find((y: string) => x === y) !== undefined);
}
