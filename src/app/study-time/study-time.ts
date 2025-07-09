import { Component } from '@angular/core';
import {PomodoroTimerService} from '../pomodoro-timer.service';

@Component({
  selector: 'app-study-time',
  imports: [],
  templateUrl: './study-time.html',
  styleUrl: './study-time.css'
})
export class StudyTime {
  studyTime: number = 20;
  constructor(private pomodoroTimerService: PomodoroTimerService) {}
  increaseStudyTime(){
    if(this.studyTime < 60){
      this.studyTime++;
      this.pomodoroTimerService.setStudyTime(this.studyTime)
      console.log(`study time is: ${this.studyTime}`)

    }
  }
  decreaseStudyTime(){
    if(this.studyTime > 1){
      this.studyTime--;
      this.pomodoroTimerService.setStudyTime(this.studyTime)
      console.log(`study time is: ${this.studyTime}`)
    }
  }
}
