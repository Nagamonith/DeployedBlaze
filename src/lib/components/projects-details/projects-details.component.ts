// import { Component, OnInit } from '@angular/core';
// import { DxDataGridModule, DxTemplateModule, DxSelectBoxComponent } from 'devextreme-angular';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { GanttEditorComponent } from '../gantt-editor/gantt-editor.component';
// import { LeftnavIcon } from '../../../app/leftnavbartree/leftnavigationbar/leftnavigationbar-icon.enum';
// import { WorkloadManagementComponent } from '../workload-management/workload-management.component';
// @Component({
//   selector: 'app-projects-details',
//   standalone: true,
//   imports: [CommonModule, FormsModule, GanttEditorComponent, DxDataGridModule, DxTemplateModule, WorkloadManagementComponent
//   ],
 
//   templateUrl: './projects-details.component.html',
//   styleUrls: ['./projects-details.component.css']
// })
// export class ProjectsDetailsComponent implements OnInit {
//   // Handler for DevExtreme DataGrid row double-click
//   onProjectRowDblClick(e: any): void {
//     if (e && e.data) {
//       this.openProjectTab(e.data);
//     }
//   }
//   // Edit Project Modal State
 
//   editProjectModalOpen = false;
//   selectedProject: any = null;
//   editProjectTargetVersions: string[] = [];
//   editProjectTargetVersionLoading = false;
//   selectedEditTargetVersion: string = '';
 
 
//   // Sprint date fields for editing
//   editSprintStartDate: string = '';
//   editSprintOriginalMergeDate: string = '';
//   editSprintCurrentMergeDate: string = '';
//   editSprintReleaseDate: string = '';
//   public icons = LeftnavIcon;
//   openEditProjectModal(project: any): void {
//     this.selectedProject = project;
//     this.editProjectModalOpen = true;
//     this.selectedEditTargetVersion = project.Target_Version || '';
//     this.fetchTargetVersionsForEdit(project.Project_Name);
//     this.fetchSprintDatesForEdit(project.Project_Name);
//   }
 
//   fetchSprintDatesForEdit(projectName: string): void {
//     this.http.get<any>(`${this.apiBaseUrl}/api/GanttProjects/sprint-dates/${encodeURIComponent(projectName)}`)
//       .subscribe({
//         next: (data) => {
//           this.editSprintStartDate = data.Sprint_Start_Date ? data.Sprint_Start_Date.substring(0, 10) : '';
//           this.editSprintOriginalMergeDate = data.Sprint_Original_Merge_Date ? data.Sprint_Original_Merge_Date.substring(0, 10) : '';
//           this.editSprintCurrentMergeDate = data.Sprint_Current_Merge_Date ? data.Sprint_Current_Merge_Date.substring(0, 10) : '';
//           this.editSprintReleaseDate = data.Sprint_Release_Date ? data.Sprint_Release_Date.substring(0, 10) : '';
//         },
//         error: () => {
//           this.editSprintStartDate = '';
//           this.editSprintOriginalMergeDate = '';
//           this.editSprintCurrentMergeDate = '';
//           this.editSprintReleaseDate = '';
//         }
//       });
//   }
 
//   fetchTargetVersionsForEdit(projectName: string): void {
//     this.editProjectTargetVersionLoading = true;
//     this.editProjectTargetVersions = [];
//     this.http.get<string[]>(`${this.apiBaseUrl}/api/GanttProjects/target-versions/${encodeURIComponent(projectName)}`)
//       .subscribe({
//         next: (versions) => {
//           this.editProjectTargetVersions = versions || [];
//           // If the current selected version is not in the list, reset it
//           if (!this.editProjectTargetVersions.includes(this.selectedEditTargetVersion)) {
//             this.selectedEditTargetVersion = this.editProjectTargetVersions[0] || '';
//           }
//           this.editProjectTargetVersionLoading = false;
//         },
//         error: () => {
//           this.editProjectTargetVersions = [];
//           this.editProjectTargetVersionLoading = false;
//         }
//       });
//   }
 
 
//   closeEditProjectModal(): void {
//     this.editProjectModalOpen = false;
//     this.selectedProject = null;
//     this.editProjectTargetVersions = [];
//     this.selectedEditTargetVersion = '';
//     this.editSprintStartDate = '';
//     this.editSprintOriginalMergeDate = '';
//     this.editSprintCurrentMergeDate = '';
//     this.editSprintReleaseDate = '';
//   }
 
