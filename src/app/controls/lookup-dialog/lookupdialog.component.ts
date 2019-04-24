import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { Country } from 'src/app/model/country';
import { GetdataService } from 'src/app/service/getdata.service';
import { Observable } from 'rxjs';

/**
 * @title Basic CDK data-table
 */
@Component({
  selector: 'app-lookupdialog',
  templateUrl: './lookupdialog.component.html',
  styleUrls: ['./lookupdialog.component.scss']
})
export class LookupdialogComponent {
  // tslint:disable-next-line: no-use-before-declare
  dataSource = new ExampleDataSource(this.getDataService);
  displayedColumns: string[] = ['code', 'name'];

  constructor(private getDataService: GetdataService) {}
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<Country> {
  coutries: Country[];

  constructor(private getDataService: GetdataService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Country[]> {
    return this.getDataService.getAllCountries();
  }

  disconnect() {}

  getCountries() {
    this.getDataService.getAllCountries().subscribe(data => {
      console.log('Fetched country data for table');
      return (this.coutries = data);
    });
  }
}
