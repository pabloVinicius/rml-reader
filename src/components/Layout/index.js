import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Icon from '../Icon';
import './style.css';

const Layout = ({ children }) => {
  const [showWarning, setShowWarning] = useState(true);
  return (
    <div className="main-layout h-100 d-flex flex-column" fluid>
      <header className="header d-flex flex-column align-items-center justify-content-center">
        <h1>Visualizador RML</h1>
        <h2>Conectividade Social Caixa</h2>
      </header>
      {showWarning && (
        <Alert className="mt-3" variant="warning" onClose={() => setShowWarning(false)} dismissible>
          Atenção: esse sistema não funciona no Internet Explorer. Por favor, utilize um browser moderno, preferencialmente o Google Chrome.
        </Alert>
      )}
      <section className="content d-flex align-items-center">
        {children}
      </section>
      <section className="about d-flex flex-column align-items-center">
        <h4>
          Sobre o visualizador
        </h4>
        <p>
          Dia 12/01/2021 o Adobe Flash Player foi completamente descontinuado e bloqueado em todas as aplicações que o utilizam. 
          Uma delas era o visualizador de arquivos RML da Caixa Econômica Federal, o RML Web 2.0, 
          uma aplicação muito utilizada por contadores que acessam a Conectividade Social.
          Essa aplicação resolve esse problema, lendo e interpretando o arquivo RML da Caixa 
          para gerar um arquivo com uma formatação similar ao gerado pelo RML Web 2.0, disponível para visualização e impressão.
        </p>
      </section>
      <section className="about d-flex flex-column align-items-center">
        <h4>
          Documentos suportados
        </h4>
        <ul className="w-100">
          <li>FGTS - Extrato de Conta Vinculada para Fins Recisórios</li>
        </ul>
      </section>
      <section className="about d-flex flex-column align-items-center">
        <h4>
          Changelog
        </h4>
        <ul className="w-100">
          <li>18/01/2021: agora é possível gerar extratos recisórios que possuem mais de um funcionário por arquivo RML</li>
        </ul>
      </section>
      <footer className="footer d-flex align-items-center justify-content-center">
          Desenvolvido por Pablo Cruz 
          <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/pablo-cruz-17901a177/">
            <Icon icon="linkedin" size="1.5" className="ml-3" /> 
          </a>
          <a target="_blank" rel="noreferrer" href="https://github.com/pabloVinicius/rml-reader">
            <Icon icon="github" size="1.5" className="ml-2" />
          </a>
      </footer>
    </div>
  );
}

export default Layout;
