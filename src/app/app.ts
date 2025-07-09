import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Pomodoro} from './pomodoro/pomodoro';
import {StudyTime} from './study-time/study-time';
import {BreakTime} from './break-time/break-time';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Pomodoro, StudyTime, BreakTime],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'pomodoro-timer';
}
