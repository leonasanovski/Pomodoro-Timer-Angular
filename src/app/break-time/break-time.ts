import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-break-time',
  imports: [],
  templateUrl: './break-time.html',
  styleUrl: './break-time.css'
})

export class BreakTime {
  @Input() breakTime: number = 5;
  @Output() breakTimeChange = new EventEmitter<number>();

  increaseBreakTime() {
    if (this.breakTime < 60) {
      this.breakTime++;
      this.breakTimeChange.emit(this.breakTime)
    }
  }

  decreaseBreakTime() {
    if (this.breakTime > 1) {
      this.breakTime--;
      this.breakTimeChange.emit(this.breakTime)
    }
  }
}
