import { Component, signal, OnInit, computed, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../app/shared/services/product.service';
import { TestCaseService } from '../../app/shared/services/test-case.service';
import { AutoSaveService } from '../../app/shared/services/auto-save.service';
// import {
//   faPlus, faCube, faCodeBranch, faList, faCheck, faTimes,
//   faSave, faEdit, faTrash, faBoxOpen, faCubes, faTags, faLayerGroup
// } from '@fortawesome/free-solid-svg-icons';
import { AlertComponent } from "../../app/shared/alert/alert.component";

import { Product, ProductVersionResponse } from '../../app/shared/modles/product.model';
import { ProductModule } from '../../app/shared/modles/module.model';
import { ModuleService } from '../../app/shared/services/module.service';

interface Module extends ProductModule {
  editing?: boolean;
}
// Add this in your component file (extra-adds.component.ts)
interface ModuleWithUI extends ProductModule {
  editing?: boolean;
  testCaseCount?: number;  // Make this optional since it's UI-specific
  versionCount?: number;   // Make this optional since it's UI-specific
}
type PendingAction = 'addModule' | 'addVersion' | 'toggleModules' | null;

@Component({
  selector: 'app-extra-adds',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent],
  templateUrl: './extra-adds.component.html',
  styleUrls: ['./extra-adds.component.css']
})
export class ExtraAddsComponent implements OnInit {
  // Services
  private productService = inject(ProductService);
  private testCaseService = inject(TestCaseService);
  private autoSaveService = inject(AutoSaveService);
  private cdr = inject(ChangeDetectorRef);
  private moduleService = inject(ModuleService);

  openCard(card: 'addProduct' | 'addModule' | 'addVersion' | 'showModules' | 'showProducts' | 'autoSave') {
    this.closeAllCards();
    switch (card) {
      case 'addProduct':
        this.showAddProductForm = true;
        break;
      case 'addModule':
        this.showAddModuleForm = true;
        break;
      case 'addVersion':
        this.showAddVersionForm = true;
        break;
      case 'showModules':
        this.showModuleList = true;
        break;
      case 'showProducts':
        this.showProducts = true;
        break;
      case 'autoSave':
        this.showAutoSavePopup = true;
        break;
    }
  }

  // Add this method to close all cards
  closeAllCards() {
    this.showAddProductForm = false;
    this.showAddModuleForm = false;
    this.showAddVersionForm = false;
    this.showModuleList = false;
    this.showProducts = false;
    this.showAutoSavePopup = false;
    this.showProductSelectorModal = false;
  }



  // Icons
  // icons = {
  //   plus: faPlus,
  //   cube: faCube,
  //   codeBranch: faCodeBranch,
  //   list: faList,
  //   check: faCheck,
  //   times: faTimes,
  //   save: faSave,
  //   edit: faEdit,
  //   trash: faTrash,
  //   boxOpen: faBoxOpen,
  //   cubes: faCubes,
  //   tags: faTags,
  //   layerGroup: faLayerGroup
  // };

  // State management
  products = signal<Product[]>([]);
  selectedProductId = signal<string>('');
  modules = signal<ModuleWithUI[]>([]);
  productVersions = signal<ProductVersionResponse[]>([]);
  newProductName = '';
  
  
  // UI toggles
  showAddProductForm = false;
  showProductSelectorModal = false;
  showAddModuleForm = false;
  showAddVersionForm = false;
  showModuleList = false;
  pendingAction: PendingAction = null;
  showProducts = false;
  showAutoSavePopup = false;

  // Form fields
  newModuleName = '';
  newVersionName = '';
  newProductVersion = '';
  versionExists = false;

  // Alert system
  showAlert = false;
  alertMessage = '';
  alertType: 'success' | 'error' | 'warning' | 'info' = 'info';
  isConfirmAlert = false;
  pendingActionData: any = null;

  // Auto-save configuration
  autoSaveEnabled = true;
  selectedInterval = 3000;
  intervalOptions = [
    { label: '3 sec', value: 3000 },
    { label: '5 sec', value: 5000 },
    { label: '10 sec', value: 10000 },
    { label: '30 sec', value: 30000 },
    { label: '1 min', value: 60000 },
    { label: '3 min', value: 180000 }
  ];

