import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { take } from 'rxjs/operators';
import { TASK } from '../../shared/models/task';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'tm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'action'];
  dataSource: MatTableDataSource<TASK>;
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
          this.dataSource = new MatTableDataSource(res);
        },
        err => {
          this._homeService.showError(err);
        }
      );
  }

  deleteRow(row) {
    this._homeService
      .deleteTask(row.name)
      .pipe(take(1))
      .subscribe(
        res => {
          this.getAllTask();
          this._homeService.showSuccess('Row deleted successfully');
        },
        err => {
          this._homeService.showError(err);
        }
      );
  }

  openUpdateDialog(row?) {
    let dialogRef = this._homeService.openEditDialog(row);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAllTask();
      }
    });
  }
}
