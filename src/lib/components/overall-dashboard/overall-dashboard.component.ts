// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { DxTabPanelModule } from "devextreme-angular";
// import { BugMetricsEditorComponent } from "../bug-metrics-editor/bug-metrics-editor.component";

// interface Employee {
//   empId: string;
//   name: string;
// }

// interface DashboardRow {
//   empId: string;
//   empName: string;
//   date: string;
//   type: string;
//   loginTime: string;
//   logoutTime: string;
//   totalTime: string;
//   deskTime: string;
//   productiveHours: string;
// }

// @Component({
//   selector: 'app-overall-dashboard',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     HttpClientModule,
//     DxTabPanelModule,
//     BugMetricsEditorComponent
//   ],
//   templateUrl: './overall-dashboard.component.html',
//   styleUrls: ['./overall-dashboard.component.css']
// })
// export class OverallDashboardComponent implements OnInit {

//   apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url;

//   employees: Employee[] = [];
//   dashboardData: DashboardRow[] = [];

//   selectedEmployee: string = 'All';
//   startDate: string = '';
//   endDate: string = '';

//   totalOffice = 0;
//   totalWFH = 0;
//   totalLeave = 0;

//   // 🔹 Modal data
//   showModal = false;
//   workloadData: any[] = [];
//   selectedDate: string = '';
//   tableKeys: string[] = [];

//   // 🔹 New variable to hold productive hours summary (parsed JSON)
//   summaryData: any[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.loadData();
//     // ✅ Call once on init to populate productive hours
//     this.fetchProductiveHoursSummary();
//   }

//   loadData(): void {
//     const fromDate = this.startDate || '';
//     const toDate = this.endDate || '';
//     const url = `${this.apiBaseUrl}/api/EmployeeDashboard/GetDashboard?fromDate=${fromDate}&toDate=${toDate}`;

//     this.http.get<any[]>(url).subscribe({
//       next: (res) => {
//         this.dashboardData = res.map((item) => ({
//           empId: item.EmpId,
//           empName: item.EmpName,
//           date: item.Date,
//           type: item.Type,
//           loginTime: item.LoginTime,
//           logoutTime: item.LogoutTime,
//           totalTime: item.TotalTime,
//           deskTime: item.DeskTime,
//           productiveHours: item.ProductiveHours || '00:00:00',
//         }));

//         this.employees = [
//           { empId: 'All', name: 'All Employees' },
//           ...Array.from(
//             new Map(
//               this.dashboardData.map((x) => [x.empName, { empId: x.empName, name: x.empName }])
//             ).values()
//           )
//         ];

//         if (this.selectedEmployee !== 'All') {
//           this.dashboardData = this.dashboardData.filter(
//             (x) => x.empId === this.selectedEmployee
//           );
//         }

//         this.totalOffice = this.dashboardData.filter((x) => x.type === 'Office').length;
//         this.totalWFH = this.dashboardData.filter((x) => x.type === 'WFH').length;
//         this.totalLeave = this.dashboardData.filter((x) => x.type === 'Leave').length;
//       },
//       error: (err) => console.error('Error fetching dashboard data:', err),
//     });
//   }

//   onEmployeeChange(): void {
//     if (this.selectedEmployee === 'All') {
//       this.loadData();
//     } else {
//       const fromDate = this.startDate || '';
//       const toDate = this.endDate || '';
//       const url = `${this.apiBaseUrl}/api/EmployeeDashboard/GetDashboard?fromDate=${fromDate}&toDate=${toDate}`;

//       this.http.get<any[]>(url).subscribe({
//         next: (res) => {
//           const allData: DashboardRow[] = res.map((item) => ({
//             empId: item.EmpId,
//             empName: item.EmpName,
//             date: item.Date,
//             type: item.Type,
//             loginTime: item.LoginTime || '-',
//             logoutTime: item.LogoutTime || '-',
//             totalTime: item.TotalTime,
//             deskTime: item.DeskTime,
//             productiveHours: item.ProductiveHours || '00:00:00',
//           }));

//           this.dashboardData = allData.filter(
//             (x) => x.empId === this.selectedEmployee
//           );

//           this.totalOffice = this.dashboardData.filter((x) => x.type === 'Office').length;
//           this.totalWFH = this.dashboardData.filter((x) => x.type === 'WFH').length;
//           this.totalLeave = this.dashboardData.filter((x) => x.type === 'Leave').length;
//         },
//         error: (err) => console.error(err),
//       });
//     }
//   }

