import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  ViewContainerRef
} from '@angular/core';
import { GetdataService } from '../service/getdata.service';
import { Declarationtype } from '../model/declarationtypes';
import { Observable } from 'rxjs';
import { startWith, map, take } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { State } from '../model/state';
import { Country } from '../model/country';
import { MatAutocompleteTrigger, MatDialog } from '@angular/material';
import {
  TemplatePortalDirective,
  Portal,
  ComponentPortal
} from '@angular/cdk/portal';
import {
  Overlay,
  CdkOverlayOrigin,
  OverlayConfig,
  ConnectionPositionPair
} from '@angular/cdk/overlay';
import { OverlayComponent } from './overlay/overlay.component';

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

  errorMessage: string;

  typeCtrl = new FormControl();
  stateForm: FormGroup = this.fb.group({
    stateGroup: ''
  });

  lookupInput = new FormControl();

  stateGroupsOptions$: Observable<State[]>;
  stateGroups: State[] = [];

  countries: Country[] = [];
  selected: Country;
  selectedCountryName: string;

  isMenuOpen = false;

  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
  @ViewChildren(TemplatePortalDirective) templatePortals: QueryList<Portal<any>>;

  constructor(
    private getDataService: GetdataService,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {
    getDataService.getAllDeclarationTypes();
  }

  ngOnInit() {
    this.getDeclarationTypes();
    this.getStates();
    this.getCountries();

    this.declarationTypes$ = this.typeCtrl.valueChanges.pipe(
      map(type =>
        // type ? this.filteredTypes(type) : this.declarationTypes.slice()
        this.filteredTypes(type)
      )
    );

    this.stateGroupsOptions$ = this.stateForm
      .get('stateGroup')
      .valueChanges.pipe(
        startWith(''),
        map(value => this.filterGroup(value))
      );
  }

  openSpaghettiPanel(event: any) {
    if (event.target.value !== '?') {
      return;
    }

    const config = new OverlayConfig();

    config.positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    // config.hasBackdrop = true;

    const overlayRef = this.overlay.create(config);

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });

    overlayRef.attach(
      new ComponentPortal(OverlayComponent, this.viewContainerRef)
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
