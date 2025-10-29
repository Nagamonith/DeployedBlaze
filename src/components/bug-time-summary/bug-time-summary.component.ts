import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bug-time-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bug-time-summary.component.html',
  styleUrls: ['./bug-time-summary.component.css']
})
export class BugTimeSummaryComponent implements OnInit {
  bugSummary: any[] = [];
  loading = false;
  error = '';
  projectName = '';
  targetVersion = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.projectName = params['project'] || '';
    this.targetVersion = params['version'] || '';

    console.log('Project:', this.projectName);
    console.log('Version:', this.targetVersion);

    this.loadBugSummary();  // only after values are received
  });
}

displayOrder = [
  'bug_id',
  'target_version',
  'Summary',
  'Estimates_Hours',
  'Actual_Hours',
  'Analysis_hours',
  'Design_hours',
  'Coding_hours',
  'Testing_hours',
  'Demo_Review_hours',
  'Release_hours',
  'Documentation_hours',
  'Training_hours'
];


  // loadBugSummary(): void {
  //   this.loading = true;
  //   this.http.get<any[]>(`http://localhost:5238/api/GanttProjects/bug-time-summary`, {
  //     params: {
  //       btversion: this.targetVersion
  //     }
  //   }).subscribe({
  //     next: (data) => {
  //       this.bugSummary = data;
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.error = 'Failed to load bug summary.';
  //       this.loading = false;
  //     }
  //   });
  // }
  loadBugSummary(): void {
  this.loading = true;

  this.http.get<any[]>(`http://localhost:5238/api/GanttProjects/bug-time-summary`, {
    params: {
      project_name: this.projectName,   
      btversion: this.targetVersion
    }
  }).subscribe({
    next: (data) => {
      this.bugSummary = data;
      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      this.error = 'Failed to load bug summary.';
      this.loading = false;
    }
  });
}


  goToDetails(bugId: number): void {
    this.router.navigate(['assets/bug-details'], {
      queryParams: {
        bugid: bugId,
      version: this.targetVersion
      }
    });
  }
  isNumericColumn(key: string): boolean {
  return this.bugSummary.some(bug => typeof bug[key] === 'number');
}

 gotoprevious(): void {
    window.history.back();
 }
getTotalForColumn(key: string): string {
  const total = this.bugSummary.reduce((sum, item) => {
    const value = parseFloat(item[key]);
    return !isNaN(value) ? sum + value : sum;
  }, 0);
  return total.toFixed(2);
}

}
