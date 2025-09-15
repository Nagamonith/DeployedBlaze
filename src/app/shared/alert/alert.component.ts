import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'success';
  @Input() message: string = '';
  @Input() show: boolean = false;
  @Input() isConfirm: boolean = false;
  @Input() showOverlay: boolean = true;

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  close() {
    this.show = false;
    this.onCancel.emit();
  }

  confirm() {
    this.onConfirm.emit();
    this.show = false;
  }
}
