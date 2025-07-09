import {Component, OnInit} from '@angular/core';
import {BreakTime} from '../break-time/break-time';
import {StudyTime} from '../study-time/study-time';

@Component({
  selector: 'app-pomodoro',
  imports: [
    BreakTime,
    StudyTime
  ],
  templateUrl: './pomodoro.html',
  styleUrl: './pomodoro.css'
})

export class Pomodoro implements OnInit {
  studyTimeInterval = 25;
  breakTimeInterval = 5;
  intervalKeeper: any;
  minutes: number = 0;
  seconds: number = 0;
  studyMode = true;
  timeRunning = false;
  numberOfTimers: number = 0;
  pomodorosCompleted: number = 0;
  private studyTimeEnds = new Audio('/sounds/time-ends.mp3');
  private startBreak = new Audio('/sounds/starting-pause.mp3');
  private studyTimeStarts = new Audio('/sounds/start-effect.wav');

  onBreakTimeChange(new_break_time: number) {
    this.breakTimeInterval = new_break_time
    if (!this.timeRunning) {
      this.minutes = this.studyTimeInterval;
      this.seconds = 0;
    }
  }

  onStudyTimeChange(new_study_time: number) {
    this.studyTimeInterval = new_study_time
    if (!this.timeRunning) {
      this.minutes = this.studyTimeInterval;
      this.seconds = 0;
    }
  }

  ngOnInit(): void {
    this.studyTimeEnds.preload = 'auto';
    this.studyTimeEnds.volume = 0.65
    this.startBreak.preload = 'auto';
    this.startBreak.volume = 0.65
    this.studyTimeStarts.preload = 'auto';
    this.studyTimeStarts.volume = 0.65
    if (this.studyMode) {
      this.minutes = this.studyTimeInterval;
      this.seconds = 0;
    } else {
      this.minutes = this.breakTimeInterval;
      this.seconds = 0;
    }
  }

  startTimer() {
    if (this.timeRunning) return;
    this.timeRunning = true
    this.intervalKeeper = setInterval(() => {
      if (this.seconds === 3 && this.minutes == 0) {
        this.studyMode ? this.studyTimeEnds.play() : this.studyTimeStarts.play()
      }
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.timeRunning = true;
          this.studyMode = !this.studyMode
          this.minutes = this.studyMode ? this.studyTimeInterval : this.breakTimeInterval
          this.seconds = 0
          this.numberOfTimers++;
          this.pomodorosCompleted = Math.floor(this.numberOfTimers / 2)
          this.startBreak.play();
        } else {
          this.minutes--;
          this.seconds = 59
        }
      } else {
        this.seconds--;
      }
    }, 1000)
  }

  pauseTimer() {
    this.timeRunning = false;
    clearInterval(this.intervalKeeper);
  }

  resetTimer() {
    this.pauseTimer();
    this.minutes = this.studyMode ? this.studyTimeInterval : this.breakTimeInterval
    this.seconds = 0
    this.numberOfTimers = 0;
    this.pomodorosCompleted = 0;
  }

  unlockAutoPlayAudio() {
    this.studyTimeEnds.play().then(() => this.studyTimeEnds.pause());
    this.studyTimeStarts.play().then(() => this.studyTimeStarts.pause());
    this.startBreak.play().then(() => this.startBreak.pause());
  }

  startPomodoroSession() {
    this.unlockAutoPlayAudio();
    this.startTimer();
  }
}
