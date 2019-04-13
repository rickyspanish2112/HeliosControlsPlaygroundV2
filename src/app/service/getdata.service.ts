import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Declarationtype } from '../model/declarationtypes';
import { throwError } from 'rxjs';
import { State } from '../model/state';
import { Country } from '../model/country';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor(private http: HttpClient) { }

  getAllDeclarationTypes() {
    const declarationTypesUrl = '../../../assets/api/declarationtypes.json';

    return this.http.get<Declarationtype[]>(declarationTypesUrl).pipe(
      tap(this.doGetDeclarationTypes()),
      catchError(this.handleError)
    );
  }

  getAllStates(){
    const states = '../../assets/api/countrygroups.json';
    return this.http.get<State[]>(states).pipe(
      tap(this.doGetStates()),
      catchError(this.handleError));
  }

  getAllCountries() {
    const countries = '../../assets/api/countries.json';
    return this.http.get<Country[]>(countries).pipe(
      tap(this.doGetCountries()),
      catchError(this.handleError));


  }
  doGetCountries(): (x: Country[]) => void {
    return data =>
    console.log(
      'The following declaration types were returned: ' + JSON.stringify(data)
    );
  }

 private doGetStates(): (x: State[]) => void {
    return data =>
    console.log(
      'The following declaration types were returned: ' + JSON.stringify(data)
    );
  }

 private doGetDeclarationTypes(): (x: Declarationtype[]) => void {
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
