import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LeftnavIcon } from './leftnavigationbar-icon.enum';
import { LeftbarService } from '../leftbar.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink ,RouterModule} from '@angular/router';
import { LogoutAlertDialog } from '../../shared/dialogs/logout-alert.dialog/logout-alert.dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Input } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-leftnavigationbar',
  standalone: true,
  imports: [TranslateModule,RouterModule,CommonModule,MatTooltipModule],
  templateUrl: './leftnavigationbar.component.html',
  styleUrl: './leftnavigationbar.component.scss'
})
export class LeftnavigationbarComponent implements OnInit {
  leftnavbardata: any;
  serverservice: any;
   activeIcon: string = ''; 

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private leftbar: LeftbarService,
    private dialog: MatDialog,
    private loader:LoaderService
   ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.showUserNav) {
        if (
          e.target != this.userNavLink.nativeElement &&
          !this.userNavLink.nativeElement.contains(e.target) &&
          !this.userNavTemplate.nativeElement.contains(e.target)
        ) {
          this.showUserNav = false;
          this.showLanguageList = false;
        }
      }
    });
  }
  
  public showUserNav:boolean = false
  public showLanguageList:boolean = false
  public langText:string = ''
  public langIcon: any;
  public leftNavIcon = LeftnavIcon
  public defaultLanguage: string = '';
  public userRole: string | null = null;

  public tabsToDisplay: string ='Adarsh';

  @ViewChild('leftNav',{static:false, read:ElementRef}) navbar!:ElementRef
  @ViewChild('userNavLink') userNavLink!: ElementRef;
  @ViewChild('userNavTemplate') userNavTemplate!: ElementRef;
 
  ngOnInit(): void {

  this.userRole = localStorage.getItem('userRole');
console.log(this.userRole)

    let languageOfChoice = localStorage.getItem('language')
    if(languageOfChoice) {
      this.langText = languageOfChoice;
      this.langIcon = this.leftNavIcon[languageOfChoice as keyof typeof LeftnavIcon];
    } else {
      this.langText = 'English';
      this.langIcon = this.leftNavIcon.English;
    }
  }
 
  navigateLeftNacBarIcons(event:any,id:number){
    switch(event){
      case 'user':
        this.leftbar.setLeftNode(event,'')
        console.log(event);
        break;
        case 'task':
          this.leftbar.setLeftNode(event,'')
          break;
          case 'notification':
          this.leftbar.setLeftNode(event,'')
          break;
          case 'settings':
            this.leftbar.setLeftNode(event,'')
          break;
    }
   
  }
 
  toggleNavClass(){
    this.showUserNav = !this.showUserNav
  }
 

  
  navigateToGanttChart() {
    this.router.navigate(['assets/gantt-editor']);
  }
 
  toggleLangList(){
      this.showLanguageList = !this.showLanguageList;
  }
 
  setData(_data:any){
    try{
      this.leftnavbardata = _data;
    }catch(ER){
    }
  }
  toggleUserNav() {
    this.showUserNav = !this.showUserNav;
  }
  toggleLanguageList() {
    this.showLanguageList = !this.showLanguageList;
  }
 

 setActiveIcon(icon: string) {
    this.activeIcon = icon;
  }
  clearAllCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  });
}


  logout() {
  this.dialog.open(LogoutAlertDialog, {
    data: {
      title: 'Confirm Logout',
      message: 'Are you sure you want to log out?'
    }
  }).afterClosed().subscribe(result => {
    if (result) {
      localStorage.clear();
      this.userRole='';
      this.router.navigate(['/login']);
     this.clearAllCookies();

    }
  });
}

navigateToProjects():void{
  this.setActiveIcon('Catalogue');
  this.router.navigate(['assets/project-details']);
}
navigateToWorkload():void {
  this.setActiveIcon('Report');
  this.router.navigate(['blaze/workload-dashboard'])
}

navigateTODashboard():void{
  this.setActiveIcon('Report'); 
  this.router.navigate(['assets/Dashboard'])
  }
 navigatePreDashboard():void {
  this.setActiveIcon('Dashboard');
  this.router.navigate(['assets/pre-dashboard']);
  }
   switchLanguage(event: any) {
    const lang = event.srcElement.innerText;
    this.langIcon = this.leftNavIcon[lang as keyof typeof LeftnavIcon];
    this.langText = lang;
    sessionStorage.setItem('language', lang)
    this.defaultLanguage = lang
    this.showLanguageList = false;
  }


}

 