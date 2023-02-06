const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tableAli = document.querySelector("#tbali");
const urlAli = "http://localhost/front/src/controll/routes/route.tbalimentos.php";
const urlAliE = "http://localhost/front/src/controll/routes/route.tbalimentos.php";
var dataFile;
//var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

function carregaAlimentos() {
    fetch(urlAliE + "?linksite=" + localStorage.getItem("linksite") + "&idti_lo=" + localStorage.getItem("idti_lo") + "&id_ca=" + localStorage.getItem("id_ca"))
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                let row = document.createElement("tr");
                row.innerHTML = `<tr><td>${val.idali}</td>`;
                row.innerHTML += `<td>${val.nomeali}</td>`;
                row.innerHTML += `<td>${val.descricao}</td>`;
                row.innerHTML += `<td>${val.qtd}</td>`;
                row.innerHTML += `<td>${val.preco}</td>`;
                if (val.img == null) {
                    val.img = "../../outros/assets/sd.png";
                }
                row.innerHTML += `<td><img src="${val.img}" width="170"></td></tr>`;
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
    let url = "http://localhost/front/src/controll/routes/route.tbalimentos.php";
    let id_ca = localStorage.getItem("id_ca");
    let nome = document.querySelector("#nomeali");
    let descricao = document.querySelector("#descricao");
    let qtd = document.querySelector("#qtd");
    let preco = document.querySelector("#preco");
    if (nome.value != "" && descricao.value != "" && qtd.value != "" && preco.value != "") {
        let dados = new FormData();
        dados.append("id_ca", id_ca);
        dados.append("nomeali", nomeali.value);
        dados.append("descricao", descricao.value);
        dados.append("qtd", qtd.value);
        dados.append("preco", preco.value);
        dados.append("img", dataFile);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                alert("Alimento Adiconado Com Sucesso!");
                setTimeout(() => { window.location.reload(); }, 1000);
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
//Function exibe img em outra coluna quando escolhe a img
/*
function previewFile() {        
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}*/

function editAlimento(a) {
    a.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[4].setAttribute("contentEditable", "true");
    a.parentNode.parentNode.cells[5].innerHTML = "<input type='file' name='foto' id='img' onchange='previewFile()' />";
    a.parentNode.parentNode.cells[6].innerHTML = "<button onclick='putAlimento(this)'>Enviar</button>";
}

function putAlimento(a) {
    let url = "http://localhost/front/src/controll/routes/route.tbalimentos.php";
    let idali = a.parentNode.parentNode.cells[0].innerHTML;
    let nomeali = a.parentNode.parentNode.cells[1].innerHTML;
    let descricao = a.parentNode.parentNode.cells[2].innerHTML;
    let qtd = a.parentNode.parentNode.cells[3].innerHTML;
    let preco = a.parentNode.parentNode.cells[4].innerHTML;
    let img = a.parentNode.parentNode.cells[5].innerHTML;
    let dados = "idali=" + idali;
    dados += "&nomeali=" + nomeali;
    dados += "&descricao=" + descricao;
    dados += "&qtd=" + qtd;
    dados += "&preco=" + preco;
    dados += "&img=" + dataFile;
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                alert("Dados do Alimento Alterado Com Sucesso!");
                setTimeout(() => { window.location.reload(); }, 1000);
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
    let url = "http://localhost/front/src/controll/routes/route.tbalimentos.php";
    let idali = a.parentNode.parentNode.cells[0].innerText;
    let dados = "idali=" + idali;
    if (window.confirm("Confirma Exclusão do id = " + idali + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                alert("Alimento Excluido Com Sucesso!");
                setTimeout(() => { window.location.reload(); }, 1000);
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