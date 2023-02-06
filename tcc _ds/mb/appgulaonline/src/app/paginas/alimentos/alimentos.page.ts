import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Alimentos } from 'src/app/models/alimentos';
import { AlimentosService } from 'src/app/services/alimentos.service';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.page.html',
  styleUrls: ['./alimentos.page.scss'],
})
export class AlimentosPage {
  aa: Alimentos[];
  //valorTotal: number = 0;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alimentosService: AlimentosService) { }

  /*ionViewDidLoad() {
    let alimentos: Alimentos = { id_ca: "2", idali: "", nomeali: "", descricao: "", qtd: "", preco: "", img: "" }
    this.alimentosService.get(alimentos).subscribe(
      (resposta: Alimentos[]) => {
        this.aa = resposta;
        /*for (let i = 0; i < this.aa.length; i++) {
          this.valorTotal += parseFloat(this.aa[i].qtd);
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }*/
}