//   setEditProject(): void {
//     // Save the selected target version and sprint dates for the project
//     if (!this.selectedProject?.Project_Name || !this.selectedEditTargetVersion) {
//       // Optionally show an error
//       return;
//     }
//     const payload = {
//       projectName: this.selectedProject.Project_Name,
//       targetVersion: this.selectedEditTargetVersion,
//       sprintStartDate: this.editSprintStartDate || null,
//       sprintOriginalMergeDate: this.editSprintOriginalMergeDate || null,
//       sprintCurrentMergeDate: this.editSprintCurrentMergeDate || null,
//       sprintReleaseDate: this.editSprintReleaseDate || null
//     };
//     this.http.post(`${this.apiBaseUrl}/api/GanttProjects/set-dates`, payload).subscribe({
//       next: () => {
//         // Optionally show a success message
//         // Update the local project data if needed
//         if (this.selectedProject) {
//           this.selectedProject.Target_Version = this.selectedEditTargetVersion;
//           this.selectedProject.Sprint_Start_Date = this.editSprintStartDate;
//           this.selectedProject.Sprint_Original_Merge_Date = this.editSprintOriginalMergeDate;
//           this.selectedProject.Sprint_Current_Merge_Date = this.editSprintCurrentMergeDate;
//           this.selectedProject.Sprint_Release_Date = this.editSprintReleaseDate;
//         }
//         this.closeEditProjectModal();
//       },
//       error: () => {
//         // Optionally show an error message
//       }
//     });
//   }
//   // Tabs: first is always 'Projects', others are per-project
//   tabs: Array<{ label: string, type: 'projects' | 'workload' | 'project' | 'metrics' | 'gantt', project?: any }> = [
//     { label: 'Projects', type: 'projects' },
//     { label: 'Workload', type: 'workload' }
//   ];
//   activeTabIndex = 0;
 
//   // Projects grid
//   projects: any[] = [];
//   loading = false;
//   error = '';
 
//   apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url;
 
//   // Per-project state
//   projectSummary: { [key: string]: any[] } = {}; // bug summary per project
//   projectSummaryLoading: { [key: string]: boolean } = {};
//   projectSummaryError: { [key: string]: string } = {};
//   bugSummaryDisplayOrder = [
//     'bug_id',
//     // 'target_version',
//     'Status',
//     'Summary',
//     'Estimates_Hours',
//     'Actual_Hours',
//     'Analysis_hours',
//     'Design_hours',
//     'Coding_hours',
//     'Testing_hours',
//     'Demo_Review_hours',
//     'Release_hours',
//     'Documentation_hours',
//     'Training_hours'
//   ];
 
//   bugSummaryDisplayNames: { [key: string]: string } = {
//     bug_id: 'Bug ID',
//     Status: 'Status',
//     Summary: 'Summary',
//     Estimates_Hours: 'Estimated Hours',
//     Actual_Hours: 'Actual Hours',
//     Analysis_hours: 'Analysis',
//     Design_hours: 'Design',
//     Coding_hours: 'Coding',
//     Testing_hours: 'Testing',
//     Demo_Review_hours: 'Demo/Review',
//     Release_hours: 'Release',
//     Documentation_hours: 'Documentation',
//     Training_hours: 'Training'
//   };
 
 
//   // Per-project sub-tab bar state
//   projectSubTabs: {
//     [key: string]: {
//       tabs: Array<{ label: string, type: 'metrics' | 'gantt' | 'bug-details', bugId?: number }>,
//       active: number
//     }
//   } = {};
//   // Store bug details state per project sub-tab
//   bugDetailsState: {
//     [key: string]: {
//       [bugId: number]: {
//         bugId: number;
//         version: string;
//         loading: boolean;
//         error: string;
//         bugTaskDetails: any[];
//         timeTracking: any[];
//       }
//     }
//   } = {};
//   // Ensure sub-tab bar exists for a project
//   ensureProjectSubTabs(project: any) {
//     const key = `${project.Project_Name}__${project.Target_Version}`;
//     if (!this.projectSubTabs[key]) {
//       this.projectSubTabs[key] = {
//         tabs: [
//           { label: 'Overall Metrics', type: 'metrics' },
//           { label: 'Gantt Chart', type: 'gantt' }
//         ],
//         active: 0
//       };
//     }
//     if (!this.bugDetailsState[key]) {
//       this.bugDetailsState[key] = {};
//     }
//   }
 
//   // Open metrics sub-tab for a project
//   openMetricsSubTab(project: any): void {
//     const key = `${project.Project_Name}__${project.Target_Version}`;
//     this.ensureProjectSubTabs(project);
//     const idx = this.projectSubTabs[key].tabs.findIndex(t => t.type === 'metrics');
//     this.projectSubTabs[key].active = idx;
//     this.loadProjectSummary(project);
//   }
 
//   // Open gantt sub-tab for a project
//   openGanttSubTab(project: any): void {
//     const key = `${project.Project_Name}__${project.Target_Version}`;
//     this.ensureProjectSubTabs(project);
//     const idx = this.projectSubTabs[key].tabs.findIndex(t => t.type === 'gantt');
//     this.projectSubTabs[key].active = idx;
//   }
 
