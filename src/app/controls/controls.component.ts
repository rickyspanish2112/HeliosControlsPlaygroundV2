import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { GetdataService } from '../service/getdata.service';
import { Declarationtype } from '../model/declarationtypes';
import { Observable } from 'rxjs';
import { startWith, map, take } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { State } from '../model/state';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Country } from '../model/country';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  declarationTypes$: Observable<Declarationtype[]>;
  declarationTypes: Declarationtype[] = [];
  typeCtrl = new FormControl();
  errorMessage: string;

  stateForm: FormGroup = this.fb.group({
    stateGroup: ''
  });
  stateGroups$: Observable<State[]>;
  stateGroups: State[] = [];

  countries: Country[] = [];
  selected: Country;
  selectedCountryName: string;

  constructor(private getDataService: GetdataService, private fb: FormBuilder) {
    getDataService.getAllDeclarationTypes();
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit() {
    this.getDeclarationTypes();
    this.getStates();
    this.getCountries();

    this.declarationTypes$ = this.typeCtrl.valueChanges.pipe(
      startWith(''),
      map(type =>
        type ? this.filteredTypes(type) : this.declarationTypes.slice()
      )
    );

    this.stateGroups$ = this.stateForm.get('stateGroup').valueChanges.pipe(
      startWith(''),
      map(value => this.filterGroup(value))
    );
  }
  getCountries() {
    this.getDataService.getAllCountries().subscribe(data => {
      return (this.countries = data);
    });
  }
  private getStates() {
    this.getDataService.getAllStates().subscribe(data => {
      return (this.stateGroups = data);
    });
  }

  private filterGroup(value: any): any {
    if (value) {
      return this.stateGroups
        .map(group => ({
          letter: group.letter,
          names: _filter(group.names, value)
        }))
        .filter(group => group.names.length > 0);
    }
  }

  private getDeclarationTypes() {
    this.getDataService.getAllDeclarationTypes().subscribe(data => {
      return (this.declarationTypes = data);
    });
  }

  private filteredTypes(value: string): Declarationtype[] {
    const filterValue = value.toLowerCase();

    return this.declarationTypes.filter(
      state => state.value.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onCountryCodeChanged(value: string) {
    const country = this.countries.find(x => x.code === value);

    if (country === null) {
      this.selected.code = 'Unable to find country';
    } else {
      this.selectedCountryName = country.name;
    }
  }
}
