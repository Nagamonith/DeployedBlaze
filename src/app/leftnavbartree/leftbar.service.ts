import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LeftbarService {
  private left = new Subject<any>();
  private tree = new Subject<any>();
  private parent = new Subject<any>();
   private logoutSubject = new Subject<void>();
  logout$ = this.logoutSubject.asObservable();

   setLeftNode(data: any,datauser:any){
    //console.log(data,datauser);
    this.left.next({data,datauser})
  }
  getLeftNode():Observable<any>{
    return this.left.asObservable();
  }

  setTreeNode(data: any){
    this.tree.next({data})
  }
  getTreeNode():Observable<any>{
    return this.tree.asObservable();
  }

  setParentTreeNode(data: any){
    this.parent.next({data})
  }
  getParentTreeNode():Observable<any>{
    return this.parent.asObservable();
  }

 
  

  triggerLogout() {
    this.logoutSubject.next();
  }
}

