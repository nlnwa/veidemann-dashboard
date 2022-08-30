import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CrawlExecutionState, ExtraStatusCodes, JobExecutionState, JobExecutionStatus} from 'src/shared/models';
import {duration} from '../../../../shared/func';
import {Router} from '@angular/router';

export enum JobExecutionStatusColor {
  ABORTED_MANUAL = '#924900',
  ABORTED_SIZE = '#E69F00',
  ABORTED_TIMEOUT = '#920000',
  CREATED = '#56B4E9',
  DIED = '#0072B2',
  FETCHING = '#F0E442',
  FINISHED = '#009E73',
  SLEEPING = '#D55E00',
  UNDEFINED = '#000000',
  UNRECOGNIZED = '#CC79A7',

  CRAWLED = '#009E73',
  DENIED = '#D55E00',
  FAILED = '#920000',
  RETRIED = '#56B4E9',
  OUT_OF_SCOPE = '#F0E442'
}

@Component({
  selector: 'app-job-execution-preview',
  templateUrl: './job-execution-preview.component.html',
  styleUrls: ['./job-execution-preview.component.css']
})


export class JobExecutionPreviewComponent implements OnChanges {
  readonly JobExecutionState = JobExecutionState;
  readonly CrawlExecutionState = CrawlExecutionState;
  readonly ExtraStatusCodes = ExtraStatusCodes;

  @Input() jobExecutionStatus: JobExecutionStatus;

  documentsChartOptions: any;
  executionStatesChartOptions: any;


  constructor(private router: Router) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.jobExecutionStatus) {
      if (this.jobExecutionStatus) {
        this.setDocumentsChartOptions();
        this.setExecutionStatesChartOptions();
      }
    }
  }

  setExecutionStatesChartOptions() {
    this.executionStatesChartOptions = {
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
          mark: {show: true},
          dataView: {show: true},
          saveAsImage: {show: true}
        }
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
          data: this.getExecMap(this.jobExecutionStatus.executionsStateMap)
            .filter(execution => (execution.value > 0))
            .map(exec => ({name: exec.key, value: exec.value, itemStyle: {color: JobExecutionStatusColor[exec.key]}}))
        }
      ]
    };
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

  onGoToExecutionWithState(execution: any) {
    if (execution.value > 0) {
      this.router.navigate(['report', 'crawlexecution'],
        {
          queryParams: {
            state: CrawlExecutionState[execution.name], job_id: this.jobExecutionStatus.jobId,
            job_execution_id: this.jobExecutionStatus.id
          }
        });
    }
  }

  getDuration(jobExec: JobExecutionStatus): string {
    let endTime = jobExec.endTime;
    if (!jobExec.endTime) {
      if (jobExec.state === JobExecutionState.RUNNING || JobExecutionState.CREATED) {
        endTime = new Date().toISOString();
      }
    }
    return duration(jobExec.startTime, endTime);
  }

  getExecMap(executionStateMap: Map<string, number>) {
    const datasource = [];
    for (const [key, value] of executionStateMap) {
      datasource.push({key, value});
    }
    return datasource;
  }

  getDocuments() {
    const status = this.jobExecutionStatus;
    const docs = [
      {
        name: 'Crawled',
        value: status.documentsCrawled,
        itemStyle: {color: JobExecutionStatusColor.CRAWLED}
      },
      {
        name: 'Denied',
        value: status.documentsDenied,
        itemStyle: {color: JobExecutionStatusColor.DENIED}
      },
      {
        name: 'Failed',
        value: status.documentsFailed,
        itemStyle: {color: JobExecutionStatusColor.FAILED}
      }, {
        name: 'Out of scope',
        value: status.documentsOutOfScope,
        itemStyle: {color: JobExecutionStatusColor.OUT_OF_SCOPE}
      },
      {
        name: 'Retried',
        value: status.documentsRetried,
        itemStyle: {color: JobExecutionStatusColor.RETRIED}
      }
    ];
    return docs.filter(doc => (doc.value > 0));
  }
}
