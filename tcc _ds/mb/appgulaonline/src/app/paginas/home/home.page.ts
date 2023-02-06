import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Empresas } from 'src/app/models/empresas';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  emm: Empresas[];

  constructor(public empresasService: EmpresasService) { }

  ngOnInit() {
    let empresa: Empresas = { linksite: "Baronesa" }
    this.empresasService.get(empresa).subscribe(
      (resposta: any) => {
        //this.emm = resposta;
        this.emm = resposta.filter(d => d.linksite != null);
        console.log(this.emm);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
