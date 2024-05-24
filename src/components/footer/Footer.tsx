import React from 'react';
import { GithubLogo, InstagramLogo } from '@phosphor-icons/react';
import './Footer.css';

function Footer() {
    return (
        <footer style={{ background: '#F8F9E6', color: '#3D6736', fontWeight: 'bold', left: '0', bottom: '0', width: '100%', padding: '1.25rem', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'center', padding: '1.25rem' }}>
                <p style={{ fontSize: '3rem' }}>Desconto Expresso</p>
                <div style={{ marginTop: '0.3125rem' }}>
                    <div className='flex gap-1rem font-bold justify-center items-center bg-verde-hover'>
                        <a href="https://github.com/descontoexpresso" target="_blank" rel="noopener noreferrer">
                            <GithubLogo size={48} weight='bold' className='transition-colors duration-300 ease-in-out icon-hover' />
                        </a>
                        <a href="https://www.instagram.com/descontoexpressoecommerce/" target="_blank" rel="noopener noreferrer">
                        <InstagramLogo size={48} weight='bold' className='transition-colors duration-400 ease-in-out icon-hover' />
                        </a>
                    </div>
                </div>
                <div style={{ marginTop: '0.3125rem' }}>
                    <p className='text-lg'>Acesse nossas redes sociais</p>
                </div>
                <NomeLinkComponent />
                <p style={{ paddingTop: '0.625rem' }}>
                    Copyright © 2024
                </p>
            </div>
        </footer>
    );
};

interface NomeLinkProps {
    nome: string;
    link: string;
  } 

const NomeLink: React.FC<NomeLinkProps> = ({ nome, link }) => (
    <a href={link} className="text-lg transition-colors duration-300 ease-in-out icon-hover">
      {nome}
    </a>
  );
  
  const NomeLinkComponent = () => (
    <div style={{ marginTop: '1.875rem' }}>
      <NomeLink nome="Bianca Villalba" link="https://www.linkedin.com/in/biancavillalba/" /> {" | "}
      <NomeLink nome="Caio Cajueiro" link="https://www.linkedin.com/in/caio-cajueiro-dev/" /> {" | "}
      <NomeLink nome="Douglas Lima" link="https://www.linkedin.com/in/douglas-queiroz/" /> {" | "}
      <NomeLink nome="Gustavo Kamimura" link="https://www.linkedin.com/in/gustavokamimura/" /> {" | "}
      <NomeLink nome="Patrícia Byrro" link="https://www.linkedin.com/in/patriciabyrro/" /> {" | "}
      <NomeLink nome="Sabrina Furtado" link="https://www.linkedin.com/in/sabrina-dos-santos-furtado-67374a185/" />
    </div>
  );
  
  
export default Footer;