const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tableVeiculo = document.querySelector("#veiculos");
const tableEstacionamento = document.querySelector("#estacionamento");
const urlVeiculo = "../src/controll/routes/route.veiculo.php?id_ve=0";
const urlEstacionamento = "../src/controll/routes/route.estacionamento.php?id_es=0";

function carregarVeiculos() {
    fetch(urlVeiculo)
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                let row = document.createElement("tr");
                row.innerHTML = `<tr><td>${val.id_ve}</td>`;
                row.innerHTML += `<td>${val.placa}</td>`;
                row.innerHTML += `<td>${val.veiculo}</td>`;
                row.innerHTML += `<td style="padding:3px"><button onclick='editVeiculo(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delVeiculo(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                tableVeiculo.appendChild(row);
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}

function editVeiculo(v) {
    v.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[3].innerHTML = "<button onclick='putVeiculo(this)'>Enviar</button>";
}

function putVeiculo(v) {
    let url = "../src/controll/routes/route.veiculo.php";
    let id_ve = v.parentNode.parentNode.cells[0].innerHTML;
    let placa = v.parentNode.parentNode.cells[1].innerHTML;
    let veiculo = v.parentNode.parentNode.cells[2].innerHTML;
    let dados = "id_ve=" + id_ve;
    dados += "&placa=" + placa;
    dados += "&veiculo=" + veiculo;
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Dados do Veiculo Alterada Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("PUT", url);
        xhr.send(dados);
    }
}

function addVeiculo() {
    let url = "../src/controll/routes/route.veiculo.php";
    let placa = document.querySelector("#placa");
    let tipo = document.querySelector("#tipoVeiculo");
    if (placa.value != "" && tipo.value != "") {
        let dados = new FormData();
        dados.append("placa", placa.value);
        dados.append("veiculo", tipo.value);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                msg.innerHTML = this.responseText;
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Automóvel Criado Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        msg.innerHTML = "Favor preencher o campo placa!";
        setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
    }
}

function delVeiculo(v) {
    let url = "../src/controll/routes/route.veiculo.php";
    let id_ve = v.parentNode.parentNode.cells[0].innerText;
    let dados = "id_ve=" + id_ve;
    if (window.confirm("Confirma Exclusão do id_ve = " + id_ve + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Veiculo Excluída Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("DELETE", url);
        xhr.send(dados);
    }
}

function carregarVaga_estaci() {
    fetch(urlEstacionamento)
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                let row = document.createElement("tr");
                row.innerHTML = `<tr><td>${val.id_es}</td>`;
                row.innerHTML += `<td>${val.id_ve}</td>`;
                row.innerHTML += `<td>${val.data}</td>`;
                row.innerHTML += `<td>${val.hora_e}</td>`;
                row.innerHTML += `<td>${val.hora_s}</td>`;
                row.innerHTML += `<td>${val.valor}</td>`;
                row.innerHTML += `<td style="padding:3px"><button onclick='editVaga_estaci(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button></td></tr>`;
                tableEstacionamento.appendChild(row);
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}

function editVaga_estaci(e) {
    e.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    e.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    e.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    e.parentNode.parentNode.cells[4].setAttribute("contentEditable", "true");
    e.parentNode.parentNode.cells[5].setAttribute("contentEditable", "true");
    e.parentNode.parentNode.cells[6].innerHTML = "<button onclick='putVaga_estaci(this)'>Enviar</button>";
}

function putVaga_estaci(e) {
    let url = "../src/controll/routes/route.estacionamento.php";
    let id_es = e.parentNode.parentNode.cells[0].innerHTML;
    let id_ve = e.parentNode.parentNode.cells[1].innerHTML;
    let data = e.parentNode.parentNode.cells[2].innerHTML;
    let hora_e = e.parentNode.parentNode.cells[3].innerHTML;
    let hora_s = e.parentNode.parentNode.cells[4].innerHTML;
    let valor = e.parentNode.parentNode.cells[5].innerHTML;
    let dados = "id_es=" + id_es;
    dados += "&id_ve=" + id_ve;
    dados += "&data=" + data;
    dados += "&hora_e=" + hora_e;
    dados += "&hora_s=" + hora_s;
    dados += "&valor=" + valor;
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Dados da Vaga do Estacionamento Alterada Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("PUT", url);
        xhr.send(dados);
    }
}

function addVaga_estaci() {
    let url = "../src/controll/routes/route.estacionamento.php";
    let id_ve = document.querySelector("#id_ve");
    let data = document.querySelector("#data");
    //let hora_e = document.querySelector("#hora_e");
    let hora_s = document.querySelector("#hora_s");
    let valor = document.querySelector("#valor");
    if (id_ve.value != "") {
        let dados = new FormData();
        dados.append("id_ve", id_ve.value);
        dados.append("data", data.value);
        //dados.append("hora_e", hora_e.value);
        dados.append("hora_s", hora_s.value);
        dados.append("valor", valor.value);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                msg.innerHTML = this.responseText;
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Vaga Preenchida Com Sucesso!";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        msg.innerHTML = "Favor Preencher Todos os Campos !";
        setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
    }
}