//   // Open bug-details sub-tab for a project and bug
//   openBugDetailsSubTab(project: any, bugId: number): void {
//     const key = `${project.Project_Name}__${project.Target_Version}`;
//     this.ensureProjectSubTabs(project);
//     // Check if tab already exists
//     let idx = this.projectSubTabs[key].tabs.findIndex(t => t.type === 'bug-details' && t.bugId === bugId);
//     if (idx === -1) {
//       this.projectSubTabs[key].tabs.push({ label: `Bug #${bugId}`, type: 'bug-details', bugId });
//       idx = this.projectSubTabs[key].tabs.length - 1;
//     }
//     this.projectSubTabs[key].active = idx;
//     // Load bug details if not already loaded
//     if (!this.bugDetailsState[key][bugId]) {
//       this.bugDetailsState[key][bugId] = {
//         bugId,
//         version: project.Target_Version,
//         loading: true,
//         error: '',
//         bugTaskDetails: [],
//         timeTracking: []
//       };
//       this.http.get<any>(`${this.apiBaseUrl}/api/Bug/GetAllBugDataRaw?bguid=${bugId}&btversion=${project.Target_Version}`)
//         .subscribe({
//           next: (data) => {
//             this.bugDetailsState[key][bugId].bugTaskDetails = data.bugTaskDetails || [];
//             this.bugDetailsState[key][bugId].timeTracking = data.timeTracking || [];
//             this.bugDetailsState[key][bugId].loading = false;
//           },
//           error: (err) => {
//             this.bugDetailsState[key][bugId].error = 'Failed to load bug details';
//             this.bugDetailsState[key][bugId].loading = false;
//           }
//         });
//     }
//   }
 
//   // Switch sub-tab for a project
//   switchProjectSubTab(project: any, idx: number): void {
//     const key = `${project.Project_Name}__${project.Target_Version}`;
//     this.ensureProjectSubTabs(project);
//     this.projectSubTabs[key].active = idx;
//     // Optionally, trigger data load if needed
//     const tab = this.projectSubTabs[key].tabs[idx];
//     if (tab.type === 'metrics') this.loadProjectSummary(project);
//   }
 
//   constructor(private http: HttpClient) {}
 
//   ngOnInit(): void {
//     this.fetchProjects();
//   }
 
//   fetchProjects(): void {
//     this.loading = true;
//     this.http.get<any[]>(`${this.apiBaseUrl}/api/ganttprojects`).subscribe({
//       next: (data) => {
//         // Sort projects by latest Sprint_Current_Merge_Date (descending)
//         this.projects = (data || []).sort((a, b) => {
//           const dateA = new Date(a.Sprint_Current_Merge_Date || 0).getTime();
//           const dateB = new Date(b.Sprint_Current_Merge_Date || 0).getTime();
//           return dateB - dateA;
//         });
//         this.loading = false;
//       },
//       error: (err) => {
//         this.error = err?.error?.error || 'Failed to load project data.';
//         this.loading = false;
//       }
//     });
//   }
 
//   // Double-click project row: open project tab
//   openProjectTab(project: any): void {
//     const idx = this.tabs.findIndex(t => t.type === 'project' && t.project?.Project_Name === project.Project_Name && t.project?.Target_Version === project.Target_Version);
//     if (idx === -1) {
//       this.tabs.push({ label: project.Project_Name, type: 'project', project });
//       this.activeTabIndex = this.tabs.length - 1;
//     } else {
//       this.activeTabIndex = idx;
//     }
//     this.ensureProjectSubTabs(project);
//     this.openMetricsSubTab(project); // Show metrics by default
//   }
 
//   // Close a bug-details sub-tab for a project
//   closeBugDetailsSubTab(project: any, bugId: number): void {
//     const key = `${project.Project_Name}__${project.Target_Version}`;
//     const subTabs = this.projectSubTabs[key];
//     if (!subTabs) return;
//     const idx = subTabs.tabs.findIndex(t => t.type === 'bug-details' && t.bugId === bugId);
//     if (idx !== -1) {
//       subTabs.tabs.splice(idx, 1);
//       // If the closed tab was active, switch to metrics or previous tab
//       if (subTabs.active === idx) {
//         const metricsIdx = subTabs.tabs.findIndex(t => t.type === 'metrics');
//         subTabs.active = metricsIdx !== -1 ? metricsIdx : 0;
//       } else if (subTabs.active > idx) {
//         subTabs.active--;
//       }
//     }
//     // Optionally, remove bug details state
//     if (this.bugDetailsState[key] && this.bugDetailsState[key][bugId]) {
//       delete this.bugDetailsState[key][bugId];
//     }
//   }
 
