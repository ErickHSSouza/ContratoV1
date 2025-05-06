
//function(){
// var vendedor = document.getElementById("vendedor");
// var cliente = document.getElementById("cliente");
// var rg = document.getElementById("RG");
// var cpf_cnpj = document.getElementById("CPF_CNPJ");
// var telefone = document.getElementById("telefone");
//  var email = document.getElementById("email");
//  var cep = document.getElementById("CEP");
// var endereco = document.getElementById("endereco");
//  var bairro = document.getElementById("bairro");
//  var complemento = document.getElementById("complemento");
// var cidade = document.getElementById("cidade");
//  var estado = document.getElementById("estado");

// var contrato;

function save() {

    resultContrato = JSON.parse(window.localStorage.getItem('contratoItem')) ?? [];

    var contrato = {
        vendedor: document.getElementById("vendedor"),
        cliente: document.getElementById("cliente"),
        rg: document.getElementById("RG"),
        cpf_cnpj: document.getElementById("CPF_CNPJ"),
        telefone: document.getElementById("telefone"),
        email: document.getElementById("email"),
        cep: document.getElementById("CEP"),
        endereco: document.getElementById("endereco"),
        numero: document.getElementById("numero"),
        bairro: document.getElementById("bairro"),
        complemento: document.getElementById("complemento"),
        cidade: document.getElementById("cidade"),
        estado: document.getElementById("estado")

    }
    resultContrato.push(contrato);

    localStorage.setItem('contratoItem', JSON.stringify(resultContrato));

    allDate()
}

/* Máscaras ER */
function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}
function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}
function mtel(v) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}
function id(el) {
    return document.getElementByid(el);
}
window.onload = function () {
    id('telefone1').onkeyup = function () {
        mascara(this, mtel);
    }
    id('telefone2').onkeyup = function () {
        mascara(this, mtel);
    }
}


function showContent() {
    element = document.getElementById("content");
    check = document.getElementById("check");
    if (check.checked) {
        element.style.display = 'block';
    }
    else {
        element.style.display = 'none';
    }
}

var WhereToMove = jQuery("#PointA").position().top;
jQuery("html,body").animate({scrollTop: WhereToMove }, 1000);


