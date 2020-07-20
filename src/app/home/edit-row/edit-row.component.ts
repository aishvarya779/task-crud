import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { HomeService } from '../home.service';

@Component({
  selector: 'tm-edit-row',
  templateUrl: './edit-row.component.html',
  styleUrls: ['./edit-row.component.scss']
})
export class EditRowComponent implements OnInit {
  taskForm: FormGroup;
  allStatus: string[] = ['A', 'B', 'Not Started'];
  constructor(
    public dialogRef: MatDialogRef<EditRowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _homeService: HomeService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.initForm();
  }

  initForm() {
    this.taskForm = this._fb.group({
      id: ['', Validators.required],
      priority: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onCancle() {
    this.dialogRef.close();
  }
  submitForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this._homeService.createTask(this.taskForm.value).subscribe(
      res => {
        console.log(res);
        this.dialogRef.close(this.taskForm.value);
      },
      err => {
        console.log(err);
      }
    );
  }
}
