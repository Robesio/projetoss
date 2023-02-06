const email = document.getElementById("email");
const senha = document.getElementById("senha");
const msg = document.getElementById("mensagem");

function acessar() {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost/front/src/controll/routes/route.tblogins.php";
    let dados = new FormData();
    if (email.value != "" && senha.value != "" || senha.value == "") {
        dados.append("email", email.value);
        dados.append("senha", senha.value);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                let resp = JSON.parse(this.responseText);
                let destino = "";
                if (resp.length === 0) {
                    msg.innerHTML = "Email ou senha inválido";
                } else {
                    if (resp[0].idti_lo === "2") {
                        destino += "../../home_adm.html";
                    } else if (resp[0].idti_lo === "3") {
                        destino += "../../home_logado.html";
                    } else {
                        destino += "../../gulaonline.html";
                    }
                    localStorage.setItem('idti_lo', resp[0].idti_lo);
                    localStorage.setItem('id_ca', resp[0].id_ca);
                    localStorage.setItem('linksite', resp[0].linksite);
                    window.location.href = destino + "?id_ca=" + resp[0].id_ca + "email=" + resp[0].email + "idti_lo=" + resp[0].idti_lo;
                }
                // window.location.href = "../../homegulaonline.html";
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        msg.innerHTML = "Favor preencher o email e a senha";
    }
    setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
}