//   // ✅ Safe updated workload fetch with backward compatibility
//   openWorkloadPopup(row: any): void {
//     const date = row.date;
//     const reporterName = row.empName;

//     if (!date || !reporterName) {
//       console.error('Missing date or reporter name in row:', row, date, reporterName);
//       return;
//     }

//     this.selectedDate = date;

//     const encodedName = encodeURIComponent(reporterName.trim());
//     const url = `${this.apiBaseUrl}/api/ResourceHour/workload?startDate=${date}&endDate=${date}&reporterName=${encodedName}`;

//     console.log('Calling workload API:', url);

//     this.http.get<any>(url).subscribe({
//       next: (res) => {
//         // ✅ Handle new backend format
//         const data = Array.isArray(res) ? res : res?.records || [];
//         this.workloadData = data.map((item: { resource_Name: any; project_Name: any; mantis_BugID: any; total_Hoursd_Worked: any; task_Summary: any; }) => ({
//           Name: item.resource_Name,
//           Project_Name: item.project_Name,
//           BugID: item.mantis_BugID,
//           TotalHours: item.total_Hoursd_Worked,
//           Summary: item.task_Summary,
//         }));

//         this.tableKeys = this.workloadData.length > 0
//           ? Object.keys(this.workloadData[0])
//           : [];

//         this.showModal = true;
//       },
//       error: (err) => {
//         console.error('Error fetching workload:', err);
//         this.workloadData = [];
//         this.tableKeys = [];
//         this.showModal = true;
//       }
//     });
//   }

//   // ✅ New helper to call once on init
//   fetchProductiveHoursSummary(): void {
//     const today = new Date().toISOString().split('T')[0];
//     const url = `${this.apiBaseUrl}/api/ResourceHour/workload?startDate=${today}&endDate=${today}`;

//     this.http.get<any>(url).subscribe({
//       next: (res) => {
//         // ✅ Handle both old/new responses
//         const summaryJson = res?.summaryJson ? JSON.parse(res.summaryJson) : [];
//         this.summaryData = summaryJson;

//         // 🔹 Match employee names and set productive hours if applicable
//         for (const row of this.dashboardData) {
//           const match = summaryJson.find((x: any) => x.Resource_Name === row.empName);
//           if (match) {
//             row.productiveHours = match.Total_Hours_Worked || '00:00:00';
//           }
//         }
//       },
//       error: (err) => {
//         console.error('Error fetching productive hours summary:', err);
//       }
//     });
//   }

//   closeModal(): void {
//     this.showModal = false;
//     this.workloadData = [];
//     this.tableKeys = [];
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DxTabPanelModule } from "devextreme-angular";
import { BugMetricsEditorComponent } from "../bug-metrics-editor/bug-metrics-editor.component";

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
    DxTabPanelModule,
    BugMetricsEditorComponent
  ],
  templateUrl: './overall-dashboard.component.html',
  styleUrls: ['./overall-dashboard.component.css']
})
export class OverallDashboardComponent implements OnInit {

  apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url;

  employees: Employee[] = [];
  dashboardData: DashboardRow[] = [];

  selectedEmployee: string = 'All';
  startDate: string = '';
  endDate: string = '';

  totalOffice = 0;
  totalWFH = 0;
  totalLeave = 0;

  // 🔹 Modal data
  showModal = false;
  workloadData: any[] = [];
  selectedDate: string = '';
  tableKeys: string[] = [];

