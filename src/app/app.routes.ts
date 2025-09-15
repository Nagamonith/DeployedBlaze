import { Routes } from '@angular/router';
import { LoginComponent } from '../lib/components/login/login.component';import { AssetViewComponent } from '../lib/components/asset-view/asset-view.component';
import { AuthGuard } from './auth.guard';
import { LayoutsComponent } from './layouts/layouts.component';
import { PreDashboardComponent } from '../lib/components/pre-dashboard/pre-dashboard.component';
import { AssetDashboardComponent } from '../lib/components/asset-dashboard/asset-dashboard.component';
import { VendorDashboardComponent } from '../lib/components/vendor-dashboard/vendor-dashboard.component';   
import { EmployeeDashboardComponent } from '../lib/components/employee-dashboard/employee-dashboard.component';
import { BugComponent } from '../lib/components/bug/bug.component';
import { GanttEditorComponent } from '../lib/components/gantt-editor/gantt-editor.component';
import { AssetViewerComponent } from '../lib/components/asset-viewer/asset-viewer.component';
import { BugMetricsEditorComponent } from '../lib/components/bug-metrics-editor/bug-metrics-editor.component';
import { ProjectsDetailsComponent } from '../lib/components/projects-details/projects-details.component';
import { ProjectSummaryComponent } from '../lib/components/project-summary/project-summary.component';
import { BugTimeSummaryComponent } from '../lib/components/bug-time-summary/bug-time-summary.component';
import { BugDetailsComponent } from '../lib/components/bug-details/bug-details.component';
import { WorkloadManagementComponent } from '../lib/components/workload-management/workload-management.component';
import { ProductSelectionComponent } from '../testcase/product-selection/product-selection.component';
import { TesterDashboardComponent } from '../testcase/tester-dashboard/tester-dashboard.component';
import { AddTestcasesComponent } from '../testcase/add-testcases/add-testcases.component';
import { ModulesComponent } from '../testcase/modules/modules.component';
import { ResultsComponent } from '../testcase/results/results.component';
import { SummaryComponent } from '../testcase/summary/summary.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'asset-view/:assetTag', component: AssetViewComponent }, 
  { path: 'asset/:assetTag', component: AssetViewerComponent },

  { path:"assets", component :LayoutsComponent,canActivate: [AuthGuard],
    
    children: [

  { path: 'pre-dashboard', component: PreDashboardComponent, canActivate: [AuthGuard] },
   {path: 'asset-dashboard', component: AssetDashboardComponent, canActivate: [AuthGuard] },
    { path: 'vendor-dashboard', component: VendorDashboardComponent, canActivate: [AuthGuard] },
    { path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [AuthGuard] },
    { path: 'bug', component: BugComponent, canActivate: [AuthGuard] },
    { path: 'gantt-editor', component: GanttEditorComponent, canActivate: [AuthGuard] },
    { path: 'bug-metrics-editor', component: BugMetricsEditorComponent, canActivate: [AuthGuard] },
       { path: 'project-details', component: ProjectsDetailsComponent, canActivate: [AuthGuard] },
       { path: 'project-summary', component: ProjectSummaryComponent, canActivate: [AuthGuard] },
       { path: 'bug-time-summary', component: BugTimeSummaryComponent, canActivate: [AuthGuard] },
       { path: 'bug-details', component: BugDetailsComponent, canActivate: [AuthGuard] }

    ]
},

 { 
  path:"blaze", component :LayoutsComponent,canActivate: [AuthGuard],
    
    children: [

  { path: 'workload-dashboard', component: WorkloadManagementComponent, canActivate: [AuthGuard] }

]},
/* ───────── Tester Dashboard section ───────── */
  {
    path: '',
    component: LayoutsComponent,
    children: [
      { path: 'select-product', component: ProductSelectionComponent },
      {
        path: 'tester',
        component: TesterDashboardComponent,
        children: [
          { path: 'add-testcases', component: AddTestcasesComponent },
          {
            path: 'edit-testcases/:moduleId',
            loadComponent: () =>
              import('../testcase/edit-testcases/edit-testcases.component').then(
                m => m.EditTestcasesComponent
              ),
            runGuardsAndResolvers: 'always'
          },
          {
            path: 'import-excel',  // Changed from 'tester/import-excel' to just 'import-excel'
            loadComponent: () => 
              import('../testcase/import-excel/import-excel.component').then(
                m => m.ImportExcelComponent
              )
          },
          { 
            path: 'modules', 
            component: ModulesComponent,
            children: [
              { path: ':moduleId', component: ModulesComponent }
            ]
          },
          { path: 'results', component: ResultsComponent },
          { path: 'summary', component: SummaryComponent },
          {
            path: 'extra-adds',
            loadComponent: () =>
              import('../testcase/extra-adds/extra-adds.component').then(
                m => m.ExtraAddsComponent
              )
          },
          { path: '', redirectTo: 'add-testcases', pathMatch: 'full' },
          // Public route for viewing a test case by moduleId and testCaseId
          {
            path: 'public-view/:moduleId/:testCaseId',
            loadComponent: () =>
              import('../testcase/test-case-viewer/test-case-viewer.component')
                .then(m => m.TestCaseViewerComponent)
          },
          // Legacy route for backward compatibility (optional)
          {
            path: 'view-testcase/:testCaseId',
            loadComponent: () =>
              import('../testcase/test-case-viewer/test-case-viewer.component')
                .then(m => m.TestCaseViewerComponent)
          },
          {
            path: 'mapping/:sheetName',
            loadComponent: () => 
              import('../testcase/sheet-matching/sheet-matching.component')
                .then(m => m.SheetMatchingComponent)
          },
          {
            path: 'automation-result',
            loadComponent: () =>
              import('../testcase/automation-result/automation-result.component')
                .then(m => m.AutomationResultComponent)
          },
          { 
            path: 'test-suite', 
            loadComponent: () => 
              import('../testcase/test-suite/test-suite.component')
                .then(m => m.TestSuiteComponent) 
          },
          {
            path: 'test-runs',
            loadComponent: () =>
              import('../testcase/test-run/test-run.component')
                .then(m => m.TestRunComponent)
          }
        ]
      }
    ]
  }

];