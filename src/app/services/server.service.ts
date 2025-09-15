// import { HttpClient, HttpHeaders, HttpResponse,HttpErrorResponse} from '@angular/common/http';
// import { Injectable,Output,EventEmitter } from '@angular/core';
// import { CoolSessionStorage } from '@angular-cool/storage';
// import { LoaderService } from './loader.service';
// import { CorelibService} from './corelib.service';
// import { Observable,Subject } from 'rxjs';
// import { switchMap } from 'rxjs/operators'
// import _ from 'lodash';
// @Injectable({
//     providedIn: 'root'
// })

// export class ServerService {
//    @Output() alert:EventEmitter<any> = new EventEmitter<any>();
//    @Output() security:EventEmitter<any> = new EventEmitter<any>();
//    @Output() idleTime:EventEmitter<any> = new EventEmitter<any>();

//    public timerCntrl:any;
//    public timerCntrlIdle:any;
//    public timerMouseIdle:any;
//    public userTimerAction:any=true;
   
//    constructor(private http: HttpClient,
//     private cls: CorelibService,
//     private ss: CoolSessionStorage, private ldr:LoaderService) {
//     }

//     userCache(obj:any){
//         let _user= JSON.parse(this.ss.getItem("user") || '{}') ;
//         _user = _user||{};
//         for (var key in obj) {
//             if (obj.hasOwnProperty(key)){
//                 _user[key]=obj[key];
//             }
//         }
//         this.ss.setItem("user", JSON.stringify(_user));
//         return _user;
//     }

//     // UserSessionchecker() {
//     //     let _getUser = JSON.parse(this.ss.getItem("userSession"));
//     //     if(_getUser){
//     //         if(_getUser.userIdle){
//     //             if (this.timerCntrlIdle) {
//     //                 clearInterval(this.timerCntrlIdle);
//     //             }
//     //             this.timerCntrlIdle = setInterval(() => {
//     //                 this.idleTime.emit();
//     //                 if (this.timerCntrlIdle) {
//     //                     clearInterval(this.timerCntrlIdle);
//     //                 }
//     //             }, _getUser.sessionTimer);
//     //         }
//     //     }
//     //     this.sessionBeat(_getUser)
//     // }

//     UserSessionchecker() {
//         if(this.userTimerAction){
//             let _getUser = JSON.parse(this.ss.getItem("userSession") || '{}');
//             if (_getUser && _getUser.userIdle) {
//                 this.userTimerAction=false;
//                 document.addEventListener('keyup', () =>{
//                     this.getIdleTimer(_getUser);
//                 });
//                 document.addEventListener('mousemove', ()=> {
//                     this.getIdleTimer(_getUser);
//                 });
//                this.getIdleTimer(_getUser);
//            }
//             this.sessionBeat(_getUser);
//         }
//     }

//     getIdleTimer(_getUser:any){
//         if (this.timerMouseIdle) {
//             clearInterval(this.timerMouseIdle);
//         }
//         if (this.timerCntrlIdle) {
//             clearInterval(this.timerCntrlIdle);
//         }
//         this.timerMouseIdle = setTimeout(() => {
//             this.callSessionPopup(_getUser);
//             console.log("Event idle start",Date.now())
//         }, 40000);
//     }


//     callSessionPopup(_getUser:any){
//         if (this.timerCntrlIdle) {
//             clearInterval(this.timerCntrlIdle);
//         }
//         this.timerCntrlIdle = setInterval(() => {
//             console.log("Event Popup start",Date.now())
//             this.idleTime.emit();
//             if (this.timerCntrlIdle) {
//                 clearInterval(this.timerCntrlIdle);
//             }
//         }, _getUser.sessionTimer);
//     }

//     sessionBeat(_getUser:any){
//         let _countDown= (_getUser)?_getUser.bcksessionTimer:1200000;
//         if (this.timerCntrl) {
//             clearInterval(this.timerCntrl);
//         }
//         this.timerCntrl = setInterval(() => {
//             _getUser = JSON.parse(this.ss.getItem("userSession")  || '{}');
//             this.serverMethod("common",_getUser, _getUser.url, "post")
//         }, _countDown);
//     }

