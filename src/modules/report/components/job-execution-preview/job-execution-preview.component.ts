import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CrawlExecutionState, ExtraStatusCodes, JobExecutionState, JobExecutionStatus} from 'src/shared/models';
import {durationBetweenDates} from '../../../../shared/func';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {ActivatedRoute, Router} from '@angular/router';


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


  public pieChartOptions: ChartOptions = {
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
            return '';
          }
        }
      }
    },
    showLines: true,
    spanGaps: true,
    cutoutPercentage: 1,
    rotation: 15,
  };

  public pieChartLabels: Label[] = ['Crawled', 'Denied', 'Failed', 'Out of scope', 'Retried'];
  public pieChartData: number[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];


  public stateMapPieChartLabels: Label[] = [
    'ABORTED_MANUAL', 'ABORTED_SIZE', 'ABORTED_TIMEOUT', 'CREATED', 'DIED', 'FETCHING', 'FINISHED', 'SLEEPING', 'UNDEFINED', 'UNRECOGNIZED'
  ];
  public stateMapPieChartData: number[];

  constructor(private router: Router, private route: ActivatedRoute) {
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
