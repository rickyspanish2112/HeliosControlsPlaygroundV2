import { Component, OnInit } from '@angular/core';
import { Declarationtype } from 'src/app/model/declarationtypes';
import { Observable } from 'rxjs';
import { GetdataService } from 'src/app/service/getdata.service';
import { MatTableDataSource } from '@angular/material';
import { Country } from 'src/app/model/country';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  declarationTypes$: Observable<Declarationtype[]>;
  declarationTypes: Declarationtype[] = [];
  displayedColumns: string[] = ['selected', 'code', 'name'];
  countryData:  Country[];
  errorMessage: string;
  dataSource: MatTableDataSource<Country>;

  value = 'Omega';

  constructor(private getDataService: GetdataService) {

    this.getDataService.getAllCountries()
    .subscribe((countries:Country[]) => {
      this.countryData = countries;
      console.log('Heres some data');
      console.log(this.countryData);
      this.dataSource = new MatTableDataSource(this.countryData);
    }, error => this.errorMessage = <any>error);

   }

  ngOnInit() {
  }



}
