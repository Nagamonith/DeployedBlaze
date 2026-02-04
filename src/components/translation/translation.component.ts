// import {
//   AfterViewInit,
//   Component,
//   ElementRef,
//   OnDestroy,
//   OnInit,
//   ViewChild
// } from '@angular/core';
// import jspreadsheet from 'jspreadsheet';

// @Component({
//   selector: 'app-translation',
//   standalone: true,
//   templateUrl: './translation.component.html',
//   styleUrl: './translation.component.css'
// })
// export class TranslationComponent
//   implements OnInit, AfterViewInit, OnDestroy {

//   @ViewChild('spreadsheet', { static: true })
//   spreadsheet!: ElementRef<HTMLDivElement>;

//   worksheets!: jspreadsheet.worksheetInstance[];

//   columns: any[] = [];
//   tableData: any[] = [];

//   constructor() {
//     jspreadsheet.setLicense('YOUR_LICENSE_KEY');
//   }

//   /* ---------------- INIT ---------------- */

//   ngOnInit(): void {
//     const backendResponse = {
//       Columns: [
//         { title: 'ID', type: 'Integer', width: 80 },
//         { title: 'Key', type: 'String', width: 160 },
//         { title: 'English', type: 'String', width: 220 },
//         { title: 'French', type: 'String', width: 220 },
//         { title: 'Status', type: 'Dropdown', source: ['Active', 'Inactive'] },
//         { title: 'Created On', type: 'Date Time', width: 160 }
//       ],
//       Data: [
//         [1, 'LOGIN_BTN', 'Login', 'Connexion', 'Active', '2025-01-01'],
//         [2, 'LOGOUT_BTN', 'Logout', 'Déconnexion', 'Inactive', '2025-01-03']
//       ]
//     };

//     this.columns = this.mapColumns(backendResponse.Columns);
//     this.tableData = backendResponse.Data;
//   }

//   ngAfterViewInit(): void {
//     this.renderSpreadsheet();
//   }

//   ngOnDestroy(): void {
//     jspreadsheet.destroyAll();
//   }

//   /* ---------------- RENDER ---------------- */

//   renderSpreadsheet(): void {
//     jspreadsheet.destroyAll();

//     this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, [
//       {
//         data: this.tableData,
//         columns: this.columns,
//         editable: true,
//         tableOverflow: true,
//         columnDrag: false
//       }
//     ]);
//   }

//   /* ---------------- COLUMN MAPPING ---------------- */

//   private mapColumns(cols: any[]): any[] {
//     return cols.map(col => ({
//       title: col.title,
//       width: col.width ?? 120,
//       type: this.mapType(col.type),
//       source: col.source
//     }));
//   }

//   private mapType(type: string): string {
//     switch (type) {
//       case 'Integer':
//       case 'Float':
//         return 'number';
//       case 'Date':
//       case 'Date Time':
//         return 'calendar';
//       case 'Dropdown':
//         return 'dropdown';
//       default:
//         return 'text';
//     }
//   }

//   /* ---------------- ACTIONS ---------------- */

//   enableEdit(): void {
//     this.worksheets[0].setConfig({ editable: true });
//   }

//   disableEdit(): void {
//     this.worksheets[0].setConfig({ editable: false });
//   }

//   save(): void {
//     const payload = {
//       Columns: this.columns,
//       Data: this.worksheets[0].getData()
//     };

//     console.log('✅ JSON to send to backend:', payload);
//   }
// }
