import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CustomTranslateLoader } from '../translate-loader';
import { GlobalService } from '../service/global.service';
import { DxCheckBoxModule } from 'devextreme-angular';

@Component({
  selector: 'app-custom-dropdown',
  standalone: true,
  imports: [CommonModule, TranslateModule, DxCheckBoxModule],
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.css',
  providers: [
    {
      provide: TranslateLoader,
      useClass: CustomTranslateLoader,
      deps: [HttpClient]
    },
    TranslateService
  ]
})

export class CustomDropdownComponent {
  @Input() filterArrayList: any[] = [];
  @Input() dataArrayList: any[] = [];
  @Output() selectionChange = new EventEmitter<string>();
  @Output() callClear = new EventEmitter();
  @ViewChild('customDropdownFilter') customDropdownFilter: ElementRef
  defaultLanguage: string = '';

  @Input() multiSelectDropdown: boolean = false;
  @Input() chkList: any[] = [];
  @Output() chkChange = new EventEmitter<any>();
  constructor(
    private translate: TranslateService,
    private globalService: GlobalService
  ) {
    this.globalService.getStorageLanguage('language').subscribe(lang => {
      this.defaultLanguage = lang;
      this.translate.setDefaultLang(this.defaultLanguage);
    });
  }
 
  onSelectionChange(event: any) {
    this.selectionChange.emit(event.target.value);
  }

  filterResList() {
    this.filterArrayList = this.dataArrayList.filter(res => {
      return res.name.toLowerCase().includes(this.customDropdownFilter.nativeElement.value.toLowerCase());
    });
  }

  clearDropdown() {
    this.callClear.emit();
  }

  onChkChange(chk: any) {
    this.chkChange.emit(chk);
  }
}
