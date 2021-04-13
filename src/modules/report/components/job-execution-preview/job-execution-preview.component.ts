import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CrawlExecutionState, ExtraStatusCodes, JobExecutionState, JobExecutionStatus} from 'src/shared/models';
import {durationBetweenDates} from '../../../../shared/func';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {Router} from '@angular/router';


@Component({
  selector: 'app-job-execution-preview',
  templateUrl: './job-execution-preview.component.html',
  styleUrls: ['./job-execution-preview.component.css']
})
export class JobExecutionPreviewComponent implements OnChanges {
  readonly JobExecutionState = JobExecutionState;
  readonly CrawlExecutionState = CrawlExecutionState;
  readonly ExtraStatusCodes = ExtraStatusCodes;

  @Input()
  jobExecutionStatus: JobExecutionStatus;

  executionStateColors = [
    {
      backgroundColor: [
        '#924900', // ABORTED_MANUAL
        '#E69F00', // ABORTED_SIZE
        '#920000', // ABORTED_TIMEOUT
        '#56B4E9', // CREATED
        '#0072B2', // DIED
        '#F0E442', // FETCHING
        '#009E73', // FINISHED
        '#D55E00', // SLEEPING
        '#000000', // UNDEFINED
        '#CC79A7', // UNRECOGNIZED
      ]
    }
  ];

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

  pieChartOptions: ChartOptions = {
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
            return '';
          }
        }
      }
    },
  };

  pieChartLabels: Label[] = ['Crawled', 'Denied', 'Failed', 'Out of scope', 'Retried'];
  pieChartData: number[];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [pluginDataLabels];


  stateMapPieChartLabels: Label[] = [
    'ABORTED_MANUAL', 'ABORTED_SIZE', 'ABORTED_TIMEOUT', 'CREATED', 'DIED', 'FETCHING', 'FINISHED', 'SLEEPING', 'UNDEFINED', 'UNRECOGNIZED'
  ];
  stateMapPieChartData: number[];

  constructor(private router: Router) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.jobExecutionStatus) {
      if (this.jobExecutionStatus) {
        this.pieChartData = [
          this.jobExecutionStatus.documentsCrawled,
          this.jobExecutionStatus.documentsDenied,
          this.jobExecutionStatus.documentsFailed,
          this.jobExecutionStatus.documentsOutOfScope,
          this.jobExecutionStatus.documentsRetried
        ];


        const state = this.getExecMap(this.jobExecutionStatus.executionsStateMap);
        let abortedManualCount = 0;
        let abortedSizeCount = 0;
        let abortedTimeOutCount = 0;
        let createdCount = 0;
        let diedCount = 0;
        let fetchingCount = 0;
        let finishedCount = 0;
        let sleepingCount = 0;
        let undefinedCount = 0;
        let unrecognizedCount = 0;

        for (const i of state) {
          if (i.key === 'ABORTED_MANUAL') {
            abortedManualCount = i.value;
          }
          if (i.key === 'ABORTED_SIZE') {
            abortedSizeCount = i.value;
          }
          if (i.key === 'ABORTED_TIMEOUT') {
            abortedTimeOutCount = i.value;
          }
          if (i.key === 'CREATED') {
            createdCount = i.value;
          }
          if (i.key === 'DIED') {
            diedCount = i.value;
          }
          if (i.key === 'FETCHING') {
            fetchingCount = i.value;
          }
          if (i.key === 'FINISHED') {
            finishedCount = i.value;
          }
          if (i.key === 'SLEEPING') {
            sleepingCount = i.value;
          }
          if (i.key === 'UNDEFINED') {
            undefinedCount = i.value;
          }
          if (i.key === 'UNRECOGNIZED') {
            unrecognizedCount = i.value;
          }
        }

        this.stateMapPieChartData = [
          abortedManualCount, abortedSizeCount, abortedTimeOutCount, createdCount,
          diedCount, fetchingCount, finishedCount, sleepingCount, undefinedCount, unrecognizedCount
        ];
      }
    }
  }

  getDuration(startTime: string, endTime: string): string {
    return durationBetweenDates(startTime, endTime);
  }

  getExecMap(executionStateMap: Map<string, number>) {
    const datasource = [];
    for (const [key, value] of executionStateMap) {
      datasource.push({key, value});
    }
    return datasource;
  }

  onGoToExecutionWithState(event: any) {
    if (event.active.length > 0) {
      const chart = event.active[0]._chart;
      const activePoints = chart.getElementAtEvent(event.event);
      if (activePoints.length > 0) {
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        this.router.navigate(['report', 'crawlexecution'],
          {
            queryParams: {
              state: CrawlExecutionState[label], job_id: this.jobExecutionStatus.jobId,
              job_execution_id: this.jobExecutionStatus.id
            }
          });
      }
    }
  }
}
