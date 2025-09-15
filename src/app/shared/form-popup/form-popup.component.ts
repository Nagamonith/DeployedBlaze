import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DxPopupModule } from 'devextreme-angular';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CustomTranslateLoader } from '../translate-loader';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'lib-form-popup',
  standalone: true,
  imports: [
    CommonModule,
    DxPopupModule,
    TranslateModule
  ],
  templateUrl: './form-popup.component.html',
  styleUrl: './form-popup.component.css',
  providers: [
    {
      provide: TranslateLoader,
      useClass: CustomTranslateLoader,
      deps: [HttpClient]
    },
    TranslateService
  ]
})
export class FormPopupComponent {
  @Input() popupVisible: boolean = true;
  @Input() popupTitle: string;
  @Input() width: number;
  @Input() specialClassName: string;
  @Input() enableOk: boolean = false;
  @Output() saveEvent = new EventEmitter<any>();
  @Output() cancelEvent = new EventEmitter<any>();
  @Output() onHidePopup = new EventEmitter<any>();
  defaultLanguage: string = '';

  constructor(
    private translate: TranslateService,
    private globalService: GlobalService
  ) {
    this.globalService.getStorageLanguage('language').subscribe(lang => {
      this.defaultLanguage = lang;
      this.translate.setDefaultLang(this.defaultLanguage);
    });
  }

  save() {
    this.saveEvent.emit();
  }

  cancel() {
    this.cancelEvent.emit();
  }

  onPopupHiding() {
    this.onHidePopup.emit();
  }
}
