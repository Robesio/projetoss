import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URLBASE } from "../config/api.config";
import { Alimentos } from "../models/alimentos";

@Injectable()
export class AlimentosService {

    constructor(public HttpClient: HttpClient) { }

    get(alimentos: Alimentos) {
        var url = URLBASE.urlBase + "/route.tbalimentos.php?id_ca=" + alimentos.id_ca;
        return this.HttpClient.get<Alimentos[]>(url);
    }
}