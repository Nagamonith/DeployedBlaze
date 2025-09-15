
import { DeleteConfirmationDialogComponent } from "../../../app/shared/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component";

import { LeftnavIcon } from "../../../app/leftnavbartree/leftnavigationbar/leftnavigationbar-icon.enum";
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotFoundAlertDialogComponent } from '../../../app/shared/dialogs/not-found-alert-dialog/not-found-alert-dialog.component';


interface AssetSummary {
  type: string;
  count: number;
}

@Component({
  selector: 'app-pre-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pre-dashboard.component.html',
  styleUrls: ['./pre-dashboard.component.css']
})
export class PreDashboardComponent implements OnInit {
  employeeIdField: string = '';
  assetTypes: string[] = [];
  selectedAssetType: string = '';
  assetSummaries: AssetSummary[] = [];
  apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url;

  // For adding new asset type
  showAddTypeModal = false;
  newAssetType = '';

  // For dynamic fields
  showAddAssetModal = false;
  dynamicFields: { key: string, value: string }[] = [];
  newFieldName = '';
  searchEmployeeId: string = '';
  filteredAssets: any[] = [];
  allAssets: any[] = [];
  showSearchModal = false;
  isLoading = false;
  searchError = '';
  assetIdField: string = '';
  activeTab: string = 'add';
  vendors: any[] = [];
  selectedVendorId: string = '';
  employees: any[] = [];
  errorMessage: string = '';
  newTypeFields: string[] = [];
  newFieldNameForType = '';
  newFieldInput: string = '';  // for modal add
public icons = LeftnavIcon;
  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchAssetTypes();
    this.fetchAssetSummaries();
    this.fetchVendors();
    this.fetchEmployees();
    this.fetchAllAssets();
  }

  fetchAllAssets() {
    this.http.get<any[]>(`${this.apiBaseUrl}/api/Assets`).subscribe(data => {
      this.allAssets = data.map(a => ({
        ...JSON.parse(a.data),
        AssetId: a.assetId,
        EmployeeId: a.employeeId,
        Type: a.type,
        Id: a.id,
        CreatedAt: a.createdAt
      }));
    });
  }

  fetchEmployees() {
    this.http.get<any[]>(`${this.apiBaseUrl}/api/assets/employees`).subscribe(data => {
      this.employees = data.map(emp => {
        try {
          return { ...JSON.parse(emp.data), employeeId: emp.id };
        } catch {
          return { employeeId: emp.id };
        }
      });
    });
  }

  fetchVendors() {
    this.http.get<any[]>(`${this.apiBaseUrl}/api/assets/vendors`).subscribe(data => {
      this.vendors = data.map(v => {
        try {
          return { ...JSON.parse(v.data), Id: v.id, Name: JSON.parse(v.data).Name || `Vendor ${v.id}` };
        } catch {
          return { Id: v.id, Name: `Vendor ${v.id}` };
        }
      });
    });
  }

  fetchAssetTypes() {
    this.http.get<string[]>(`${this.apiBaseUrl}/api/assets/types`).subscribe(types => {
      this.assetTypes = Array.from(new Set(types));  // remove duplicates if any
    });
  }

  fetchAssetSummaries() {
    this.http.get<AssetSummary[]>(`${this.apiBaseUrl}/api/assets/summary`).subscribe(data => {
      this.assetSummaries = data;
    });
  }

  fetchFieldDefinitions(type: string) {
    this.http.get<string[]>(`${this.apiBaseUrl}/api/assets/types/${encodeURIComponent(type)}/fields`)
      .subscribe({
        next: fields => {
          this.dynamicFields = fields.map(key => ({ key, value: '' }));
        },
        error: () => {
          this.dynamicFields = [];
        }
      });
  }

  openAddAssetModal() {
    this.showAddAssetModal = true;
    this.dynamicFields = [];
    this.newFieldName = '';
    this.employeeIdField = '';
    this.assetIdField = '';
    this.selectedVendorId = '';

    if (this.selectedAssetType) {
      this.fetchFieldDefinitions(this.selectedAssetType);
    }
  }

  saveAsset() {
    this.errorMessage = '';

    if (!this.assetIdField || !this.assetIdField.trim()) {
      this.errorMessage = 'AssetId is required.';
      return;
    }

    const assetData: any = {};
    this.dynamicFields.forEach(f => assetData[f.key] = f.value);
    assetData.EmployeeId = this.employeeIdField;
    assetData.AssetId = this.assetIdField;
    assetData.VendorId = this.selectedVendorId;

    const payload = {
      type: this.selectedAssetType,
      data: JSON.stringify(assetData),
      employeeId: this.employeeIdField,
      assetId: this.assetIdField
    };

    this.http.post(`${this.apiBaseUrl}/api/assets`, payload).subscribe({
      next: () => {
        this.showAddAssetModal = false;
        this.fetchAssetSummaries();
      },
      error: () => {
        this.errorMessage = 'Failed to add asset. AssetId must be unique.';
      }
    });
  }

  addAssetType() {
    if (!this.newAssetType?.trim()) return;

    const payload = {
      name: this.newAssetType.trim(),
      fieldDefinitionJson: JSON.stringify(this.newTypeFields)
    };

    this.http.post(`${this.apiBaseUrl}/api/assets/types`, payload).subscribe({
      next: () => {
        this.assetTypes.push(this.newAssetType.trim());
        this.showAddTypeModal = false;
        this.newAssetType = '';
        this.newTypeFields = [];
      },
      error: (err) => {
        console.error('Failed to add asset type:', err);
      }
    });
  }

  addField() {
    if (this.newFieldName && !this.dynamicFields.some(f => f.key === this.newFieldName)) {
      this.dynamicFields.push({ key: this.newFieldName, value: '' });
      this.newFieldName = '';
    }
  }

  openAddTypeModal() {
    this.showAddTypeModal = true;
    this.newAssetType = '';
  }

  removeField(idx: number) {
    this.dynamicFields.splice(idx, 1);
  }

  exportReport() {
    window.open(`${this.apiBaseUrl}/api/assets/export?type=${this.selectedAssetType}`, '_blank');
  }

  exportOverallReport() {
    window.open(`${this.apiBaseUrl}/api/assets/export-all`, '_blank');
  }

  deleteAssetType(type: string) {
    if (!type) return;

    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: `Delete asset type "${type}" and all its assets?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.http.post(`${this.apiBaseUrl}/api/assets/types/delete/${encodeURIComponent(type)}`, {})
          .subscribe({
            next: () => {
              this.fetchAssetTypes();
              this.fetchAssetSummaries();
              if (this.selectedAssetType === type) this.selectedAssetType = '';
            },
            error: err => {
              this.dialog.open(DeleteConfirmationDialogComponent, {
                width: '400px',
                data: {
                  message: err.error || 'Failed to delete asset type.'
                }
              });
            }
          });
      }
    });
  }

  searchEmployeeAssets(employeeId: string) {
    if (!employeeId || !employeeId.trim()) {
      this.filteredAssets = [];
      this.showSearchModal = false;
      return;
    }
    this.isLoading = true;
    const empId = employeeId.trim();
    this.filteredAssets = this.allAssets.filter(a => (a.EmployeeId + '') === empId);
    this.showSearchModal = true;
    this.isLoading = false;
    if (!this.filteredAssets.length) {
      this.searchError = 'No assets found for this employee.';
    } else {
      this.searchError = '';
    }
  }

  closeSearchModal() {
    this.showSearchModal = false;
    this.searchEmployeeId = '';
  }

  getAssetKeys(asset: any): string[] {
    return asset ? Object.keys(asset) : [];
  }

  get totalAssetCount(): number {
    return this.assetSummaries.reduce((sum, summary) => sum + summary.count, 0);
  }

  goToAssetDashboardWithType(type: string) {
    this.router.navigate(['/assets/asset-dashboard'], { queryParams: { type } });
  }

  goToVendorDashboard() {
    window.location.href = '/assets/vendor-dashboard';
  }

  goToEmployeeDashboard() {
    window.location.href = '/assets/employee-dashboard';
  }

  goToAssetDashboard() {
    this.router.navigate(['/assets/asset-dashboard']);
  }

  goToMainDashboard() {
    this.router.navigate(['/assets/dashboard']);
  }

  addNewTypeField() {
    const trimmed = this.newFieldInput?.trim();
    if (trimmed && !this.newTypeFields.includes(trimmed)) {
      this.newTypeFields.push(trimmed);
      this.newFieldInput = '';
    }
  }

  removeNewTypeField(index: number) {
    this.newTypeFields.splice(index, 1);
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
