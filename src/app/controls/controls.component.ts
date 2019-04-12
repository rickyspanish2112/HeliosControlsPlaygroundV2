import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../service/getdata.service';
import { Declarationtype } from '../model/declarationtypes';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { State } from '../model/state';

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
  stateGroupsOptions$: Observable<State[]>;
  stateGroups: State[] = [];

  constructor(private getDataService: GetdataService, private fb: FormBuilder) {
    getDataService.getAllDeclarationTypes();
  }

  ngOnInit() {
    this.getDeclarationTypes();
    this.getStates();

    this.declarationTypes$ = this.typeCtrl.valueChanges.pipe(
      startWith(''),
      map(type =>
        type ? this.filteredTypes(type) : this.declarationTypes.slice()
      )
    );

    this.stateGroupsOptions$ = this.stateForm
      .get('stateGroup')
      .valueChanges.pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }
  getStates() {
    this.getDataService.getAllStates().subscribe(data => {
      return (this.stateGroups = data);
    });
  }

  _filterGroup(value: any): any {
    if (value) {
      return this.stateGroups
        .map(group => ({
          letter: group.letter,
          names: _filter(group.names, value)
        }))
        .filter(group => group.names.length > 0);
    }
  }

  getDeclarationTypes() {
    this.getDataService.getAllDeclarationTypes().subscribe(data => {
      return (this.declarationTypes = data);
    });
  }

  filteredTypes(value: string): Declarationtype[] {
    const filterValue = value.toLowerCase();

    return this.declarationTypes.filter(
      state => state.value.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
