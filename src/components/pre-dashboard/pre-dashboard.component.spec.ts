import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDashboardComponent } from './pre-dashboard.component';

describe('PreDashboardComponent', () => {
  let component: PreDashboardComponent;
  let fixture: ComponentFixture<PreDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


// <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
// <div class="pre-dashboard-container">

//   <div class="ribbon-nav">
//     <div class="ribbon-tabs">
//       <button class="ribbon-tab" [class.active]="activeTab==='add'" (click)="activeTab='add'">Add</button>
//       <button class="ribbon-tab" [class.active]="activeTab==='export'" (click)="activeTab='export'">Export</button>
//       <button class="ribbon-tab" [class.active]="activeTab==='goto'" (click)="activeTab='goto'">Goto</button>
//       <div class="ribbon-search">
//         <form class="search-inline-form" (submit)="searchEmployeeAssets(searchEmployeeId); $event.preventDefault();">
//           <div class="search-inline-group">
//             <input [(ngModel)]="searchEmployeeId" name="searchEmployeeId" class="form-control search-inline-input" placeholder="Emp ID" />
//             <button class="btn btn-outline-secondary search-inline-btn" type="submit" title="Search">
//               <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
//                 <circle cx="11" cy="11" r="7"/>
//                 <line x1="16.5" y1="16.5" x2="21" y2="21"/>
//               </svg>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     <div class="ribbon-toolbar ribbon-toolbar-icons">
//       <ng-container *ngIf="activeTab==='add'">
//         <div class="ribbon-action" (click)="openAddTypeModal()">
//           <i class="bi bi-folder-plus"></i>
//           <div class="ribbon-action-label">Add Asset Type</div>
//         </div>
//         <div class="ribbon-action" [class.disabled]="!selectedAssetType" (click)="selectedAssetType && openAddAssetModal()">
//           <i class="bi bi-plus-circle"></i>
//           <div class="ribbon-action-label">Add Asset</div>
//         </div>
//       </ng-container>
//       <ng-container *ngIf="activeTab==='export'">
//         <div class="ribbon-action" [class.disabled]="!selectedAssetType" (click)="selectedAssetType && exportReport()">
//           <i class="bi bi-file-earmark-arrow-up"></i>
//           <div class="ribbon-action-label">Export Report</div>
//         </div>
//         <div class="ribbon-action" (click)="exportOverallReport()">
//           <i class="bi bi-archive"></i>
//           <div class="ribbon-action-label">Export Overall Report</div>
//         </div>
//       </ng-container>
//       <ng-container *ngIf="activeTab==='goto'">
//         <div class="ribbon-action" (click)="goToVendorDashboard()">
//           <i class="bi bi-truck"></i>
//           <div class="ribbon-action-label">Vendor Dashboard</div>
//         </div>
//         <div class="ribbon-action" (click)="goToAssetDashboard()">
//           <i class="bi bi-hdd-network"></i>
//           <div class="ribbon-action-label">Asset Dashboard</div>
//         </div>
//         <div class="ribbon-action" (click)="goToEmployeeDashboard()">
//           <i class="bi bi-person-badge"></i>
//           <div class="ribbon-action-label">Employee Dashboard</div>
//         </div>
//       </ng-container>
//       <div class="ribbon-toolbar-spacer"></div>
//       <div class="asset-type-selector-toolbar">
//         <label for="assetType" class="asset-type-label-toolbar me-2">Asset Type:</label>
//         <select id="assetType" [(ngModel)]="selectedAssetType" name="assetType" class="form-select custom-select-toolbar">
//           <option value="" disabled>Select type</option>
//           <option *ngFor="let type of assetTypes" [value]="type">{{ type }}</option>
//         </select>
//       </div>
//     </div>
//   </div>
//   <div class="ribbon-separator"></div>


// <div class="modal-backdrop" *ngIf="showSearchModal"></div>
// <div class="modal search-modal" *ngIf="showSearchModal">
//   <div class="modal-content search-modal-content single-layer-modal">
//     <div class="d-flex justify-content-between align-items-center mb-3">
//       <h5 class="search-modal-title mb-0">
//         Assets for Employee ID: <span class="text-primary">{{ searchEmployeeId }}</span>
//       </h5>
//      <button class="custom-close-btn" (click)="closeSearchModal()" aria-label="Close">
//   <i class="bi bi-x-lg"></i>
// </button>
//     </div>
//     <div *ngIf="filteredAssets?.length; else noAssets">
//       <div class="search-asset-list">
//         <div *ngFor="let asset of filteredAssets" class="search-asset-card">
//           <div *ngFor="let key of getAssetKeys(asset)" class="search-asset-row">
//             <span class="search-asset-field">{{ key }}</span>
//             <span class="search-asset-value">{{ asset[key] }}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//     <ng-template #noAssets>
//       <div class="text-center text-muted py-4">No assets found for this employee.</div>
//     </ng-template>
//   </div>
// </div>

//   <div class="dashboard-body-container">
//     <div class="asset-summary-cards">
//       <div
//         class="summary-card ms-2"
//         *ngFor="let summary of assetSummaries"
//         (dblclick)="goToAssetDashboardWithType(summary.type)"
//         tabindex="0"
//         title="Double-click to view details"
//       >
//         <h4>{{ summary.type }}</h4>
//         <p>{{ summary.count }} assets</p>
//       </div>
//     </div>
//     <div class="mb-3 total-assets-info">
//       <strong>Total Assets in Inventory:</strong> {{ totalAssetCount }}
//     </div> -->