import { ChangeEvent, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Usuario from '../../models/Usuario';
import Navbar from '../../components/Navbar/Navbar';

function EditarPerfil() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);
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

    useEffect(() => {
        const fetchUsuario = async () => {
            if (!id) {
                console.error('ID do usuário não está definido');
                setIsLoading(false);
                return;
            }
            try {
                const response = await axios.get(`/usuarios/${id}`);
                setUsuario(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
                setIsLoading(false);
            }
        };

        fetchUsuario();
    }, [id]);

    function back() {
        navigate('/perfil');
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

    async function editarPerfil(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!id) {
            console.error('ID do usuário não está definido');
            return;
        }

        if (confirmarSenhaUsuario === usuario.senhaUsuario && usuario.senhaUsuario.length >= 8) {
            setIsLoading(true);
            try {
                await axios.put(`/usuarios/${id}`, usuario); // Endpoint para editar usuário
                alert('Perfil editado com sucesso');
                back();
            } catch (error) {
                alert('Erro ao editar o perfil');
            }
        } else {
            alert('Dados inconsistentes. Verifique as informações de edição do perfil.');
            setUsuario({
                ...usuario,
                senhaUsuario: "",
            });
            setConfirmarSenhaUsuario("");
        }

        setIsLoading(false);
    }

    const handlePhotoUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            fotoUsuario: value,
        }));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <RotatingLines
                    strokeColor="green"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </div>
        );
    }

    return (
        <div className="bg-cinza-claro bg-cover font-sans min-h-screen">
      <div className="bg-verde-escuro min-h-[130px]">
        <div className="h-4" />
        <Navbar fotoUsuario={usuario.fotoUsuario} />
        <div className="h-4" />
      </div>
      <img src="public/assets/quadrado-verde-escuro.png" alt="Decorative Background" style={{ minWidth: "100%" }} />

        
        <div className="flex justify-center items-center min-h-screen bg-cinza-claro">
            <div className="flex flex-col lg:flex-row shadow-lg rounded-lg p-6 lg:p-10 m-4 lg:gap-12 w-full max-w-5xl">
                
                <form className="bg-verde-escuro rounded-lg shadow-lg lg:w-3/4 text-white p-6 lg:p-10" onSubmit={editarPerfil}>
                    <h2 className='text-center text-5xl mb-8'>Editar Perfil</h2>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="nomeUsuario">Nome</label>
                        <input
                            type="text"
                            id="nomeUsuario"
                            name="nomeUsuario"
                            value={usuario.nomeUsuario}
                            onChange={atualizarEstado}
                            className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="sobrenomeUsuario">Sobrenome</label>
                        <input
                            type="text"
                            id="sobrenomeUsuario"
                            name="sobrenomeUsuario"
                            value={usuario.sobrenomeUsuario}
                            onChange={atualizarEstado}
                            className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="cadastroUnico">Cadastro Único</label>
                        <input
                            type="number"
                            id="cadastroUnico"
                            name="cadastroUnico"
                            value={usuario.cadastroUnico}
                            onChange={atualizarEstado}
                            className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                        <input
                            type="text"
                            id="dataNascimento"
                            name="dataNascimento"
                            value={usuario.dataNascimento}
                            onChange={atualizarEstado}
                            className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="telefone">Telefone</label>
                        <input
                            type="number"
                            id="telefone"
                            name="telefone"
                            value={usuario.telefone}
                            onChange={atualizarEstado}
                            className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="cep">CEP</label>
                        <input
                            type="text"
                            id="cep"
                            name="cep"
                            value={usuario.cep}
                            onChange={atualizarEstado}
                            className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="cidade">Cidade</label>
                        <input
                            type="text"
                            id="cidade"
                            name="cidade"
                            value={usuario.cidade}
                            onChange={atualizarEstado}
                            className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="bairro">Bairro</label>
                        <input
                            type="text"
                            id="bairro"
                            name="bairro"
                            value={usuario.bairro}
                            onChange={atualizarEstado}
                            className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="rua">Rua</label>
                        <input
                            type="text"
                            id="rua"
                            name="rua"
                            value={usuario.rua}
                            onChange={atualizarEstado}
                            className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="numeroCasa">Número Casa</label>
                        <input
                            type="text"
                            id="numeroCasa"
                            name="numeroCasa"
                            value={usuario.numeroCasa}
                            onChange={atualizarEstado}
                            className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="emailUsuario">Email</label>
                        <input
                            type="text"
                            id="emailUsuario"
                            name="emailUsuario"
                            value={usuario.emailUsuario}
                            onChange={atualizarEstado}
                            className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="senhaUsuario">Senha</label>
                        <input
                            type="password"
                            id="senhaUsuario"
                            name="senhaUsuario"
                            placeholder="Nova senha (opcional)"
                            value={usuario.senhaUsuario}
                            onChange={atualizarEstado}
                            className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="confirmarSenhaUsuario">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmarSenhaUsuario"
                            name="confirmarSenhaUsuario"
                            placeholder="Confirmar Senha"
                            value={confirmarSenhaUsuario}
                            onChange={handleConfirmarSenhaUsuario}
                            className="border-2 border-white rounded p-2 mt-2 bg-transparent"
                        />
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
                                <span>Salvar Alterações</span>
                            }
                        </button>
                        <Link to="/perfil" className="text-white hover:text-green-700 font-bold duration-100 hover:underline">
                            Cancelar
                        </Link>
                    </div>
                </form>
                <div className="flex justify-center lg:w-1/4">
                    <div className="flex flex-col items-center mt-4">
                        <div className="max-w-xs bg-green-50 rounded-xl shadow-md w-full overflow-hidden p-4 text-center mb-4">
                            <h2 className="text-green-800 text-xl mb-4">Foto de Perfil</h2>
                            <img src={usuario.fotoUsuario} alt="Profile" className="w-full h-auto rounded-lg mb-4" />
                            <input
                                type="text"
                                id="fotoUsuario"
                                name="fotoUsuario"
                                placeholder="Insira o link do arquivo"
                                value={usuario.fotoUsuario}
                                onChange={handlePhotoUrlChange}
                                className="border-2 border-green-800 rounded p-2 mt-2 bg-transparent w-full"
                            />
                
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="mt-16">
        <img src="public/assets/quadrado-verde-escuro.png" alt="Decorative Background" style={{ minWidth: "100%" }} />
        <div className="bg-verde-escuro min-h-[40px]" />
      </div>    
        </div>
    );
}

export default EditarPerfil;
