import React from 'react';

const DocumentPage = ({ data }) => {
  console.log({ data })
  const { date, footer, labels, months, table } = data;
  return (
    <div className="wrapper">
      <button id="print-button">
        Imprimir
      </button>
      <div className="container">
        <div className="header">
          <h1>CAIXA ECONÔMICA FEDERAL</h1>
          <h2>FGTS - Extrato de Conta Vinculada para Fins Recisórios</h2>
        </div>
        <div className="labels">
          <div className="labels-line">
            <span>
              teste
            </span>
            <span>
              teste
            </span>
          </div>
       
          <div className="labels-line">
            <span>
              teste
            </span>
            <span>
              teste
            </span>
          </div>
       
          <div className="labels-line">
            <span>
              teste
            </span>
            <span>
              teste
            </span>
            <span>
              teste
            </span>
            <span>
              teste
            </span>
          </div>
       
          <div className="labels-line">
            <span>
              teste
            </span>
            <span>
              teste
            </span>
            <span>
              teste
            </span>
            <span>
              teste
            </span>
          </div>
       
          <div className="labels-line">
            <span>
              teste
            </span>
            <span>
              teste
            </span>
            <span>
              teste
            </span>
            <span>
              teste
            </span>
          </div>
       
          <div className="labels-line">
            <span>
              teste
            </span>
            <span>
              teste
            </span>
          </div>
       
          <div className="labels-line">
            <span>
              teste
            </span>
            <span>
              teste
            </span>
            <span>
              teste
            </span>
          </div>
       
          <div className="labels-line">
            <span>
              teste
            </span>
            <span>
              teste
            </span>
          </div>
        </div>
        <div className="section">
          <h3>Competências não localizadas nesta Conta Vinculada, no período:</h3>
          <div className="months">
            {months.map((month, monthId) => (
              <span key={monthId}>{month}</span>

            ))}
          </div>
        </div>
        <div className="section">
          <h3>Movimentação da conta no período</h3>
          <div className="table">
            <div className="table-title table-row">
              <span>DATA</span>
              <span>Descrição</span>
              <span>Valor</span>
            </div>
            {table.map((row, rowId) => (
              <div key={rowId} className="table-row">
                {row.map((cell, cellId) => (
                  <span key={cellId}>{cell}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="section">
          <h3>Saldo Atual</h3>
          <div className="table">
            <div className="table-title table-row">
              <span>Depósito</span>
              <span>JAM</span>
              <span>Total</span>
            </div>
            {footer.map((row, rowId) => (
              <div key={rowId} className="table-row table-row-centered">
                {row.map((cell, cellId) => (
                  <span key={cellId}>{cell}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="obs">* Valor expresso em Reais</p>
        <div className="date">
          <span>{date[0]}</span>
          <span>{date[1]}</span>
        </div>
      </div>
    </div>
  );
};


export default DocumentPage;