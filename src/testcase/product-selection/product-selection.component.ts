import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ProductService } from '../../app/shared/services/product.service';
import { Product } from '../../app/shared/modles/product.model';

@Component({
  selector: 'app-product-selection',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.css']
})
export class ProductSelectionComponent {
  private router = inject(Router);
  private productService = inject(ProductService);

  products: Product[] = [];

  newProductName = '';
  showAddForm = false;

  contextMenuIndex: number | null = null;
  menuX = 0;
  menuY = 0;

  editingIndex: number | null = null;
  editedProductName = '';

  constructor() {
    document.addEventListener('click', () => {
      this.contextMenuIndex = null;
    });
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  toggleAddProduct() {
    this.showAddForm = true;
  }

  saveProduct() {
    if (!this.newProductName.trim()) return;
    this.productService.createProduct({ name: this.newProductName, isActive: true }).subscribe(() => {
      this.newProductName = '';
      this.showAddForm = false;
      this.loadProducts();
    });
  }

  clearForm() {
    this.newProductName = '';
    this.showAddForm = false;
  }

  selectProduct(product: Product) {
    this.router.navigate(['/tester'], { queryParams: { productId: product.id, productName: product.name } });
  }

  onRightClick(event: MouseEvent, index: number) {
    event.preventDefault();
    this.contextMenuIndex = index;
    this.menuX = event.clientX;
    this.menuY = event.clientY;
  }

  startEdit(index: number) {
    this.editingIndex = index;
    this.editedProductName = this.products[index].name;
    this.contextMenuIndex = null; // Close right-click menu
  }

  saveEdit(index: number) {
    if (this.editedProductName.trim()) {
      this.products[index].name = this.editedProductName.trim();
    }
    this.editingIndex = null;
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  deleteProduct(index: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const product = this.products[index];
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.loadProducts();
    });
    this.contextMenuIndex = null;
    if (this.editingIndex === index) {
      this.editingIndex = null;
    }
  }
}