  // 🔹 New variable to hold productive hours summary (parsed JSON)
  summaryData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('🟢 Initializing dashboard...');
    this.loadData();
    this.fetchProductiveHoursSummary();
  }

  loadData(): void {
    const fromDate = this.startDate || '';
    const toDate = this.endDate || '';
    const url = `${this.apiBaseUrl}/api/EmployeeDashboard/GetDashboard?fromDate=${fromDate}&toDate=${toDate}`;
    console.log('📡 Loading data from:', url);

    this.http.get<any[]>(url).subscribe({
      next: (res) => {
        console.log('✅ Raw dashboard response:', res);

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

        // ✅ FIXED: Properly map employees using EmpId
        this.employees = [
          { empId: 'All', name: 'All Employees' },
          ...Array.from(
            new Map(
              this.dashboardData.map((x) => [x.empId, { empId: x.empId, name: x.empName }])
            ).values()
          )
        ];

        console.log('👥 Employee list:', this.employees);

        // Apply filter if already selected
        if (this.selectedEmployee !== 'All') {
          console.log('🟡 Applying filter for employee:', this.selectedEmployee);
          this.dashboardData = this.dashboardData.filter(
            (x) => x.empId === this.selectedEmployee
          );
        }

        // Count summary
        this.totalOffice = this.dashboardData.filter((x) => x.type === 'Office').length;
        this.totalWFH = this.dashboardData.filter((x) => x.type === 'WFH').length;
        this.totalLeave = this.dashboardData.filter((x) => x.type === 'Leave').length;

        console.log('📊 Summary -> Office:', this.totalOffice, 'WFH:', this.totalWFH, 'Leave:', this.totalLeave);
      },
      error: (err) => console.error('❌ Error fetching dashboard data:', err),
    });
  }

  onEmployeeChange(): void {
    console.log('🔄 Employee changed to:', this.selectedEmployee);

    if (this.selectedEmployee === 'All') {
      console.log('🔁 Reloading all data...');
      this.loadData();
    } else {
      const fromDate = this.startDate || '';
      const toDate = this.endDate || '';
      const url = `${this.apiBaseUrl}/api/EmployeeDashboard/GetDashboard?fromDate=${fromDate}&toDate=${toDate}`;
      console.log('📡 Refetching for employee filter:', url);

      this.http.get<any[]>(url).subscribe({
        next: (res) => {
          console.log('✅ Refetch response:', res);

          const allData: DashboardRow[] = res.map((item) => ({
            empId: item.EmpId,
            empName: item.EmpName,
            date: item.Date,
            type: item.Type,
            loginTime: item.LoginTime || '-',
            logoutTime: item.LogoutTime || '-',
            totalTime: item.TotalTime,
            deskTime: item.DeskTime,
            productiveHours: item.ProductiveHours || '00:00:00',
          }));

          // ✅ Use empId for filtering
          this.dashboardData = allData.filter(
            (x) => x.empId === this.selectedEmployee
          );

          console.log('🧩 Filtered data:', this.dashboardData);

          this.totalOffice = this.dashboardData.filter((x) => x.type === 'Office').length;
          this.totalWFH = this.dashboardData.filter((x) => x.type === 'WFH').length;
          this.totalLeave = this.dashboardData.filter((x) => x.type === 'Leave').length;

          console.log('📊 Filtered Summary -> Office:', this.totalOffice, 'WFH:', this.totalWFH, 'Leave:', this.totalLeave);
        },
        error: (err) => console.error('❌ Error during employee filter fetch:', err),
      });
    }
  }

  // ✅ Safe updated workload fetch with backward compatibility
  openWorkloadPopup(row: any): void {
    const date = row.date;
    const reporterName = row.empName;

    console.log('🟢 Opening workload popup for:', row);

    if (!date || !reporterName) {
      console.error('❌ Missing date or reporter name in row:', row, date, reporterName);
      return;
    }

    this.selectedDate = date;
    const encodedName = encodeURIComponent(reporterName.trim());
    const url = `${this.apiBaseUrl}/api/ResourceHour/workload?startDate=${date}&endDate=${date}&reporterName=${encodedName}`;
    console.log('📡 Calling workload API:', url);

    this.http.get<any>(url).subscribe({
      next: (res) => {
        console.log('✅ Workload response:', res);

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

        console.log('🧾 Workload table keys:', this.tableKeys);
        this.showModal = true;
      },
      error: (err) => {
        console.error('❌ Error fetching workload:', err);
        this.workloadData = [];
        this.tableKeys = [];
        this.showModal = true;
      }
    });
  }

  // ✅ Fetch Productive Hours Summary
  fetchProductiveHoursSummary(): void {
    const today = new Date().toISOString().split('T')[0];
    const url = `${this.apiBaseUrl}/api/ResourceHour/workload?startDate=${today}&endDate=${today}`;
    console.log('📡 Fetching productive hours summary:', url);

    this.http.get<any>(url).subscribe({
      next: (res) => {
        console.log('✅ Productive hours summary response:', res);

        const summaryJson = res?.summaryJson ? JSON.parse(res.summaryJson) : [];
        this.summaryData = summaryJson;

        // 🔹 Match employee names and update productive hours
        for (const row of this.dashboardData) {
          const match = summaryJson.find((x: any) => x.Resource_Name === row.empName);
          if (match) {
            row.productiveHours = match.Total_Hours_Worked || '00:00:00';
          }
        }

        console.log('🕒 Updated dashboard with productive hours:', this.dashboardData);
      },
      error: (err) => {
        console.error('❌ Error fetching productive hours summary:', err);
      }
    });
  }

  closeModal(): void {
    console.log('🔴 Closing modal');
    this.showModal = false;
    this.workloadData = [];
    this.tableKeys = [];
  }
}
