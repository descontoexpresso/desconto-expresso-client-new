import { createContext, ReactNode, useState } from "react";
import UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { toastAlerta } from "../utils/toastAlerta";

interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogout(): void;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    isLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nomeUsuario: "",
        sobrenomeUsuario: "",
        cadastroUnico: 0,
        dataNascimento: "",
        telefone: 0,
        cidade: "",
        bairro: "",
        cep: "",
        rua: "",
        numeroCasa: "",
        emailUsuario: "",
        fotoUsuario: "",
        senhaUsuario: "",
        token: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true);
        try {
            await login(`/usuarios/logar`, userLogin, setUsuario);
            console.log("Dados do usuário após login:", usuario); // Log para verificar os dados do usuário
            toastAlerta("Usuário logado com sucesso", 'sucesso');
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            toastAlerta("Dados do usuário inconsistentes", 'error');
        } finally {
            setIsLoading(false);
        }
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nomeUsuario: "",
            sobrenomeUsuario: "",
            cadastroUnico: 0,
            dataNascimento: "",
            telefone: 0,
            cidade: "",
            bairro: "",
            cep: "",
            rua: "",
            numeroCasa: "",
            emailUsuario: "",
            fotoUsuario: "",
            senhaUsuario: "",
            token: ""
        });
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
