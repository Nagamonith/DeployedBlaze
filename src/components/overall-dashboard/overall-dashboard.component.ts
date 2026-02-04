import * as XLSX from 'xlsx';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DxTabPanelModule } from "devextreme-angular";
import { LoaderService } from '../../app/services/loader.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';



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

 
// exportToExcel(): void {
//   const url = `${this.apiBaseUrl}/api/EmployeeDashboard/GetDashboard?fromDate=${this.startDate}&toDate=${this.endDate}`;

//   this.http.get<any[]>(url).subscribe({
//     next: (jsonData) => {
//       const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);

//       const workbook: XLSX.WorkBook = { 
//         Sheets: { 'Dashboard': worksheet }, 
//         SheetNames: ['Dashboard'] 
//       };

//       XLSX.writeFile(workbook, `Dashboard_${this.startDate}.xlsx`);
//     },
//     error: (err) => console.error('Export failed', err)
//   });
// }
exportToExcel(): void {

  const url =
    `${this.apiBaseUrl}/api/EmployeeDashboard/GetDashboard?fromDate=${this.startDate}&toDate=${this.endDate}`;

  this.http.get<any[]>(url).subscribe({

    next: (jsonData) => {

      // ✅ Sort by Date Ascending
      jsonData.sort((a: any, b: any) =>
        new Date(a.Date).getTime() - new Date(b.Date).getTime()
      );

      // ✅ Format Date Only (remove time)
      const cleanedData = jsonData.map((row: any) => ({
        EmpId: row.EmpId,
        EmpName: row.EmpName,
        EmpMail: row.EmpMail,
        Date: row.Date ? row.Date.substring(0, 10) : "",   // ✅ yyyy-MM-dd only
        Type: row.Type,
        LoginTime: row.LoginTime ? row.LoginTime.substring(11, 19) : "",
        LogoutTime: row.LogoutTime ? row.LogoutTime.substring(11, 19) : "",
        TotalTime: row.TotalTime,
        DeskTime: row.DeskTime
      }));

      // ✅ Convert to Worksheet
      const worksheet: XLSX.WorkSheet =
        XLSX.utils.json_to_sheet(cleanedData);

      // ✅ Set Column Widths (Auto Friendly)
      worksheet["!cols"] = [
        { wch: 10 },  // EmpId
        { wch: 25 },  // EmpName
        { wch: 35 },  // EmpMail
        { wch: 15 },  // Date
        { wch: 12 },  // Type
        { wch: 12 },  // LoginTime
        { wch: 12 },  // LogoutTime
        { wch: 12 },  // TotalTime
        { wch: 12 }   // DeskTime
      ];

      // ✅ Workbook Creation
      const workbook: XLSX.WorkBook = {
        Sheets: { Dashboard: worksheet },
        SheetNames: ["Dashboard"]
      };

      // ✅ Export File
      XLSX.writeFile(
        workbook,
        `Dashboard_${this.startDate}_to_${this.endDate}.xlsx`
      );
    },

    error: (err) => console.error("Export failed", err)
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
  

// exportAttendanceReport(): void {

//   if (!this.startDate || !this.endDate) {
//     alert('Please select From and To dates');
//     return;
//   }

//   this.loader.showLoader();

//   const url = `${this.apiBaseUrl}/api/EmployeeDashboard/GetDashboard?fromDate=${this.startDate}&toDate=${this.endDate}`;

//   this.http.get<any[]>(url).subscribe({
//     next: (data) => {
//       this.loader.hideLoader();

//       // ✅ STEP 1: Exclude ONLY weekends + holidays
//       const filtered = data.filter(d =>
//         d.Type !== 'Weekend' &&
//         d.Type !== 'Holiday'
//       );

//       // ✅ STEP 2: Group by employee
//       const grouped: any = {};

//       filtered.forEach(row => {

//         if (!grouped[row.EmpId]) {
//           grouped[row.EmpId] = {
//             empId: row.EmpId,
//             empName: row.EmpName,
//             empMail: row.EmpMail,

//             officeCount: 0,
//             wfhCount: 0,
//             leaveCount: 0,

//             totalWorkMinutes: 0,
//             totalDeskMinutes: 0,

//             details: []
//           };
//         }

//         // Count Types
//         if (row.Type === 'Office') grouped[row.EmpId].officeCount++;
//         if (row.Type === 'WFH') grouped[row.EmpId].wfhCount++;
//         if (row.Type === 'Leave') grouped[row.EmpId].leaveCount++;

//         // Convert HH:mm:ss → Minutes
//         const toMinutes = (time: string) => {
//           if (!time) return 0;
//           const parts = time.split(':').map(Number);
//           return (parts[0] * 60) + parts[1];
//         };

//         grouped[row.EmpId].totalWorkMinutes += toMinutes(row.TotalTime);
//         grouped[row.EmpId].totalDeskMinutes += toMinutes(row.DeskTime);

//         grouped[row.EmpId].details.push(row);
//       });

//       // ✅ STEP 3: Create PDF Document
//       const doc = new jsPDF();

//       // ===============================
//       // WATERMARK
//       // ===============================
//       // const addWatermark = () => {
//       //   doc.setFontSize(35);
//       //   doc.setTextColor(220, 220, 220);
//       //   doc.text("Datalyzer Technologies Ltd", 20, 160, {
//       //     angle: 30
//       //   });
//       //   doc.setTextColor(0, 0, 0);
//       // };

//       // ===============================
//       // HEADER + FOOTER
//       // ===============================
//       const addHeaderFooter = (page: number) => {

//         doc.setFontSize(13);
//         doc.setTextColor(40);
//         doc.text("Datalyzer Technologies Ltd", 14, 15);

//         doc.setFontSize(10);
//         doc.text(
//           `Period: ${this.startDate} to ${this.endDate}`,
//           14,
//           22
//         );

//         // Footer
//         doc.setFontSize(9);
//         doc.text(
//           `Generated by Blaze Dashboard`,
//           14,
//           290
//         );

//         doc.text(`Page ${page}`, 190, 290, { align: "right" });
//       };

//       // ===============================
//       // ✅ SUMMARY TABLE (PAGE 1)
//       // ===============================
//       let summaryRows: any[] = [];

//       let totalOffice = 0;
//       let totalWFH = 0;
//       let totalLeaves = 0;
//       let totalWorkMinutes = 0;
//       let totalDeskMinutes = 0;

//       Object.values(grouped).forEach((emp: any) => {

//         totalOffice += emp.officeCount;
//         totalWFH += emp.wfhCount;
//         totalLeaves += emp.leaveCount;

//         totalWorkMinutes += emp.totalWorkMinutes;
//         totalDeskMinutes += emp.totalDeskMinutes;

//         summaryRows.push([
//           emp.empName,
//           emp.officeCount,
//           emp.wfhCount,
//           emp.leaveCount,
//           (emp.totalWorkMinutes / 60).toFixed(1),
//           (emp.totalDeskMinutes / 60).toFixed(1)
//         ]);
//       });

//       // ✅ Add Grand Total Row
//       summaryRows.push([
//         "TOTAL",
//         totalOffice,
//         totalWFH,
//         totalLeaves,
//         (totalWorkMinutes / 60).toFixed(1),
//         (totalDeskMinutes / 60).toFixed(1)
//       ]);

//       // addWatermark();
//       addHeaderFooter(1);

//       autoTable(doc, {
//         startY: 35,
//         head: [[
//           "Employee Name",
//           "Office Days",
//           "WFH Days",
//           "Leaves",
//           "Work Hours",
//           "Desk Hours"
//         ]],
//         body: summaryRows,

//         theme: "grid",

//         headStyles: {
//           fillColor: [52, 152, 219],
//           textColor: 255,
//           fontStyle: "bold"
//         },

//         didParseCell: function (data) {
//           // Highlight Total Row
//           if (data.row.index === summaryRows.length - 1) {
//             data.cell.styles.fillColor = [46, 204, 113];
//             data.cell.styles.textColor = 255;
//             data.cell.styles.fontStyle = "bold";
//           }
//         }
//       });

//       // ===============================
//       // ✅ EMPLOYEE DETAILS PAGES
//       // ===============================
//       let pageNumber = 2;

//       Object.values(grouped).forEach((emp: any) => {

//         doc.addPage();
//         // addWatermark();
//         addHeaderFooter(pageNumber);

//         // Sort by Date
//         emp.details.sort((a: any, b: any) =>
//           new Date(a.Date).getTime() - new Date(b.Date).getTime()
//         );

//         // Employee Header Block
//         doc.setFontSize(11);
//         doc.text(`Employee ID   : ${emp.empId}`, 14, 35);
//         doc.text(`Employee Name : ${emp.empName}`, 14, 42);
//         doc.text(`Email         : ${emp.empMail}`, 14, 49);

//         doc.text(`Office Days : ${emp.officeCount}`, 14, 60);
//         doc.text(`WFH Days    : ${emp.wfhCount}`, 14, 67);
//         doc.text(`Leaves      : ${emp.leaveCount}`, 14, 74);

//         // Detail Table
//         autoTable(doc, {
//           startY: 85,

//           head: [["Date", "Type", "Login", "Logout", "Total", "Desk"]],

//           body: emp.details.map((d: any) => [
//             d.Date,
//             d.Type,
//             d.LoginTime ? d.LoginTime.substring(11, 19) : "-",
//             d.LogoutTime ? d.LogoutTime.substring(11, 19) : "-",
//             d.TotalTime,
//             d.DeskTime
//           ]),

//           theme: "striped",

//           headStyles: {
//             fillColor: [155, 89, 182],
//             textColor: 255
//           },

//           styles: {
//             fontSize: 9
//           },

//           didParseCell: function (data) {

//             // Color-code Types
//             if (data.column.index === 1) {

//               if (data.cell.text[0] === "WFH") {
//                 data.cell.styles.fillColor = [241, 196, 15];
//               }

//               if (data.cell.text[0] === "Leave") {
//                 data.cell.styles.fillColor = [231, 76, 60];
//                 data.cell.styles.textColor = 255;
//               }

//               if (data.cell.text[0] === "Office") {
//                 data.cell.styles.fillColor = [46, 204, 113];
//                 data.cell.styles.textColor = 255;
//               }
//             }
//           }
//         });

//         pageNumber++;
//       });

//       // ===============================
//       // SAVE PDF
//       // ===============================
//       doc.save(`Attendance_Report_${this.startDate}_${this.endDate}.pdf`);
//     },

//     error: () => {
//       this.loader.hideLoader();
//       alert("Failed to generate report");
//     }
//   });
// }
exportAttendanceReport(): void {



  this.loader.showLoader();

  const url =
    `${this.apiBaseUrl}/api/EmployeeDashboard/GetDashboard?fromDate=${this.startDate}&toDate=${this.endDate}`;

  this.http.get<any[]>(url).subscribe({

    next: (data) => {

      this.loader.hideLoader();

      // ✅ Exclude ONLY Weekends
      const filtered = data.filter(x => x.Type !== "Weekend");

      // -------------------------------
      // ✅ Safe Time Conversion Helpers
      // -------------------------------

      const toMinutes = (time: string) => {

        if (!time) return 0;

        if (time.toLowerCase().includes("nan")) return 0;

        if (!time.includes(":")) return 0;

        const parts = time.split(":").map(Number);

        if (parts.some(isNaN)) return 0;

        const hours = parts[0] || 0;
        const minutes = parts[1] || 0;

        return (hours * 60) + minutes;
      };

      const minutesToHHMM = (mins: number) => {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
      };

      // -------------------------------
      // ✅ Group Employee Data
      // -------------------------------

      const grouped: any = {};

      filtered.forEach(row => {

        if (row.Type === "Holiday") return; // ❌ Skip Holidays fully

        if (!grouped[row.EmpId]) {
          grouped[row.EmpId] = {
            empId: row.EmpId,
            empName: row.EmpName,
            empMail: row.EmpMail,

            officeCount: 0,
            wfhCount: 0,
            leaveCount: 0,

            totalWorkMinutes: 0,
            totalDeskMinutes: 0,

            details: []
          };
        }

        // ✅ Count Days
        if (row.Type === "Office") grouped[row.EmpId].officeCount++;
        if (row.Type === "WFH") grouped[row.EmpId].wfhCount++;
        if (row.Type === "Leave") grouped[row.EmpId].leaveCount++;

        // ✅ Total Work Hours (NaN safe)
        grouped[row.EmpId].totalWorkMinutes += toMinutes(row.TotalTime);

        // ✅ Total Desk Hours (NaN safe)
        grouped[row.EmpId].totalDeskMinutes += toMinutes(row.DeskTime);

        grouped[row.EmpId].details.push(row);
      });

      // -------------------------------
      // ✅ Sort Employees by EmpId
      // -------------------------------

      const sortedEmployees = Object.values(grouped).sort((a: any, b: any) =>
        a.empId.localeCompare(b.empId)
      );

      // -------------------------------
      // ✅ Grand Totals
      // -------------------------------

      let grandOffice = 0;
      let grandWFH = 0;
      let grandLeave = 0;
      let grandWorkMinutes = 0;
      let grandDeskMinutes = 0;

      sortedEmployees.forEach((emp: any) => {
        grandOffice += emp.officeCount;
        grandWFH += emp.wfhCount;
        grandLeave += emp.leaveCount;
        grandWorkMinutes += emp.totalWorkMinutes;
        grandDeskMinutes += emp.totalDeskMinutes;
      });

      // -------------------------------
      // ✅ Create PDF Document
      // -------------------------------

      const doc = new jsPDF();

      // -------------------------------
      // ✅ Header + Footer + Watermark
      // -------------------------------

      const addHeaderFooter = () => {

        // Header
        doc.setFontSize(14);
        doc.setTextColor(30);
        doc.text("Datalyzer Technologies Ltd                                Employee Attendance Report", 14, 15);

        doc.setFontSize(10);
        doc.text(
          `Period: ${this.startDate} to ${this.endDate}`,
          14,
          22
        );

        // // Watermark
        // doc.setFontSize(40);
        // doc.setTextColor(230);
        // doc.text("Datalyzer Technologies Ltd", 25, 160, {
        //   angle: 30
        // });

        // Footer
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(
          `Generated on: ${new Date().toLocaleDateString() } by Blaze Dashboard`,
          14,
          290
        );
      };

      // -------------------------------
      // ✅ Page 1 Summary Table
      // -------------------------------

      addHeaderFooter();

      const summaryBody = sortedEmployees.map((emp: any) => [
        emp.empId,
        emp.empName,
        emp.officeCount,
        emp.wfhCount,
        emp.leaveCount,
        minutesToHHMM(emp.totalWorkMinutes),
        minutesToHHMM(emp.totalDeskMinutes)
      ]);

      // ✅ Add Total Row
      summaryBody.push([
        "TOTAL",
        "",
        grandOffice,
        grandWFH,
        grandLeave,
        minutesToHHMM(grandWorkMinutes),
        minutesToHHMM(grandDeskMinutes)
      ]);

      autoTable(doc, {
        startY: 30,
        head: [[
          "Emp ID",
          "Employee Name",
          "Office",
          "WFH",
          "Leaves",
          "Work Hours",
          "Desk Hours"
        ]],
        body: summaryBody,
        theme: "grid",
        headStyles: {
          fillColor: [30, 60, 120],
          textColor: 255,
          fontStyle: "bold"
        },
        styles: {
          fontSize: 9,
          cellPadding: 3
        }
      });

      // -------------------------------
      // ✅ Employee Individual Pages
      // -------------------------------

      sortedEmployees.forEach((emp: any) => {

        doc.addPage();
        addHeaderFooter();

        doc.setFontSize(11);
        doc.setTextColor(0);

        doc.text(`Employee ID   : ${emp.empId}`, 14, 35);
        doc.text(`Employee Name : ${emp.empName}`, 14, 43);
        doc.text(`Email         : ${emp.empMail}`, 14, 51);

        doc.text(`Office Days : ${emp.officeCount}`, 14, 63);
        doc.text(`WFH Days    : ${emp.wfhCount}`, 14, 71);
        doc.text(`Leaves      : ${emp.leaveCount}`, 14, 79);

        // ✅ Sort Employee Details by Date
        emp.details.sort((a: any, b: any) =>
          new Date(a.Date).getTime() - new Date(b.Date).getTime()
        );

        autoTable(doc, {
          startY: 90,
          head: [[
            "Date",
            "Type",
            "Login",
            "Logout",
            "Total Time",
            "Desk Time"
          ]],
          body: emp.details.map((d: any) => [
            d.Date.substring(0, 10),
            d.Type,
            d.LoginTime ? d.LoginTime.substring(11, 19) : "",
            d.LogoutTime ? d.LogoutTime.substring(11, 19) : "",
            d.TotalTime,
            d.DeskTime
          ]),
          theme: "striped",
          headStyles: {
            fillColor: [50, 100, 180],
            textColor: 255
          },
          styles: {
            fontSize: 9,
            cellPadding: 2
          }
        });
      });

      // -------------------------------
      // ✅ Save PDF
      // -------------------------------

      doc.save(
        `Attendance_Report_${this.startDate}_${this.endDate}.pdf`
      );
    },

    error: () => {
      this.loader.hideLoader();
      alert("Failed to generate report");
    }
  });
}



}
