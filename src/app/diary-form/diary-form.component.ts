import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DiaryEntry } from '../shared/diary-entry.model';
import { DiaryDataService } from '../shared/diary-data.component';

@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.css']
})
export class DiaryFormComponent implements OnInit {

  editMode = false;
  private paramId: string;
  diaryEntry: DiaryEntry;

  diaryForm : FormGroup;
  
  
  constructor(private diaryDataService: DiaryDataService, private router: Router, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')){
        this.editMode = true;
        this.paramId = paramMap.get('id')!;
        this.diaryEntry = this.diaryDataService.getDiaryEntry(this.paramId);
      }
      else{
        this.editMode = false;
        this.diaryEntry = new DiaryEntry('', '', '', '');
      }
    })
    this.diaryForm = new FormGroup({
      'date': new FormControl(this.editMode ? this.diaryEntry.date : ''),
      'exercise': new FormControl(this.editMode ? this.diaryEntry.exercise : ''),
      'duration': new FormControl(this.editMode ? this.diaryEntry.duration : ''),
      'calories': new FormControl(this.editMode ? this.diaryEntry.calories : '')
    })
    
  }


  onSubmit(){
    const entry = new DiaryEntry(
        this.diaryForm.value.date,
        this.diaryForm.value.exercise,
        this.diaryForm.value.duration, // parse duration as a number
        this.diaryForm.value.calories // parse calories as a number
    );

    if(this.editMode){
        entry.id = this.paramId;
        this.diaryDataService.updateEntry(this.paramId, entry);
    }
    else{
        this.diaryDataService.onAddDiaryEntry(entry);
    }
    this.router.navigateByUrl("");
}

}
