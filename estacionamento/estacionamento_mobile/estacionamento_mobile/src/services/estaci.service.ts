import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Estacionamento } from "../models/estacionamento";
import { URLBASE } from "../config/api.config";

@Injectable()
export class EstacionamentoService {

    constructor(public HttpClient: HttpClient) { }

    get(estacionamento: Estacionamento) {
        var url = URLBASE.urlBase + "/route.estacionamento.php?id_es=" + estacionamento.id_es;
        return this.HttpClient.get<Estacionamento[]>(url);
    }
}