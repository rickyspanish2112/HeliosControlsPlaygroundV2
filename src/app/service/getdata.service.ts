import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Declarationtype } from '../model/declarationtypes';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor(private http: HttpClient) { }

  getAllDeclarationTypes() {
    const declarationTypesUrl = '../../../assets/api/declarationtypes.json';

    return this.http.get<Declarationtype[]>(declarationTypesUrl).pipe(
      tap(this.DoGetDeclarationTypes()),
      catchError(this.handleError)
    );
  }

  DoGetDeclarationTypes(): (x: Declarationtype[]) => void {
    return data =>
      console.log(
        'The following declaration types were returned: ' + JSON.stringify(data)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred ${err.error.message}`;
    } else {
      errorMessage = `Server side returned code: ${
        err.status
      }, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