//   // Close tab
//   closeTab(index: number) {
//     if (index === 0) return; // Don't close main tab
//     this.tabs.splice(index, 1);
//     if (this.activeTabIndex >= index) {
//       this.activeTabIndex = Math.max(0, this.activeTabIndex - 1);
//     }
//   }
 
//   // Load bug summary for a project
//   loadProjectSummary(project: any): void {
//     const key = `${project.Project_Name}__${project.Target_Version}`;
//     this.projectSummaryLoading[key] = true;
//     this.projectSummaryError[key] = '';
//     this.http.get<any[]>(`${this.apiBaseUrl}/api/GanttProjects/bug-time-summary`, {
//       params: {
//         project_name: project.Project_Name,
//         btversion: project.Target_Version
//       }
//     }).subscribe({
//       next: (data) => {
//         this.projectSummary[key] = data;
//         this.projectSummaryLoading[key] = false;
//       },
//       error: (err) => {
//         this.projectSummaryError[key] = 'Failed to load bug summary.';
//         this.projectSummaryLoading[key] = false;
//       }
//     });
//   }
 
//   // === NEW: search text used to filter by bug_id (applies to both per-project metrics and top-level metrics tab) ===
//   bugSearchText: string = '';
 
//   // Return the (possibly filtered) summary array for a given project
//   getSummaryForProject(project: any): any[] {
//     if (!project) return [];
//     const key = `${project.Project_Name}__${project.Target_Version}`;
//     const summary = (this.projectSummary && this.projectSummary[key]) ? this.projectSummary[key] : [];
//     if (!this.bugSearchText || this.bugSearchText.trim() === '') return summary;
//     const q = this.bugSearchText.trim().toLowerCase();
//     return summary.filter(item => {
//       const id = (item?.bug_id !== undefined && item?.bug_id !== null) ? item.bug_id.toString().toLowerCase() : '';
//       return id.includes(q);
//     });
//   }
 
//   // For the top-level metrics tab: get summary for the active tab's project
//   getSummaryForActiveProject(): any[] {
//     const project = this.tabs[this.activeTabIndex]?.project;
//     if (!project) return [];
//     return this.getSummaryForProject(project);
//   }
 
//   // Helpers for summary table - totals now computed over filtered data
//   getTotalForColumn(project: any, key: string): string {
//     const summary = this.getSummaryForProject(project);
//     const total = (summary || []).reduce((sum, item) => {
//       const value = parseFloat(item?.[key]);
//       return !isNaN(value) ? sum + value : sum;
//     }, 0);
//     return total.toFixed(2);
//   }
 
//   getTotalSpentHours(timeTracking: any[]): number {
//     return (timeTracking || []).reduce((sum, t) => sum + (+t.total_spent || 0), 0);
//   }
 
 
// }
 import { Component, OnInit, HostListener } from '@angular/core';
import { DxDataGridModule, DxTemplateModule, DxSelectBoxComponent } from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GanttEditorComponent } from '../gantt-editor/gantt-editor.component';
import { LeftnavIcon } from '../../../app/leftnavbartree/leftnavigationbar/leftnavigationbar-icon.enum';
import { WorkloadManagementComponent } from '../workload-management/workload-management.component';
import { DxCheckBoxModule } from 'devextreme-angular';


@Component({
  selector: 'app-projects-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GanttEditorComponent,
    DxDataGridModule,
    DxTemplateModule,
    WorkloadManagementComponent,
    DxCheckBoxModule
  ],

  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.css']
})
export class ProjectsDetailsComponent implements OnInit {
  // Handler for DevExtreme DataGrid row double-click
  onProjectRowDblClick(e: any): void {
    if (e && e.data) {
      this.openProjectTab(e.data);
    }
  }

  // Edit Project Modal State
  editProjectModalOpen = false;
  selectedProject: any = null;
  editProjectTargetVersions: string[] = [];
  editProjectTargetVersionLoading = false;
  selectedEditTargetVersion: string = '';

  // Sprint date fields for editing
  editSprintStartDate: string = '';
  editSprintOriginalMergeDate: string = '';
  editSprintCurrentMergeDate: string = '';
  editSprintReleaseDate: string = '';
  public icons = LeftnavIcon;

  openEditProjectModal(project: any): void {
    this.selectedProject = project;
    this.editProjectModalOpen = true;
    this.selectedEditTargetVersion = project.Target_Version || '';
    this.fetchTargetVersionsForEdit(project.Project_Name);
    this.fetchSprintDatesForEdit(project.Project_Name);
  }

