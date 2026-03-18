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


import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import jspreadsheet from "jspreadsheet";
import "jspreadsheet/dist/jspreadsheet.css";
import "jsuites/dist/jsuites.css";

// Set your JSS license key (The following key only works for one day)
jspreadsheet.setLicense('MmE1NmViMDI4YzA2NWFjMjBiMGZmZjhlNmUwNGU1M2Q0MGVhN2NhY2QyNGE0YmRlMDI2MThmYjU1OTIxNDJhMGM1NTdkOWY5YTRiNWFlZTRlOGY1OGU5OGY3OWIzOWExZDU1ZTE1YmNlMzlmMjM3YWQyMTgzNTQ4OWIzYWIxZTMsZXlKamJHbGxiblJKWkNJNklpSXNJbTVoYldVaU9pSktjM0J5WldGa2MyaGxaWFFpTENKa1lYUmxJam94Tnpjd09ERXdNRFF4TENKa2IyMWhhVzRpT2xzaWFuTndjbVZoWkhOb1pXVjBMbU52YlNJc0ltTnZaR1Z6WVc1a1ltOTRMbWx2SWl3aWFuTm9aV3hzTG01bGRDSXNJbU56WWk1aGNIQWlMQ0p6ZEdGamEySnNhWFI2TG1sdklpd2lkMlZpWTI5dWRHRnBibVZ5TG1sdklpd2liRzlqWVd4b2IzTjBJbDBzSW5Cc1lXNGlPaUl6TkNJc0luTmpiM0JsSWpwYkluWTNJaXdpZGpnaUxDSjJPU0lzSW5ZeE1DSXNJbll4TVNJc0luWXhNaUlzSW1Ob1lYSjBjeUlzSW1admNtMXpJaXdpWm05eWJYVnNZU0lzSW5CaGNuTmxjaUlzSW5KbGJtUmxjaUlzSW1OdmJXMWxiblJ6SWl3aWFXMXdiM0owWlhJaUxDSmlZWElpTENKMllXeHBaR0YwYVc5dWN5SXNJbk5sWVhKamFDSXNJbkJ5YVc1MElpd2ljMmhsWlhSeklpd2lZMnhwWlc1MElpd2ljMlZ5ZG1WeUlpd2ljMmhoY0dWeklpd2labTl5YldGMElpd2ljR2wyYjNRaVhTd2laR1Z0YnlJNmRISjFaWDA9');

@Component({
   
 selector: 'app-translation',
  standalone: true,
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.css'
})
export class TranslationComponent implements AfterViewInit {
    @ViewChild("spreadsheet") spreadsheet!: ElementRef;
    // Worksheets
    worksheets!: jspreadsheet.worksheetInstance[];
    // Create a new data grid
    ngAfterViewInit() {
        // Create spreadsheet
        this.worksheets = jspreadsheet(this.spreadsheet.nativeElement, {
            worksheets: [{
               columnResize:true,
               data: [
     [ 'LOGIN_BTN', 'Login', 'Connexion', 'Active', 'ahslah'],
       [ 'LOGOUT_BTN', 'Logout', 'Déconnexion', 'Inactive', 'tsksv']
   ],
                minDimensions: [20, 20],
                
                columns: [
                  
                    {
                        type: "text",
                        title:'key',
                        readOnly:true
                        
                    },
                     {
                        type: "text",
                        title:'ENGLISH'
                    },
                     {
                        type: "text",
                        title:'French'
                    },
                     {
                        type: "text",
                        title:'UK'
                    },
                     {
                        type: "text",
                        title:'German'
                    }
                ]
            }]
        });
    }
}