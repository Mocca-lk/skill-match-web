import {VagaTech} from "./motor.js";
const chave_Local_Storage = "skillmatch_perfil";

//Tentativas e Status de busca das vagas
export async function buscarVagas(callbackStatus) {
    try {
        //STATUS: CARREGANDO INFO
        callbackStatus("Carregando");

        const answer = await fetch("./assets/dados/vagas.json");

        if (!answer.ok) {
            throw new Error(`Erro: Status ${answer.status}`);
        }

        const dadosJSON = await answer.json();
        
        //STATUS: VAZIO
        if (!dadosJSON || dadosJSON.length === 0) {
            callbackStatus("Vazio");
            return [];
        }

        //STATUS FINAL: SUCESSO
        callbackStatus("Sucesso!")


        //Criando instância
        return dadosJSON.map(item => new VagaTech(
            item.id,
            item.empresa,
            item.cargo,
            item.requisitos,
            item.salario,
            item.modalidade,
            item.senioridade
        ));
    } //Caso haja erros - tratamento e apresentação
    catch (erro) {
        console.error("Falha ao carregar vagas: ", erro);
        callbackStatus("erro", "Não foi possível carregar as vagas. Verifique a execução via Live Server.")
        return [];
    }
}

//Persistência no localStorage
export function salvarPerfilLocalStorage(perfil) {
    localStorage.setItem(chave_Local_Storage, JSON.stringify(perfil));
}

//Tratamento de primeira visita
export function carregarPerfilLocalStorage() {
    const perfilString = localStorage.getItem(chave_Local_Storage);
    if (!perfilString) return null;

    try {
        return JSON.parse(perfilString);
    } catch (erro) {
        console.error("Erro ao converter perfil", erro);
        return null;
    }
}