const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tableCadas = document.querySelector("#tbcadastro");
const urlCadas = "http://localhost/front/src/controll/routes/";

function carregaUsuarios() {
    fetch(urlCadas + "route.tbcadastro.php?id_ca=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                let row = document.createElement("tr");
                if (val.bairro != null && val.rua != null && val.numero != null &&
                    val.cidade != null && val.uf != null && val.cnpj != null && val.linksite != null) {
                    row.innerHTML = `<tr><td>${val.id_ca}</td>`;
                    row.innerHTML += `<td>${val.nome}</td>`;
                    row.innerHTML += `<td>${val.cpf}</td>`;
                    row.innerHTML += `<td>${val.fone}</td>`;
                    row.innerHTML += `<td>${val.bairro}</td>`;
                    row.innerHTML += `<td>${val.rua}</td>`;
                    row.innerHTML += `<td>${val.numero}</td>`;
                    row.innerHTML += `<td>${val.cidade}</td>`;
                    row.innerHTML += `<td>${val.uf}</td>`;
                    row.innerHTML += `<td>${val.cnpj}</td>`;
                    row.innerHTML += `<td>${val.linksite}</td>`;
                    row.innerHTML += `<td>${val.email}</td>`;
                    row.innerHTML += `<td style="padding:3px"><button onclick='editUsuario(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delUsuario(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                    tableCadas.appendChild(row);
                } else {
                    row.innerHTML = `<tr><td>${val.id_ca}</td>`;
                    row.innerHTML += `<td>${val.nome}</td>`;
                    row.innerHTML += `<td>${val.cpf}</td>`;
                    row.innerHTML += `<td>${val.fone}</td>`;
                    row.innerHTML += `<td></td>`;
                    row.innerHTML += `<td></td>`;
                    row.innerHTML += `<td></td>`;
                    row.innerHTML += `<td></td>`;
                    row.innerHTML += `<td></td>`;
                    row.innerHTML += `<td></td>`;
                    row.innerHTML += `<td></td>`;
                    row.innerHTML += `<td>${val.email}</td>`;
                    row.innerHTML += `<td style="padding:3px"><button onclick='editUsuario(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delUsuario(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                    tableCadas.appendChild(row);
                }
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}

function addUsuario() {
    let url = "http://localhost/front/src/controll/routes/route.tbcadastro.php";
    let nome = document.querySelector("#nome");
    let cpf = document.querySelector("#cpf");
    let fone = document.querySelector("#fone");
    let bairro = document.querySelector("#bairro");
    let rua = document.querySelector("#rua");
    let numero = document.querySelector("#numero");
    let cidade = document.querySelector("#cidade");
    let uf = document.querySelector("#uf");
    let cnpj = document.querySelector("#cnpj");
    let linksite = document.querySelector("#linksite");
    let email = document.querySelector("#email");
    let tipo = document.querySelector("#idti_lo");
    let senha = cpf.value.substring(8, cpf.value.length);
    if (nome.value != "" && cpf.value != "" && fone.value != "" && email.value != "") {
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
        dados.append("idti_lo", tipo.value);
        dados.append("senha", senha);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Usuário Criado Com Sucesso!";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        msg.innerHTML = "Favor preencher todos os campos com *!";
        setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
    }
}

function editUsuario(u) {
    u.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[4].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[5].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[6].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[7].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[8].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[9].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[10].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[11].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[12].innerHTML = "<select id='idti_lo'>'<option value='3'>1 - Comum</option>'<option value='2'>2 - Empreendedor</option></select><input type='password' placeholder='Nova Senha' id='senha' /><button onclick='putUsuario(this)'>Enviar</button>";
    //u.parentNode.parentNode.cells[13].innerHTML = "<button onclick='putUsuario(this)'>Enviar</button>";
}

function putUsuario(u) {
    let url = "http://localhost/front/src/controll/routes/route.tbcadastro.php";
    let id_ca = u.parentNode.parentNode.cells[0].innerHTML;
    let nome = u.parentNode.parentNode.cells[1].innerHTML;
    let cpf = u.parentNode.parentNode.cells[2].innerHTML;
    let fone = u.parentNode.parentNode.cells[3].innerHTML;
    let bairro = u.parentNode.parentNode.cells[4].innerHTML;
    let rua = u.parentNode.parentNode.cells[5].innerHTML;
    let numero = u.parentNode.parentNode.cells[6].innerHTML;
    let cidade = u.parentNode.parentNode.cells[7].innerHTML;
    let uf = u.parentNode.parentNode.cells[8].innerHTML;
    let cnpj = u.parentNode.parentNode.cells[9].innerHTML;
    let nomeEmpresa = u.parentNode.parentNode.cells[10].innerHTML;
    let email = u.parentNode.parentNode.cells[11].innerHTML;

    var ht = document.getElementById("idti_lo").value;
    var htm = document.getElementById("senha").value;
    if (htm != null) {
        let dados = "id_ca=" + id_ca;
        dados += "&nome=" + nome;
        dados += "&cpf=" + cpf;
        dados += "&fone=" + fone;
        dados += "&bairro=" + bairro;
        dados += "&rua=" + rua;
        dados += "&numero=" + numero;
        dados += "&cidade=" + cidade;
        dados += "&uf=" + uf;
        dados += "&cnpj=" + cnpj;
        dados += "&linksite=" + nomeEmpresa;
        dados += "&email=" + email;
        dados += "&idti_lo=" + ht;
        //dados += "&senha=" + htm;
        if (window.confirm("Confirma Alteração dos dados?")) {
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    console.log(this.responseText);
                    let resp = JSON.parse(this.responseText);
                    if (resp.hasOwnProperty("erro")) {
                        msg.innerHTML = resp.erro;
                    } else {
                        msg.innerHTML = "Dados do Usuário Alterada Com Sucesso.";
                    }
                    //setTimeout(() => { window.location.reload(); }, 3000);
                }
            });
            xhr.open("PUT", url);
            xhr.send(dados);
        }
    } else {
        let dados = "id_ca=" + id_ca;
        dados += "&nome=" + nome;
        dados += "&cpf=" + cpf;
        dados += "&fone=" + fone;
        dados += "&bairro=" + bairro;
        dados += "&rua=" + rua;
        dados += "&numero=" + numero;
        dados += "&cidade=" + cidade;
        dados += "&uf=" + uf;
        dados += "&cnpj=" + cnpj;
        dados += "&linksite=" + nomeEmpresa;
        dados += "&email=" + email;
        dados += "&idti_lo=" + ht;
        dados += "&senha=" + htm;

        // dados.append("type_user", localStorage.getItem('type_user'));
        if (window.confirm("Confirma Alteração dos dados?")) {
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    console.log(this.responseText);
                    let resp = JSON.parse(this.responseText);
                    if (resp.hasOwnProperty("erro")) {
                        msg.innerHTML = resp.erro;
                    } else {
                        msg.innerHTML = "Dados do Usuário Alterada Com Sucesso.";
                    }
                    //setTimeout(() => { window.location.reload(); }, 3000);
                }
            });
            xhr.open("PUT", url);
            xhr.send(dados);
        }
    }
}

