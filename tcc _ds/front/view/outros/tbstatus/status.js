const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tableStatus = document.querySelector("#tbstatus");
const urlStatus = "http://localhost/gulaonline/src/controll/routes/";

function carregaStatus() {
    fetch(urlStatus + "route.tbstatus.php?idstatus=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                let row = document.createElement("tr");
                row.innerHTML = `<tr><td>${val.idstatus}</td>`;
                row.innerHTML += `<td>${val.nomestatus}</td>`;
                row.innerHTML += `<td style="padding:3px"><button onclick='editStatus(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delStatus(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                tableStatus.appendChild(row);
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}

function addStatus() {
    let url = "http://localhost/gulaonline/src/controll/routes/route.tbstatus.php";
    let idstatus = document.querySelector("#idstatus");
    let nomestatus = document.querySelector("#nomestatus");

    if (nomestatus.value != "") {
        let dados = new FormData();
        dados.append("nomestatus", nomestatus.value);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Status adicionado Com Sucesso.";
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

function editStatus(a) {
    a.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[2].innerHTML = "<button onclick='putStatus(this)'>Enviar</button>";
}

function putStatus(a) {
    let url = "http://localhost/gulaonline/src/controll/routes/route.tbstatus.php";
    let idstatus = a.parentNode.parentNode.cells[0].innerHTML;
    let nomestatus = a.parentNode.parentNode.cells[1].innerHTML;

    let dados = "idstatus=" + idstatus;
    dados += "&nomestatus=" + nomestatus;
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Dados do Status Alterada Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("PUT", url);
        xhr.send(dados);
    }
}

function delStatus(a) {
    let url = "http://localhost/gulaonline/src/controll/routes/route.tbstatus.php";
    let idstatus = a.parentNode.parentNode.cells[0].innerText;
    let dados = "idstatus=" + idstatus;
    if (window.confirm("Confirma Exclusão do id = " + idstatus + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                //console.log(this.responseText);
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Status Excluido Com Sucesso!";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("DELETE", url);
        xhr.send(dados);
    }
}
