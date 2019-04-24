import { GetdataService } from 'src/app/service/getdata.service';
import { OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Country } from 'src/app/model/country';
import { BehaviorSubject, Observable } from 'rxjs';

export class ExampleDataSource extends DataSource<Country> implements OnInit {
  countries: Country[];

  constructor(private getDataService: GetdataService) {
    super();
  }

/** Stream of data that is provided to the table. */
data = new BehaviorSubject<Country[]>(this.countries);

ngOnInit(): void {
  this.getCountries();
}

getCountries() {
  this.getDataService.getAllCountries().subscribe(data => {
    return (this.countries = data);
  });
}

/** Connect function called by the table to retrieve one stream containing the data to render. */
connect(): Observable<Country[]> {
  return this.data;
}

disconnect() {}


}
