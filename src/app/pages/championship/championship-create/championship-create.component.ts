import { ChampionshipService } from './../../../core/service/championship.service';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Form } from '../../../core/modules/input.module';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, ValidationErrors, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { MatDividerModule } from '@angular/material/divider';
import { Championship } from '../../../core/models/Championship';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-championship-create',
  standalone: true,
  imports: [
    Form,
    MatCardModule,
    MatIconModule,
    NgxMaskDirective,
    MatDividerModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './championship-create.component.html',
  styleUrl: './championship-create.component.scss'
})
export class ChampionshipCreateComponent {

  formTeam!: FormGroup;
  loadingSubmitForm = false;
  messageSuccess = false;

  registration!: Championship;

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
    private championshipService: ChampionshipService,
    private router: Router
  ){this.loadPage()}

  loadPage(): void{
    this.formTeam = this._formBuilder.group({
      name: [null, [Validators.required]],
      acronym: [null, [Validators.required]],
      responsible: this._formBuilder.group({
        name: [null, [Validators.required]],
        phone: [null, [Validators.required]]
      }),
      city: this._formBuilder.group({
        name: [null, [Validators.required]],
        uf: [null, [Validators.required]]
      }),
      categories: [[], [this.customValidatorCategories]],
      category: [null, [Validators.required]],
      naipe: [null, [Validators.required]],
    });
  }

  onSubmit():void {
    if(this.formTeam.valid){
      this.loadingSubmitForm = true;
      this.championshipService.createTeam(this.formTeam.value).subscribe(value => {
        if(value){
          this.messageSuccess = true;
          this.loadingSubmitForm = false;

          this.registration = value;
        }
      });
    }
  }

  newRegistrarion(formDirective: FormGroupDirective): void{
    formDirective.resetForm();
    this.formTeam.reset();

    this.messageSuccess = false;
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

  redirectPageFollowUp(enrollment: string){
    this.router.navigateByUrl(`/copa/acompanhe/${enrollment}`);
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

  customValidatorCategories(val: AbstractControl): ValidationErrors | null {
    const categories = val?.value as [];

    if(categories.length == 0){
      return {notCategories: true}
    }

    return null;
  }
}
