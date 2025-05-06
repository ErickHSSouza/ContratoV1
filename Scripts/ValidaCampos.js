////Valida CPF CNPJ
function formatarCampo(campoTexto) {
    if (campoTexto.value.length <= 11) {
        campoTexto.value = mascaraCpf(campoTexto.value);
    } else {
        campoTexto.value = mascaraCnpj(campoTexto.value);
    }
}
function retirarFormatacao(campoTexto) {
    campoTexto.value = campoTexto.value.replace(/(\.|\/|\-)/g, "");
}
function mascaraCpf(valor) {
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
}
function mascaraCnpj(valor) {
    return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
}

//Valida Telefone
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
    return document.getElementById(el);
}
window.onload = function () {
    id('telefone1').onkeyup = function () {
        mascara(this, mtel);
    }
    id('telefone2').onkeyup = function () {
        mascara(this, mtel);
    }
}

//Mascara Monetária
function moeda(a, e, r, t) {
    let n = ""
        , h = j = 0
        , u = tamanho2 = 0
        , l = ajd2 = ""
        , o = window.Event ? t.which : t.keyCode;
    if (13 == o || 8 == o)
        return !0;
    if (n = String.fromCharCode(o),
        -1 == "0123456789".indexOf(n))
        return !1;
    for (u = a.value.length,
        h = 0; h < u && ("0" == a.value.charAt(h) || a.value.charAt(h) == r); h++)
        ;
    for (l = ""; h < u; h++)
        -1 != "0123456789".indexOf(a.value.charAt(h)) && (l += a.value.charAt(h));
    if (l += n,
        0 == (u = l.length) && (a.value = ""),
        1 == u && (a.value = "0" + r + "0" + l),
        2 == u && (a.value = "0" + r + l),
        u > 2) {
        for (ajd2 = "",
            j = 0,
            h = u - 3; h >= 0; h--)
            3 == j && (ajd2 += e,
                j = 0),
                ajd2 += l.charAt(h),
                j++;
        for (a.value = "",
            tamanho2 = ajd2.length,
            h = tamanho2 - 1; h >= 0; h--)
            a.value += ajd2.charAt(h);
        a.value += r + l.substr(u - 2, u)
    }
    return !1
}

//Valida CEP
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('txbEndereco').value = ("");
    document.getElementById('txbBairro').value = ("");
    document.getElementById('txbCidade').value = ("");
    document.getElementById('txbEstado').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('txbEndereco').value = (conteudo.logradouro);
        document.getElementById('txbBairro').value = (conteudo.bairro);
        document.getElementById('txbCidade').value = (conteudo.localidade);
        document.getElementById('txbEstado').value = (conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('txbEndereco').value = "...";
            document.getElementById('txbBairro').value = "...";
            document.getElementById('txbCidade').value = "...";
            document.getElementById('txbEstado').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

            document.getElementById('txbCEP').value = cep.substring(0, 5) + "-" + cep.substring(5);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};
