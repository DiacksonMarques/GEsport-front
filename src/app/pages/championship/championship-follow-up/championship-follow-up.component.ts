import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Form } from '../../../core/modules/input.module';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChampionshipService } from '../../../core/service/championship.service';
import { StoreService } from '../../../core/service/store.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Championship } from '../../../core/models/Championship';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-championship-follow-up',
  standalone: true,
  imports: [
    Form,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    NgxMaskDirective
  ],
  templateUrl: './championship-follow-up.component.html',
  styleUrl: './championship-follow-up.component.scss'
})
export class ChampionshipFollowUpComponent {
  formEnrollment!: FormGroup;
  loadingSubmitForm: boolean = false;

  formTeam!: FormGroup;
  loadingSubmitFormTeam: boolean = false;

  modeEditing = false;
  showCardData = false;

  listNaipesSelect = [
    {value: "AMB", label:"Masc e Femi"},
    {value: "MASCULINO", label:"Masculino"},
    {value: "FEMININO", label:"Feminino"},
  ];

  listCategoriesSelect = [
    {value: "ADL", label:"Adulto"},
    {value: "SUB19", label:"Sub-19"},
    {value: "SUB17", label:"Sub-17"},
    {value: "SUB14", label:"Sub-14"},
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private championshipService: ChampionshipService,
    private storeService: StoreService,
  ){
    this.loadPage();

    if(this.route.snapshot.params?.['followUp']){
      this.formEnrollment.controls['enrollment'].setValue(this.route.snapshot.params['followUp']);
      this.onSubmitEnrollment();
    }
  }

  loadPage(): void{
    this.formEnrollment = this._formBuilder.group({
      enrollment: [null, [Validators.required, Validators.minLength(6)]],
    });

    this.formTeam = this._formBuilder.group({
      enrollment: [{value: null, disabled: true}, [Validators.required]],
      name: [{value: null, disabled: true}, [Validators.required]],
      acronym: [{value: null, disabled: true}, [Validators.required]],
      responsible: this._formBuilder.group({
        name: [{value: null, disabled: true}, [Validators.required]],
        phone: [{value: null, disabled: true}, [Validators.required]]
      }),
      city: this._formBuilder.group({
        name: [{value: null, disabled: true}, [Validators.required]],
        uf: [{value: null, disabled: true}, [Validators.required]]
      }),
      categories: [{value: [], disabled: true}, [this.customValidatorCategories]],
      category: [{value: null, disabled: true}, []],
      naipe: [{value: null, disabled: true}, []],
    });
  }

  onSubmitEnrollment(){
    if(this.formEnrollment.valid){
      this.championshipService.getTeam(this.formEnrollment.controls['enrollment'].value).subscribe(
        response => {
          if(response.value != null &&
            response.value.enrollment != null
          ){
            this.formTeam.patchValue(response.value);
            this.showCardData = true;
          } else {
            this.storeService.showMessage({
              type: 'warning',
              title: `Inscrição não encontrada`,
              timing: 4000
            });
            this.hidCardData();
          }

          this.loadingSubmitForm = false;
        },
        () => {
          this.storeService.showMessage({
            type: 'error',
            title: `Error ao pesquisar, tente novamente!`,
            timing: 4000
          });

          this.loadingSubmitForm = false;
          this.hidCardData();
        }
      );
    }
  }

  onSubmit():void {
    if(this.formTeam.valid){
      this.loadingSubmitFormTeam = true;
      const valueForm = this.formTeam.value as Championship;
      valueForm.enrollment = this.formTeam.controls['enrollment'].value;

      this.championshipService.editTeam(valueForm).subscribe(value => {
        if(value){
          this.loadingSubmitFormTeam = false;

          this.formTeam.patchValue(value);
          this.hideEdintingMode();
        }
      });
    }
  }

  deleteEnrollment(){
    this.championshipService.deleteTeam(this.formTeam.controls['enrollment'].value).subscribe(value => {
        if(value.value){
          this.loadingSubmitFormTeam = false;
          this.hidCardData();
        }
    });
  }

  addNewCategory(){
    const category = this.formTeam.get("category");
    const naipe = this.formTeam.get("naipe");
    const categories = this.formTeam.get("categories")?.value as Array<any>;

    if(!category?.value || !naipe?.value){
      category?.markAsTouched();
      naipe?.markAsTouched();

      return;
    }

    if(
      categories.find(categoryInList => categoryInList.category == category?.value && categoryInList.naipe == naipe?.value) ||
      categories.find(categoryInList => categoryInList.category == category?.value && categoryInList.naipe == "AMB")
    ){
      return;
    }

    categories.push({category: category.value, naipe: naipe.value});
    this.formTeam.get("categories")?.updateValueAndValidity();
  }

  deleteCategory(index: any){
    const categories = this.formTeam.get("categories")?.value as Array<any>;

    categories.splice(index, 1);
    this.formTeam.get("categories")?.updateValueAndValidity();
  }

  labelCategory(value: string){
    return this.listCategoriesSelect.find(category => category.value == value)?.label
  }

  labelNaipe(value: string){
    return this.listNaipesSelect.find(naipe => naipe.value == value)?.label
  }

  showEdintingMode(): void{
    this.modeEditing = true;

    this.formTeam.enable();
    this.formTeam.controls["category"].setValue(null);
    this.formTeam.controls["naipe"].setValue(null);
    this.formTeam.controls["enrollment"].disable();
  }

  hideEdintingMode(): void {
    this.modeEditing = false;

    this.formTeam.disable();
  }

  hidCardData(): void{
    this.showCardData = false;
    this.modeEditing = false;

    this.formTeam.disable();
  }

  customValidatorCategories(val: AbstractControl): ValidationErrors | null {
    const categories = val?.value as [];

    if(categories.length == 0){
      return {notCategories: true}
    }

    return null;
  }
}
