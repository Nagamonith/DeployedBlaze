import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bug-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.css']
})
export class BugDetailsComponent implements OnInit {
  bugId: number = 0;
  targetVersion: string = '';
  bugTaskDetails: any[] = [];
  timeTracking: any[] = [];
  loading = false;
  error = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.bugId = +params['bugid'];
      this.targetVersion = params['version'];

      if (this.bugId && this.targetVersion) {
        this.loadBugData();
      }
    });
  }

  loadBugData(): void {
    this.loading = true;
    this.http.get<any>(`http://localhost:5238/api/Bug/GetAllBugDataRaw?bguid=${this.bugId}&btversion=${this.targetVersion}`)
      .subscribe({
        next: (data) => {
          this.bugTaskDetails = data.bugTaskDetails || [];
          this.timeTracking = data.timeTracking || [];
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load bug details';
          this.loading = false;
        }
      });
  }
 gotoprevious(){
  window.history.back();
 }
}