  ngOnInit(): void {
    this.initializeAutoSave();
    this.loadProducts();
  }

  private initializeAutoSave(): void {
    this.autoSaveEnabled = this.autoSaveService.isEnabled();
    this.autoSaveService.setInterval(this.selectedInterval);
    if (this.autoSaveEnabled) {
      this.autoSaveService.start(() => {
        console.log('Auto-saving...');
      });
    }
  }

  // Product management
  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        if (!this.selectedProductId() && products.length > 0) {
          this.selectedProductId.set(products[0].id);
          this.loadProductData(products[0].id);
        }
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.showAlertMessage('Failed to load products', 'error');
      }
    });
  }

  private loadProductData(productId: string): void {
    this.loadModules(productId);
    this.loadProductVersions(productId);
  }


private loadModules(productId: string): void {
  this.testCaseService.getModulesByProduct(productId).subscribe({
    next: (modules) => {
      // Transform the modules to include the additional properties
      const extendedModules = modules.map(module => ({
        ...module,
        editing: false,
        testCaseCount: 0, // You'll need to get these values from your API or calculate them
        versionCount: 0   // You'll need to get these values from your API or calculate them
      }));
      this.modules.set(extendedModules);
    },
    error: (error) => console.error('Error loading modules:', error)
  });
}

  private loadProductVersions(productId: string): void {
    this.testCaseService.getProductVersions(productId).subscribe({
      next: (versions) => this.productVersions.set(versions),
      error: (error) => console.error('Error loading product versions:', error)
    });
  }

  addProduct(): void {
    const name = this.newProductName.trim();
    if (!name) {
      this.showAlertMessage('Product name is required', 'warning');
      return;
    }

    this.productService.createProduct({ name, isActive: true }).subscribe({
      next: (response) => {
        this.newProductName = '';
        this.showAddProductForm = false;
        this.loadProducts();
        this.showAlertMessage('Product added successfully', 'success');
      },
      error: (error) => {
        console.error('Failed to add product:', error);
        this.showAlertMessage('Failed to add product. Please try again.', 'error');
      }
    });
  }

  saveProductEdit(product: Product): void {
    const trimmedName = product.name.trim();
    if (!trimmedName) {
      this.showAlertMessage('Product name cannot be empty', 'warning');
      return;
    }

    const updateRequest = {
      name: trimmedName,
      description: product.description,
      isActive: product.isActive
    };

    this.productService.updateProduct(product.id, updateRequest).subscribe({
      next: () => {
        product.editing = false;
        this.loadProducts();
        this.showAlertMessage('Product updated successfully', 'success');
      },
      error: (error) => {
        console.error('Failed to update product:', error);
        this.showAlertMessage('Failed to update product. Please try again.', 'error');
      }
    });
  }

  deleteProduct(productId: string): void {
    this.pendingActionData = { type: 'product', id: productId };
    this.showConfirmAlert('Are you sure you want to delete this product?');
  }

  // Module management
  handleAddModule(): void {
    if (this.products().length === 0) {
      this.resetAllToggles();
      this.showAddProductForm = true;
      return;
    }
    this.resetAllToggles();
    this.pendingAction = 'addModule';
    this.showProductSelectorModal = true;
  }

  saveModule(): void {
    const name = this.newModuleName.trim();
    if (!name) {
      this.showAlertMessage('Module name is required', 'warning');
      return;
    }

    const productId = this.selectedProductId();
    if (!productId) {
      this.showAlertMessage('No product selected', 'warning');
      return;
    }

    const request = {
      productId: productId,
      name: name,
      isActive: true
    };

    this.moduleService.createModule(productId, request).subscribe({
      next: () => {
        this.newModuleName = '';
        this.showAddModuleForm = false;
        this.loadModules(productId);
        this.showAlertMessage('Module added successfully', 'success');
      },
      error: (error: any) => {
        console.error('Failed to add module:', error);
        this.showAlertMessage('Failed to add module. Please try again.', 'error');
      }
    });
  }

  startEditing(module: Module): void {
    module.editing = true;
  }

  saveEditing(module: Module): void {
    const name = module.name.trim();
    if (!name) {
      this.showAlertMessage('Module name cannot be empty', 'warning');
      return;
    }

    const productId = this.selectedProductId();
    if (!productId) return;

    const request = {
      name: name,
      description: module.description,
      isActive: module.isActive
    };

    this.testCaseService.updateModule(productId, module.id, request).subscribe({
      next: () => {
        module.editing = false;
        this.loadModules(productId);
        this.showAlertMessage('Module updated successfully', 'success');
      },
      error: (error: any) => {
        console.error('Failed to update module:', error);
        this.showAlertMessage('Failed to update module. Please try again.', 'error');
      }
    });
  }

  deleteModule(moduleId: string): void {
    this.pendingActionData = { type: 'module', id: moduleId, productId: this.selectedProductId() };
    this.showConfirmAlert('Are you sure you want to delete this module and all its versions?');
  }

  // Version management
  handleAddVersion(): void {
    if (this.products().length === 0) {
      this.resetAllToggles();
      this.showAddProductForm = true;
      return;
    }
    this.resetAllToggles();
    this.pendingAction = 'addVersion';
    this.showProductSelectorModal = true;
  }

  saveVersion(): void {
    const version = this.newVersionName.trim();
    if (!version) {
      this.showAlertMessage('Version name is required', 'warning');
      return;
    }

    const productId = this.selectedProductId();
    if (!productId) {
      this.showAlertMessage('No product selected', 'warning');
      return;
    }

    const request = {
      version: version,
      isActive: true
    };

    this.productService.addProductVersion(productId, request).subscribe({
      next: () => {
        this.newVersionName = '';
        this.showAddVersionForm = false;
        this.loadProductVersions(productId);
        this.showAlertMessage('Version added successfully', 'success');
      },
      error: (error) => {
        console.error('Failed to add version:', error);
        this.showAlertMessage('Failed to add version. Please try again.', 'error');
      }
    });
  }

  addProductVersion(): void {
    const version = this.newProductVersion.trim();
    if (!version) {
      this.showAlertMessage('Version name cannot be empty', 'warning');
      return;
    }

    if (!/^v\d+(\.\d+)*$/.test(version)) {
      this.showAlertMessage('Version must be in format vX.Y or vX.Y.Z', 'warning');
      return;
    }

    const productId = this.selectedProductId();
    if (!productId) {
      this.showAlertMessage('No product selected', 'error');
      return;
    }

    if (this.productVersions().some(v => v.version === version)) {
      this.versionExists = true;
      this.showAlertMessage(`Version ${version} already exists for this product`, 'warning');
      return;
    }

    const request = {
      version: version,
      isActive: true
    };

    this.productService.addProductVersion(productId, request).subscribe({
      next: () => {
        this.newProductVersion = '';
        this.versionExists = false;
        this.loadProductVersions(productId);
        this.showAlertMessage(`Version ${version} added successfully`, 'success');
      },
      error: (error) => {
        console.error('Failed to add version:', error);
        this.showAlertMessage('Failed to add version. Please try again.', 'error');
      }
    });
  }

  confirmRemoveProductVersion(version: string): void {
    const versionId = this.productVersions().find(v => v.version === version)?.id;
    if (!versionId) return;
    
    this.pendingActionData = { 
      type: 'version', 
      id: versionId, 
      version: version,
      productId: this.selectedProductId() 
    };
    this.showConfirmAlert('Are you sure you want to remove this version?');
  }

  removeProductVersion(versionId: string): void {
    const productId = this.selectedProductId();
    if (!productId) return;

    this.productService.removeProductVersion(productId, versionId).subscribe({
      next: () => {
        this.loadProductVersions(productId);
        this.showAlertMessage('Version removed successfully', 'success');
      },
      error: (error) => {
        console.error('Failed to remove version:', error);
        this.showAlertMessage('Failed to remove version. Please try again.', 'error');
      }
    });
  }

  // UI helpers
  toggleProductSelection(productId: string): void {
    this.selectedProductId.set(productId);
    this.loadProductData(productId);
  }

  getProductName(productId: string): string {
    const product = this.products().find(p => p.id === productId);
    return product?.name || 'Unknown Product';
  }

  getProductVersionStrings(): string[] {
    return this.productVersions().map(v => v.version);
  }

  handleToggleModules(): void {
    if (this.products().length === 0) {
      this.resetAllToggles();
      this.showAddProductForm = true;
      return;
    }
    this.resetAllToggles();
    this.pendingAction = 'toggleModules';
    this.showProductSelectorModal = true;
  }

