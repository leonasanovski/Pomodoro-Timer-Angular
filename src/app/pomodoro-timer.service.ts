import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PomodoroTimerService {
  private studyTimeSubject = new BehaviorSubject<number>(20);
  private breakTimeSubject = new BehaviorSubject<number>(5);

  studyTime$ = this.studyTimeSubject.asObservable();
  breakTime$ = this.breakTimeSubject.asObservable();

  setStudyTime(minutes: number) {this.studyTimeSubject.next(minutes)}
  setBreakTime(minutes: number){this.breakTimeSubject.next(minutes);}
}