  fetchSprintDatesForEdit(projectName: string): void {
    this.http.get<any>(`${this.apiBaseUrl}/api/GanttProjects/sprint-dates/${encodeURIComponent(projectName)}`)
      .subscribe({
        next: (data) => {
          this.editSprintStartDate = data.Sprint_Start_Date ? data.Sprint_Start_Date.substring(0, 10) : '';
          this.editSprintOriginalMergeDate = data.Sprint_Original_Merge_Date ? data.Sprint_Original_Merge_Date.substring(0, 10) : '';
          this.editSprintCurrentMergeDate = data.Sprint_Current_Merge_Date ? data.Sprint_Current_Merge_Date.substring(0, 10) : '';
          this.editSprintReleaseDate = data.Sprint_Release_Date ? data.Sprint_Release_Date.substring(0, 10) : '';
        },
        error: () => {
          this.editSprintStartDate = '';
          this.editSprintOriginalMergeDate = '';
          this.editSprintCurrentMergeDate = '';
          this.editSprintReleaseDate = '';
        }
      });
  }

  fetchTargetVersionsForEdit(projectName: string): void {
    this.editProjectTargetVersionLoading = true;
    this.editProjectTargetVersions = [];
    this.http.get<string[]>(`${this.apiBaseUrl}/api/GanttProjects/target-versions/${encodeURIComponent(projectName)}`)
      .subscribe({
        next: (versions) => {
          this.editProjectTargetVersions = versions || [];
          // If the current selected version is not in the list, reset it
          if (!this.editProjectTargetVersions.includes(this.selectedEditTargetVersion)) {
            this.selectedEditTargetVersion = this.editProjectTargetVersions[0] || '';
          }
          this.editProjectTargetVersionLoading = false;
        },
        error: () => {
          this.editProjectTargetVersions = [];
          this.editProjectTargetVersionLoading = false;
        }
      });
  }

  closeEditProjectModal(): void {
    this.editProjectModalOpen = false;
    this.selectedProject = null;
    this.editProjectTargetVersions = [];
    this.selectedEditTargetVersion = '';
    this.editSprintStartDate = '';
    this.editSprintOriginalMergeDate = '';
    this.editSprintCurrentMergeDate = '';
    this.editSprintReleaseDate = '';
  }

  setEditProject(): void {
    // Save the selected target version and sprint dates for the project
    if (!this.selectedProject?.Project_Name || !this.selectedEditTargetVersion) {
      // Optionally show an error
      return;
    }
    const payload = {
      projectName: this.selectedProject.Project_Name,
      targetVersion: this.selectedEditTargetVersion,
      sprintStartDate: this.editSprintStartDate || null,
      sprintOriginalMergeDate: this.editSprintOriginalMergeDate || null,
      sprintCurrentMergeDate: this.editSprintCurrentMergeDate || null,
      sprintReleaseDate: this.editSprintReleaseDate || null
    };
    this.http.post(`${this.apiBaseUrl}/api/GanttProjects/set-dates`, payload).subscribe({
      next: () => {
        // Optionally show a success message
        // Update the local project data if needed
        if (this.selectedProject) {
          this.selectedProject.Target_Version = this.selectedEditTargetVersion;
          this.selectedProject.Sprint_Start_Date = this.editSprintStartDate;
          this.selectedProject.Sprint_Original_Merge_Date = this.editSprintOriginalMergeDate;
          this.selectedProject.Sprint_Current_Merge_Date = this.editSprintCurrentMergeDate;
          this.selectedProject.Sprint_Release_Date = this.editSprintReleaseDate;
        }
        this.closeEditProjectModal();
      },
      error: () => {
        // Optionally show an error message
      }
    });
  }

  // Tabs: first is always 'Projects', others are per-project
  tabs: Array<{ label: string, type: 'projects' | 'workload' | 'project' | 'metrics' | 'gantt', project?: any }> = [
    { label: 'Projects', type: 'projects' },
    { label: 'Workload', type: 'workload' }
  ];
  activeTabIndex = 0;

  // Projects grid
  projects: any[] = [];
  loading = false;
  error = '';

  apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url;