confirmProductSelection(): void {
  if (!this.selectedProductId()) {
    this.showAlertMessage('Please select a product', 'warning');
    return;
  }
  this.showProductSelectorModal = false;
  
  switch (this.pendingAction) {
    case 'addModule':
      this.showAddModuleForm = true;
      break;
    case 'addVersion':
      this.showAddVersionForm = true;
      break;
    case 'toggleModules':
      this.showModuleList = true;
      // Load modules for the selected product
      this.loadModules(this.selectedProductId());
      break;
  }
  this.pendingAction = null;
}

  cancelProductSelection(): void {
    this.pendingAction = null;
    this.showProductSelectorModal = false;
  }

  resetAllToggles(): void {
    this.showAddProductForm = false;
    this.showProductSelectorModal = false;
    this.showAddModuleForm = false;
    this.showAddVersionForm = false;
    this.showModuleList = false;
    this.showProducts = false;
    this.pendingAction = null;
    this.showAutoSavePopup = false;
  }

  toggleAutoSavePopup(): void {
    const wasOpen = this.showAutoSavePopup;
    this.resetAllToggles();
    this.showAutoSavePopup = !wasOpen;
  }

  toggleAutoSave(): void {
    this.autoSaveEnabled = this.autoSaveService.toggle();
    if (this.autoSaveEnabled) {
      this.autoSaveService.start(() => {
        console.log('Auto-saving...');
      });
    } else {
      this.autoSaveService.stop();
    }
  }

  updateInterval(): void {
    this.autoSaveService.setInterval(this.selectedInterval);
  }

  // Alert system
  showConfirmAlert(message: string): void {
    this.alertMessage = message;
    this.alertType = 'warning';
    this.isConfirmAlert = true;
    this.showAlert = true;
  }

  showAlertMessage(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    this.alertMessage = message;
    this.alertType = type;
    this.isConfirmAlert = false;
    this.showAlert = true;

    if (type !== 'warning') {
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    }
  }

  handleConfirmDelete(): void {
    if (!this.pendingActionData) return;

    if (this.pendingActionData.type === 'product') {
      this.productService.deleteProduct(this.pendingActionData.id).subscribe({
        next: () => {
          this.loadProducts();
          if (this.selectedProductId() === this.pendingActionData.id) {
            this.selectedProductId.set('');
          }
          this.showAlertMessage('Product deleted successfully', 'success');
        },
        error: (error) => {
          console.error('Failed to delete product:', error);
          this.showAlertMessage('Failed to delete product. Please try again.', 'error');
        }
      });
    } else if (this.pendingActionData.type === 'module') {
      const productId = this.pendingActionData.productId;
      this.testCaseService.deleteModule(productId, this.pendingActionData.id).subscribe({
        next: () => {
          this.loadModules(productId);
          this.showAlertMessage('Module deleted successfully', 'success');
        },
        error: (error: any) => {
          console.error('Failed to delete module:', error);
          this.showAlertMessage('Failed to delete module. Please try again.', 'error');
        }
      });
    } else if (this.pendingActionData.type === 'version') {
      this.removeProductVersion(this.pendingActionData.id);
    }

    this.pendingActionData = null;
    this.showAlert = false;
  }

  handleCancelDelete(): void {
    this.showAlert = false;
    this.pendingActionData = null;
  }
}