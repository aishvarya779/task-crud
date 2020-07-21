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
    this.initForm();
    if (this.data) {
      this.taskForm.patchValue(this.data);
    }
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
    // if (form.invalid) {
    //   return;
    // }
    if (this.data && this.data.name) {
      this.updateTask(form);
    } else {
      this.createTask(form);
    }
  }

  createTask(form: NgForm) {
    this._homeService.createTask(this.taskForm.value).subscribe(
      res => {
        this.dialogRef.close(this.taskForm.value);
        this._homeService.showSuccess('New Task added Successfully');
      },
      err => {
        this._homeService.showError(err);
      }
    );
  }

  updateTask(form: NgForm) {
    this._homeService.updateTask(this.data.name, this.taskForm.value).subscribe(
      res => {
        this.dialogRef.close(this.taskForm.value);
        this._homeService.showSuccess('Task updated Successfully');
      },
      err => {
        this._homeService.showError(err);
      }
    );
  }
}