  // Per-project state
  projectSummary: { [key: string]: any[] } = {}; // bug summary per project
  projectSummaryLoading: { [key: string]: boolean } = {};
  projectSummaryError: { [key: string]: string } = {};
  bugSummaryDisplayOrder = [
    'bug_id',
    // 'target_version',
    'Status',
    'Type',
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

  bugSummaryDisplayNames: { [key: string]: string } = {
    bug_id: 'Bug ID',
    Status: 'Status',
    Type:'Type',
    Summary: 'Summary',
    Estimates_Hours: 'Estimated Hours',
    Actual_Hours: 'Actual Hours',
    Analysis_hours: 'Analysis',
    Design_hours: 'Design',
    Coding_hours: 'Coding',
    Testing_hours: 'Testing',
    Demo_Review_hours: 'Demo/Review',
    Release_hours: 'Release',
    Documentation_hours: 'Documentation',
    Training_hours: 'Training'
  };

  // Per-project sub-tab bar state
  projectSubTabs: {
    [key: string]: {
      tabs: Array<{ label: string, type: 'metrics' | 'gantt' | 'bug-details', bugId?: number }>,
      active: number
    }
  } = {};
  // Store bug details state per project sub-tab
  bugDetailsState: {
    [key: string]: {
      [bugId: number]: {
        bugId: number;
        version: string;
        loading: boolean;
        error: string;
        bugTaskDetails: any[];
        timeTracking: any[];
      }
    }
  } = {};
  // Ensure sub-tab bar exists for a project
  ensureProjectSubTabs(project: any) {
    const key = `${project.Project_Name}__${project.Target_Version}`;
    if (!this.projectSubTabs[key]) {
      this.projectSubTabs[key] = {
        tabs: [
          { label: 'Overall Metrics', type: 'metrics' },
          { label: 'Gantt Chart', type: 'gantt' }
        ],
        active: 0
      };
    }
    if (!this.bugDetailsState[key]) {
      this.bugDetailsState[key] = {};
    }
  }

  // Open metrics sub-tab for a project
  openMetricsSubTab(project: any): void {
    const key = `${project.Project_Name}__${project.Target_Version}`;
    this.ensureProjectSubTabs(project);
    const idx = this.projectSubTabs[key].tabs.findIndex(t => t.type === 'metrics');
    this.projectSubTabs[key].active = idx;
    this.loadProjectSummary(project);
  }

  // Open gantt sub-tab for a project
  openGanttSubTab(project: any): void {
    const key = `${project.Project_Name}__${project.Target_Version}`;
    this.ensureProjectSubTabs(project);
    const idx = this.projectSubTabs[key].tabs.findIndex(t => t.type === 'gantt');
    this.projectSubTabs[key].active = idx;
  }

  // Open bug-details sub-tab for a project and bug
  openBugDetailsSubTab(project: any, bugId: number): void {
    const key = `${project.Project_Name}__${project.Target_Version}`;
    this.ensureProjectSubTabs(project);
    // Check if tab already exists
    let idx = this.projectSubTabs[key].tabs.findIndex(t => t.type === 'bug-details' && t.bugId === bugId);
    if (idx === -1) {
      this.projectSubTabs[key].tabs.push({ label: `Bug #${bugId}`, type: 'bug-details', bugId });
      idx = this.projectSubTabs[key].tabs.length - 1;
    }
    this.projectSubTabs[key].active = idx;
    // Load bug details if not already loaded
    if (!this.bugDetailsState[key][bugId]) {
      this.bugDetailsState[key][bugId] = {
        bugId,
        version: project.Target_Version,
        loading: true,
        error: '',
        bugTaskDetails: [],
        timeTracking: []
      };
      this.http.get<any>(`${this.apiBaseUrl}/api/Bug/GetAllBugDataRaw?bguid=${bugId}&btversion=${project.Target_Version}`)
        .subscribe({
          next: (data) => {
            this.bugDetailsState[key][bugId].bugTaskDetails = data.bugTaskDetails || [];
            this.bugDetailsState[key][bugId].timeTracking = data.timeTracking || [];
            this.bugDetailsState[key][bugId].loading = false;
          },
          error: (err) => {
            this.bugDetailsState[key][bugId].error = 'Failed to load bug details';
            this.bugDetailsState[key][bugId].loading = false;
          }
        });
    }
  }

  // Switch sub-tab for a project
  switchProjectSubTab(project: any, idx: number): void {
    const key = `${project.Project_Name}__${project.Target_Version}`;
    this.ensureProjectSubTabs(project);
    this.projectSubTabs[key].active = idx;
    const tab = this.projectSubTabs[key].tabs[idx];
    if (tab.type === 'metrics') this.loadProjectSummary(project);
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.loading = true;
    this.http.get<any[]>(`${this.apiBaseUrl}/api/ganttprojects`).subscribe({
      next: (data) => {
        // Sort projects by latest Sprint_Current_Merge_Date (descending)
        this.projects = (data || []).sort((a, b) => {
          const dateA = new Date(a.Sprint_Current_Merge_Date || 0).getTime();
          const dateB = new Date(b.Sprint_Current_Merge_Date || 0).getTime();
          return dateB - dateA;
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.error || 'Failed to load project data.';
        this.loading = false;
      }
    });
  }

  // Double-click project row: open project tab
  openProjectTab(project: any): void {
    const idx = this.tabs.findIndex(t => t.type === 'project' && t.project?.Project_Name === project.Project_Name && t.project?.Target_Version === project.Target_Version);
    if (idx === -1) {
      this.tabs.push({ label: project.Project_Name, type: 'project', project });
      this.activeTabIndex = this.tabs.length - 1;
    } else {
      this.activeTabIndex = idx;
    }
    this.ensureProjectSubTabs(project);
    this.openMetricsSubTab(project); 
  }

  // Close a bug-details sub-tab for a project
  closeBugDetailsSubTab(project: any, bugId: number): void {
    const key = `${project.Project_Name}__${project.Target_Version}`;
    const subTabs = this.projectSubTabs[key];
    if (!subTabs) return;
    const idx = subTabs.tabs.findIndex(t => t.type === 'bug-details' && t.bugId === bugId);
    if (idx !== -1) {
      subTabs.tabs.splice(idx, 1);
      // If the closed tab was active, switch to metrics or previous tab
      if (subTabs.active === idx) {
        const metricsIdx = subTabs.tabs.findIndex(t => t.type === 'metrics');
        subTabs.active = metricsIdx !== -1 ? metricsIdx : 0;
      } else if (subTabs.active > idx) {
        subTabs.active--;
      }
    }
    // Optionally, remove bug details state
    if (this.bugDetailsState[key] && this.bugDetailsState[key][bugId]) {
      delete this.bugDetailsState[key][bugId];
    }
  }

  // Close tab
  closeTab(index: number) {
    if (index === 0) return; // Don't close main tab
    this.tabs.splice(index, 1);
    if (this.activeTabIndex >= index) {
      this.activeTabIndex = Math.max(0, this.activeTabIndex - 1);
    }
  }

  // Load bug summary for a project
  loadProjectSummary(project: any): void {
    const key = `${project.Project_Name}__${project.Target_Version}`;
    this.projectSummaryLoading[key] = true;
    this.projectSummaryError[key] = '';
    this.http.get<any[]>(`${this.apiBaseUrl}/api/GanttProjects/bug-time-summary`, {
      params: {
        project_name: project.Project_Name,
        btversion: project.Target_Version
      }
    }).subscribe({
      next: (data) => {
        this.projectSummary[key] = data || [];
        this.projectSummaryLoading[key] = false;

        // Extract dynamic Type and Status options for this project
        this.extractFiltersFromSummary(key);
        // Ensure selection arrays exist
        this.selectedTypeIdsMap[key] = this.selectedTypeIdsMap[key] || [];
        this.selectedStatusIdsMap[key] = this.selectedStatusIdsMap[key] || [];
      },
      error: (err) => {
        this.projectSummaryError[key] = 'Failed to load bug summary.';
        this.projectSummaryLoading[key] = false;
        this.projectSummary[key] = [];
        this.typesMap[key] = [];
        this.statusesMap[key] = [];
      }
    });
  }

  // === NEW: search text used to filter by bug_id (applies to both per-project metrics and top-level metrics tab) ===
  bugSearchText: string = '';

  // === NEW: dynamic type/status options per project and selections per project ===
  typesMap: { [key: string]: Array<{ id: string, text: string }> } = {};
  statusesMap: { [key: string]: Array<{ id: string, text: string }> } = {};

  // Selections per project keyed by project key
  selectedTypeIdsMap: { [key: string]: string[] } = {};
  selectedStatusIdsMap: { [key: string]: string[] } = {};

  // Dropdown open state (only one open at a time typically)
  typeDropdownOpen = false;
  statusDropdownOpen = false;

  // Host listener to close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.multi-select-dropdown');
    if (!dropdown) {
      this.typeDropdownOpen = false;
      this.statusDropdownOpen = false;
    }
  }

  // Extract unique types/statuses from summary for a project key
  private extractFiltersFromSummary(key: string) {
    const summary = this.projectSummary[key] || [];
    const typeSet = new Set<string>();
    const statusSet = new Set<string>();

    summary.forEach(item => {
      // support possible field names: 'Type' or 'type'
      const t = (item?.Type ?? item?.type ?? '') as string;
      const s = (item?.Status ?? item?.status ?? '') as string;
      if (t) typeSet.add(String(t));
      if (s) statusSet.add(String(s));
    });

    this.typesMap[key] = Array.from(typeSet).map(t => ({ id: t, text: t }));
    this.statusesMap[key] = Array.from(statusSet).map(s => ({ id: s, text: s }));
  }

  // Return the (possibly filtered) summary array for a given project
  getSummaryForProject(project: any): any[] {
    if (!project) return [];
    const key = `${project.Project_Name}__${project.Target_Version}`;
    const summary = (this.projectSummary && this.projectSummary[key]) ? this.projectSummary[key] : [];
    let filtered = summary;

    // Filter by Bug ID search if present
    if (this.bugSearchText && this.bugSearchText.trim() !== '') {
      const q = this.bugSearchText.trim().toLowerCase();
      filtered = filtered.filter(item => {
        const id = (item?.bug_id !== undefined && item?.bug_id !== null) ? String(item.bug_id).toLowerCase() : '';
        return id.includes(q);
      });
    }

    // Filter by selected Types if any
    const selectedTypes = this.selectedTypeIdsMap[key] || [];
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(item => {
        const t = (item?.Type ?? item?.type ?? '') as string;
        return selectedTypes.includes(String(t));
      });
    }

    // Filter by selected Statuses if any
    const selectedStatuses = this.selectedStatusIdsMap[key] || [];
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(item => {
        const s = (item?.Status ?? item?.status ?? '') as string;
        return selectedStatuses.includes(String(s));
      });
    }

    return filtered;
  }