//     // CheckTimer(){
//     //     let _sesTimer=this.cls.getEnvironment().sessionTimer||1800000;
//     //     if (this.timerCntrl) {
//     //         clearInterval(this.timerCntrl);
//     //     }
//     //     this.timerCntrl = setInterval(() => {
//     //         this.idleTime.emit();
//     //         if (this.timerCntrl) {
//     //             clearInterval(this.timerCntrl);
//     //         }
//     //     }, _sesTimer);
//     // }

//     // autoLogon(_user){
//     //     if (this.timerCntrl) {
//     //         clearInterval(this.timerCntrl);
//     //     }
//     //     let _getUser = JSON.parse(this.ss.getItem("cacheinfo"));
//     //     console.log(_getUser,_user)
//     //     this.timerCntrl = setInterval(() => {
//     //         this.serverMethod(_getUser, _getUser.url, "post")
//     //     }, _user.sessionTimer);
//     // }

//     getHeader() {
//         let _user = this.userCache({})
//         if (!_user || _user.AccessToken == null) { 
//             this.relogin();
//             return;
//         }
//         return new HttpHeaders({
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + _user.AccessToken,
//             'appid':_user.Appid.toString(),
//             'moduleid':_user.ModuleID.toString()
//         });
//     }

//     getEmptyHeader() {
//         return new HttpHeaders({
//             'Content-Type': 'application/json'
//         });
//     }

//     postMethod(modName:string,param: any, url: string): Observable < HttpResponse < any >> {
//         try {
//                 if(this.serviceurl && this.serviceurl[modName]){
//                     url=this.serviceurl[modName].concat(url);
//                     return this.http.post < any > (url, param, {
//                         headers: this.getHeader(),
//                         observe: 'response'
//                     });
//                 }else{
//                     return this.getJsonMethod("./assets/config/config.json?v="+ Math.random()).pipe(
//                         switchMap(res => {
//                             this.getServiceUrl(res.body.api.modules);
//                             url=this.serviceurl[modName].concat(url);
//                             return this.http.post < any > (url, param, {
//                                 headers: this.getHeader(),
//                                 observe: 'response'
//                             });
//                         })
//                     );
//                 }
//         } catch (ex) {
//             throw new Error("ServerService:postMethod() " + ex);
//         }
//     }

//     postMethodKey(modName:string,param: any, url: string, obj: any,_header:HttpHeaders): Observable < HttpResponse < any >> {
//         try {
//             let httpHeaders=_header;
//             if(!_header){
//                 obj["Content-Type"] = 'application/json';
//                 httpHeaders = new HttpHeaders(obj);
//             }
//             if(this.serviceurl && this.serviceurl[modName]){
//                 url=this.serviceurl[modName].concat(url);
//                 return this.http.post < any > (url, param, {
//                     headers: httpHeaders,
//                     observe: 'response'
//                 });
//             }else{
//                 return this.getJsonMethod("./assets/config/config.json?v="+ Math.random()).pipe(
//                     switchMap(res => {
//                         this.getServiceUrl(res.body.api.modules);
//                         url=this.serviceurl[modName].concat(url);
//                         return this.http.post < any > (url, param, {
//                             headers: httpHeaders,
//                             observe: 'response'
//                         })
//                     })
//                 );
//              }
//         } catch (ex) {
//             throw new Error("ServerService:postMethodKey() " + ex);
//         }
//     }

//     getJsonMethod(url: string): Observable < HttpResponse < any >> {
//         try {
//             return this.http.get < any > (url, {
//                 headers: new HttpHeaders({
//                     'Content-Type': 'application/json'
//                 }),
//                 observe: 'response'
//             });
//         } catch (ex) {
//             throw new Error("ServerService:getMethod() " + ex);
//         }
//     }

