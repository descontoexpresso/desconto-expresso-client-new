import React, { useContext } from "react";

import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../contexts/AuthContext";

const colaboradores = [
  "https://api.github.com/users/biancavestibulares",
  "https://api.github.com/users/SabrinaFurtado",
  "https://api.github.com/users/CajueiroCaio",
  "https://api.github.com/users/pbbyrro",
  "https://api.github.com/users/douglasliman",
];
interface Colaborador {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  blog: string;
}

const SobreNos: React.FC = () => {
  const [colaboradoresData, setColaboradoresData] = React.useState<
    Colaborador[]
  >([]);
  const { usuario } = useContext(AuthContext);
  React.useEffect(() => {
    const fetchColaboradores = async () => {
      const results = await Promise.all(
        colaboradores.map((url) =>
          fetch(url).then((response) => response.json())
        )
      );
      setColaboradoresData(results);
    };

    fetchColaboradores();
  }, []);

  return (
    <>
      <div className="p-4 bg-azul-escuro py-10">
        <Navbar fotoUsuario={usuario.fotoUsuario} />
      </div>
      <div className="font-sans  bg-cinza-claro text-azul-escuro">
        <div
          className="w-full h-12 bg-repeat bg-cover"
          style={{
            backgroundImage: `url(https://i.imgur.com/xHVPAVZ.png)`,
            backgroundSize: "auto",
          }}
        />
        <section className="bg-yellow-200 py-10 px-1">
          <div className="container mx-auto text-center">
            <div className="flex flex-col md:flex-row items-center">
              <img
                src="https://i.imgur.com/vTzTc9f.png"
                alt="Nossa Missão"
                className="w-full md:w-2/5 rounded-lg"
              />
              <div className="text-left mt-4 md:mt-0 md:ml-6">
                <h1 className="text-4xl font-bold mb-4">Nossa Missão</h1>
                <p className="text-lg leading-8">
                  Em nosso marketplace, cada transação vai além de uma simples
                  compra. É um ato de solidariedade que nutre não apenas o
                  corpo, mas também o espírito daqueles que recebem nossa ajuda.
                  <p className="text-lg leading-8">
                    Estamos comprometidos em construir pontes entre quem tem
                    recursos e quem precisa de apoio, promovendo uma conexão
                    humana genuína através da partilha de alimentos. Através da
                    nossa plataforma, não apenas proporcionamos acesso a
                    alimentos de qualidade, mas também promovemos o orgulho e a
                    dignidade de cada pessoa, reconhecendo sua necessidade e
                    valorizando sua autonomia.
                  </p>
                </p>
              </div>
            </div>
          </div>
        </section>
        <div
          className="w-full h-12 bg-repeat bg-cover"
          style={{
            backgroundImage: `url(https://i.imgur.com/xHVPAVZ.png)`,
            backgroundSize: "auto",
          }}
        />
        <section className="bg-white py-10 px-1">
          <div className="container mx-auto text-center">
            <div className="flex flex-col md:flex-row items-center">
              <div className="text-left max-w-4xl">
                <h2 className="text-4xl font-bold mb-4">SOBRE NÓS</h2>
                <p className="text-lg mt-4 md:mt-0 md:mr-6 ">
                  Compaixão e solidariedade guiam nossa missão no mercado online
                  que estamos construindo, destinado a fornecer alimentos
                  essenciais para aqueles que enfrentam dificuldades econômicas.
                  Nossa visão é simples: garantir que todos tenham acesso a
                  alimentos nutritivos e de qualidade, não importa sua condição
                  financeira.
                </p>
                <p className="text-lg mt-4 md:mt-0 md:mr-6 ">
                  Trabalhamos lado a lado com uma ampla rede de estabelecimentos
                  e produtores locais, unindo esforços para oferecer uma
                  variedade diversificada de opções saudáveis e frescas.
                </p>
                <p className="text-lg mt-4 md:mt-0 md:mr-6 ">
                  Acreditamos firmemente que o direito à alimentação adequada é
                  universal, e estamos empenhados em tornar essa crença uma
                  realidade palpável para comunidades em necessidade
                </p>
              </div>
              <img
                src="https://i.imgur.com/coCWXBp.png"
                alt="Sobre Nós"
                className="w-full md:w-2/5 rounded-lg"
              />
            </div>
          </div>
        </section>
        <div
          className="w-full h-12 bg-repeat bg-cover"
          style={{
            backgroundImage: `url(https://i.imgur.com/xHVPAVZ.png)`,
            backgroundSize: "auto",
          }}
        />
        <section className="bg-blue-100 py-10 px-1">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              ODS 1: Erradicação da Pobreza
            </h2>
            <div className="flex flex-col md:flex-row bg-azul-escuro items-center">
              <img
                src="https://i.imgur.com/xBC0iTd.png"
                alt="ODS 1"
                className="hidden lg:block w-64 h-auto object-contain mb-4 md:mb-0"
              />
              <p className="text-lg text-cinza-claro mt-4 md:mt-0 md:ml-6 px-4 md:px-0">
                Na ONU, a Erradicação da Pobreza é o primeiro passo para um
                mundo melhor. É sobre garantir que todas as pessoas,
                independentemente de sua condição financeira, tenham acesso a
                alimentos nutritivos e de qualidade. É sobre estender uma mão
                solidária àqueles que enfrentam dificuldades econômicas. No
                nosso e-commerce, estamos comprometidos com esse objetivo. Ao
                trabalharmos em parceria com estabelecimentos locais e
                produtores, não só oferecemos uma variedade de opções saudáveis,
                mas também contribuímos para a dignidade e o bem-estar de cada
                pessoa. Juntos, estamos construindo um futuro onde ninguém seja
                deixado para trás.
              </p>
              <img
                src="https://i.imgur.com/fiLwVzy.png"
                alt="ODS 1"
                className="hidden lg:block w-64 h-auto object-contain mt-4 md:mt-0"
              />
            </div>
          </div>
        </section>
        <div
          className="w-full h-12 bg-repeat bg-cover"
          style={{
            backgroundImage: `url(https://i.imgur.com/xHVPAVZ.png)`,
            backgroundSize: "auto",
          }}
        />
        <section className="bg-white py-10 px-1">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl line-clamp-1 font-bold mb-4">
              COLABORADORES
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {colaboradoresData.map((colaborador) => (
                <div
                  key={colaborador.id}
                  className="w-full md:w-1/4 p-4 relative"
                >
                  <a
                    href={colaborador.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block rounded-lg overflow-hidden"
                  >
                    <img
                      src={colaborador.avatar_url}
                      alt={colaborador.login}
                      className="w-auto h-577px mx-auto rounded-lg transition duration-300 ease-in-out transform hover:blur-sm"
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 bg-black bg-opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out">
                      <div className="flex items-center gap-6">
                        <a
                          href={colaborador.html_url}
                          className="p-2 rounded-full bg-transparent bg-opacity-75 hover:bg-opacity-100"
                        >
                          <img
                            src="https://i.imgur.com/lU6630c.png"
                            alt="Ícone da rede social 1"
                            className="w-14 h-14"
                          />
                        </a>
                        <a
                          href={colaborador.blog}
                          className="p-2 rounded-full bg-transparent bg-opacity-75 hover:bg-opacity-100"
                        >
                          <img
                            src="https://i.imgur.com/M6d1Naf.png"
                            alt="Ícone da rede social 2"
                            className="w-14 h-14"
                          />
                        </a>
                      </div>
                    </div>
                  </a>
                  <p className="bg-laranja text-lg h-16 -mt-4 pt-6 uppercase">
                    {colaborador.login}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div
          className="w-full h-12 bg-repeat bg-cover"
          style={{
            backgroundImage: `url(https://i.imgur.com/xHVPAVZ.png)`,
            backgroundSize: "auto",
          }}
        />
        <div className="h-10 bg-azul-escuro"></div>
      </div>
    </>
  );
};

export default SobreNos;
