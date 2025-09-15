import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { PageTitleService } from '../shared/page-service/page-title.sevices';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'

})
export class HeaderComponent implements OnInit {
  dropdownOpen = false;
  selectedItem: string | null = null;
  dataSubscription!: Subscription;

  currentPageTitle: string = ''; 

  constructor(
    private router: Router,
    private pageTitleService: PageTitleService 
  ) {}

  ngOnInit(): void {
    // Subscribe to the title observable
    this.pageTitleService.pageTitle$.subscribe(title => {
      this.currentPageTitle = title;
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string, event: Event): void {
    event.stopPropagation(); // Prevent click from bubbling to wrapper
    this.selectedItem = option;
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const insideDropdown = target.closest('.custom-dropdown-wrapper');
    if (!insideDropdown) {
      this.dropdownOpen = false;
    }
  }
}
