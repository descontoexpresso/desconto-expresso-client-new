export default interface UsuarioLogin {
    id: number;
    nomeUsuario: string;
    sobrenomeUsuario: string;
    cadastroUnico: number;
    dataNascimento: string; 
    telefone: number;
    cidade: string;
    bairro: string;
    cep: string;
    rua: string;
    numeroCasa: string;
    emailUsuario: string;
    fotoUsuario: string;
    senhaUsuario: string;
    token: string;
}