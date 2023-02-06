const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const urlCadas = "http://localhost/front/src/controll/routes/";
var nome = document.querySelector("#nome");
var cpf = document.querySelector("#cpf");
var fone = document.querySelector("#fone");
var bairro = document.querySelector("#bairro");
var rua = document.querySelector("#rua");
var numero = document.querySelector("#numero");
var cidade = document.querySelector("#cidade");
var uf = document.querySelector("#uf");
var cnpj = document.querySelector("#cnpj");
var linksite = document.querySelector("#linksite");
var email = document.querySelector("#email");
var idti_lo = document.querySelector("#idti_lo");
var senha = document.querySelector("#senha");

function carregaUsuarios() {
    fetch(urlCadas + "route.tbcadastro.php?id_ca=" + localStorage.getItem("id_ca"))
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                nome.value = val.nome;
                cpf.value = val.cpf;
                fone.value = val.fone;
                email.value = val.email;
                senha.value = val.senha;
                bairro.value = val.bairro;
                rua.value = val.rua;
                numero.value = val.numero;
                cidade.value = val.cidade;
                uf.value = val.uf;
                // cnpj.value = val.cnpj;
                // linksite.value = val.linksite;
                senha.value = val.senha;
                //idti_lo.value = val.idti_lo;
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}

function editarUsuario() {
    let url = "http://localhost/front/src/controll/routes/route.tbcadastro.php";
    if (nome.value != "" && cpf.value != "" && fone.value != "" && email.value != "" && senha.value != "") {
        let dados = "id_ca=" + localStorage.getItem("id_ca");
        dados += "&nome=" + nome.value;
        dados += "&cpf=" + cpf.value;
        dados += "&fone=" + fone.value;
        dados += "&bairro=" + bairro.value;
        dados += "&rua=" + rua.value;
        dados += "&numero=" + numero.value;
        dados += "&cidade=" + cidade.value;
        dados += "&uf=" + uf.value;
        //dados += "&cnpj=" + cnpj.value;
        // dados += "&linksite=" + linksite.value;
        dados += "&email=" + email.value;
        //dados += "&idti_lo=" + idti_lo.value;
        dados += "&senha=" + senha.value;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                alert("Dados Alterado Com Sucesso!");
                window.location.assign("./perfil_comum.html");
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    // msg.innerHTML = "Dados Alterado Com Sucesso!";
                }
                //setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("PUT", url);
        xhr.send(dados);
    } else {
        alert("Favor preencher todos os campos com *");
    }
}

function delUsuario(u) {
    let url = "http://localhost/front/src/controll/routes/route.tbcadastro.php";
    let id_ca = localStorage.getItem("id_ca");
    let dados = "id_ca=" + id_ca;
    if (window.confirm("Confirma Exclusão do id = " + id_ca + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                alert("Usuário Excluido Com Sucesso!");
                window.location.assign("../../home_sem_logar.html");
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    //msg.innerHTML = "Usuário Excluido Com Sucesso!";
                }
                //setTimeout(() => { window.location.reload(); }, 5000);
            }
        });
        xhr.open("DELETE", url);
        xhr.send(dados);
    }
}
