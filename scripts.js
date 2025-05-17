document.getElementById('calculate').addEventListener('click', function(){
    const value = document.getElementById('value').value;
    const fee = (document.getElementById('fee').value) / 100;
    const time = document.getElementById('time').value;

    const total = value *(1 + fee)**time;

    document.getElementById('total').innerHTML = ("R$ " + total.toFixed(2).replace('.', ','));
});

async function buscarTaxaSelicMensal() {
    const url = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json";

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        console.log("Dados recebidos da API:", dados);

        const taxaAnual = parseFloat(dados[0].valor.replace(",", "."));
        const taxaMensal = (Math.pow(1 + taxaAnual / 100, 1 / 12) -1)*100;

        //preenche o campo com a taxa mensal atualizada
        document.getElementById("fee").value = taxaMensal.toFixed(2); 
        
        const spanData = document.getElementById("dataSelic");
        if (spanData) {
            spanData.textContent = `Taxa SELIC atualizada em: ${dados [0].data}`;
        } else {
            console.warn("Elemento #dataSelic não encontrado no HTML.");
        }

    } catch (erro) {
        console.error("Erro ao buscar a SELIX:", erro);
    }
}

document.addEventListener("DOMContentLoaded", buscarTaxaSelicMensal);

