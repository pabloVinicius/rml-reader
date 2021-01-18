import React from 'react';

const DocumentPage = ({ data }) => {
  return (
    <div className="wrapper">
      <button id="print-button">
        Imprimir
      </button>
      {data.map((doc) => {
        const { date, footer, labels, months, table } = doc;
        return (
          <div className="container">
            <div className="header">
              <h1>CAIXA ECONÔMICA FEDERAL</h1>
              <h2>FGTS - Extrato de Conta Vinculada para Fins Recisórios</h2>
            </div>
            {labels.length > 0 && (
              <div className="labels">
                <div className="labels-line">
                  <span>{labels[0]}</span>
                  <span>{labels[1]}</span>
                </div>
                <div className="labels-line">
                  <span>{labels[2]}</span>
                  <span>{labels[3]}</span>
                </div>
                <div className="labels-line">
                  <span>{labels[4]}</span>
                  <span>{labels[5]}</span>
                  <span>{labels[6]}</span>
                  <span>{labels[7]}</span>
                </div>
                <div className="labels-line">
                  <span>{labels[8]}</span>
                  <span>{labels[9]}</span>
                  <span>{labels[10]}</span>
                  <span>{labels[11]}</span>
                </div>
                <div className="labels-line">
                  <span>{labels[12]}</span>
                  <span>{labels[13]}</span>
                  <span>{labels[14]}</span>
                  <span>{labels[15]}</span>
                </div>
                <div className="labels-line">
                  <span>{labels[16]}</span>
                  <span>{labels[17]}</span>
                </div>
                <div className="labels-line">
                  <span>{labels[18]}</span>
                  <span>{labels[19]}</span>
                  <span>{labels[20]}</span>
                </div>
                <div className="labels-line">
                  <span>{labels[21]}</span>
                  <span>{labels[22]}</span>
                </div>
              </div>
            )}
            {months.length > 0 && (
              <div className="section">
                <h3>Competências não localizadas nesta Conta Vinculada, no período:</h3>
                <div className="months">
                  {months.map((month, monthId) => (
                    <span key={monthId}>{month}</span>
                  ))}
                </div>
              </div>
            )}
            {table.length > 0 && (
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
            )}
            {footer.length > 0 && (
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
            )}
            <p className="obs">* Valor expresso em Reais</p>
            {date.length > 0 && (
              <div className="date">
                <span>{date[0]}</span>
                <span>{date[1]}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};


export default DocumentPage;