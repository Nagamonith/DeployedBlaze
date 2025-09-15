// shared/services/page-title.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PageTitleService {
  private pageTitle = new BehaviorSubject<string>(''); // default empty
  pageTitle$ = this.pageTitle.asObservable();

  setTitle(title: string) {
    this.pageTitle.next(title);
  }
}