//     getMethod(modName:string,param: any, url: string): Observable < HttpResponse < any >> {
//         try {
//             if(this.serviceurl && this.serviceurl[modName]){
//                 url=this.serviceurl[modName].concat(url);
//                 return this.http.get < any > (url, {
//                     headers: this.getHeader(),
//                     params: param,
//                     observe: 'response'
//                 });
//             }else{
//                 return this.getJsonMethod("./assets/config/config.json?v="+ Math.random()).pipe(
//                     switchMap(res => {
//                         this.getServiceUrl(res.body.api.modules);
//                         url=this.serviceurl[modName].concat(url);
//                         return this.http.get < any > (url, {
//                             headers: this.getHeader(),
//                             params: param,
//                             observe: 'response'
//                         });
//                     })
//                 );
//              }
//         } catch (ex) {
//             throw new Error("ServerService:getMethod() " + ex);
//         }
//     }

//     getWithoutMethod(modName:string,param: any, url: string): Observable < HttpResponse < any >> {
//         try {
//             if(this.serviceurl && this.serviceurl[modName]){
//                 url=this.serviceurl[modName].concat(url);
//                 return this.http.get < any > (url, {
//                     headers: new HttpHeaders({
//                         'Content-Type': 'application/json'
//                     }),
//                     params: param,
//                     observe: 'response'
//                 });
//             }else{
//                 return this.getJsonMethod("./assets/config/config.json?v="+ Math.random()).pipe(
//                     switchMap(res => {
//                         this.getServiceUrl(res.body.api.modules);
//                         url=this.serviceurl[modName].concat(url);
//                         return this.http.get < any > (url, {
//                             headers: new HttpHeaders({
//                                 'Content-Type': 'application/json'
//                             }),
//                             params: param,
//                             observe: 'response'
//                         });
//                     })
//                 );
//              }
//         } catch (ex) {
//             throw new Error("ServerService:getMethod() " + ex);
//         }
//     }

//     getMethodforoctaldata(modName:string,param: any,url:string): any {
//         let httpHeaders = new HttpHeaders({
//             'Content-Type' : 'application/text',
//         });
//         const options = {httpHeaders, param, responseType: 'blob' as 'blob'};
//         if(this.serviceurl && this.serviceurl[modName]){
//             url=this.serviceurl[modName].concat(url);
//             let val=this.http.get(url,options);
//             return val;
//         }else{
//             return this.getJsonMethod("./assets/config/config.json?v="+ Math.random()).pipe(
//                 switchMap(res => {
//                     this.getServiceUrl(res.body.api.modules);
//                     url=this.serviceurl[modName].concat(url);
//                     let val=this.http.get(url,options);
//                     return val;
//                 })
//             );
//          }
//     }

//     putMethod(modName:string,param: any, url: string): Observable < HttpResponse < any >> {
//         try {

//             if(this.serviceurl && this.serviceurl[modName]){
//                 url=this.serviceurl[modName].concat(url);
//                 return this.http.put < any > (url, param, {
//                     headers: this.getHeader(),
//                     observe: 'response'
//                 });
//             }else{
//                 return this.getJsonMethod("./assets/config/config.json?v="+ Math.random()).pipe(
//                     switchMap(res => {
//                         this.getServiceUrl(res.body.api.modules);
//                         url=this.serviceurl[modName].concat(url);
//                         return this.http.put < any > (url, param, {
//                             headers: this.getHeader(),
//                             observe: 'response'
//                         });
//                     })
//                 );
//              }
//         } catch (ex) {
//             throw new Error("ServerService:putMethod() " + ex);
//         }
//     }

//     deleteMethod(modName:string,param: any,url:string): Observable<HttpResponse<any>> {
//         try{
//             if(this.serviceurl && this.serviceurl[modName]){
//                 url=this.serviceurl[modName].concat(url);
//                 return this.http.delete <any > (url, {
//                     headers:  this.getHeader(),
//                     params: param,
//                     observe: 'response'
//                 });
//             }else{
//                 return this.getJsonMethod("./assets/config/config.json?v="+ Math.random()).pipe(
//                     switchMap(res => {
//                         this.getServiceUrl(res.body.api.modules);
//                         url=this.serviceurl[modName].concat(url);
//                         return this.http.delete <any > (url, {
//                             headers:  this.getHeader(),
//                             params: param,
//                             observe: 'response'
//                         });
//                     })
//                 );
//              }
//         } catch (ex) {
//             throw new Error("ServerService:deleteMethod() " + ex);
//         }
//     }

