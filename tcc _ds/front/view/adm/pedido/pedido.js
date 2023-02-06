const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tablePedido = document.querySelector("#tbped"); // O mesmo nome de id que está aqui tem que estar no HTML ref 1.
const urlPed = "http://localhost/front/src/controll/routes/route.tbpedido.php"; //

function carregaPedidos() {
    fetch(urlPed + "?id_ca=" + localStorage.getItem("id_ca"))
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) { // Aqui estou pegando todas as informações e add na variável tablepedido
            data.forEach((val) => {
                let row = document.createElement("tr");
                row.innerHTML = `<tr><td>${val.id_ca}</td>`;
                row.innerHTML += `<td>${val.idpedido}</td>`;
                row.innerHTML += `<td>${val.idali}</td>`;
                row.innerHTML += `<td>${val.nomecli}</td>`;
                row.innerHTML += `<td>${val.fonecli}</td>`;
                row.innerHTML += `<td>${val.ruacli}</td>`;
                row.innerHTML += `<td>${val.numerocli}</td>`;
                row.innerHTML += `<td>${val.bairrocli}</td>`;
                row.innerHTML += `<td>${val.datahora}</td>`;
                row.innerHTML += `<td>${val.idstatus}</td>`;
                row.innerHTML += `<td>${val.qtdcli}</td>`;
                row.innerHTML += `<td style="padding:3px"><button onclick='editPedido(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delPedido(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                tablePedido.appendChild(row);
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}

function addPedido() {
    let url = "http://localhost:8080/projetotccgulaonline/src/controll/routes/route.tbpedido.php";
    let id_ca = document.querySelector("#id_ca");
    let nomecli = document.querySelector("#nomecli");
    let fonecli = document.querySelector("#fonecli");
    let ruacli = document.querySelector("#ruacli");
    let numerocli = document.querySelector("#numerocli");
    let bairrocli = document.querySelector("#bairrocli");
    let datahora = document.querySelector("#datahora");
    let idstatus = document.querySelector("#idstatus");

    if (id_ca.value != "" && nomecli.value != "" && fonecli.value != "" && ruacli.value != "" && numerocli.value != "" && bairrocli.value != "" && datahora.value != "" && idstatus.value != "") {
        let dados = new FormData();
        dados.append("id_ca", id_ca.value);
        dados.append("nomecli", nomecli.value);
        dados.append("fonecli", fonecli.value);
        dados.append("ruacli", ruacli.value);
        dados.append("numerocli", numerocli.value);
        dados.append("bairrocli", bairrocli.value);
        dados.append("datahora", datahora.value);
        dados.append("idstatus", idstatus.value);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                let resp = JSON.parse(this.responseText);

                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Pedido adicionado Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        //  console.log(datahora.value);

        msg.innerHTML = "Favor preencher todos os campos!";
        setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
    }
}

function editPedido(a) {
    a.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[4].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[5].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[6].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[7].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[8].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[9].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[10].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[11].innerHTML = "<button onclick='putPedido(this)'>Enviar</button>";
}

function putPedido(a) {
    let url = "http://localhost:8080/projetotccgulaonline/src/controll/routes/route.tbpedido.php";
    let idpedido = a.parentNode.parentNode.cells[0].innerHTML;
    let id_ca = a.parentNode.parentNode.cells[1].innerHTML;
    let nomecli = a.parentNode.parentNode.cells[2].innerHTML;
    let fonecli = a.parentNode.parentNode.cells[3].innerHTML;
    let ruacli = a.parentNode.parentNode.cells[4].innerHTML;
    let numerocli = a.parentNode.parentNode.cells[5].innerHTML;
    let bairrocli = a.parentNode.parentNode.cells[6].innerHTML;
    let datahora = a.parentNode.parentNode.cells[7].innerHTML;
    let idstatus = a.parentNode.parentNode.cells[8].innerHTML;

    let dados = "idpedido=" + idpedido;
    dados += "&id_ca=" + id_ca;
    dados += "&nomecli=" + nomecli;
    dados += "&fonecli=" + fonecli;
    dados += "&ruacli=" + ruacli;
    dados += "&numerocli=" + numerocli;
    dados += "&bairrocli=" + bairrocli;
    dados += "&datahora=" + datahora;
    dados += "&idstatus=" + idstatus;
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Dados do Pedido Alterada Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("PUT", url);
        xhr.send(dados);
    }
}

function delPedido(a) {
    let url = "http://localhost:8080/projetotccgulaonline/src/controll/routes/route.tbpedido.php";
    let idpedido = a.parentNode.parentNode.cells[0].innerText;
    let dados = "idpedido=" + idpedido;
    if (window.confirm("Confirma Exclusão do id = " + idpedido + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Pedido Excluido Com Sucesso!";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("DELETE", url);
        xhr.send(dados);
    }
}