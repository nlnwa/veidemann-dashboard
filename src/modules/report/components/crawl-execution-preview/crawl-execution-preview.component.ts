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

  executionDocumentsColors = [
    {
      backgroundColor: [
        '#009E73', // Crawled
        '#D55E00', // Denied
        '#920000', // Failed
        '#F0E442', // Out of scope
        '#56B4E9', // Retried
      ]
    }
  ];

  documentsPieChartLabels: Label[] = ['Crawled', 'Denied', 'Failed', 'Out of scope', 'Retried'];
  documentsPieChartData: number[];
  documentsPieChartPlugins = [pluginDataLabels];

  documentsPieChartOptions: ChartOptions = {
    rotation: 15,
    responsive: true,
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    legend: {
      position: 'right',
      labels: {
        fontColor: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? '#FFFFFF' : '#000000',
        fontSize: 12,
        filter: (legendItem, data) => data.datasets[0].data[legendItem.index] !== 0,
      },
    },
    plugins: {
      datalabels: {
        color: '#000000',
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          if (ctx.dataset.data[ctx.dataIndex] > 0) {
            return ctx.dataset.data[ctx.dataIndex];
          } else {
            return ''; // retun empty if the data for label is empty
          }
        }
      }
    }
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