  // For the top-level metrics tab: get summary for the active tab's project
  getSummaryForActiveProject(): any[] {
    const project = this.tabs[this.activeTabIndex]?.project;
    if (!project) return [];
    return this.getSummaryForProject(project);
  }

  // Helpers for summary table - totals now computed over filtered data
  getTotalForColumn(project: any, key: string): string {
    const summary = this.getSummaryForProject(project);
    const total = (summary || []).reduce((sum, item) => {
      const value = parseFloat(item?.[key]);
      return !isNaN(value) ? sum + value : sum;
    }, 0);
    return total.toFixed(2);
  }

  getTotalSpentHours(timeTracking: any[]): number {
    return (timeTracking || []).reduce((sum, t) => sum + (+t.total_spent || 0), 0);
  }

  // --------- Methods for Type multi-select UI (per active project) ----------
  toggleTypeDropdown() {
    this.typeDropdownOpen = !this.typeDropdownOpen;
    // close other
    if (this.typeDropdownOpen) this.statusDropdownOpen = false;
  }

  onTypeToggle(typeId: string, projectKey: string) {
    this.selectedTypeIdsMap[projectKey] = this.selectedTypeIdsMap[projectKey] || [];
    const current = [...this.selectedTypeIdsMap[projectKey]];
    if (current.includes(typeId)) {
      this.selectedTypeIdsMap[projectKey] = current.filter(id => id !== typeId);
    } else {
      this.selectedTypeIdsMap[projectKey] = [...current, typeId];
    }
  }

