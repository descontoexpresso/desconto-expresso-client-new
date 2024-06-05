import { ChangeEvent, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import Usuario from '../../models/Usuario';
import { cadastrarUsuario } from '../../services/Service';
import './Cadastro.css';
import axios from 'axios';
import placeholderImage from '../../assets/image-cadastro.png';

interface ProfileCardProps {
    photoUrl: string;
    setPhotoUrl: (url: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ photoUrl, setPhotoUrl }) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPhotoUrl(value || placeholderImage);
    };

    return (
        <div className="flex flex-col items-center mt-4">
            <div className="max-w-xs bg-green-50 rounded-xl shadow-md w-[130%] overflow-hidden p-4 text-center mb-4">
                <h2 className="text-green-800 text-xl mb-4">Foto de Perfil</h2>
                <img src={photoUrl} alt="Profile" className="w-full h-auto rounded-lg mb-4" />
                <input
                    type="text"
                    id="fotoUsuario"
                    name="fotoUsuario"
                    placeholder="Insira o link do arquivo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

function Cadastro() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [confirmarSenhaUsuario, setConfirmarSenhaUsuario] = useState<string>("");

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nomeUsuario: '',
        sobrenomeUsuario: '',
        cadastroUnico: 0,
        dataNascimento: '',
        telefone: 0,
        cidade: '',
        bairro: '',
        cep: '',
        rua: '',
        numeroCasa: '',
        emailUsuario: '',
        fotoUsuario: '',
        senhaUsuario: ''
    });

    const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
        id: 0,
        nomeUsuario: '',
        sobrenomeUsuario: '',
        cadastroUnico: 0,
        dataNascimento: '',
        telefone: 0,
        cidade: '',
        bairro: '',
        cep: '',
        rua: '',
        numeroCasa: '',
        emailUsuario: '',
        fotoUsuario: '',
        senhaUsuario: ''
    });

    useEffect(() => {
        if (usuarioResposta.id !== 0) {
            back();
        }
    }, [usuarioResposta]);

    function back() {
        navigate('/login');
    }

    function handleConfirmarSenhaUsuario(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenhaUsuario(e.target.value);
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        if (confirmarSenhaUsuario === usuario.senhaUsuario && usuario.senhaUsuario.length >= 8) {
            setIsLoading(true);
            try {
                await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResposta);
                alert('Usuário cadastrado com sucesso');
            } catch (error) {
                alert('Erro ao cadastrar o Usuário');
            }
        } else {
            alert('Dados inconsistentes. Verifique as informações de cadastro.');
            setUsuario({
                ...usuario,
                senhaUsuario: "",
            });
            setConfirmarSenhaUsuario("");
        }

        setIsLoading(false);
    }

    const buscarCEP = async (cep: string) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const data = response.data;
            setUsuario(prevState => ({
                ...prevState,
                rua: data.logradouro,
                bairro: data.bairro,
                cidade: data.localidade,
            }));
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
        }
    };

    const handleCEPChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            cep: value,
        }));

        if (value.length === 8) {
            buscarCEP(value);
        }
    };

    const [photoUrl, setPhotoUrl] = useState<string>(placeholderImage);

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-fundo-login bg-cover bg-center">
                <div className="flex flex-col lg:flex-row bg-transparent shadow-lg rounded-lg p-6 lg:p-10 m-4 lg:gap-12">
                    <form className="bg-black bg-opacity-50 p-9 rounded-lg shadow-lg w-full lg:w-3/4 text-white" onSubmit={cadastrarNovoUsuario}>
                        <h2 className='text-center text-5xl mb-8'>Cadastro</h2>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="nomeUsuario">Nome</label>
                            <input
                                type="text"
                                id="nomeUsuario"
                                name="nomeUsuario"
                                placeholder="Nome"
                                className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                                value={usuario.nomeUsuario}
                                onChange={atualizarEstado}
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="sobrenomeUsuario">Sobrenome</label>
                            <input
                                type="text"
                                id="sobrenomeUsuario"
                                name="sobrenomeUsuario"
                                placeholder="Sobrenome"
                                className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                                value={usuario.sobrenomeUsuario}
                                onChange={atualizarEstado}
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="flex flex-col w-full">
                                <label htmlFor="cadastroUnico">Cadastro Único</label>
                                <input
                                    type="number"
                                    id="cadastroUnico"
                                    name="cadastroUnico"
                                    placeholder="Cadastro Único"
                                    className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                                    value={usuario.cadastroUnico}
                                    onChange={atualizarEstado}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="dataNascimento">Data de Nascimento</label>
                                <input
                                    type="text"
                                    id="dataNascimento"
                                    name="dataNascimento"
                                    placeholder="Data de Nascimento (aaaa-mm-dd)"
                                    className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                                    value={usuario.dataNascimento}
                                    onChange={atualizarEstado}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="flex flex-col w-full">
                                <label htmlFor="telefone">Telefone</label>
                                <input
                                    type="number"
                                    id="telefone"
                                    name="telefone"
                                    placeholder="Telefone (DDD + Número)"
                                    className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                                    value={usuario.telefone}
                                    onChange={atualizarEstado}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="cep">CEP</label>
                                <input
                                    type="text"
                                    id="cep"
                                    name="cep"
                                    placeholder="CEP (Somente Números)"
                                    className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                                    value={usuario.cep}
                                    onChange={handleCEPChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="cidade">Cidade</label>
                            <input
                                type="text"
                                id="cidade"
                                name="cidade"
                                placeholder="Cidade"
                                className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                                value={usuario.cidade}
                                onChange={atualizarEstado}
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="bairro">Bairro</label>
                            <input
                                type="text"
                                id="bairro"
                                name="bairro"
                                placeholder="Bairro"
                                className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                                value={usuario.bairro}
                                onChange={atualizarEstado}
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="rua">Rua</label>
                            <input
                                type="text"
                                id="rua"
                                name="rua"
                                placeholder="Rua"
                                className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                                value={usuario.rua}
                                onChange={atualizarEstado}
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="numeroCasa">Número Casa</label>
                            <input
                                type="text"
                                id="numeroCasa"
                                name="numeroCasa"
                                placeholder="Número Casa"
                                className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                                value={usuario.numeroCasa}
                                onChange={atualizarEstado}
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="emailUsuario">Email</label>
                            <input
                                type="text"
                                id="emailUsuario"
                                name="emailUsuario"
                                placeholder="Email"
                                className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                                value={usuario.emailUsuario}
                                onChange={atualizarEstado}
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="flex flex-col w-full">
                                <label htmlFor="senhaUsuario">Senha</label>
                                <input
                                    type="password"
                                    id="senhaUsuario"
                                    name="senhaUsuario"
                                    placeholder="Senha"
                                    className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                                    value={usuario.senhaUsuario}
                                    onChange={atualizarEstado}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="confirmarSenhaUsuario">Confirmar Senha</label>
                                <input
                                    type="password"
                                    id="confirmarSenhaUsuario"
                                    name="senhaUsuario"
                                    placeholder="Confirmar Senha"
                                    className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                                    value={confirmarSenhaUsuario}
                                    onChange={handleConfirmarSenhaUsuario}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4">
                            <button className='rounded bg-green-700 hover:bg-green-800 text-white w-1/2 py-2 transition-colors duration-300' type='submit'>
                                {isLoading ? <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="24"
                                    visible={true}
                                /> :
                                    <span>Cadastrar</span>
                                }
                            </button>
                            <Link to="/login" className="text-white hover:text-green-700 font-bold duration-100 hover:underline">
                                Voltar
                            </Link>
                        </div>
                    </form>
                    <div className="flex justify-center lg:w-1/4">
                        <ProfileCard photoUrl={photoUrl} setPhotoUrl={setPhotoUrl} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cadastro;
