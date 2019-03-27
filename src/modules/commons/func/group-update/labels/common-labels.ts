/** Functions used when updating multiple configs*/
import {Label} from '../../../models/meta/label.model';


export function getInitialLabels(configs: any[], cfg: any): Label[] {
  const config = new cfg();
  const label = configs.reduce((acc: any, curr: any) => {
    config.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
    return config;
  });
  return config.meta.label;
}


export function intersectLabel(a: Label[], b: Label[]): Label[] {
  const setA = Array.from(new Set(a));
  const setB = Array.from(new Set(b));
  const intersection = new Set(setA.filter((x: Label) =>
    setB.find((label: Label) => x.key === label.key && x.value === label.value) !== undefined
  ));
  return Array.from(intersection);
}

export function updatedLabels(labels: Label[]): Label[] {
  const result = labels.reduce((unique, o) => {
    if (!unique.find(obj => obj.key === o.key && obj.value === o.value)) {
      unique.push(o);
    }
    return unique;
  }, []);
  return result;
}

export function findLabel(array: Label[], key: string, value: string): boolean {
  const labelExist = array.find(function (label) {
    return label.key === key && label.value === value;
  });
  if (!labelExist) {
    return false;
  }
  if (labelExist) {
    return true;
  }
}

export function labelListsAreEqual(a: Label[], b: Label[]): boolean {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (b.findIndex((l) => a[i].key === l.key && a[i].value === l.value) === -1) {
      return false;
    }
  }
  return true;
}
