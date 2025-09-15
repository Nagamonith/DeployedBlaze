import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeleteConfirmationDialogComponent } from '../../../app/shared/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RequiredFieldAlertDialogComponent } from '../../../app/shared/dialogs/required-field-alert-dialog/required-field-alert-dialog.component';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent implements OnInit {
  apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url;
  vendors: any[] = [];
  columns: string[] = [];
  showAddVendorModal = false;
  isEditMode = false;
  editVendorId: number | null = null;
  dynamicFields: { key: string, value: string }[] = [];
  newFieldName = '';
  showViewModal = false;
viewVendor: any = {};
viewVendorKeys: string[] = [];
  // Default fields
  defaultFields = [
    { key: 'VendorId', value: '' },
    { key: 'Name', value: '' },
    { key: 'Company', value: '' },
    { key: 'Date of Purchase', value: '' }
  ];

  constructor(private http: HttpClient,private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchVendors();
  }

  fetchVendors() {
    this.http.get<any[]>(`${this.apiBaseUrl}/api/assets/vendors`)
      .subscribe(data => {
        const vendorList: any[] = [];
        const allKeys = new Set<string>();
        data.forEach(v => {
          let parsed;
          try {
            parsed = { ...JSON.parse(v.data), Id: v.id, CreatedAt: v.createdAt };
          } catch {
            parsed = { Id: v.id, CreatedAt: v.createdAt };
          }
          vendorList.push(parsed);
          Object.keys(parsed).forEach(k => allKeys.add(k));
        });
        this.vendors = vendorList;
        const defaultFields = this.defaultFields.map(f => f.key);
        this.columns = Array.from(new Set([...defaultFields, ...Array.from(allKeys)]));
      });
  }

  openViewVendor(vendor: any) {
  this.viewVendor = vendor;
  this.viewVendorKeys = Object.keys(vendor);
  this.showViewModal = true;
}
  openAddVendorModal() {
    this.showAddVendorModal = true;
    this.isEditMode = false;
    this.editVendorId = null;
    this.dynamicFields = this.defaultFields.map(f => ({ ...f }));
    this.newFieldName = '';
  }

  openEditModal(vendor: any) {
    this.showAddVendorModal = true;
    this.isEditMode = true;
    this.editVendorId = vendor.Id;
    this.dynamicFields = this.columns
      .filter(col => col !== 'Id' && col !== 'CreatedAt')
      .map(key => ({ key, value: vendor[key] || '' }));
    this.newFieldName = '';
  }

  addField() {
    if (this.newFieldName && !this.dynamicFields.some(f => f.key === this.newFieldName)) {
      this.dynamicFields.push({ key: this.newFieldName, value: '' });
      this.newFieldName = '';
    }
  }

  removeField(idx: number) {
    this.dynamicFields.splice(idx, 1);
  }

  // saveVendor() {
  //   const vendorData: any = {};
  //   this.dynamicFields.forEach(f => vendorData[f.key] = f.value);
  //   const payload = {
  //     data: JSON.stringify(vendorData)
      
  //   };
  //   this.http.post(`${this.apiBaseUrl}/api/assets/vendors`, payload)
  //     .subscribe(() => {
  //       this.showAddVendorModal = false;
  //       this.fetchVendors();
  //     });
  // }
  saveVendor() {
  const vendorData: any = {};
  this.dynamicFields.forEach(f => vendorData[f.key] = f.value);

  // Require VendorId
  if (!vendorData.VendorId || !vendorData.VendorId.trim()) {
    // alert('VendorId is required.');
    this.dialog.open(RequiredFieldAlertDialogComponent, {
      width: '480px',
      data: { message: 'VendorId is required.' }
    });
    return;
  }

  const payload = {
    data: JSON.stringify(vendorData)
  };
  this.http.post(`${this.apiBaseUrl}/api/assets/vendors`, payload)
    .subscribe(() => {
      this.showAddVendorModal = false;
      this.fetchVendors();
    });
}

  saveEditVendor() {
    if (this.editVendorId == null) return;
    const vendorData: any = {};
    this.dynamicFields.forEach(f => vendorData[f.key] = f.value);
    
    if (!vendorData.VendorId || !vendorData.VendorId.trim()) {
    // alert('VendorId is required.');
    this.dialog.open(RequiredFieldAlertDialogComponent, {
      width: '480px',
      data: { message: 'VendorId is required.' }
    });
    return;
  }
    const payload = {
      data: JSON.stringify(vendorData)
    };
    this.http.post(`${this.apiBaseUrl}/api/assets/vendors/${this.editVendorId}`, payload)
      .subscribe(() => {
        this.showAddVendorModal = false;
        this.fetchVendors();
      });
  }

  // deleteVendor(id: number) {
  //   if (confirm('Are you sure you want to delete this vendor?')) {
  //     this.http.post(`${this.apiBaseUrl}/api/assets/vendors/delete/${id}`, null)
  //       .subscribe(() => this.fetchVendors());
  //   }
  // }

deleteVendor(id: number) {
  const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
    width: '500px',
    data: {
      message: 'Are you sure you want to delete this vendor?'
    }
  });

  dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
    if (result === true) {
      this.http.post(`${this.apiBaseUrl}/api/assets/vendors/delete/${id}`, null)
        .subscribe(() => this.fetchVendors());
    }
  });
}

  closeModal() {
    this.showAddVendorModal = false;
  }
  goToPreviousPage() {
    window.history.back();
  }
}