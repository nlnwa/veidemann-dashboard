
// export function getInitialSelectors(configs: any[], cfg: any): string[] {
//   const config = new cfg();
//
//   switch (config.constructor) {
//
//     case PolitenessConfig:
//       const crawlHostGroupSelector = configs.reduce((acc: any, curr: any) => {
//         config.crawl_host_group_selector = intersectSelector(acc.crawl_host_group_selector, curr.crawl_host_group_selector);
//         return config;
//       });
//       return config.crawl_host_group_selector;
//
//     case BrowserConfig:
//       const scriptSelector = configs.reduce((acc: any, curr: any) => {
//         config.script_selector = intersectSelector(acc.script_selector, curr.script_selector);
//         return config;
//       });
//       return config.script_selector;
//   }
// }

export function intersectSelector(a: any[], b: any[]): any[] {
  const intersection = a.filter((x) =>
    b.find((selector: any) => x === selector) !== undefined ? true : false
  );
  return intersection;
}

export function findSelector(array: string[], initialSelector: string): boolean {
  const selectorExist = array.find(function (selector) {
    return selector === initialSelector;
  });
  if (!selectorExist) {
    return false;
  } else {
    return true;
  }
}

export function updatedSelectors(selectors: string[]): string[] {
  const removeDuplicates = function () {
    return selectors.reduce((result, nextItem) => result.includes(nextItem) ? result : result.concat(nextItem), []);
  };
  return removeDuplicates();
}
