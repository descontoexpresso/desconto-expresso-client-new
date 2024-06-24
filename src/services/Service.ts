import axios from "axios";

const api = axios.create({
    baseURL: "https://desconto-expresso-server-8auj.onrender.com",
});

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    try {
        const resposta = await api.post(url, dados);
        console.log("Resposta da API:", resposta.data); // Log para verificar a resposta da API
        setDados(resposta.data);
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
    }
}


export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
}

export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header);
    setDados(resposta.data);
}

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header);
    setDados(resposta.data);
}

export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header);
}

export const buscarPorId = async (url: string, id: string, setDados: Function, header: Object) => {
    const resposta = await api.get(`${url}/${id}`, header);
    setDados(resposta.data);
};
