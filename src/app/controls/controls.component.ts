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

  constructor(private getDataService: GetdataService, private fb: FormBuilder) {}

  ngOnInit() {
this.declarationTypes$ = this.typeCtrl.valueChanges
.pipe(startWith(''),
map(type => type ? this.filteredStates(type) : this.getDeclarationTypes()));

  }

  filteredStates(value: string): Declarationtype[] {
    throw new Error('Method not implemented.');
  }

  getDeclarationTypes(): any {
    throw new Error('Method not implemented.');
  }

}
