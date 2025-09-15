 
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DxiCommandModule } from 'devextreme-angular/ui/nested';
import { DxGanttModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';

@Component({
  selector: 'app-workload-management',
  templateUrl: './workload-management.component.html',
  styleUrls: ['./workload-management.component.css'],
  imports:[CommonModule, FormsModule, DxiCommandModule, DxGanttModule, DxDataGridModule]
})
export class WorkloadManagementComponent {
  viewMode: string = 'gantt';
  workloadStartDate: string = '';
  workloadEndDate: string = '';
  workloadLoading: boolean = false;
  workloadError: string = '';
  workloadData: any[] = [];
  ganttTasks: any[] = [];
  filteredGanttTasks: any[] = [];
  resourceList: string[] = [];
  selectedResource: string = '';
  ganttResources: any[] = [];
  ganttAssignments: any[] = [];
  apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url;
  loadButtonClicked: boolean = false;

  constructor(private http: HttpClient) {}

  formatDateForApi(dateStr: string): string {
    const d = new Date(dateStr);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

    onBugRowDblClick(e: any) {
      if (e && e.data && e.data.mantis_BugID) {
        window.open('https://sprintlyzer.qualis40.io/mantisbt/view.php?id=' + e.data.mantis_BugID, '_blank');
      }
    }
  fetchWorkloadData(): void {
    this.loadButtonClicked = true;
    if (!this.workloadStartDate || !this.workloadEndDate) return;
    const formattedStartDate = this.formatDateForApi(this.workloadStartDate);
    const formattedEndDate = this.formatDateForApi(this.workloadEndDate);
    this.workloadLoading = true;
    this.workloadError = '';
    this.http.get<any[]>(`${this.apiBaseUrl}/api/ResourceHour/workload`, {
      params: {
        startDate: formattedStartDate,
        endDate: formattedEndDate
      }
    }).subscribe({
      next: (data) => {
        this.workloadData = data || [];
        // Map workloadData to Gantt format (id, title, start, end)
        this.ganttTasks = (data || []).map((row, idx) => ({
          id: idx + 1,
          title: row.task_Summary || row.project_Name,
          // start: new Date(formattedStartDate),
          // end: new Date(formattedEndDate),
           start: row.actual_Start,
          // end: row.original_Merge_Date,
           end: row.current_Merge_Date,
          project_Name: row.project_Name,
          resource_Name: row.resource_Name,
          target_Version: row.target_Version,
          mantis_BugID: row.mantis_BugID,
          total_Hoursd_Worked: row.total_Hoursd_Worked,
          actual_Start: row.actual_Start,
          original_Merge_Date: row.original_Merge_Date,
          current_Merge_Date:row.current_Merge_Date,
          progress:row.progress
        }));
        // Get unique resource list for filter dropdown
        this.resourceList = Array.from(new Set(this.ganttTasks.map(t => t.resource_Name).filter(r => r)));
        this.selectedResource = '';
        this.applyResourceFilter();
        // Build resources and assignments for Gantt chart
        this.ganttResources = this.resourceList.map((r, idx) => ({ id: idx + 1, text: r }));
        this.ganttAssignments = this.ganttTasks
          .map((task, idx) => {
            const resourceIdx = this.resourceList.indexOf(task.resource_Name);
            return resourceIdx >= 0 ? { id: idx + 1, taskId: task.id, resourceId: resourceIdx + 1 } : null;
          })
          .filter(a => a);
        this.workloadLoading = false;
      },
      error: (err) => {
        this.workloadError = err?.error?.error || 'Failed to load workload data.';
        this.workloadLoading = false;
      }
    });
  }

  applyResourceFilter(): void {
    if (!this.selectedResource) {
      this.filteredGanttTasks = this.ganttTasks;
    } else {
      this.filteredGanttTasks = this.ganttTasks.filter(t => t.resource_Name === this.selectedResource);
    }
  }
}
