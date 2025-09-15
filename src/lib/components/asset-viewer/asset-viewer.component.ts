// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common'; // <-- Add this import
// import { HttpClient } from '@angular/common/http';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-asset-viewer',
//   standalone: true, // <-- If using standalone component
//   imports: [CommonModule], // <-- Add CommonModule here
//   templateUrl: './asset-viewer.component.html',
//   styleUrls: ['./asset-viewer.component.css']
// })
// export class AssetViewerComponent implements OnInit {
//   assetId: string = '';
//   type: string = '';
//   employeeId: string = '';
//   notFound = false;
//   apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url;

//   constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}
//   requiredFieldsMap: { [type: string]: string[] } = {
//     'Server': ['Server Name','Host Name', 'Manufacturer', 'OS','RAM','Processor','HDD', 'Ownership','Status'],
//     'Laptop': ['Email','Manufacturer','Model', 'CPU','OS','RAM','HDD','SSD','Ownership(company/personal)', 'Remarks'],
//     'CPU': ['Email','Manufacturer', 'Model', 'Processor', 'OS','RAM', 'HDD', 'SSD'],
//   'Charger': ['Brand', 'Power'],
//   'Keyboard': ['Brand', 'Type'],
//   'Mouse': ['Brand', 'Type'],
//   'Pendrive': ['Brand', 'Capacity'],
//   'Chair': ['Type', 'Color'],
//   'AC': ['Email','Manufacturer','Model','Location'],
//   'Refrigerator': ['Email','Manufacturer','Model','Location'],
//   'Monitor': ['Email','Manufacturer','Model','Location'],
//   'Switch':['Manufacturer','Host IP Address','Date of Purchase','Model','Host Name','Ownership'],
//   'Router': ['Manufacturer', 'Host IP Address', 'Date of Purchase', 'Model', 'Host Name', 'Ownership'],
//   'Firewall': ['Manufacturer', 'Host IP Address', 'Date of Purchase', 'Expire On','Model', 'Serial Number','Registered Email','Ownership'],
//   'Antivirus': ['Reg Email ID', 'Reg. Mobile No','Date of Purchase', 'Expires On', 'Ownership'], 
//   'Office 365':['Reg Email ID', 'Reg. Mobile No','License Type','Started On', 'Expires On', 'No of License Procured','Account ID','Ownership'], 
//   'Software License': ['Reg Email ID', 'Software Name', 'Renewal Period','Started On', 'Expires On', 'No of License Procured','Ownership'],
//   'Asset Disposal': ['Asset Id', 'Asset Type', 'Disposed Date', 'Disposed By', 'Remarks'],
//   'Hand Dryer':['Email','Manufacturer','Model','Location'],
//   'Microwave Oven': ['Email','Manufacturer','Model','Location'],
//   'Induction': ['Email','Manufacturer','Model','Location'],
//   'Water Purifier': ['Email','Manufacturer','Model','Location'],
//   'Printer': ['Email','Manufacturer','Model','Location'],
//   'Shredder': ['Email','Manufacturer','Model','Location'],
//   'Adaptor': ['Email','Manufacturer','Model','Location'],
//   'Other': []
// };
// assetType: string = '';
// assetData: any = {};

//   // ngOnInit() {
//   //   const assetTag = this.route.snapshot.paramMap.get('assetTag');
//   //   if (assetTag) {
//   //     this.http.get<any>(`${this.apiBaseUrl}/api/assets/by-asset-tag/${assetTag}`)
//   //       .subscribe({
//   //         next: asset => {
//   //           if (asset && asset.data) {
//   //             const parsed = JSON.parse(asset.data);
//   //             // AssetId and type are always present
//   //             this.assetId = asset.assetId || parsed.AssetId || 'N/A';
//   //             this.type = asset.type || parsed.Type || 'N/A';
//   //             // EmployeeId may be missing or empty
//   //             this.employeeId = (parsed.EmployeeId && parsed.EmployeeId.trim())
//   //               ? parsed.EmployeeId
//   //               : (asset.employeeId && asset.employeeId.trim())
//   //                 ? asset.employeeId
//   //                 : '';
//   //           } else {
//   //             this.notFound = true;
//   //           }
//   //         },
//   //         error: () => { this.notFound = true; }
//   //       });
//   //   } else {
//   //     this.notFound = true;
//   //   }
//   // }
//   ngOnInit() {
//   const assetTag = this.route.snapshot.paramMap.get('assetTag');
//   if (assetTag) {
//     this.http.get<any>(`${this.apiBaseUrl}/api/assets/by-asset-tag/${assetTag}`)
//       .subscribe({
//         next: asset => {
//           if (asset && asset.data) {
//             this.assetType = asset.type || 'Other';
//             this.assetData = JSON.parse(asset.data);
//           } else {
//             this.notFound = true;
//           }
//         },
//         error: () => { this.notFound = true; }
//       });
//   } else {
//     this.notFound = true;
//   }
// }

//   goToLogin() {
//     this.router.navigate(['/login']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asset-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asset-viewer.component.html',
  styleUrls: ['./asset-viewer.component.css']
})
export class AssetViewerComponent implements OnInit {
  assetId: string = '';
  type: string = '';
  employeeId: string = '';
  notFound = false;
  apiBaseUrl = JSON.parse(sessionStorage.getItem('config') || '{}').url;

  assetType: string = '';
  assetData: any = {};
  requiredFields: string[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const assetTag = this.route.snapshot.paramMap.get('assetTag');
    if (assetTag) {
      this.http.get<any>(`${this.apiBaseUrl}/api/assets/by-asset-tag/${assetTag}`)
        .subscribe({
          next: asset => {
            if (asset && asset.data) {
              this.assetType = asset.type || 'Other';
              this.assetData = JSON.parse(asset.data);

              // Fetch field definitions from DB based on type
              this.fetchFieldDefinitions(this.assetType);
            } else {
              this.notFound = true;
            }
          },
          error: () => { this.notFound = true; }
        });
    } else {
      this.notFound = true;
    }
  }

  fetchFieldDefinitions(type: string) {
    this.http.get<string[]>(`${this.apiBaseUrl}/api/assets/types/${encodeURIComponent(type)}/fields`)
      .subscribe({
        next: fields => {
          this.requiredFields = fields || [];
        },
        error: () => {
          this.requiredFields = []; // fallback
        }
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
