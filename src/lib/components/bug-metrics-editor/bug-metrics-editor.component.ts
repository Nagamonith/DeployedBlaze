import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundAlertDialogComponent } from '../../../app/shared/dialogs/not-found-alert-dialog/not-found-alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

interface BugSummary {
  Summary: string;
  Actual_Hours: number;
  Estimates_Hours: number;
  Analysis_hours: number;
  Design_hours: number;
  Coding_hours: number;
  Testing_hours: number;
  Demo_Review_hours: number;
  Release_hours: number;
  Documentation_hours: number;
  Training_hours: number;
}

interface BugTask {
  bug_id: number;
  task_id: number;
  target_version: string;
  start_date: string;
  end_date: string;
  resource_name: string;
  task_resource_name: string;
  relationship_type: string;
}

interface BugTracking {
  realname: string;
  total_spent: number;
}

@Component({
  selector: 'app-bug-metrics-editor',
  templateUrl: './bug-metrics-editor.component.html',
  standalone: true,
  styleUrls: ['./bug-metrics-editor.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class BugMetricsEditorComponent {
  metricsForm: FormGroup;
  loading = false;
  dataLoaded = false;
  bugSummaries: BugSummary[] = [];
  bugTasks: BugTask[] = [];
  bugTrackings: BugTracking[] = [];
  notFound = false;
  apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url;
  showSprintMatrixModal = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.metricsForm = this.fb.group({
      bugId: ['', Validators.required],
      version: ['']
    });
  }

  // loadData(): void {
  //   const { bugId, version } = this.metricsForm.value;
  //   const params = [];
  //   if (bugId !== null && bugId !== undefined && bugId !== '') params.push(`bguid=${bugId}`);
  //   if (version) params.push(`btversion=${version}`);
  //   const query = params.length ? `?${params.join('&')}` : '';

  //   this.loading = true;
  //   this.http.get<any>(`${this.apiBaseUrl}/api/Bug/GetAllBugDataRaw${query}`)
  //     .subscribe((result: any) => {
  //       this.bugTasks = result.bugTaskDetails || [];
  //       this.bugSummaries = result.bugTimeSummary || [];
  //       this.bugTrackings = result.timeTracking || [];
  //       this.showSprintMatrixModal = false;
  //       this.dataLoaded = true;
  //       this.loading = false;
  //       this.notFound = (
  //         (!this.bugTasks || this.bugTasks.length === 0) &&
  //         (!this.bugSummaries || this.bugSummaries.length === 0) &&
  //         (!this.bugTrackings || this.bugTrackings.length === 0)
  //       );
  //     }, error => {
  //       this.loading = false;
  //       this.notFound = true;
  //     });
  // }
//   loadData(): void {
//   const { bugId, version } = this.metricsForm.value;
//   const params = [];
//   if (bugId !== null && bugId !== undefined && bugId !== '') params.push(`bguid=${bugId}`);
//   if (version) params.push(`btversion=${version}`);
//   const query = params.length ? `?${params.join('&')}` : '';

//   this.loading = true;

//   this.http.get<any>(`${this.apiBaseUrl}/api/Bug/GetAllBugDataRaw${query}`)
//     .subscribe((result: any) => {
//       this.bugTasks = result.bugTaskDetails || [];
//       this.bugSummaries = result.bugTimeSummary || [];
//       this.bugTrackings = result.timeTracking || [];

//       this.showSprintMatrixModal = false;
//       this.dataLoaded = true;
//       this.loading = false;

//       const isEmpty =
//         (!this.bugTasks || this.bugTasks.length === 0) &&
//         (!this.bugSummaries || this.bugSummaries.length === 0) &&
//         (!this.bugTrackings || this.bugTrackings.length === 0);

//       this.notFound = isEmpty;

//       if (isEmpty) {
//         window.alert('No data found for the selected filters.');
//       }
//     }, error => {
//       this.loading = false;
//       this.notFound = true;
//       window.alert('An error occurred while loading data.');
//     });
// }
loadData(): void {
  const { bugId, version } = this.metricsForm.value;

  // Exit early if both parameters are empty
  const isBugIdValid = bugId !== null && bugId !== undefined && bugId !== '';
  const isVersionValid = !!version;

  if (!isBugIdValid && !isVersionValid) {
    // this.notFound = true;
    // window.alert('Please provide at least one filter (Bug ID or Version).');
    this.dialog.open(NotFoundAlertDialogComponent, {
  width: '400px',
  data: {
    message: 'Please enter at least one parameter (Bug ID or Version).'
  }
});
    return;
  }

  const params = [];
  if (isBugIdValid) params.push(`bguid=${bugId}`);
  if (isVersionValid) params.push(`btversion=${version}`);

  const query = params.length ? `?${params.join('&')}` : '';

  this.loading = true;

  this.http.get<any>(`${this.apiBaseUrl}/api/Bug/GetAllBugDataRaw${query}`)
    .subscribe((result: any) => {
      this.bugTasks = result.bugTaskDetails || [];
      this.bugSummaries = result.bugTimeSummary || [];
      this.bugTrackings = result.timeTracking || [];

      this.showSprintMatrixModal = false;
      this.dataLoaded = true;
      this.loading = false;

      const isEmpty =
        (!this.bugTasks || this.bugTasks.length === 0) &&
        (!this.bugSummaries || this.bugSummaries.length === 0) &&
        (!this.bugTrackings || this.bugTrackings.length === 0);

      this.notFound = isEmpty;

      if (isEmpty) {
        // window.alert('No data found for the selected filters.');
        this.dialog.open(NotFoundAlertDialogComponent, {
    width: '400px',
    data: { message: 'No data found for the selected filters.' }
  });
      }
    }, error => {
      // this.loading = false;
      // this.notFound = true;
      // window.alert('An error occurred while loading data.');
       this.loading = false;
  this.notFound = true;

  this.dialog.open(NotFoundAlertDialogComponent, {
    width: '400px',
    data: { message: 'An error occurred while loading data.' }
  });
    });
}



  goBack(): void {
    window.history.back();
  }
}