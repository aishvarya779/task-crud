import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { take } from 'rxjs/operators';
import { TASK } from '../../shared/models/task';

@Component({
  selector: 'tm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'action'];
  dataSource: TASK[];
  constructor(private _homeService: HomeService) {}

  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask() {
    this._homeService
      .getAllTask()
      .pipe(take(1))
      .subscribe(
        (res: TASK[]) => {
          console.log(res);
          this.dataSource = res;
        },
        err => {
          console.log(err);
        }
      );
  }

  deleteRow(row) {
    this._homeService
      .deleteTask(row.name)
      .pipe(take(1))
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }

  openUpdateDialog(row) {
    console.log(row);
    let dialogRef = this._homeService.openEditDialog(row);
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }
}
