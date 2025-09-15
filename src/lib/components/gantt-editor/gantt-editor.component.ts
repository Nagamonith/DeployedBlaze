
import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DxGanttModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { NotFoundAlertDialogComponent } from '../../../app/shared/dialogs/not-found-alert-dialog/not-found-alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Input, OnInit } from '@angular/core';
import { ErrorAlertDialogComponent } from '../../../app/shared/dialogs/error-alert-dialog/error-alert-dialog.component';
import { SuccessAlertDialogComponent } from '../../../app/shared/dialogs/success-alert-dialog/success-alert-dialog.component';
import { LeftnavIcon } from '../../../app/leftnavbartree/leftnavigationbar/leftnavigationbar-icon.enum';


@Component({
  selector: 'app-gantt-editor',
  standalone: true,
  templateUrl: './gantt-editor.component.html',
  styleUrls: ['./gantt-editor.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DxGanttModule]
})

// export class GanttEditorComponent {
export class GanttEditorComponent implements OnInit {
  @Input() projectNameFromParent?: string;
  @Input() targetVersionFromParent?: string;

  ganttForm: FormGroup;
  ganttChartVisible = false;
  ganttChartLoading = false;
  ganttChartData: any[] = [];
  skippedTasks: any[] = [];
  ganttDependencies: any[] = [];
  ganttResources: any[] = [];
  ganttAssignments: any[] = [];
  selectedResourceId: number | null = null;
  selectedResourceIds: number[] = []; // For multi-select resource filter
  selectedTypeId: string | null = null;
  selectedTypeIds: string[] = []; // For multi-select type filter
  selectedStatusId: string | null = null;
  selectedStatusIds: string[] = []; // For multi-select status filter
  filteredTasks: any[] = [];
  validChartTasks: any[] = [];
  apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url;
  ganttTypes: any[] = [];
  ganttStatuses: any[] = [];
  statusDropdownOpen: boolean = false;
  resourceDropdownOpen: boolean = false;
  typeDropdownOpen: boolean = false;
  private isProcessingStatusChange: boolean = false; // Flag to prevent multiple rapid calls
  private isProcessingResourceChange: boolean = false; // Flag to prevent multiple rapid calls
  private isProcessingTypeChange: boolean = false; // Flag to prevent multiple rapid calls
  showTaskModal = false;
  selectedTask: any = null;
  ganttChartReady: boolean | undefined;
  showGrid: boolean = true;
  targetVersions: string[] = []; 
  sprintStartDate: string = '';
  sprintOriginalMergeDate: string = '';
  sprintCurrentMergeDate: string = '';
  public icons = LeftnavIcon;

  projectNames = [
    'Select Project Name','Web DSM', 'Test Automation', 'Security', 'Sales&Marketing', 'Qualis Wizard',
    'Qualis Saas', 'Qualis Gage', 'Qualis FMEA', 'Qualis APQP', 'Qualis 4.0 SPC',
    'OEE', 'Licensing Integration', 'IT Support', 'DSM', 'DIS', 'DataLyzer Reporting',
    'DataLyzer Mould Application', 'Datalyzer License Management', 'DataLyzer FMEA',
    'DataLyzer Console', 'DataLyzer COA', 'Datalyzer Cloud', 'Archive Qualis Admin',
    'AI_MLOPS'
  ];
task: any;
  //  ngOnInit() {
  //   if (this.projectNameFromParent && this.targetVersionFromParent) {
  //     this.ganttForm.patchValue({
  //       projectName: this.projectNameFromParent,
  //       targetVersion: this.targetVersionFromParent
  //     });
  //         this.fetchTargetVersions(this.projectNameFromParent);

  //     this.showGanttChart(); // auto-load chart
  //   }
  // );}
    ngOnInit() {
    if (this.projectNameFromParent && this.targetVersionFromParent) {
      this.ganttForm.patchValue({
        projectName: this.projectNameFromParent,
        targetVersion: this.targetVersionFromParent
      });
          this.fetchTargetVersions(this.projectNameFromParent);
this.loadSprintDates(); // Load sprint dates if project name is provided
      this.showGanttChart(); // auto-load chart
    }
    this.ganttForm.get('projectName')?.valueChanges.subscribe((selectedProject: string) => {
    this.fetchTargetVersions(selectedProject);
    this.ganttForm.patchValue({ targetVersion: '' }); // reset target version
  });
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.ganttForm = this.fb.group({
      projectName: [this.projectNames[0], Validators.required],
      targetVersion: ['']
    });
  }

  showGanttChart() {
    const projectName = this.ganttForm.value.projectName;
    const targetVersion = this.ganttForm.value.targetVersion;

    // if (!projectName || !targetVersion) {
    //   alert('Project Name and Target Version are required!');
    //   return;
    // }

    if (!projectName || !targetVersion) {
       this.dialog.open(NotFoundAlertDialogComponent, {
  width: '400px',
  data: {
    message: 'Project Name and Target Version are required!'
  }});
      return;
    }

    this.ganttChartLoading = true;
    this.ganttChartVisible = true;
    this.ganttChartData = [];
    this.skippedTasks = [];
    this.ganttDependencies = [];
    this.ganttResources = [];
    this.ganttAssignments = [];
    this.ganttTypes = [];
    this.ganttStatuses = [];
    this.ganttChartReady = false;

    const params: any = { projectName, targetVersion };

    this.http.get<any>(`${this.apiBaseUrl}/api/gantt/chart`, { params }).subscribe({
      next: (data) => {
        const seenIds = new Set<string>();
        this.ganttChartData = (data.tasks || []).filter((task: any) => {
          const idStr = String(task.id);
          if (seenIds.has(idStr)) return false;
          seenIds.add(idStr);
          return true;
        });

        this.ganttResources = data.resources || [];
        this.ganttAssignments = data.assignments || [];
        this.ganttDependencies = data.dependencies || [];
        this.skippedTasks = (data.tasks || []).filter((t: any) => !t.start || !t.end);

        // Extract unique types for type filter dropdown
        const typeSet = new Set(this.ganttChartData.map(t => t.type).filter(Boolean));
        this.ganttTypes = Array.from(typeSet).map(t => ({ id: t, text: t }));

        // Extract unique statuses for status filter dropdown
        const statusSet = new Set(this.ganttChartData.map(t => t.status).filter(Boolean));
        this.ganttStatuses = Array.from(statusSet).map(s => ({ id: s, text: s }));

        this.applyCombinedFilter();
        this.cdr.markForCheck();

        this.validChartTasks = this.filteredTasks.filter(t => !!t.start && !!t.end);

        if (this.validChartTasks.length === 0) {
          this.ganttChartReady = false;
          this.ganttChartLoading = false;
        //   alert('Please fill in all required fields (start and end dates) for at least one task.');
        //   return;
        // }
        // this.dialog.open(NotFoundAlertDialogComponent, 
        //   {
        //   width: '400px',
        //   data: {
        //     message: 'No matches found'
        //   }
        // });
          return; 
        }

        setTimeout(() => {
          this.ganttChartReady = true;
          this.ganttChartLoading = false;
          this.cdr.markForCheck();
        }, 0);
      },
      error: () => {
        // alert('Error loading Gantt data');
        this.dialog.open(ErrorAlertDialogComponent, {
          width: '480px',
          data: { message: 'Error loading Gantt data' }
        });
        this.ganttChartLoading = false;
      }
    });
    this.http.post(`${this.apiBaseUrl}/api/gantt/sync-from-mysql`, {}).subscribe({
          next: () => {
            console.log('Gantt sync completed.');
            // Optionally notify user or silently ignore
          },
          error: (err) => {
            console.error('Gantt sync failed:', err);
            // Optionally handle or silently ignore
          }
        });
  }

  applyCombinedFilter() {
    this.filteredTasks = this.ganttChartData.filter(task => {
      const matchesResource = this.selectedResourceIds.length === 0 ||
        this.ganttAssignments.some(a => a.taskId === task.id && this.selectedResourceIds.includes(a.resourceId));
      const matchesType = this.selectedTypeIds.length === 0 || 
        this.selectedTypeIds.includes(task.type);
      const matchesStatus = this.selectedStatusIds.length === 0 || 
        this.selectedStatusIds.includes(task.status);
      return matchesResource && matchesType && matchesStatus;
    });
  }

  onResourceFilterChange() {
    this.applyCombinedFilter();
  }

  onTypeFilterChange() {
    this.applyCombinedFilter();
  }

  // Resource multi-select methods
  onResourceToggle(resourceId: number) {
    if (this.isProcessingResourceChange) {
      return;
    }

    this.isProcessingResourceChange = true;
    
    const currentSelection = [...this.selectedResourceIds];
    
    if (currentSelection.includes(resourceId)) {
      this.selectedResourceIds = currentSelection.filter(id => id !== resourceId);
    } else {
      this.selectedResourceIds = [...currentSelection, resourceId];
    }
    
    this.applyCombinedFilter();
    
    setTimeout(() => {
      this.isProcessingResourceChange = false;
    }, 100);
  }

  isResourceSelected(resourceId: number): boolean {
    return this.selectedResourceIds.includes(resourceId);
  }

  clearAllResourceFilters() {
    if (this.isProcessingResourceChange) {
      return;
    }
    
    this.isProcessingResourceChange = true;
    this.selectedResourceIds = [];
    this.applyCombinedFilter();
    
    setTimeout(() => {
      this.isProcessingResourceChange = false;
    }, 100);
  }

  selectAllResources() {
    if (this.isProcessingResourceChange) {
      return;
    }
    
    this.isProcessingResourceChange = true;
    this.selectedResourceIds = [...this.ganttResources.map(resource => resource.id)];
    this.applyCombinedFilter();
    
    setTimeout(() => {
      this.isProcessingResourceChange = false;
    }, 100);
  }

  getSelectedResourceText(): string {
    if (this.selectedResourceIds.length === 0) {
      return 'All Resources';
    } else if (this.selectedResourceIds.length === 1) {
      const resource = this.ganttResources.find(r => r.id === this.selectedResourceIds[0]);
      return resource ? resource.text : 'Selected';
    } else {
      return `${this.selectedResourceIds.length} Selected`;
    }
  }

  toggleResourceDropdown() {
    this.resourceDropdownOpen = !this.resourceDropdownOpen;
  }

  // Type multi-select methods
  onTypeToggle(typeId: string) {
    if (this.isProcessingTypeChange) {
      return;
    }

    this.isProcessingTypeChange = true;
    
    const currentSelection = [...this.selectedTypeIds];
    
    if (currentSelection.includes(typeId)) {
      this.selectedTypeIds = currentSelection.filter(id => id !== typeId);
    } else {
      this.selectedTypeIds = [...currentSelection, typeId];
    }
    
    this.applyCombinedFilter();
    
    setTimeout(() => {
      this.isProcessingTypeChange = false;
    }, 100);
  }

  isTypeSelected(typeId: string): boolean {
    return this.selectedTypeIds.includes(typeId);
  }

  clearAllTypeFilters() {
    if (this.isProcessingTypeChange) {
      return;
    }
    
    this.isProcessingTypeChange = true;
    this.selectedTypeIds = [];
    this.applyCombinedFilter();
    
    setTimeout(() => {
      this.isProcessingTypeChange = false;
    }, 100);
  }

  selectAllTypes() {
    if (this.isProcessingTypeChange) {
      return;
    }
    
    this.isProcessingTypeChange = true;
    this.selectedTypeIds = [...this.ganttTypes.map(type => type.id)];
    this.applyCombinedFilter();
    
    setTimeout(() => {
      this.isProcessingTypeChange = false;
    }, 100);
  }

  getSelectedTypeText(): string {
    if (this.selectedTypeIds.length === 0) {
      return 'All Types';
    } else if (this.selectedTypeIds.length === 1) {
      const type = this.ganttTypes.find(t => t.id === this.selectedTypeIds[0]);
      return type ? type.text : 'Selected';
    } else {
      return `${this.selectedTypeIds.length} Selected`;
    }
  }

  toggleTypeDropdown() {
    this.typeDropdownOpen = !this.typeDropdownOpen;
  }

  onStatusFilterChange() {
    this.applyCombinedFilter();
  }

  // Multi-select status filter methods
  onStatusCheckboxChange(statusId: string, isChecked: boolean) {
    if (isChecked) {
      if (!this.selectedStatusIds.includes(statusId)) {
        this.selectedStatusIds.push(statusId);
      }
    } else {
      this.selectedStatusIds = this.selectedStatusIds.filter(id => id !== statusId);
    }
    this.applyCombinedFilter();
  }

  onStatusToggle(statusId: string) {
    if (this.isProcessingStatusChange) {
      return;
    }

    this.isProcessingStatusChange = true;
    
    // Ensure we're working with a copy of the array to avoid reference issues
    const currentSelection = [...this.selectedStatusIds];
    
    if (currentSelection.includes(statusId)) {
      this.selectedStatusIds = currentSelection.filter(id => id !== statusId);
    } else {
      this.selectedStatusIds = [...currentSelection, statusId];
    }
    
    this.applyCombinedFilter();
    
    // Reset the flag after a short delay
    setTimeout(() => {
      this.isProcessingStatusChange = false;
    }, 100);
  }

  isStatusSelected(statusId: string): boolean {
    return this.selectedStatusIds.includes(statusId);
  }

  clearAllStatusFilters() {
    if (this.isProcessingStatusChange) {
      return;
    }
    
    this.isProcessingStatusChange = true;
    this.selectedStatusIds = [];
    this.applyCombinedFilter();
    
    setTimeout(() => {
      this.isProcessingStatusChange = false;
    }, 100);
  }

  selectAllStatuses() {
    if (this.isProcessingStatusChange) {
      return;
    }
    
    this.isProcessingStatusChange = true;
    // Create a fresh array to avoid reference issues
    this.selectedStatusIds = [...this.ganttStatuses.map(status => status.id)];
    this.applyCombinedFilter();
    
    setTimeout(() => {
      this.isProcessingStatusChange = false;
    }, 100);
  }

  getSelectedStatusText(): string {
    if (this.selectedStatusIds.length === 0) {
      return 'All Statuses';
    } else if (this.selectedStatusIds.length === 1) {
      const status = this.ganttStatuses.find(s => s.id === this.selectedStatusIds[0]);
      return status ? status.text : 'Selected';
    } else {
      return `${this.selectedStatusIds.length} Selected`;
    }
  }

  toggleStatusDropdown() {
    this.statusDropdownOpen = !this.statusDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.multi-select-dropdown');
    if (!dropdown) {
      if (this.statusDropdownOpen) {
        this.statusDropdownOpen = false;
      }
      if (this.resourceDropdownOpen) {
        this.resourceDropdownOpen = false;
      }
      if (this.typeDropdownOpen) {
        this.typeDropdownOpen = false;
      }
    }
  }



  getResourceName(taskId: number): string {
    const assignment = this.ganttAssignments.find(a => a.taskId === taskId);
    const resource = assignment ? this.ganttResources.find(r => r.id === assignment.resourceId) : null;
    return resource ? resource.text : '-';
  }

  getOriginalMergeDate(taskId: number): string {
    const task = this.ganttChartData.find(t => t.id === taskId);
    return task ? task.originalEnd || '-' : '-';
  }

  onRowDblClick(task: any) {
    this.selectedTask = { ...task };
    const dep = this.ganttDependencies.find(dep => dep.successorId === task.id);
    this.selectedTask.dependency = dep ? dep.predecessorId : null;
    this.showTaskModal = true;
  }

  closeTaskModal() {
    this.showTaskModal = false;
    this.selectedTask = null;
  }

  saveTask(task: any) {
    const assignment = this.ganttAssignments.find(a => a.taskId === task.id);
    const resource = assignment ? this.ganttResources.find(r => r.id === assignment.resourceId) : null;
    const resource_Name = resource ? resource.text : null;
  //   const payload = { ...task, resource_Name,tester_Release_Date: task.tester_Release_Date,
  // due_Date: task.due_Date };
  const payload = {
    id: task.id,
  start: task.start,
  end: task.end,
  originalEnd: task.originalEnd,
  progress: task.progress,
  resource_Name,
  tester_Release_Date: task.testerReleaseDate,
  due_Date: task.dueDate
    }

    this.http.post(`${this.apiBaseUrl}/api/gantt/save-task`, payload).subscribe({
      next: () => {
        // alert('Task saved!');
        this.dialog.open(SuccessAlertDialogComponent, {
          width: '400px',
          data: { message: 'Task saved successfully!' }
        });
        this.showGanttChart(); // Reload data
      },
      error: () => {
        this.dialog.open(ErrorAlertDialogComponent, {
          width: '480px',
          data: { message: 'Error saving task' }
        });
      }
    });

  }

  toggleView() {
    this.showGrid = !this.showGrid;
  }
  goToPreviousPage() {
    window.history.back();
  }


fetchTargetVersions(projectName: string) {
  this.http.get<string[]>(`${this.apiBaseUrl}/api/GanttProjects/target-versions/${encodeURIComponent(projectName)}`)
    .subscribe({
      next: (versions) => {
        this.targetVersions = versions || [];
      },
      error: () => {
        // alert('Failed to fetch target versions');
        this.dialog.open(ErrorAlertDialogComponent, {
          width: '480px',
          data: { message: 'Failed to fetch target versions' }
        });
        this.targetVersions = [];
      }
    });
}
    onProjectChange(selectedProject: string) {
  this.fetchTargetVersions(selectedProject);
  this.ganttForm.patchValue({ targetVersion: '' }); 
  this.fetchSprintDates(selectedProject); 
  this.loadSprintDates(); 
    }
    

    setSprintDates() {
  const projectName = this.ganttForm.get('projectName')?.value;
  const targetVersion = this.ganttForm.get('targetVersion')?.value;

  // if (!projectName || !targetVersion) {
  //   alert('Project Name and Target Version are required!');
  //   return;
  // }

  if (!projectName || !targetVersion) {
      // alert('Project Name and Target Version are required!');
       this.dialog.open(NotFoundAlertDialogComponent, {
  width: '400px',
  data: {
    message: 'Project Name and Target Version are required!'
  }});

  
      return;
    }


  const sprintPayload = {
    projectName,
    targetVersion,
    sprintStartDate: this.sprintStartDate,
    sprintOriginalMergeDate: this.sprintOriginalMergeDate,
    sprintCurrentMergeDate: this.sprintCurrentMergeDate
  };

  this.http.post(`${this.apiBaseUrl}/api/GanttProjects/set-dates`, sprintPayload).subscribe({
    next: () => 
      // alert('Sprint dates saved successfully!'),
      this.dialog.open(SuccessAlertDialogComponent, {
        width: '400px',
        data: { message: 'Sprint dates saved successfully!' }
      }),
    error: () => 
      this.dialog.open(ErrorAlertDialogComponent, {
        width: '480px',
        data: { message: 'Failed to save sprint dates' }
      })
  });
}

fetchSprintDates(projectName: string) {
  this.http.get<any>(`${this.apiBaseUrl}/api/GanttProjects/sprint-dates/${encodeURIComponent(projectName)}`)
    .subscribe({
      next: (data) => {
        this.sprintStartDate = data.Sprint_Start_Date;
        this.sprintOriginalMergeDate = data.Sprint_Original_Merge_Date;
        this.sprintCurrentMergeDate = data.Sprint_Current_Merge_Date;
      },
      error: () => {
        this.sprintStartDate = '';
        this.sprintOriginalMergeDate = '';
        this.sprintCurrentMergeDate = '';
      }
    });
}
@Input() projectName: string = '';
@Input() version: string = '';

loadSprintDates(): void {
  if (!this.projectName) return;

  this.http.get<any>(`${this.apiBaseUrl}/api/sprint-dates?project=${this.projectName}`).subscribe(data => {
    this.sprintStartDate = data.Sprint_Start_Date;
    this.sprintOriginalMergeDate = data.Sprint_Original_Merge_Date;
    this.sprintCurrentMergeDate = data.Sprint_Current_Merge_Date;
  });
}
SyncMysql(){
          this.http.post(`${this.apiBaseUrl}/api/gantt/sync-from-mysql`, {}).subscribe({
          next: () => {
            console.log('Gantt sync completed.');
            // Optionally notify user or silently ignore
          },
          error: (err) => {
            console.error('Gantt sync failed:', err);
            // Optionally handle or silently ignore
          }
        });
}


}








// import { ChangeDetectorRef, Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { DxGanttModule } from 'devextreme-angular';
// import { FormsModule } from '@angular/forms';
// import { map } from 'rxjs/operators';
// import { NotFoundAlertDialogComponent } from '../../../app/shared/dialogs/not-found-alert-dialog/not-found-alert-dialog.component';
// import { MatDialog } from '@angular/material/dialog';

// @Component({
//   selector: 'app-gantt-editor',
//   standalone: true,
//   templateUrl: './gantt-editor.component.html',
//   styleUrls: ['./gantt-editor.component.css'],
//   imports: [CommonModule, ReactiveFormsModule, FormsModule, DxGanttModule]
// })
// export class GanttEditorComponent {
//   ganttForm: FormGroup;
//   ganttChartVisible = false;
//   ganttChartLoading = false;
//   ganttChartData: any[] = [];
//   skippedTasks: any[] = [];
//   ganttDependencies: any[] = [];
//   ganttResources: any[] = [];
//   ganttAssignments: any[] = [];
//   selectedResourceId: number | null = null;
//   selectedTypeId: string | null = null;
//   filteredTasks: any[] = [];
//   validChartTasks: any[] = [];
//   apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url;
//   ganttTypes: any[] = [];
//   showTaskModal = false;
//   selectedTask: any = null;
//   ganttChartReady: boolean | undefined;
//   showGrid: boolean = true;

//   projectNames = [
//     'Web DSM', 'Test Automation', 'Security', 'Sales&Marketing', 'Qualis Wizard',
//     'Qualis Saas', 'Qualis Gage', 'Qualis FMEA', 'Qualis APQP', 'Qualis 4.0 SPC',
//     'OEE', 'Licensing Integration', 'IT Support', 'DSM', 'DIS', 'DataLyzer Reporting',
//     'DataLyzer Mould Application', 'Datalyzer License Management', 'DataLyzer FMEA',
//     'DataLyzer Console', 'DataLyzer COA', 'Datalyzer Cloud', 'Archive Qualis Admin',
//     'AI_MLOPS'
//   ];

//   constructor(
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private cdr: ChangeDetectorRef,
//     private dialog: MatDialog
//   ) {
//     this.ganttForm = this.fb.group({
//       projectName: [this.projectNames[0], Validators.required],
//       targetVersion: ['']
//     });
//   }

//   showGanttChart() {
//     const projectName = this.ganttForm.value.projectName;
//     const targetVersion = this.ganttForm.value.targetVersion;

//     if (!projectName || !targetVersion) {
//       // alert('Project Name and Target Version are required!');
//        this.dialog.open(NotFoundAlertDialogComponent, {
//   width: '400px',
//   data: {
//     message: 'Project Name and Target Version are required!'
//   }});

  
//       return;
//     }

//     this.ganttChartLoading = true;
//     this.ganttChartVisible = true;
//     this.ganttChartData = [];
//     this.skippedTasks = [];
//     this.ganttDependencies = [];
//     this.ganttResources = [];
//     this.ganttAssignments = [];
//     this.ganttTypes = [];
//     this.ganttChartReady = false;

//     const params: any = { projectName, targetVersion };

//     this.http.get<any>(`${this.apiBaseUrl}/api/gantt/chart`, { params })
//       .pipe(
//         map(data => {
//           const seenIds = new Set<string>();
//           const uniqueTasks = (data.tasks || []).filter((task: any) => {
//             const idStr = String(task.id);
//             if (seenIds.has(idStr)) return false;
//             seenIds.add(idStr);
//             return true;
//           });

//           return {
//             ...data,
//             tasks: uniqueTasks
//           };
//         })
//       )
//       .subscribe({
//         next: (data) => {
//           this.ganttChartData = data.tasks;
//           this.ganttResources = data.resources || [];
//           this.ganttAssignments = data.assignments || [];
//           this.ganttDependencies = data.dependencies || [];
//           this.skippedTasks = (data.tasks || []).filter((t: any) => !t.start || !t.end);

//           const typeSet = new Set(this.ganttChartData.map(t => t.type).filter(Boolean));
//           this.ganttTypes = Array.from(typeSet).map(t => ({ id: t, text: t }));

//           this.applyCombinedFilter();
//           // this.validChartTasks = this.filteredTasks.filter(t => !!t.start && !!t.end);

// //           if (this.validChartTasks.length === 0) {
// //             this.ganttChartReady = false;
// //             this.ganttChartLoading = false;
// //             // alert('Not found');
// //             this.dialog.open(NotFoundAlertDialogComponent, {
// //   width: '400px',
// //   data: {
// //     message: 'No matches found'
// //   }
// // });

// //             return;
// //           }
// if (this.validChartTasks.length === 0 && !this.selectedResourceId && !this.selectedTypeId) {
//   this.ganttChartReady = false;
//   this.ganttChartLoading = false;
//   this.dialog.open(NotFoundAlertDialogComponent, {
//     width: '400px',
//     data: {
//       message: 'No matches found'
//     }
//   });
//   return;
// }


//           setTimeout(() => {
//             this.ganttChartReady = true;
//             this.ganttChartLoading = false;
//             this.cdr.markForCheck();
//           }, 0);
//         },
//         error: () => {
//           // alert('Error loading Gantt data');
//           this.dialog.open(NotFoundAlertDialogComponent, {
//   width: '400px',
//   data: {
//     message: 'Error loading Gantt data. Please try again later.'
//   }
// });

//           this.ganttChartLoading = false;
//         }
//       });
//   }

//   applyCombinedFilter() {
//     this.filteredTasks = this.ganttChartData.filter(task => {
//       const matchesResource = !this.selectedResourceId ||
//         this.ganttAssignments.some(a => a.taskId === task.id && a.resourceId === this.selectedResourceId);
//       const matchesType = !this.selectedTypeId || task.type === this.selectedTypeId;
//       return matchesResource && matchesType;
//     });
//   }

//   onResourceFilterChange() {
//     this.applyCombinedFilter();
//   }

//   onTypeFilterChange() {
//     this.applyCombinedFilter();
//   }

//   getResourceName(taskId: number): string {
//     const assignment = this.ganttAssignments.find(a => a.taskId === taskId);
//     const resource = assignment ? this.ganttResources.find(r => r.id === assignment.resourceId) : null;
//     return resource ? resource.text : '-';
//   }

//   getOriginalMergeDate(taskId: number): string {
//     const task = this.ganttChartData.find(t => t.id === taskId);
//     return task ? task.originalEnd || '-' : '-';
//   }

//   onRowDblClick(task: any) {
//     this.selectedTask = { ...task };
//     const dep = this.ganttDependencies.find(dep => dep.successorId === task.id);
//     this.selectedTask.dependency = dep ? dep.predecessorId : null;
//     this.showTaskModal = true;
//   }

//   closeTaskModal() {
//     this.showTaskModal = false;
//     this.selectedTask = null;
//   }

//   saveTask(task: any) {
//     const assignment = this.ganttAssignments.find(a => a.taskId === task.id);
//     const resource = assignment ? this.ganttResources.find(r => r.id === assignment.resourceId) : null;
//     const resource_Name = resource ? resource.text : null;
//     // const payload = {
//     //   ...task,
//     //   resource_Name,
//     //   tester_Release_Date: task.tester_Release_Date,
//     //   due_Date: task.due_Date
//     // };
//     const payload = {
//     id: task.id,
//   start: task.start,
//   end: task.end,
//   progress: task.progress,
//   resource_Name,
//   tester_Release_Date: task.testerReleaseDate,
//   due_Date: task.dueDate
//     }

//     this.http.post(`${this.apiBaseUrl}/api/gantt/save-task`, payload).subscribe({
//       next: () => {
//         alert('Task saved!');
//         this.showGanttChart(); // Reload data
//       },
//       // error: () => alert('Error saving task')
//       error: () => {
//   this.dialog.open(NotFoundAlertDialogComponent, {
//     width: '400px',
//     data: {
//       type: 'error',
//       title: 'Error',
//       message: 'An error occurred while saving the task.'
//     }
//   });
// }

//     });
//   }

//   toggleView() {
//     this.showGrid = !this.showGrid;
//   }
//    goToPreviousPage() {
//     window.history.back();
//   }
// }