//     fileUploadMethod(modName:string,param: any,url:string): Observable<HttpResponse<any>> {
//         try{
//             let httpHeaders = new HttpHeaders({
//                 'Content-Type' : 'multipart/form-data'
//             });

//             if(this.serviceurl && this.serviceurl[modName]){
//                 url=this.serviceurl[modName].concat(url);
//                 return this.http.post<any>(url, param,
//                     {
//                     headers: httpHeaders,
//                     observe: 'response'
//                     }
//                 );
//             }else{
//                 return this.getJsonMethod("./assets/config/config.json?v="+ Math.random()).pipe(
//                     switchMap(res => {
//                         this.getServiceUrl(res.body.api.modules);
//                         url=this.serviceurl[modName].concat(url);
//                         return this.http.post<any>(url, param,
//                             {
//                             headers: httpHeaders,
//                             observe: 'response'
//                             }
//                         );
//                     })
//                 );
//              }
//         } catch (ex) {
//             throw new Error("ServerService:fileUploadMethod() " + ex);
//         }
//     }

//     errorMethod(param: any){
//         this.alert.emit(param)
//     }

//     serverMethod(modName:string,param: any, url: string,method:string='post',callback=false): Observable <any> {
//         let subject = new Subject();
//         let _usr = this.userCache({});
//         if (!_usr.AccessToken || _usr.AccessToken == 'null' ){
//             this.security.emit();
//             subject.complete();
//         }
//         switch(method.toLocaleLowerCase()){
//             case 'get':
//                 this.getMethod(modName,param, url).subscribe(res => {
//                    if(res.headers.get('DLStatus')=="200"){
//                         subject.next(res.body);
//                         subject.complete();
//                     }else{
//                             this.ldr.hideLoader();
//                         this.ss.setObject("errorpage",{custom:res.headers.get('DLStatus'),message:res.headers.get('DLStatusMessage')})

//                         //  this.alert.emit({custom:res.headers.get('DLStatus'),message:res.headers.get('DLStatusMessage')});
//                         if(callback){
//                             subject.next({'status':'error'});
//                             subject.complete();
//                         }
//                     }
//                 }, (err: HttpErrorResponse) => {
//                     this.serverErrorMsg(err);
//                 });
//                 break;
//             case 'post':
//                 this.postMethod(modName,param, url).subscribe(res => {
//                     if(res.headers.get('DLStatus')=="200"){
//                         if (typeof res.body === 'object'){
//                             res.body.statuscode="200";
//                             res.body.index=param.index||0;
//                             res.body.subindex=param.subindex||0;
//                         }
//                         subject.next(res.body);
//                         subject.complete();
//                     }else if(res.headers.get('DLStatus') || '{}'.toLowerCase()=="dl108"){
//                         if (typeof res.body === 'object'){
//                           res.body.statuscode="DL108";
//                         }
//                         subject.next(res.body);
//                         subject.complete();
//                     }else{
//                             this.ldr.hideLoader();
//                         this.alert.emit({custom:res.headers.get('DLStatus'),message:res.headers.get('DLStatusMessage')});
//                         if(callback){
//                             subject.next({'status':'error'});
//                             subject.complete();
//                         }
//                     }
//                 }, (err: HttpErrorResponse) => {
//                     this.serverErrorMsg(err);
//                 });
//                 break;
//             case 'put':
//                 this.putMethod(modName,param, url).subscribe(res => {
//                     if(res.headers.get('DLStatus')=="200"){
//                         subject.next(res.body);
//                         subject.complete();
//                     }else{
//                         if(callback){
//                             subject.next({'status':'error'});
//                             subject.complete();
//                         }
//                             this.ldr.hideLoader();
//                         this.alert.emit({custom:res.headers.get('DLStatus'),message:res.headers.get('DLStatusMessage')});
//                     }
//                 }, (err: HttpErrorResponse) => {
//                     this.serverErrorMsg(err);
//                 });
//                 break;
//            case 'delete':
//                 this.deleteMethod(modName,param, url).subscribe(res => {
//                     if(res.headers.get('DLStatus')=="200"){
//                         subject.next(res.body);
//                         subject.complete();
//                     }else{
//                             this.ldr.hideLoader();
//                         this.alert.emit({custom:res.headers.get('DLStatus'),message:res.headers.get('DLStatusMessage')});
//                         if(callback){
//                             subject.next({'status':'error'});
//                             subject.complete();
//                         }
//                     }
//                 }, (err: HttpErrorResponse) => {
//                     this.serverErrorMsg(err);
//                 });
//                 break;
//         }
//         return subject;
//     }

