import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../app/shared/services/product.service';
import { Product } from '../../app/shared/modles/product.model'; // Make sure path is correct
import { PageTitleService } from '../../app/shared/services/page-title.service';

@Component({
  selector: 'app-tester-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tester-dashboard.component.html',
  styleUrls: ['./tester-dashboard.component.css'],
})
export class TesterDashboardComponent implements OnInit {
  products: Product[] = [];
  expandedProductId: string | null = null;
  expandedResultsProductId: string | null = null;
  generalExpanded: boolean = false;
  sidebarOpen = true;
  currentProductName: string | null = null;
  expandedTestRunManagementProductId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private pageTitleService: PageTitleService
  ) {}

  ngOnInit(): void {
    this.pageTitleService.setTitle('Test Case Management');
    
    this.route.queryParams.subscribe((params) => {
      if (params['productName']) {
        this.currentProductName = params['productName'];
      }
    });

    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleProduct(productId: string): void {
    this.expandedProductId =
      this.expandedProductId === productId ? null : productId;
    this.expandedResultsProductId = null;
  }

  toggleResults(productId: string): void {
    this.expandedResultsProductId =
      this.expandedResultsProductId === productId ? null : productId;
  }

  toggleGeneral(): void {
    this.generalExpanded = !this.generalExpanded;
  }

  onAutomationClick(): void {
    alert('Automation Results feature coming soon!');
  }

  toggleTestRunManagement(productId: string): void {
    this.expandedTestRunManagementProductId =
      this.expandedTestRunManagementProductId === productId ? null : productId;
  }
}
