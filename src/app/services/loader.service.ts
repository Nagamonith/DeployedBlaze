import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';

export interface LoaderState {
  data: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new BehaviorSubject<LoaderState>({ data: false });
  
  getLoader(): Observable<LoaderState> {
    return this.loaderSubject.asObservable();
  }
  
  showLoader() {
    this.loaderSubject.next({ data: true });
  }
  
  hideLoader() {
    this.loaderSubject.next({ data: false });
  }
  
}
