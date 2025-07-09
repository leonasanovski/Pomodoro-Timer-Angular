import { Component } from '@angular/core';
import {Pomodoro} from './pomodoro/pomodoro';

@Component({
  selector: 'app-root',
  imports: [Pomodoro],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected title = 'pomodoro-timer';
}
