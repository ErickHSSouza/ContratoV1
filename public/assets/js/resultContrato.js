function generateContract() {
    // Coleta os dados do formulário
    const formData = {
        vendedor: document.getElementById("txbVendedor").value,
        cliente: document.getElementById("txbCliente").value,
        razaoSocial: document.getElementById("txbRazaoSocial").value,
        telefone: document.getElementById("telefone1").value,
        email: document.getElementById("txbEmail").value,
        cpfCnpj: document.getElementById("txbCPFCNPJ").value,
        inscricaoEstadual: document.getElementById("txbInscricao").value,
        cep: document.getElementById("txbCEP").value,
        endereco: document.getElementById("txbEndereco").value,
        numero: document.getElementById("txbNumero").value,
        bairro: document.getElementById("txbBairro").value,
        complemento: document.getElementById("txbComplemento").value,
        cidade: document.getElementById("txbCidade").value,
        estado: document.getElementById("txbEstado").value,
        categoria: document.getElementById("txbCategoria").value,
        desconto: document.getElementById("txbDesconto").value,
        modelo: document.getElementById("ddlModels").value,
        quantidade: document.getElementById("txbQtde").value,
        ano: document.getElementById("txbAno").value,
        cor: document.getElementById("txbCor").value,
        precoPublico: document.getElementById("txbPrecoPublico").value,
        precoVenda: document.getElementById("txbPrecoVenda").value,
        dataCompra: document.getElementById("txbDataCompra").value,
        prazoEntrega: document.getElementById("txbPrazo").value,
        localEntrega: document.getElementById("txbLoja").value,
        formaPagamento: document.getElementById("txbPagamento").value,
    };
    
    document.addEventListener('DOMContentLoaded', function () {
        // Recupera os dados do localStorage
        const contractData = JSON.parse(localStorage.getItem('contractData'));
    
        if (contractData) {
            // Preenche os campos da Página 2
            document.getElementById('lbPlacaSeminovo').innerText = contractData.placaUsado || '-';
            document.getElementById('lbNomeResponsavel').innerText = contractData.nomeResponsavel || '-';
            document.getElementById('lbValorSeminovo').innerText = contractData.valorAvaliacao || '-';
            document.getElementById('lbDataAvaliacao').innerText = new Date(contractData.dtAvaliacao).toLocaleDateString() || '-';
    
            // Preenche os campos da Página 3
            document.getElementById('lbDataCompra').innerText = new Date(contractData.dataCompra).toLocaleDateString();
            document.getElementById('lbConcessionaria').innerText = contractData.localEntrega || '-';
            document.getElementById('lbPrazo').innerText = contractData.prazoEntrega || '-';
            document.getElementById('lbFormaPagamento').innerText = contractData.formaPagamento || '-';
            document.getElementById('lbNomeCliente2').innerText = contractData.cliente || '-';
        } else {
            alert('Nenhum dado de contrato encontrado. Por favor, preencha o formulário novamente.');
            window.location.href = 'Contratovd.html'; // Redireciona de volta ao formulário
        }
    });

    // Armazena os dados no localStorage
    localStorage.setItem('contractData', JSON.stringify(formData));

    // Redireciona para a página de geração do contrato
    window.location.href = 'ResultContratoVD.html';
}