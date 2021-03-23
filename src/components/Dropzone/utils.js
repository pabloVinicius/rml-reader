import { parseDocument } from '../../utils/parser';

export const readFileAsText = (file) => new Promise((res, rej) => {
  const reader = new FileReader();
 
  reader.onabort = () => rej('Aborted');
  reader.onerror = () => rej('Error');
  reader.onload = () => {
    const fileText = reader.result;
    res(fileText);
  }
  reader.readAsText(file);
});

// Adapted from https://ourcodeworld.com/articles/read/278/how-to-split-an-array-into-chunks-of-the-same-size-easily-in-javascript
export const chunkArray = (myArray, chunkSize, strict) => {
  let results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize));
  }

  if (strict) {
    results = results.filter((array) => array.length === chunkSize);
  }

  return results;
};

export const formatXMLData = (xmlData) => {
  const data = xmlData.getElementsByTagName('dados');
  const reportType = xmlData.getElementsByTagName('HEADERREPORT_TYPE')?.[0]?.value;

  return parseDocument(data, reportType);
};

export const isFileRml = (fileString = "") => (
  fileString.includes('<?rml version=')
);

export const formatTXTData = (fileString) => {
  return fileString
  let copy = fileString.replace(/↵/g, '<br/>');
  // text.replace(/↵/, '<br/>');
  // text.replace(/\u21B5/g,'<br/>')
  console.log({ copy })
  return copy;
};

export const documentPageStyles = `
  * {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 11px;
  }

  body {
    margin: 0;
    padding: 0;
  }

  button {
    font-size: 20px;
  }

  @page {
    size: A4;
    margin: 0;
  }

  .wrapper {
    max-width: 80rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 2rem;
  }

  .wrapper > button {
    margin: 1rem 0;
  }

  .container,
  .header,
  .labels {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .container {
    border: 1px solid black;
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    overflow: hidden;
    padding: 25mm 15mm 10mm 20mm;  
  }

  .container:not(:last-of-type) {
    margin-bottom: 30px;
  }

  .page-title {
    font-size: 24px;
    text-align: center;
    font-weight: 600;
  }

  .page-subtitle {
    font-size: 19px;
    text-align: center;
    font-weight: 600;
  }

  .labels {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 22px;
  }

  .labels-line {
    display: flex;
  }

  .labels-line > div {
    flex: 1;
  }

  .section-title {
    text-align: center;
    margin: 0;
    margin-top: 22px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }

  .section-title > div {
    flex: 1;
    text-align: center !important;
    padding: 0 2px;
    word-break: break-word;
  }

  .table-line {
    display: flex;
    align-items: center;
    margin-bottom: 2px;
  }

  .table-line > div {
    flex: 1;
    text-align: center;
    word-break: break-all;
  }

  .VALOR_EM_REAL {
    text-align: left !important;
    margin-top: 22px;
  }

  .DATA_GERACAO,
  .CHAVE_SEGURANCA {
    margin-top: 22px;
  }

  .NomeEmpreg,
  .DATA_GERACAO,
  .HISTORICO,
  .TOTAL_EMPRESA,
  .TOTAL_GERAL_REC {
    text-align: left !important;
  }

  .NomeEmpreg {
    min-width: 135px;
  }

  .NomeEmpreg,
  .TOTAL_EMPRESA,
  .TOTAL_GERAL_REC,
  .TOTAL_GERAL_SALDO,
  .SaldoEmpreg,
  .SaldoFinsRescisorios {
    word-break: unset !important;
  }

  .SaldoFinsRescisorios,
  .SaldoEmpreg,
  .TOTAL_GERAL_SALDO,
  .TOT_GER_FINS_RESC,
  .CHAVE-SEGURANCA,
  .VALOR_LANC {
    text-align: right !important;
  }

  .TIT_COMPET {
    margin-bottom: 22px;
  }

  @media print {
    html, body {
      width: 210mm;
      height: 297mm;
    }

    .wrapper {
      margin: 0;
    }

    .wrapper > button {
      display: none;
    }
    
    .container {
      border: none;
    }

    .container:not(:last-of-type) {
      margin-bottom: 0;
    }
  }
`;

export const errorMessages = {
  NOT_SUPPORTED: <span>Esse tipo de documento ainda não é suportado, <a href="mailto:vinicius.pablo.18@gmail.com">me mande um email</a> com um exemplo do arquivo para que eu implemente no sistema (abra o arquivo e mude as informações sensíveis como CNPJ, nomes  etc). Verifique na lista abaixo os tipos suportados atualmente.</span>,
  default: 'Algo deu errado no processamento do arquivo. Verifique-o e tente novamente.'
};