/*
function editUsuario(u) {
    u.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[4].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[5].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[6].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[7].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[8].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[9].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[10].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[11].setAttribute("contentEditable", "true");
    //u.parentNode.parentNode.cells[12].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[12].innerHTML = "<th>Senha</th><td><input id='senha' /><button onclick='putUsuario(this)'>Enviar</button></td>";
    //u.parentNode.parentNode.cells[14].innerHTML += "<button onclick='putUsuario(this)'>Enviar</button>";


}

function putUsuario(u) {
    let url = "http://localhost/gulaonline/src/controll/routes/route.tbcadastro.php";
    let id_ca = u.parentNode.parentNode.cells[0].innerHTML;
    let nome = u.parentNode.parentNode.cells[1].innerHTML;
    let cpf = u.parentNode.parentNode.cells[2].innerHTML;
    let fone = u.parentNode.parentNode.cells[3].innerHTML;
    let bairro = u.parentNode.parentNode.cells[4].innerHTML;
    let rua = u.parentNode.parentNode.cells[5].innerHTML;
    let numero = u.parentNode.parentNode.cells[6].innerHTML;
    let cidade = u.parentNode.parentNode.cells[7].innerHTML;
    let uf = u.parentNode.parentNode.cells[8].innerHTML;
    let cnpj = u.parentNode.parentNode.cells[9].innerHTML;
    let nomeEmpresa = u.parentNode.parentNode.cells[10].innerHTML;
    let email = u.parentNode.parentNode.cells[11].innerHTML;
    //let senha = u.parentNode.parentNode.cells[12].innerHTML;

    let dados = "id_ca=" + id_ca;
    dados += "&nome=" + nome;
    dados += "&cpf=" + cpf;
    dados += "&fone=" + fone;
    dados += "&bairro=" + bairro;
    dados += "&rua=" + rua;
    dados += "&numero=" + numero;
    dados += "&cidade=" + cidade;
    dados += "&uf=" + uf;
    dados += "&cnpj=" + cnpj;
    dados += "&linksite=" + nomeEmpresa;
    dados += "&email=" + email;
    // dados += "&senha=" + senha;
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Dados Alterada Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("PUT", url);
        xhr.send(dados);
    }
}*/

function delUsuario(u) {
    let url = "http://localhost/front/src/controll/routes/route.tbcadastro.php";
    let id_ca = u.parentNode.parentNode.cells[0].innerText;
    let dados = "id_ca=" + id_ca;
    if (window.confirm("Confirma Exclusão do id = " + id_ca + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Usuário Excluido Com Sucesso!";
                }
                setTimeout(() => { window.location.reload(); }, 5000);
            }
        });
        xhr.open("DELETE", url);
        xhr.send(dados);
    }
}
