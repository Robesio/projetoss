const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tableCadas = document.querySelector("#tbcadastro");
const urlCadas = "http://localhost/gulaonline/src/controll/routes/";
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

function addUsuario() {
    let url = "http://localhost/front/src/controll/routes/route.tbcadastro.php";
    if (nome.value != "" && cpf.value != "" && fone.value != "" && email.value != "" && senha.value != "") {
        let dados = new FormData();
        dados.append("nome", nome.value);
        dados.append("cpf", cpf.value);
        dados.append("fone", fone.value);
        dados.append("bairro", bairro.value);
        dados.append("rua", rua.value);
        dados.append("numero", numero.value);
        dados.append("cidade", cidade.value);
        dados.append("uf", uf.value);
        dados.append("cnpj", cnpj.value);
        dados.append("linksite", linksite.value);
        dados.append("email", email.value);
        dados.append("idti_lo", idti_lo.value);
        dados.append("senha", senha.value);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                alert("Usuário Cadastrado Com Sucesso!");
                //setTimeout(() => { window.location.reload(); }, 3000);
                window.location.assign("../login/login.html");
                //console.log(this.responseText);
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    alert(resp.erro);
                } else {
                    alert("Usuário Criado Com Sucesso!");
                }
                setTimeout(() => { window.location.reload(); }, 3500);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        alert("Favor preencher todos os campos com *!");
        setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3500);
    }
}