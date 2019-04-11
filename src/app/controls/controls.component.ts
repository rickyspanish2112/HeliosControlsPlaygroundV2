import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../service/getdata.service';
import { Declarationtype } from '../model/declarationtypes';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  declarationTypes$: Observable<Declarationtype[]>; // Filtered states
  declarationTypes: Declarationtype[] = [];
  typeCtrl = new FormControl();

  errorMessage: string;

  constructor(private getDataService: GetdataService, private fb: FormBuilder) {
    getDataService.getAllDeclarationTypes();
  }

  ngOnInit() {
    this.getDeclarationTypes();

    this.declarationTypes$ = this.typeCtrl.valueChanges.pipe(
      startWith(''),
      map(type =>
        type ? this.filteredStates(type) : this.declarationTypes.slice()
      )
    );
  }

  getDeclarationTypes() {
    this.getDataService.getAllDeclarationTypes().subscribe(data => {
      return (this.declarationTypes = data);
    });
  }

  filteredStates(value: string): Declarationtype[] {
    const filterValue = value.toLowerCase();

    return this.declarationTypes.filter(
      state => state.value.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
