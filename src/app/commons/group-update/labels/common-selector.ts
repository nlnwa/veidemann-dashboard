export function intersectSelector(a: any[], b: any[]): any[] {
  const intersection = a.filter((x) =>
    b.find((selector: any) => x === selector) !== undefined ? true : false
  );
  return intersection;
}

