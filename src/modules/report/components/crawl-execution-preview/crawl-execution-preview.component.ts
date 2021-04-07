import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CrawlExecutionState, CrawlExecutionStatus, ExtraStatusCodes} from '../../../../shared/models/report';
import {durationBetweenDates} from '../../../../shared/func';
import {ChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-crawl-execution-preview',
  templateUrl: './crawl-execution-preview.component.html',
  styleUrls: ['./crawl-execution-preview.component.css']
})
export class CrawlExecutionPreviewComponent implements OnChanges {
  readonly CrawlExecutionState = CrawlExecutionState;
  readonly ExtraStatusCodes = ExtraStatusCodes;

  @Input()
  crawlExecutionStatus: CrawlExecutionStatus;


  documentsPieChartLabels: Label[] = ['Crawled', 'Denied', 'Failed', 'Out of scope', 'Retried'];
  documentsPieChartData: number[];
  documentsPieChartPlugins = [pluginDataLabels];
  documentsPieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
      labels: {
        fontSize: 8
      },
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          if (ctx.dataset.data[ctx.dataIndex] > 0) {
            return ctx.dataset.data[ctx.dataIndex];
          } else {
            return ''; // retun empty if the data for label is empty
          }
        }
      }
    },
    showLines: true,
    spanGaps: true,
    cutoutPercentage: 1,
    rotation: 15
  };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.crawlExecutionStatus) {
      if (this.crawlExecutionStatus) {
        this.documentsPieChartData = [
          this.crawlExecutionStatus.documentsCrawled,
          this.crawlExecutionStatus.documentsDenied,
          this.crawlExecutionStatus.documentsFailed,
          this.crawlExecutionStatus.documentsOutOfScope,
          this.crawlExecutionStatus.documentsRetried
        ];
      }
    }
  }

  getDuration(startTime: string, endTime: string): string {
    return durationBetweenDates(startTime, endTime);
  }
}
