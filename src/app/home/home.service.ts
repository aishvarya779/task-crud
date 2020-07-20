import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TASK } from '../shared/models/task';
import { catchError, map, filter } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditRowComponent } from './edit-row/edit-row.component';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private url = 'https://tasksmanager-302f5.firebaseio.com/';
  constructor(private _http: HttpClient, private _dialog: MatDialog) {}
  openEditDialog(data?: TASK) {
    let config = {
      width: '500px',
      data: data
    };
    return this._dialog.open(EditRowComponent, config);
  }
  createTask(task: TASK) {
    return this._http.post(this.url, task).pipe(catchError(this.handleError));
  }

  getAllTask() {
    return this._http.get(this.url + 'Task.json').pipe(
      filter(item => item instanceof Object),
      map(res => {
        let result = [];
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            res[key].name = key;
            result.push(res[key]);
          }
        }
        return result;
      }),
      catchError(this.handleError)
    );
  }
  deleteTask(name) {
    return this._http
      .delete(`${this.url}${name}.json`)
      .pipe(catchError(this.handleError));
  }
  handleError(error) {
    let errMsg = '';
    if (error instanceof ErrorEvent) {
      errMsg = `Error: ${error.error.message}`;
    } else {
      // server-side error

      errMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errMsg);
  }
}
