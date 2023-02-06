import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    // { title: 'Cadastro', url: '/cadastro', icon: 'reader' },
    { title: 'Meu Pedido', url: '/folder/meu_pedido', icon: 'fast-food' },
    //{ title: 'Cadastrar-se', url: '/folder/Cadastrar-se', icon: 'person-add' },
    { title: 'Perfil', url: '/folder/perfil', icon: 'man' },
    { title: 'Ajuda', url: '/folder/ajuda', icon: 'help-circle' },
    { title: 'Sair', url: '/folder/sair', icon: 'close-circle' },
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() { }
}
