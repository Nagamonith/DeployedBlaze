// import { Component, ElementRef, ViewChild, OnDestroy, Input, HostListener } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { alertIn } from '../core/alertmodel';
// import { Alerts } from './../services/alert.service';
// import { CorelibService } from '../services/corelib.service';
// import dom from 'jquery';
// import { CoolSessionStorage } from '@angular-cool/storage';

// @Component({
//   selector: 'lib-alertbox',
//   templateUrl: './alertbox.component.html',
//   styleUrls: ['./alertbox.component.css'],
// })
// export class AlertBoxComponent implements OnDestroy {
//   @ViewChild('msg', { static: false }) msg: ElementRef;
//   @ViewChild('hide', { static: false }) EnterKey: ElementRef | undefined;

//   @Input() title: string | undefined;
//   public _alert: alertIn;
//   public open: boolean = false;
//   public _point: number = 0;
//   private subscription: Subscription;
//   public relVern = 'cacheVerion=1';
//   @HostListener('document:keydown', ['$event'])
//   handleAlertKeyboardEvent(event) {
//     if (
//       event.target.nodeName != 'INPUT' &&
//       event.target.nodeName != 'TEXTAREA' &&
//       event.target.nodeName != 'DIV' &&
//       (event.keyCode === 39 || event.keyCode === 37)
//     ) {
//       event.preventDefault();
//       event.stopPropagation();
//       if (
//         this._alert.action.length > 1 &&
//         this._point <= this._alert.action.length &&
//         event.keyCode === 39
//       ) {
//         //right
//         if (this.el.nativeElement.querySelector('#btn' + (this._point + 1))) {
//           this._point += 1;
//           this.el.nativeElement.querySelector('#btn' + this._point).focus();
//         }
//       }
//       if (this._alert.action.length > 1 && this._point - 1 >= 0 && event.keyCode === 37) {
//         //left
//         if (this.el.nativeElement.querySelector('#btn' + (this._point - 1))) {
//           this._point -= 1;
//           this.el.nativeElement.querySelector('#btn' + this._point).focus();
//         }
//       }
//     }
//   }
//   constructor(
//     private alert: Alerts,
//     private el: ElementRef,
//     public cls: CorelibService,
//     private ss: CoolSessionStorage
//   ) {
//     this.relVern = 'cacheVerion=' + this.cls.getEnvironment().releaseVersion;
//     this._alert = new alertIn();
//     this._alert.servity = 'info';
//     setTimeout(() => {
//       dom('.modal-content').draggable({
//         handle: '.modal-header',
//       });
//     }, 1000);
//     //this.ss.setItem('alertcount','0');
//     this.subscription = this.alert.getAlter().subscribe((e) => {
//       try {
//         this._alert = e;
//         this._alert.title = this._alert.title || this.title;
//         this._alert.close = this._alert.close || false;
//         this._alert.servity = this._alert.servity || 'info';
//         this._alert.action = this._alert.action || new Array();
//         if (this._alert.action.length == 0) {
//           this._alert['action'].push('Ok');
//         }

//         this._alert.cursor = this._alert.cursor || 0;
//         this._point = this._alert.cursor < 0 ? 0 : this._alert.cursor;

//         this.msg.nativeElement.innerHTML = this._alert.msg;
//         this.EnterKey.nativeElement.focus();
//         setTimeout(() => {
//           this.open = true;
//           this.EnterKey.nativeElement.focus();
//           let c = Number(this.ss.getItem('alertcount')) || 0;
//           this.ss.setItem('alertcount', (c + 1).toString());
//         }, 100);
//         setTimeout(() => {
//           if (this._alert.prompt) this.el.nativeElement.querySelector('#prompt').focus();
//           else this.el.nativeElement.querySelector('#btn' + this._alert.cursor).focus();
//         }, 400);
//       } catch (ex) {
//         throw new Error('AlertBoxComponent:constructor() ' + ex);
//       }
//     });
//   }

//   callBtnEvent(name: string) {
//     try {
//       this.alert.setAlter({
//         event: name,
//         promptValue: this._alert.promptValue,
//       });
//       this.open = false;
//       let c = Number(this.ss.getItem('alertcount')) || 0;
//       this.ss.setItem('alertcount', (c - 1).toString());
//     } catch (ex) {
//       throw new Error('AlertBoxComponent:callBtnEvent() ' + ex);
//     }
//   }

//   ngOnInit() {}

//   ngOnDestroy() {
//     try {
//       this.subscription.unsubscribe();
//     } catch (ex) {
//       throw new Error('AlertBoxComponent:ngOnDestroy() ' + ex);
//     }
//   }

//   //  @HostListener('window:keydown', ['$event'])
//   keyEvent(event: KeyboardEvent) {
//     try {
//       let somevar = <HTMLInputElement>event.target;
//       if (
//         somevar.parentElement.className.startsWith('prompt') &&
//         (event.keyCode == 13 || event.keyCode == 9)
//       ) {
//         setTimeout(() => {
//           this.el.nativeElement.querySelector('#btn' + this._point).focus();
//         }, 100);
//       }
//     } catch (ex) {
//       throw new Error('AlertBoxComponent:keyEvent() ' + ex);
//     }
//   }
// }
