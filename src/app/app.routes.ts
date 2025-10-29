import { Routes } from '@angular/router';
import { LoginComponent } from '../lib/components/login/login.component';
import { AssetViewComponent } from '../lib/components/asset-view/asset-view.component';
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
import { WorklogComponent } from '../lib/components/worklog/worklog.component';
import { OverallDashboardComponent } from '../lib/components/overall-dashboard/overall-dashboard.component';
import { UnauthorizedComponent } from '../lib/components/unauthorized/unauthorized-component.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'asset-view/:assetTag', component: AssetViewComponent }, 
  { path: 'asset/:assetTag', component: AssetViewerComponent },
  { path: 'worklog', component: WorklogComponent },

  {
    path:"assets", 
    component : LayoutsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'pre-dashboard', component: PreDashboardComponent, canActivate: [AuthGuard] },
      { path: 'asset-dashboard', component: AssetDashboardComponent, canActivate: [AuthGuard] },
      { path: 'vendor-dashboard', component: VendorDashboardComponent, canActivate: [AuthGuard] },
      { path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [AuthGuard] },
      { path: 'bug', component: BugComponent, canActivate: [AuthGuard] },
      { path: 'gantt-editor', component: GanttEditorComponent, canActivate: [AuthGuard] },
      { path: 'bug-metrics-editor', component: BugMetricsEditorComponent, canActivate: [AuthGuard] },
      { path: 'project-details', component: ProjectsDetailsComponent, canActivate: [AuthGuard] },
      { path: 'project-summary', component: ProjectSummaryComponent, canActivate: [AuthGuard] },
      { path: 'bug-time-summary', component: BugTimeSummaryComponent, canActivate: [AuthGuard] },
      { path: 'bug-details', component: BugDetailsComponent, canActivate: [AuthGuard] },
      { path: 'Dashboard', component: OverallDashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'Manager' } },
      { path: 'unauthorized', component: UnauthorizedComponent }

    ]
  },


  ///Tester 
{
  path: '',
  component: LayoutsComponent,
  children: [
    { path: 'select-product', component: ProductSelectionComponent, canActivate: [AuthGuard] },

    {
      path: 'tester',
      component: TesterDashboardComponent,
      canActivate: [AuthGuard],        // protect parent
      canActivateChild: [AuthGuard],   // protect children
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
          path: 'import-excel',
          loadComponent: () =>
            import('../testcase/import-excel/import-excel.component').then(
              m => m.ImportExcelComponent
            )
        },
        { 
          path: 'modules', 
          component: ModulesComponent,
          children: [{ path: ':moduleId', component: ModulesComponent }]
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
    },

    
  ]
},
/* 🌍 Public testcase viewer routes */
    {
      path: 'tester/public-view/:moduleId/:testCaseId',
      loadComponent: () =>
        import('../testcase/test-case-viewer/test-case-viewer.component')
          .then(m => m.TestCaseViewerComponent)
    },
    {
      path: 'tester/view-testcase/:testCaseId',
      loadComponent: () =>
        import('../testcase/test-case-viewer/test-case-viewer.component')
          .then(m => m.TestCaseViewerComponent)
    }


];
