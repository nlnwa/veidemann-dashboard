import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PageLog} from '../../../../shared/models';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {MatTableDataSource} from '@angular/material/table';

interface UriNode {
  name: string;
  url: URL;
  children: UriNode[];
}

interface UriFlatNode {
  expandable: boolean;
  name: string;
  url: URL;
  level: number;
}

@Component({
    selector: 'app-page-log-status',
    templateUrl: './page-log-status.component.html',
    styleUrls: ['./page-log-status.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PageLogStatusComponent implements OnChanges {

  treeControl = new FlatTreeControl<UriFlatNode>(
    node => node.level, node => node.expandable);

  private treeFlattener = new MatTreeFlattener(
    (node: UriNode, level: number) => ({
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      url: node.url,
      level,
    }),
    node => node.level,
    node => node.expandable,
    node => node.children);

  treeDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataSource = new MatTableDataSource<PageLog>();

  pageLogDisplayedColumns: string[] = ['uri', 'referrer', 'collectionName', 'method'];

  @Input()
  pageLog: PageLog;

  constructor() {
  }

  hasChild = (_: number, node: UriFlatNode) => node.expandable;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pageLog && this.pageLog && this.pageLog.outlink) {
      this.treeDataSource.data = this.groupOutlinks(this.pageLog.outlink);
      this.dataSource = new MatTableDataSource<PageLog>([this.pageLog]);
    }
  }

  groupOutlinks(outlinks: string[]): UriNode[] {
    const result: UriNode[] = [];
    const level = {result};
    outlinks.forEach(outlink => {
      try {
        const url = new URL(outlink);
        const path = [url.protocol + '//' + url.host].concat(url.pathname.split('/').filter(_ => !!_));
        path.reduce((r, name, i) => {
          if (!r[name]) {
            r[name] = {result: []};
            r.result.push({name, url: new URL(path.slice(0, i + 1).join('/')), children: r[name].result});
          }
          return r[name];
        }, level);
      } catch (e) {
        return;
      }
    });
    return result;
  }
}
