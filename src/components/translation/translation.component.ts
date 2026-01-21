import { Component, ViewChild, OnInit} from '@angular/core';
import { DxDataGridComponent, DxDataGridModule, DxTextBoxModule, DxButtonModule, DxPopupModule, DxTextAreaModule } from 'devextreme-angular';


@Component({
  selector: 'app-translation',
  imports: [DxDataGridModule, DxTextBoxModule,DxButtonModule,DxPopupModule,DxTextAreaModule],
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.css'
})


export class TranslationComponent implements OnInit {

  @ViewChild('grid', { static: false }) grid!: DxDataGridComponent;

  translations: any[] = [];
  filteredTranslations: any[] = [];

  searchText = '';

  addPopupVisible = false;
  newEnglishText = '';

  ngOnInit() {
    this.translations = this.generateDummyData();
    this.filteredTranslations = [...this.translations];
  }

  generateDummyData() {
    const data = [];
    for (let i = 1; i <= 100; i++) {
      data.push({
        key: `AUTO_KEY_${i}`,
        en: `Sample English Text ${i}`,
        fr: '',
        de: '',
        hi: ''
      });
    }
    return data;
  }

  // 🔍 Search ONLY English text
  onSearch(e: any) {
    const value = e.value?.toLowerCase() || '';
    this.filteredTranslations = this.translations.filter(
      item => item.en?.toLowerCase().includes(value)
    );
  }

  // 🟢 Clickable search result → focus row
  onRowClick(e: any) {
    this.grid.instance.selectRows([e.key], false);
  }

  // ➕ Open widget
  openAddPopup() {
    this.newEnglishText = '';
    this.addPopupVisible = true;
  }

  // ➕ Add Translation
  addTranslation() {
    if (!this.newEnglishText.trim()) return;

    const newKey = this.generateKey(this.newEnglishText);

    const newRow = {
      key: newKey,
      en: this.newEnglishText,
      fr: '',
      de: '',
      hi: ''
    };

    this.translations.unshift(newRow);
    this.filteredTranslations = [...this.translations];

    this.addPopupVisible = false;
  }

  // 🔑 Key generator
  generateKey(text: string): string {
    return (
      'TXT_' +
      text
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, '_')
        .substring(0, 30)
    );
  }
}
