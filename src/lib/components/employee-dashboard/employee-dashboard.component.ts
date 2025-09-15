import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeleteConfirmationDialogComponent } from '../../../app/shared/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RequiredFieldAlertDialogComponent } from '../../../app/shared/dialogs/required-field-alert-dialog/required-field-alert-dialog.component';
import { LeftnavIcon } from '../../../app/leftnavbartree/leftnavigationbar/leftnavigationbar-icon.enum';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url;
  employees: any[] = [];
  columns: string[] = [];
  showAddEditModal = false;
  isEditMode = false;
  editEmployeeId = '';
  dynamicFields: { key: string, value: string }[] = [];
  newFieldName = '';
  // Default fields
  defaultFields = [
    { key: 'EmployeeId', value: '' },
    { key: 'Name', value: '' },
    { key: 'Number', value: '' },
    { key: 'EmailId', value: '' }
  ];

  // Search
  searchEmployeeId: string = '';
  filteredEmployees: any[] = [];

  public icons = LeftnavIcon;
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.http.get<any[]>(`${this.apiBaseUrl}/api/assets/employees`)
      .subscribe(data => {
        const empList: any[] = [];
        const allKeys = new Set<string>();
        data.forEach(e => {
          let parsed;
          try {
            parsed = { ...JSON.parse(e.data), EmployeeId: e.employeeId, CreatedAt: e.createdAt };
          } catch {
            parsed = { EmployeeId: e.employeeId, CreatedAt: e.createdAt };
          }
          empList.push(parsed);
          Object.keys(parsed).forEach(k => allKeys.add(k));
        });
        // Sort by EmployeeId ascending (string sort)
        empList.sort((a, b) => (a.EmployeeId || '').localeCompare(b.EmployeeId || ''));
        this.employees = empList;
        this.filteredEmployees = [...this.employees];
        const defaultKeys = this.defaultFields.map(f => f.key);
        this.columns = Array.from(new Set([...defaultKeys, ...Array.from(allKeys)]));
      });
  }

  openAddModal() {
    this.showAddEditModal = true;
    this.isEditMode = false;
    this.dynamicFields = this.defaultFields.map(f => ({ ...f }));
    this.newFieldName = '';
    this.editEmployeeId = '';
  }

  openEditModal(employee: any) {
    this.showAddEditModal = true;
    this.isEditMode = true;
    this.editEmployeeId = employee.EmployeeId;
    this.dynamicFields = this.columns
      .filter(col => col !== 'CreatedAt')
      .map(key => ({ key, value: employee[key] || '' }));
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

  saveEmployee() {
    const employeeData: any = {};
    this.dynamicFields.forEach(f => employeeData[f.key] = f.value);

    if (!employeeData.EmployeeId || !employeeData.EmployeeId.trim()) {
      // alert('EmployeeId is required.');
      this.dialog.open(RequiredFieldAlertDialogComponent, {
        width: '480px',
        data: { message: 'EmployeeId is required.' }
      });
      return;
    }
    const empData: any = {};
    this.dynamicFields.forEach(f => empData[f.key] = f.value);
    const payload = {
      employeeId: empData['EmployeeId'],
      data: JSON.stringify(empData)
    };
    if (this.isEditMode) {
      this.http.post(`${this.apiBaseUrl}/api/assets/employees/${this.editEmployeeId}`, payload)
        .subscribe(() => {
          this.showAddEditModal = false;
          this.fetchEmployees();
        });
    } else {
      this.http.post(`${this.apiBaseUrl}/api/assets/employees`, payload)
        .subscribe(() => {
          this.showAddEditModal = false;
          this.fetchEmployees();
        });
    }
  }

  // deleteEmployee(id: string) {
  //   if (!id) {
  //     alert('Invalid EmployeeId');
  //     return;
  //   }
  //   if (confirm('Are you sure you want to delete this employee?')) {
  //     this.http.post(`${this.apiBaseUrl}/api/assets/employees/delete/${id}`, null)
  //       .subscribe(() => this.fetchEmployees());
  //   }
  // }
  deleteEmployee(id: string) {
  if (!id) {
    // alert('Invalid EmployeeId');
    this.dialog.open(RequiredFieldAlertDialogComponent, {
      width: '400px',
      data: { message: 'Invalid EmployeeId' }
    });
    return;
  }

  const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
    width: '400px',
    data: {
      message: 'Are you sure you want to delete this employee?',
      title: 'Delete Employee'
    }
  });

  dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
    if (result === true) {
      this.http.post(`${this.apiBaseUrl}/api/assets/employees/delete/${id}`, null)
        .subscribe(() => this.fetchEmployees());
    }
  });
}

  // Search functionality
  searchEmployee(empId: string) {
    if (!empId || !empId.trim()) {
      this.filteredEmployees = [...this.employees];
      return;
    }
    this.filteredEmployees = this.employees.filter(e =>
      (e.EmployeeId || '').toLowerCase().includes(empId.trim().toLowerCase())
    );
  }

  goToPreviousPage() {
    window.history.back();
  }
  clearSearch() {
  this.searchEmployeeId = '';
  this.filteredEmployees = [...this.employees];
}
}