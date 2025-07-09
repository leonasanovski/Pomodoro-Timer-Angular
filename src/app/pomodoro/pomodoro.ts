import {Component, OnDestroy, OnInit} from '@angular/core';
import {PomodoroTimerService} from '../pomodoro-timer.service';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-pomodoro',
  imports: [],
  templateUrl: './pomodoro.html',
  styleUrl: './pomodoro.css'
})
export class Pomodoro implements OnInit, OnDestroy {

  private studyTimeInterval = 20;
  private breakTimeInterval = 5;
  private studyTimeSubscription!: Subscription
  private breakTimeSubscription!: Subscription
  intervalKeeper: any;
  minutes: number = 0;
  seconds: number = 0;
  studyMode = true //this will mean that the study mode is on and the
  timeRunning = false
  numberOfTimers: number = 0;
  pomodorosCompleted: number = 0;
  constructor(private pomodoroTimerService: PomodoroTimerService) {
  }

  ngOnInit(): void {
    console.log('initialized the times')
    this.studyTimeSubscription = this.pomodoroTimerService
      .studyTime$
      .subscribe(study_time => {
        this.studyTimeInterval = study_time
        if (this.studyMode && !this.timeRunning) {
          this.minutes = this.studyTimeInterval
          this.seconds = 0
        }
      })

    this.breakTimeSubscription = this.pomodoroTimerService
      .breakTime$
      .subscribe(break_time => {
        this.breakTimeInterval = break_time
        if (!this.studyMode && !this.timeRunning) {
          this.minutes = this.studyTimeInterval
          this.seconds = 0
        }
      })

    if (this.studyMode) {
      this.minutes = this.studyTimeInterval;
      this.seconds = 0;
    } else {
      this.minutes = this.breakTimeInterval;
      this.seconds = 0;
    }
    //these two settings will do the thing I provided to you will provide the newest value set for the user for study time interval and break time interval
    //and will automatically update the pomodoro method
  }

  ngOnDestroy(): void {
    this.studyTimeSubscription.unsubscribe()
    this.breakTimeSubscription.unsubscribe()
  }

  startTimer() {
    console.log('button clicked for start timer')
    if (this.timeRunning) return; //this means that the time is running and there is no need for changes
    this.timeRunning = true
    this.intervalKeeper = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.timeRunning = true;
          this.studyMode = !this.studyMode
          this.minutes = this.studyMode ? this.studyTimeInterval : this.breakTimeInterval
          this.seconds = 0
          this.numberOfTimers++;
          this.pomodorosCompleted = Math.floor(this.numberOfTimers / 2)
        } else {
          this.minutes--;
          this.seconds = 59
        }
      } else {
        this.seconds--;
      }
    }, 1000)//on one second to check and change
  }

  pauseTimer() {
    console.log('button clicked for stop timer')
    this.timeRunning = false;
    clearInterval(this.intervalKeeper);
  }

  resetTimer() {
    console.log('button clicked for reset timer')
    this.pauseTimer();
    this.minutes = this.studyMode ? this.studyTimeInterval : this.breakTimeInterval
    this.seconds = 0
    this.numberOfTimers = 0;
  }
}
