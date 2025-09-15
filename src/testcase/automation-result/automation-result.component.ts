import { Component, OnInit } from '@angular/core';
import { AzureReportService } from '../../app/shared/services/azure-report.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-automation-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './automation-result.component.html',
  styleUrls: ['./automation-result.component.css']
})
export class AutomationResultComponent implements OnInit {
  sanitizedHtml: SafeHtml = '';
  error: string | null = null;
  isLoading: boolean = true;
  showDummyData: boolean = false;

  // Dummy data fallback
  private dummyHtml = `
    <div class="report-container">
      <h3>Report</h3>
      <table>
        <thead>
          <tr><th>Test Case</th><th>Status</th><th>Duration</th></tr>
        </thead>
        <tbody>
          <tr><td>Login Test</td><td class="passed">Passed</td><td>1.2s</td></tr>
          <tr><td>Data Export</td><td class="failed">Failed</td><td>3.5s</td></tr>
          <tr><td>Dashboard Load</td><td class="passed">Passed</td><td>2.1s</td></tr>
        </tbody>
      </table>
      <div class="api-link">
        <a href="http://localhost:5090/api/azure/report" target="_blank">View actual report in new tab</a>
      </div>
    </div>
  `;

  constructor(
    private reportService: AzureReportService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadAutomationResults();
  }

  loadAutomationResults(): void {
    this.isLoading = true;
    this.error = null;
    this.showDummyData = false;
    
    this.reportService.getReport().subscribe({
      next: (html) => {
        this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(html);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(this.dummyHtml);
        this.showDummyData = true;
        this.isLoading = false;
      }
    });
  }
}