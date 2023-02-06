const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tableAli = document.querySelector("#tbali");
const urlAli = "http://localhost/gulaonline/src/controll/routes/";
var dataFile;

function carregaAlimentos() {
    fetch(urlAli + "route.tbalimentos.php?idali=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                let row = document.createElement("tr");
                row.innerHTML = `<tr><td>${val.idali}</td>`;
                row.innerHTML += `<td>${val.id_ca}</td>`;
                row.innerHTML += `<td>${val.nomeali}</td>`;
                row.innerHTML += `<td>${val.descricao}</td>`;
                row.innerHTML += `<td>${val.qtd}</td>`;
                row.innerHTML += `<td>${val.preco}</td>`;
                if (val.img == null) {
                    val.img = "../assets/error.png";
                }
                row.innerHTML += `<td><img src="${val.img}" width="50"></td>`;
                row.innerHTML += `<td style="padding:3px"><button onclick='editAlimento(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delAlimento(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                tableAli.appendChild(row);
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}


function previewFile() {
    let file = document.querySelector("#img").files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        dataFile = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        console.log("erro");
    }
}

function addAlimento() {
    let url = "http://localhost/gulaonline/src/controll/routes/route.tbalimentos.php";
    let id_ca = document.querySelector("#id_ca");
    let nome = document.querySelector("#nomeali");
    let descricao = document.querySelector("#descricao");
    let qtd = document.querySelector("#qtd");
    let preco = document.querySelector("#preco");

    if (id_ca.value != "" && nome.value != "" && descricao.value != "" && qtd.value != "" && preco.value != "") {
        let dados = new FormData();
        dados.append("id_ca", id_ca.value);
        dados.append("nomeali", nomeali.value);
        dados.append("descricao", descricao.value);
        dados.append("qtd", qtd.value);
        dados.append("preco", preco.value);
        dados.append("img", dataFile);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                let resp = JSON.parse(this.responseText);

                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Alimento adicionado Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        msg.innerHTML = "Favor preencher todos os campos!";
        setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
    }
}

function editAlimento(a) {
    a.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[4].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[5].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[6].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[7].innerHTML = "<button onclick='putAlimento(this)'>Enviar</button>";
}

function putAlimento(a) {
    let url = "http://localhost/gulaonline/src/controll/routes/route.tbalimentos.php";
    let idali = a.parentNode.parentNode.cells[0].innerHTML;
    let id_ca = a.parentNode.parentNode.cells[1].innerHTML;
    let nomeali = a.parentNode.parentNode.cells[2].innerHTML;
    let descricao = a.parentNode.parentNode.cells[3].innerHTML;
    let qtd = a.parentNode.parentNode.cells[4].innerHTML;
    let preco = a.parentNode.parentNode.cells[5].innerHTML;
    let img = a.parentNode.parentNode.cells[6].innerHTML;

    let dados = "idali=" + idali;
    dados += "&id_ca=" + id_ca;
    dados += "&nomeali=" + nomeali;
    dados += "&descricao=" + descricao;
    dados += "&qtd=" + qtd;
    dados += "&preco=" + preco;
    dados += "&img=" + img;
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Dados do Alimento Alterada Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("PUT", url);
        xhr.send(dados);
    }
}

function delAlimento(a) {
    let url = "http://localhost/gulaonline/src/controll/routes/route.tbalimentos.php";
    let idali = a.parentNode.parentNode.cells[0].innerText;
    let dados = "idali=" + idali;
    if (window.confirm("Confirma Exclusão do id = " + idali + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                //console.log(this.responseText);
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Alimento Excluido Com Sucesso!";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("DELETE", url);
        xhr.send(dados);
    }
}
