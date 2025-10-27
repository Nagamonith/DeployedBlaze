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
//   empMail: string;
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

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.loadData();
//   }

//  loadData(): void {
//   const fromDate = this.startDate || '';
//   const toDate = this.endDate || '';
//   const url = `${this.apiBaseUrl}/api/EmployeeDashboard/GetDashboard?fromDate=${fromDate}&toDate=${toDate}`;

//   this.http.get<any[]>(url).subscribe({
//     next: (res) => {
//       // 🔄 Transform API response into your model
//       this.dashboardData = res.map((item) => ({
//         empId: item.EmpId,
//         empMail: item.EmpMail,
//         date: item.Date,
//         type: item.Type,
//         loginTime: item.LoginTime || '-',
//         logoutTime: item.LogoutTime || '-',
//         totalTime: item.TotalTime,
//         deskTime: item.DeskTime,
//         productiveHours: item.ProductiveHours || '00:00:00',
//       }));

//       // ✅ Extract employee list dynamically
//       this.employees = [
//         { empId: 'All', name: 'All Employees' },
//         ...Array.from(
//           new Map(
//             this.dashboardData.map((x) => [x.empId, { empId: x.empId, name:x.empId }])
//           ).values()
//         )
//       ];

//       // ✅ Apply employee filter if not "All"
//       if (this.selectedEmployee !== 'All') {
//         this.dashboardData = this.dashboardData.filter(
//           (x) => x.empId === this.selectedEmployee
//         );
//       }

//       // ✅ Count summary
//       this.totalOffice = this.dashboardData.filter((x) => x.type === 'Office').length;
//       this.totalWFH = this.dashboardData.filter((x) => x.type === 'WFH').length;
//       this.totalLeave = this.dashboardData.filter((x) => x.type === 'Leave').length;
//     },
//     error: (err) => {
//       console.error('Error fetching dashboard data:', err);
//     }
//   });
// }
// onEmployeeChange(): void {
//   if (this.selectedEmployee === 'All') {
//     this.loadData();
//   } else {
//     const fromDate = this.startDate || '';
//     const toDate = this.endDate || '';
//     const url = `${this.apiBaseUrl}/api/EmployeeDashboard/GetDashboard?fromDate=${fromDate}&toDate=${toDate}`;

//     this.http.get<any[]>(url).subscribe({
//       next: (res) => {
//         const allData = res.map((item) => ({
//           empId: item.EmpId,
//           empMail: item.EmpMail,
//           date: item.Date,
//           type: item.Type,
//           loginTime: item.LoginTime || '-',
//           logoutTime: item.LogoutTime || '-',
//           totalTime: item.TotalTime,
//           deskTime: item.DeskTime,
//           productiveHours: item.ProductiveHours || '00:00:00',
//         }));

//         this.dashboardData = allData.filter(
//           (x) => x.empId === this.selectedEmployee
//         );

//         // Recalculate totals
//         this.totalOffice = this.dashboardData.filter((x) => x.type === 'Office').length;
//         this.totalWFH = this.dashboardData.filter((x) => x.type === 'WFH').length;
//         this.totalLeave = this.dashboardData.filter((x) => x.type === 'Leave').length;
//       },
//       error: (err) => console.error(err),
//     });
//   }
// }

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

interface Workload {
  projectName: string;
  taskName: string;
  hours: number;
  description: string;
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
  workloadData: Workload[] = [];
  selectedDate: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const fromDate = this.startDate || '';
    const toDate = this.endDate || '';
    const url = `${this.apiBaseUrl}/api/EmployeeDashboard/GetDashboard?fromDate=${fromDate}&toDate=${toDate}`;

    this.http.get<any[]>(url).subscribe({
      next: (res) => {
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

        this.employees = [
          { empId: 'All', name: 'All Employees' },
          ...Array.from(
            new Map(
              this.dashboardData.map((x) => [x.empId, { empId: x.empId, name: x.empId }])
            ).values()
          )
        ];

        if (this.selectedEmployee !== 'All') {
          this.dashboardData = this.dashboardData.filter(
            (x) => x.empId === this.selectedEmployee
          );
        }

        this.totalOffice = this.dashboardData.filter((x) => x.type === 'Office').length;
        this.totalWFH = this.dashboardData.filter((x) => x.type === 'WFH').length;
        this.totalLeave = this.dashboardData.filter((x) => x.type === 'Leave').length;
      },
      error: (err) => console.error('Error fetching dashboard data:', err),
    });
  }

  onEmployeeChange(): void {
    if (this.selectedEmployee === 'All') {
      this.loadData();
    } else {
      const fromDate = this.startDate || '';
      const toDate = this.endDate || '';
      const url = `${this.apiBaseUrl}/api/EmployeeDashboard/GetDashboard?fromDate=${fromDate}&toDate=${toDate}`;

      this.http.get<any[]>(url).subscribe({
        next: (res) => {
          const allData = res.map((item) => ({
            empId: item.EmpId,
            empMail: item.EmpMail,
            date: item.Date,
            type: item.Type,
            loginTime: item.LoginTime || '-',
            logoutTime: item.LogoutTime || '-',
            totalTime: item.TotalTime,
            deskTime: item.DeskTime,
            productiveHours: item.ProductiveHours || '00:00:00',
          }));

         

          this.totalOffice = this.dashboardData.filter((x) => x.type === 'Office').length;
          this.totalWFH = this.dashboardData.filter((x) => x.type === 'WFH').length;
          this.totalLeave = this.dashboardData.filter((x) => x.type === 'Leave').length;
        },
        error: (err) => console.error(err),
      });
    }
  }

  // openWorkloadPopup(date: string): void {
  //   this.selectedDate = date;
  
  //   const url = `https://blazebackend.qualis40.io/api/ResourceHour/workload?startDate=${date}&endDate=${date}`;

  //   this.http.get<Workload[]>(url).subscribe({
  //     next: (res) => {
  //       this.workloadData = res;
  //       this.showModal = true;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching workload:', err);
  //       this.workloadData = [];
  //       this.showModal = true;
  //     }
  //   });
  // }
openWorkloadPopup(row: any): void {
  const date = row.date;
  const reporterName = row.empName;

  if (!date || !reporterName) {
    console.error('Missing date or reporter name in row:', row, date, reporterName);
    return;
  }

  this.selectedDate = date;

  const encodedName = encodeURIComponent(reporterName.trim());
  const url = `${this.apiBaseUrl}/api/ResourceHour/workload?startDate=${date}&endDate=${date}&reporterName=${encodedName}`;

  console.log('Calling workload API:', url);

  this.http.get<Workload[]>(url).subscribe({
    next: (res) => {
      this.workloadData = res;
      this.showModal = true;
    },
    error: (err) => {
      console.error('Error fetching workload:', err);
      this.workloadData = [];
      this.showModal = true;
    }
  });
}



  closeModal(): void {
    this.showModal = false;
    this.workloadData = [];
  }
}
