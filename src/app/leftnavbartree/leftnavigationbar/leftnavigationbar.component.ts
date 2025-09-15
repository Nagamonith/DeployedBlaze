import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LeftnavIcon } from './leftnavigationbar-icon.enum';
import { LeftbarService } from '../leftbar.service';
//import { ServerService } from '../common_services/server.service';
//import { LoaderService } from '../common_services/loader.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink ,RouterModule} from '@angular/router';
import { LogoutAlertDialog } from '../../shared/dialogs/logout-alert.dialog/logout-alert.dialog.component';
import { MatDialog } from '@angular/material/dialog';
// import { LogoutService } from '../common_services/logout.service';

@Component({
  selector: 'app-leftnavigationbar',
  standalone: true,
  imports: [TranslateModule,RouterModule],
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
    private dialog: MatDialog
    // private logoutService: LogoutService // <-- Inject
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
 
  @ViewChild('leftNav',{static:false, read:ElementRef}) navbar!:ElementRef
  @ViewChild('userNavLink') userNavLink!: ElementRef;
  @ViewChild('userNavTemplate') userNavTemplate!: ElementRef;
 
  ngOnInit(): void {
    //  this.activeIcon = 'Dashboard'; 
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
    //this.toggleClass(id)
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
  navigateDashboard() {
    this.router.navigate(['assets/dashboard']);
  }

  // navigatePreDashboard() {
  //   this.router.navigate(['assets/pre-dashboard']);
    
  // }
  // navigateToSprintMatrix() {
  //   this.router.navigate(['assets/bug']);
  // }

  navigateToGanttChart() {
    this.router.navigate(['assets/gantt-editor']);
  }
  // toggleClass(id:number){
  //   const atags = this.navbar.nativeElement.querySelectorAll('a')
  //   for(let tag in atags){
  //     if(atags[tag].className && atags[tag].className.includes('active')){
  //       atags[tag].classList.remove('active')
  //     }
  //   }
  //   atags[id].classList.add('active')
  // }
 
  toggleLangList(){
      this.showLanguageList = !this.showLanguageList;
  }
 
//   switchLanguage(event: any) {
//   this.loaderService.showLoader();
//   const lang = event.srcElement.innerText;
//   this.translate.use(lang).subscribe({
//     next: () => {
//       console.log('Language changed successfully to:', lang);
//       this.langIcon = this.leftNavIcon[lang as keyof typeof LeftnavIcon];
//       this.langText = lang;
//       sessionStorage.setItem('language', lang);
//       this.defaultLanguage = lang;
//       this.showLanguageList = false;
//       this.loaderService.hideLoader();
//     },
//     error: (err) => {
//       console.error('Error changing language:', err);
//       this.loaderService.hideLoader();
//     }
//   });
// }
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

  navigatePreDashboard() {
    this.setActiveIcon('Dashboard');
    this.router.navigate(['assets/pre-dashboard']);
  }

  // navigateToSprintMatrix() {
  //   this.setActiveIcon('Catalogue');
  //   this.router.navigate(['assets/bug']);
  // }



  //  logout() {
  //   const confirmed = window.confirm('Are you sure you want to log out?');

  //   if (confirmed) {
  //     localStorage.clear();
  //     this.router.navigate(['/login']);
  //   }
  // }
  logout() {
  this.dialog.open(LogoutAlertDialog, {
    data: {
      title: 'Confirm Logout',
      message: 'Are you sure you want to log out?'
    }
  }).afterClosed().subscribe(result => {
    if (result) {
      localStorage.clear();
      this.router.navigate(['/login']);
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

}

 