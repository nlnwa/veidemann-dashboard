import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CrawlExecutionState, CrawlExecutionStatus, ExtraStatusCodes} from '../../../../shared/models/report';
import {durationBetweenDates} from '../../../../shared/func';

export enum CrawlExecutionStatusColors {
  CRAWLED = '#009E73',
  DENIED = '#D55E00',
  FAILED = '#920000',
  RETRIED = '#56B4E9',
  OUT_OF_SCOPE = '#F0E442'
}

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

  documentsChartOptions: any;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.crawlExecutionStatus) {
      if (this.crawlExecutionStatus) {
        this.setDocumentsChartOptions();
      }
    }
  }

  setDocumentsChartOptions() {
    this.documentsChartOptions = {
      legend: {
        top: 'bottom',
        textStyle: {
          color: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? '#FFFFFF' : '#000000'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {show: true},
          dataView: {show: true}
        },
      },
      series: [
        {
          type: 'pie',
          radius: [25, 150],
          center: ['50%', '50%'],
          roseType: 'area',
          label: {
            show: true,
            position: 'inner',
            bleedMargin: 0,
            color: '#000000',
            fontSize: 16,
            formatter(params) {
              return params.value;
            },
          },
          data: this.getDocuments()
        }
      ]
    };
  }

  getDuration(startTime: string, endTime: string): string {
    return durationBetweenDates(startTime, endTime);
  }

  getDocuments() {
    const status = this.crawlExecutionStatus;
    const docs = [
      {
        name: 'Crawled',
        value: status.documentsCrawled,
        itemStyle: {color: CrawlExecutionStatusColors.CRAWLED}
      },
      {
        name: 'Denied',
        value: status.documentsDenied,
        itemStyle: {color: CrawlExecutionStatusColors.DENIED}
      },
      {
        name: 'Failed',
        value: status.documentsFailed,
        itemStyle: {color: CrawlExecutionStatusColors.FAILED}
      }, {
        name: 'Out of scope',
        value: status.documentsOutOfScope,
        itemStyle: {color: CrawlExecutionStatusColors.OUT_OF_SCOPE}
      },
      {
        name: 'Retried',
        value: status.documentsRetried,
        itemStyle: {color: CrawlExecutionStatusColors.RETRIED}
      }
    ];
    return docs.filter(doc => (doc.value > 0));
  }
}
