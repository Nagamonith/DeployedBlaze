import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { LeftnavigationbarComponent } from './leftnavigationbar/leftnavigationbar.component';

@Component({
  selector: 'lib-leftnavbartree',
  templateUrl: './leftnavbartree.component.html',
  standalone: true,
  imports: [LeftnavigationbarComponent],
  styleUrls: ['./leftnavbartree.component.css'],
})
export class LeftnavbartreeComponent implements OnInit {
  @Output() leftnavbaractionemit = new EventEmitter();
  @Output() treeactionemit = new EventEmitter();
  @Output() showHideTreeemit = new EventEmitter();

  @ViewChild(LeftnavigationbarComponent, { static: false })
  leftnavbarcomp!: LeftnavigationbarComponent;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {}, 100);
  }

  showHideTree(show:any) {
    const el = document.getElementById('treeComp');
    if (el != null) {
      if (show) {
        el.classList.remove('pad240');
      } else {
        el.classList.add('pad240');
      }
      this.showHideTreeemit.emit(show);
    }
  }

  setLeftNavBar(_data: any) {
    try {
      this.leftnavbarcomp.setData(_data);
    } catch (ER) {}
  }

  setTree(_data: any) {
    try {
      console.log('000', _data);
      console.log(_data);
    } catch (ER) {}
  }
}
