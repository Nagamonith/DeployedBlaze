import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftnavbartreeComponent } from '../leftnavbartree/leftnavbartree.component';
import { HeaderComponent } from '../header/header.component';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  standalone: true,
  imports: [RouterOutlet,LeftnavbartreeComponent,HeaderComponent],
  styleUrl: './layouts.component.css',
})
export class LayoutsComponent {
  constructor(private http: HttpClient) {
   
  }
  showHideTree(e: any) {}
 
}