//     serverErrorMsg(err:HttpErrorResponse){
//         if(err && (err.status || err.status==0)){
//             if(err.status==401) {
//                 setTimeout(() => {
//                     this.relogin();
//                 }, 5000);
//             }
//             this.alert.emit({custom:err.status.toString()});
//         }else{
//             this.alert.emit({custom:"1000"});
//         }
//         this.ldr.hideLoader();
//     }

//     relogin(){
//         this.logout();
//     }

//     /* logout section */
//     //Old method
//     // logout() {
//     //     this
//     //         .getJsonMethod(
//     //             "./assets/config/config.json?cacheVerion=" + this.cls.getEnvironment().releaseVersion
//     //         )
//     //         .subscribe((res) => {
//     //             if (res.body) {
//     //                 let _login = res.body.modules["0"].navigateurl;
//     //                 let _user = this.userCache({});
//     //                 let _type=(_user && _user.type==1)?"adlogout":"logout"
//     //                 if (_user) {
//     //                     this.postMethodKey("login",
//     //                     _user,
//     //                    "Userlogout",
//     //                    {}
//     //                 ).subscribe(res => {
//     //                             // this.ss.clear();
//     //                             window.location.href = _login+_type
//     //                         });
//     //                 } else {
//     //                     // this.ss.clear();
//     //                     window.location.href = _login+_type
//     //                 }
//     //             }
//     //         });
//     // }
//     //Old Method

//     //New method

//     // public logout(){
//     //     this.getMethod("logout",
//     //       {},"LogoutUser").subscribe((res) => {
//     //         if(res && res.body && res.body.url)
//     //           window.location.href = decodeURIComponent(res.body.url);
//     //         else
//     //         {
//     //           this.getJsonMethod(
//     //                 "./assets/config/config.json?cacheVerion=" + this.cls.getEnvironment().releaseVersion
//     //             )
//     //             .subscribe((res) => {
//     //                 if (res.body) {
//     //                     let _login = (this.ss.getItem("splashenable")&& this.ss.getItem("splashenable")=="true")? 
//     //                     res.body.modules["0"].navigateurl+"splash":res.body.modules["0"].navigateurl+"login"
//     //                     window.location.href = _login;
//     //                     alert(window.location.href);
//     //                 }
//     //             });
//     //         }
//     //     })
//     //   }

//     //New method

//     /*Micro services*/
//     serviceurl:any
//     getServiceUrl(obj:any) {
//        this.serviceurl= _.transform(obj, (result, val, key) =>{
//             result[(key as string).toLowerCase()] = val;
//         });
//     }

//     getServiceData() {
//         this.getJsonMethod("./assets/config/config.json").subscribe(res => {
//             if(res.body){
//                 this.serviceurl= res.body.api.modules;
//                 // for (let el in this.serviceurl) {
//                 //     if(this.serviceurl[el] ==""){
//                 //         this.serviceurl[el.toLowerCase()]=res.body.api["site"];
//                 //     }
//                 // }
//                 // this.serviceurl= { ...this.serviceurl, ..._site};
//             }
//         })
//     }

// }
