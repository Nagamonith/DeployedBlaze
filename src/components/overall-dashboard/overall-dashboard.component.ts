import * as XLSX from 'xlsx';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DxTabPanelModule } from "devextreme-angular";
import { LoaderService } from '../../app/services/loader.service';

interface Employee {
  empId: string;
  name: string;
}

interface DashboardRow {
  empId: string;
  empName: string;
  date: string;
  type: string;
  loginTime: string;
  logoutTime: string;
  totalTime: string;
  deskTime: string;
  productiveHours: string;
}

@Component({
  selector: 'app-overall-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DxTabPanelModule
  ],
  templateUrl: './overall-dashboard.component.html',
  styleUrls: ['./overall-dashboard.component.css']
})
export class OverallDashboardComponent implements OnInit {

  apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url;

  employees: Employee[] = [];
  dashboardData: DashboardRow[] = [];
  dashboardDataOriginal: DashboardRow[] = [];  

  selectedEmployee: string = 'All';
  startDate: string = '';
  endDate: string = '';

  totalOffice = 0;
  totalWFH = 0;
  totalLeave = 0;

  showModal = false;
  workloadData: any[] = [];
  selectedDate: string = '';
  tableKeys: string[] = [];

  summaryData: any[] = [];

  constructor(private http: HttpClient, private loader: LoaderService) {}

  ngOnInit(): void {
    this.loadData();
    this.fetchProductiveHoursSummary();

  }

 
  loadData(): void {
     this.selectedEmployee = 'All';
    this.loader.showLoader()
    const fromDate = this.startDate || '';
    const toDate = this.endDate || '';
    const url = `${this.apiBaseUrl}/api/EmployeeDashboard/GetDashboard?fromDate=${fromDate}&toDate=${toDate}`;

    this.http.get<any[]>(url).subscribe({
      next: (res) => {

        // Map dashboard data
        this.dashboardData = res.map((item) => ({
          empId: item.EmpId,
          empName: item.EmpName,
          date: item.Date,
          type: item.Type,
          loginTime: item.LoginTime,
          logoutTime: item.LogoutTime,
          totalTime: item.TotalTime,
          deskTime: item.DeskTime,
          productiveHours: item.ProductiveHours || '00:00:00',
        }));

        this.dashboardDataOriginal = [...this.dashboardData];

        this.employees = [
          { empId: 'All', name: 'All Employees' },
          ...Array.from(
            new Map(
              this.dashboardData.map(x => [x.empId, { empId: x.empId, name: x.empName }])
            ).values()
          )
        ];

        if (this.selectedEmployee !== 'All') {
          this.dashboardData = this.dashboardDataOriginal.filter(
            (x) => x.empId === this.selectedEmployee
          );
        }
        this.updateCounts();
      },
      error: (err) => console.error('Error fetching dashboard data:', err),
    });
  }


  onEmployeeChange(): void {
    if (this.selectedEmployee === 'All') {
      this.dashboardData = [...this.dashboardDataOriginal];    
    } else {
      this.dashboardData = this.dashboardDataOriginal.filter(
        (x) => x.empId === this.selectedEmployee
      );
    }

    this.updateCounts();
  }

  updateCounts(): void {
    this.totalOffice = this.dashboardData.filter(x => x.type === 'Office').length;
    this.totalWFH = this.dashboardData.filter(x => x.type === 'WFH').length;
    this.totalLeave = this.dashboardData.filter(x => x.type === 'Leave').length;
  }


  openWorkloadPopup(row: any): void {
    const date = row.date;
    const reporterName = row.empName;

    if (!date || !reporterName) return;

    this.selectedDate = date;
    const encodedName = encodeURIComponent(reporterName.trim());
    const url = `${this.apiBaseUrl}/api/ResourceHour/workload?startDate=${date}&endDate=${date}&reporterName=${encodedName}`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        const data = Array.isArray(res) ? res : res?.records || [];
        this.workloadData = data.map((item: any) => ({
          Name: item.resource_Name,
          Project_Name: item.project_Name,
          BugID: item.mantis_BugID,
          TotalHours: item.total_Hoursd_Worked,
          Summary: item.task_Summary,
        }));

        this.tableKeys = this.workloadData.length > 0
          ? Object.keys(this.workloadData[0])
          : [];

        this.showModal = true;
      },
      error: () => {
        this.workloadData = [];
        this.tableKeys = [];
        this.showModal = true;
      }
    });
  }

 
exportToExcel(): void {
  const url = `${this.apiBaseUrl}/api/EmployeeDashboard/GetDashboard?fromDate=${this.startDate}&toDate=${this.endDate}`;

  this.http.get<any[]>(url).subscribe({
    next: (jsonData) => {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);

      const workbook: XLSX.WorkBook = { 
        Sheets: { 'Dashboard': worksheet }, 
        SheetNames: ['Dashboard'] 
      };

      XLSX.writeFile(workbook, `Dashboard_${this.startDate}.xlsx`);
    },
    error: (err) => console.error('Export failed', err)
  });
}
  fetchProductiveHoursSummary(): void {
    const today = new Date().toISOString().split('T')[0];
    const url = `${this.apiBaseUrl}/api/ResourceHour/workload?startDate=${today}&endDate=${today}`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        const summaryJson = res?.summaryJson ? JSON.parse(res.summaryJson) : [];
        this.summaryData = summaryJson;

        for (const row of this.dashboardData) {
          const match = summaryJson.find((x: any) => x.Resource_Name === row.empName);
          if (match) row.productiveHours = match.Total_Hours_Worked || '00:00:00';
        }
      },
      error: (err) => console.error('Error fetching productive hours summary:', err),
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.workloadData = [];
    this.tableKeys = [];
  }
}
