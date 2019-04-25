import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { Country } from 'src/app/model/country';
import { GetdataService } from 'src/app/service/getdata.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';


/**
 * @title Basic CDK data-table
 */
@Component({
  selector: 'app-lookupdialog',
  templateUrl: './lookupdialog.component.html',
  styleUrls: ['./lookupdialog.component.scss']
})
export class LookupdialogComponent {
  displayedColumns: string[] = ['selected', 'code', 'name'];
   countryData:  Country[];
   errorMessage: string;
   dataSource: MatTableDataSource<Country>;

  constructor(private getDataService: GetdataService) {

    this.getDataService.getAllCountries()
    .subscribe((countries:Country[]) => {
      this.countryData = countries;
      console.log('Heres some data');
      console.log(this.countryData);
      this.dataSource = new MatTableDataSource(this.countryData);
    }, error => this.errorMessage = <any>error);
  }
}