  isTypeSelected(typeId: string, projectKey: string): boolean {
    return (this.selectedTypeIdsMap[projectKey] || []).includes(typeId);
  }

  clearAllTypeFilters(projectKey: string) {
    this.selectedTypeIdsMap[projectKey] = [];
  }

  selectAllTypes(projectKey: string) {
    this.selectedTypeIdsMap[projectKey] = (this.typesMap[projectKey] || []).map(t => t.id);
  }

  getSelectedTypeText(projectKey: string): string {
    const sel = this.selectedTypeIdsMap[projectKey] || [];
    if (sel.length === 0) return 'All Types';
    if (sel.length === 1) {
      const t = (this.typesMap[projectKey] || []).find(x => x.id === sel[0]);
      return t ? t.text : 'Selected';
    }
    return `${sel.length} Selected`;
  }

  // --------- Methods for Status multi-select UI (per active project) ----------
  toggleStatusDropdown() {
    this.statusDropdownOpen = !this.statusDropdownOpen;
    // close other
    if (this.statusDropdownOpen) this.typeDropdownOpen = false;
  }

  onStatusToggle(statusId: string, projectKey: string) {
    this.selectedStatusIdsMap[projectKey] = this.selectedStatusIdsMap[projectKey] || [];
    const current = [...this.selectedStatusIdsMap[projectKey]];
    if (current.includes(statusId)) {
      this.selectedStatusIdsMap[projectKey] = current.filter(id => id !== statusId);
    } else {
      this.selectedStatusIdsMap[projectKey] = [...current, statusId];
    }
  }

  isStatusSelected(statusId: string, projectKey: string): boolean {
    return (this.selectedStatusIdsMap[projectKey] || []).includes(statusId);
  }

  clearAllStatusFilters(projectKey: string) {
    this.selectedStatusIdsMap[projectKey] = [];
  }

  selectAllStatuses(projectKey: string) {
    this.selectedStatusIdsMap[projectKey] = (this.statusesMap[projectKey] || []).map(s => s.id);
  }

  getSelectedStatusText(projectKey: string): string {
    const sel = this.selectedStatusIdsMap[projectKey] || [];
    if (sel.length === 0) return 'All Statuses';
    if (sel.length === 1) {
      const s = (this.statusesMap[projectKey] || []).find(x => x.id === sel[0]);
      return s ? s.text : 'Selected';
    }
    return `${sel.length} Selected`;
  }

}
