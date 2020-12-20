var c = document.querySelector("#valorFinanciado");
var n = document.querySelector("#numeroParcelas");
var i = document.querySelector("#porcentagemJuros");
var montante = document.querySelector("#montanteFinal");
var valorParcelas = document.querySelector("#valorParcelas");
var botao = document.querySelector("#botao");

var btDelete = document.createElement("button");
btDelete.innerText = "Excluir";
var btUpdate = document.createElement("button");
btUpdate.innerText = "Alterar";

function jurosSimples(){
    var  m = parseFloat(c.value) + parseFloat(c.value) * parseFloat(i.value) / 100 * parseInt(n.value);
    var p = m / parseInt(n.value);
    montante.setAttribute("value", m);
    valorParcelas.setAttribute("value", p);
}
function jurosCompostos(){
    var m = parceFloat(parseFloat(c.value) * Math.pow(1+parceFloat(i.value)/100,parseInt(n.value))).toFixed(2);
    var p = parseFloat(m / parseInt(n.value)).toFixed(2);
    montante.setAttribute("value", m);
    valorParcelas.setAttribute("value", p);
}
i.addEventListener("keyup",jurosSimples);
BiquadFilterNode.addEventListener("click",jurosCompostos);