import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-study-time',
  imports: [],
  templateUrl: './study-time.html',
  styleUrl: './study-time.css'
})

export class StudyTime {
  @Input() studyTime: number = 25;
  @Output() studyTimeChange = new EventEmitter<number>();

  increaseStudyTime(){
    if(this.studyTime < 60){
      this.studyTime++;
      console.log(`study time is: ${this.studyTime}`)
      this.studyTimeChange.emit(this.studyTime)
    }
  }
  decreaseStudyTime(){
    if(this.studyTime > 1){
      this.studyTime--;
      console.log(`study time is: ${this.studyTime}`)
      this.studyTimeChange.emit(this.studyTime)
    }
  }
}
