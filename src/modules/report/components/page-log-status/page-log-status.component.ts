import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PageLog, Resource} from '../../../../shared/models/log';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';


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
})
export class PageLogStatusComponent implements OnChanges, AfterViewInit {

  pageLogResourceChartOptions: any;
  pageLogOutlinksChartOptions: any;
  outlinkChartInstance: any;
  resourceChartInstance: any;

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

  outlinkDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  resourceDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  @Input()
  pageLog: PageLog;

  constructor() {
  }

  hasChild = (_: number, node: UriFlatNode) => node.expandable;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pageLog && this.pageLog && this.pageLog.outlink) {
      this.outlinkDataSource.data = this.groupData(this.pageLog.outlink);
      this.resourceDataSource.data = this.groupData(null, this.pageLog.resource);
    }
  }

  ngAfterViewInit(): void {
    this.setPageLogResourceChartOptions();
    this.setPageLogOutlinksChartOptions();
  }

  setPageLogResourceChartOptions() {
    this.pageLogResourceChartOptions = {
      darkMode: true,
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      legend: {
        type: 'scroll',
        top: '2%',
        left: '3%',
        orient: 'horizontal',
        data: this.getLegends(this.resourceDataSource),
        borderColor: '#c23531',
      },
      series: this.getTrees(this.resourceDataSource),
    };
  }

  setPageLogOutlinksChartOptions() {
    this.pageLogOutlinksChartOptions = {
      darkMode: true,
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      legend: {
        type: 'scroll',
        top: '2%',
        left: '3%',
        orient: 'horizontal',
        data: this.getLegends(this.outlinkDataSource),
        borderColor: '#c23531',
      },
      series: this.getTrees(this.outlinkDataSource),
    };
  }

  groupData(outlinks?: string[], resources?: Resource[]): UriNode[] {
    const result: UriNode[] = [];
    const level = {result};
    let data;
    if (outlinks) {
      data = outlinks;
    } else if (resources) {
      data = resources;
    }
    data.forEach(datum => {
      try {
        let url;
        if (resources) {
          url = new URL(datum.uri);
        }
        if (outlinks) {
          url = new URL(datum);
        }
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

  onOutlinksChartInit(ec) {
    this.outlinkChartInstance = ec;
  }

  onResourcesChartInit(ec) {
    this.resourceChartInstance = ec;
  }

  onTabChange(event: any) {
    if (event.tab.textLabel === 'Graphical') {
      this.deselectAllLegends();
      this.outlinkChartInstance.resize();
      this.resourceChartInstance.resize();
    }
    if (event.tab.textLabel === 'List') {
      this.deselectAllLegends();
    }
  }

  getLegends(dataSource: MatTreeFlatDataSource<any, any>) {
    const legendData = [];
    for (const datum of dataSource.data) {
      const data = {
        name: datum.name,
        icon: 'rectangle',
      };
      legendData.push(data);
    }
    return legendData;
  }

  getTrees(dataSource: MatTreeFlatDataSource<any, any>) {
    const trees = [];
    const data = dataSource.data;
    for (const datum of data) {
      const series = {
        type: 'tree',
        name: datum.name,
        initialTreeDepth: 1,
        data: [{
          name: datum.name,
          children: datum.children
        }],
        top: '-10%',
        left: '15%',
        bottom: '-15%',
        right: '20%',

        symbolSize: 15,

        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right'
        },

        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        },

        emphasis: {
          focus: 'descendant'
        },

        expandAndCollapse: true,

        animationDuration: 50,
        animationDurationUpdate: 250
      };
      trees.push(series);
    }
    return trees;
  }

  deselectAllLegends(){
    this.resourceChartInstance.dispatchAction({
      type: 'legendInverseSelect'
    });
    this.outlinkChartInstance.dispatchAction({
      type: 'legendInverseSelect'
    });
  }


}
