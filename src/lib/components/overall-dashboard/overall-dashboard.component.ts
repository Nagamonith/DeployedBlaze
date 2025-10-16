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
  empMail: string;
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
      // 🔄 Transform API response into your model
      this.dashboardData = res.map((item) => ({
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

      // ✅ Extract employee list dynamically
      this.employees = [
        { empId: 'All', name: 'All Employees' },
        ...Array.from(
          new Map(
            this.dashboardData.map((x) => [x.empId, { empId: x.empId, name:x.empId }])
          ).values()
        )
      ];

      // ✅ Apply employee filter if not "All"
      if (this.selectedEmployee !== 'All') {
        this.dashboardData = this.dashboardData.filter(
          (x) => x.empId === this.selectedEmployee
        );
      }

      // ✅ Count summary
      this.totalOffice = this.dashboardData.filter((x) => x.type === 'Office').length;
      this.totalWFH = this.dashboardData.filter((x) => x.type === 'WFH').length;
      this.totalLeave = this.dashboardData.filter((x) => x.type === 'Leave').length;
    },
    error: (err) => {
      console.error('Error fetching dashboard data:', err);
    }
  });
}

}
