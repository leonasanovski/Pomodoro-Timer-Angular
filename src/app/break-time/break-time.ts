import {Component} from '@angular/core';
import {PomodoroTimerService} from '../pomodoro-timer.service';

@Component({
  selector: 'app-break-time',
  imports: [],
  templateUrl: './break-time.html',
  styleUrl: './break-time.css'
})
export class BreakTime {
  breakTime: number = 5;

  //same as in Spring, we need to get the service to use it
  constructor(private pomodoroTimerService: PomodoroTimerService) {
  }//now we can use it
  increaseBreakTime() {
    if (this.breakTime < 60) {
      this.breakTime++;
      this.pomodoroTimerService.setBreakTime(this.breakTime);
      console.log(`break time is: ${this.breakTime}`)

    }
  }

  decreaseBreakTime() {
    if (this.breakTime > 1) {
      this.breakTime--;
      this.pomodoroTimerService.setBreakTime(this.breakTime)
      console.log(`break time is: ${this.breakTime}`)

    }
  }
}
