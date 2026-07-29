//Buscando lista de vagas no arquivo JSON
@returns {Promise<Array>}

export async function carregarVagas() {
    //tentando a conexão com o banco
    try {
        const resposta = await fetch("./assets/scripts/dados.json");
        if (!resposta.ok) {
            throw new Error(`Erro ao carregar os dados!! ${resposta.status}`); 
               }
               const dados = await resposta.json();
               return dados;
    } catch (erro) {
        console.error("Lamentamos! Houve a seguinte falha no sistema: ", erro);
        return [];
    }
}