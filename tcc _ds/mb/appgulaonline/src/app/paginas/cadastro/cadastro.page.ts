import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Empresas } from 'src/app/models/empresas';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  pp: Empresas[];
  constructor(public nav: NavController) { }

  voltar(v) {
    this.nav.navigateForward(v);
  }
  /* ngOnInit() {
    let empresas: Empresas = { id_ca: "2", nome: "", cpf: "", fone: "", bairro: "", rua: "", numero: "", cidade: "", uf: "", cnpj: "", linksite: "", email: "", senha: "" }
    this.empresasService.get(empresas).subscribe(
      (resposta: Empresas[]) => {
        this.pp = resposta;
      },
      (error) => {
        console.log(error)
      }
    );
  }*/

}
