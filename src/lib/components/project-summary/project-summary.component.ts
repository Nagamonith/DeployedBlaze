import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GanttEditorComponent } from '../gantt-editor/gantt-editor.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.css'],
  standalone: true,
  imports: [CommonModule, GanttEditorComponent],
})
export class ProjectSummaryComponent implements OnInit {
  projectName = '';
  version = '';
  sprintStartDate: string = '';
  sprintOriginalMergeDate: string = '';
  sprintCurrentMergeDate: string = '';

  // Tab state
  tabs: Array<{ label: string, type: 'summary' | 'gantt' | 'bug-details', data?: any }> = [
    { label: 'Project Summary', type: 'summary' }
  ];
  activeTabIndex = 0;

  // Bug summary state
  bugSummary: any[] = [];
  bugSummaryLoading = false;
  bugSummaryError = '';
  bugSummaryDisplayOrder = [
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

  // Bug details state
  bugDetailsLoading = false;
  bugDetailsError = '';
  bugTaskDetails: any[] = [];
  timeTracking: any[] = [];

  showGantt = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.projectName = decodeURIComponent(params['project'] || '');
      this.version = decodeURIComponent(params['version'] || '');
    });
  }

  // Tab management
  openTab(type: 'summary' | 'gantt' | 'bug-details', data?: any) {
    // Check if tab already exists (for bug-details, check bug id)
    if (type === 'summary') {
      this.activeTabIndex = 0;
      return;
    }
    if (type === 'gantt') {
      const idx = this.tabs.findIndex(t => t.type === 'gantt');
      if (idx === -1) {
        this.tabs.push({ label: 'Gantt Chart', type: 'gantt' });
        this.activeTabIndex = this.tabs.length - 1;
      } else {
        this.activeTabIndex = idx;
      }
      return;
    }
    if (type === 'bug-details' && data) {
      const idx = this.tabs.findIndex(t => t.type === 'bug-details' && t.data && t.data.bugId === data.bugId);
      if (idx === -1) {
        this.tabs.push({ label: `Bug #${data.bugId}`, type: 'bug-details', data });
        this.activeTabIndex = this.tabs.length - 1;
      } else {
        this.activeTabIndex = idx;
      }
      this.loadBugDetails(data.bugId, data.version);
    }
  }

  closeTab(index: number) {
    if (index === 0) return; // Don't close main tab
    this.tabs.splice(index, 1);
    if (this.activeTabIndex >= index) {
      this.activeTabIndex = Math.max(0, this.activeTabIndex - 1);
    }
  }

  // Show Overall Metrics (Bug Time Summary)
  showOverallMetrics(): void {
    // Open summary tab and load data
    this.openTab('summary');
    this.loadBugSummary();
  }

  // Show Gantt Chart
  showGanttChart(): void {
    this.openTab('gantt');
  }

  // Load bug summary data
  loadBugSummary(): void {
    this.bugSummaryLoading = true;
    this.bugSummaryError = '';
    this.http.get<any[]>(`http://localhost:5238/api/GanttProjects/bug-time-summary`, {
      params: {
        project_name: this.projectName,
        btversion: this.version
      }
    }).subscribe({
      next: (data) => {
        this.bugSummary = data;
        this.bugSummaryLoading = false;
      },
      error: (err) => {
        this.bugSummaryError = 'Failed to load bug summary.';
        this.bugSummaryLoading = false;
      }
    });
  }

  // When a bug is double-clicked in summary
  openBugDetails(bugId: number): void {
    this.openTab('bug-details', { bugId, version: this.version });
  }

  // Load bug details data
  loadBugDetails(bugId: number, version: string): void {
    this.bugDetailsLoading = true;
    this.bugDetailsError = '';
    this.http.get<any>(`http://localhost:5238/api/Bug/GetAllBugDataRaw?bguid=${bugId}&btversion=${version}`)
      .subscribe({
        next: (data) => {
          this.bugTaskDetails = data.bugTaskDetails || [];
          this.timeTracking = data.timeTracking || [];
          this.bugDetailsLoading = false;
        },
        error: (err) => {
          this.bugDetailsError = 'Failed to load bug details';
          this.bugDetailsLoading = false;
        }
      });
  }

  // Helpers for summary table
  isNumericColumn(key: string): boolean {
    return this.bugSummary.some(bug => typeof bug[key] === 'number');
  }
  getTotalForColumn(key: string): string {
    const total = this.bugSummary.reduce((sum, item) => {
      const value = parseFloat(item[key]);
      return !isNaN(value) ? sum + value : sum;
    }, 0);
    return total.toFixed(2);
  }
}
  

  
  

