import { ChampionshipService } from './../../../core/service/championship.service';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Form } from '../../../core/modules/input.module';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { MatDividerModule } from '@angular/material/divider';
import { Championship } from '../../../core/models/Championship';

@Component({
  selector: 'app-championship-create',
  standalone: true,
  imports: [
    Form,
    MatCardModule,
    MatIconModule,
    NgxMaskDirective,
    MatDividerModule
  ],
  templateUrl: './championship-create.component.html',
  styleUrl: './championship-create.component.scss'
})
export class ChampionshipCreateComponent {

  formTeam!: FormGroup;
  loadingSubmitForm = false;
  messageSuccess = false;

  registration!: Championship;

  constructor(
    private _formBuilder: FormBuilder,
    private championshipService: ChampionshipService
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
}
