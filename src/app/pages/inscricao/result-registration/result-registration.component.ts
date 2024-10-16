import { MatIconModule } from '@angular/material/icon';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Candidate, ResultSelective } from '../../../core/models/Candidate';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-result-registration',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './result-registration.component.html',
  styleUrl: './result-registration.component.scss'
})
export class ResultRegistrationComponent {
  resultValue: any[] = [];
  link: any[] = [];

  @Input('valueCandidate') set valueCandidateInput(value: Candidate){
    if(value){
      this.valueCandidate = value;
      this.loadAverage();
    }
  }
  valueCandidate!: Candidate;

  loadAverage(): void{
    this.resultValue = [];
    this.link = [];

    if(this.valueCandidate.levelSelect != null){
      switch(this.valueCandidate.levelSelect){
        case 0:{
          this.link.push({link: 'https://chat.whatsapp.com/IlRnAQmeRNHC7eMK9Tycz2', title: 'Entrar no grupo María Amélia'});
          this.link.push({link: 'https://chat.whatsapp.com/JToQWep2tqaAOb5K0YWaNu', title: 'Entrar no grupo Adauto Bezerra'});
          break;
        }

        case 1:{
          this.link.push({link: 'https://chat.whatsapp.com/Dt482pkSJdh8ZOFqckovHr', title: 'Entrar no grupo'});
          break;
        }

        case 2:{
          this.link.push({link: 'https://chat.whatsapp.com/GUMTwl7WUPg2JPFfkMmZsv', title: 'Entrar no grupo'});
          break;
        }

        case 3:{
          if(this.valueCandidate.gender == "FEMININO"){
            this.link.push({link: 'https://chat.whatsapp.com/F7pFeMTuSVFGe7AfBt8AX8', title: 'Entrar no grupo'});
          } else if(this.valueCandidate.gender == "MASCULINO"){
            this.link.push({link: 'https://chat.whatsapp.com/EMAQZh6X7uQ4iJrrQrtO1t', title: 'Entrar no grupo'});
          }
          break;
        }
      }
    }

    if(this.valueCandidate.result != null){
      const valueSome: ResultSelective = {} as ResultSelective;
      this.valueCandidate.result.forEach(value => {
        if(value.attack != null){
          valueSome.attack = ++value.attack;
        }

        if(value.defense != null){
          valueSome.defense = ++value.defense;
        }

        if(value.frontDesk != null){
          valueSome.frontDesk = ++value.frontDesk;
        }

        if(value.headline != null){
          valueSome.headline = ++value.headline;
        }

        if(value.lock != null){
          valueSome.lock = ++value.lock;
        }

        if(value.service != null){
          valueSome.service = ++value.service;
        }

        if(value.touch != null){
          valueSome.touch = ++value.touch;
        }
      });

      const valueResult = {
        attack: valueSome.attack/this.valueCandidate.result.length,
        defense: valueSome.defense/this.valueCandidate.result.length,
        frontDesk: valueSome.frontDesk/this.valueCandidate.result.length,
        headline: valueSome.headline/this.valueCandidate.result.length,
        lock: valueSome.lock/this.valueCandidate.result.length,
        service: valueSome.service/this.valueCandidate.result.length,
        touch: valueSome.touch/this.valueCandidate.result.length,
      } as ResultSelective;

     if(valueSome.attack != null){
        this.resultValue.push(`Ataque: ${valueResult.attack}`);
      }

     if(valueSome.defense != null){
        this.resultValue.push(`Defesa: ${valueResult.defense}`);
      }

     if(valueSome.frontDesk != null){
        this.resultValue.push(`Recepção: ${valueResult.frontDesk}`);
      }

     if(valueSome.headline != null){
        this.resultValue.push(`Manchete: ${valueResult.headline}`);
      }

     if(valueSome.lock != null){
        this.resultValue.push(`Bloqueio: ${valueResult.lock}`);
      }

     if(valueSome.service != null){
        this.resultValue.push(`Saque: ${valueResult.service}`);
      }

     if(valueSome.touch != null){
        this.resultValue.push(`Toque: ${valueResult.touch}`);
      }
    }
  }
}
