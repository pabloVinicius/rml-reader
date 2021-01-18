import he from 'he';

export const readFile = (file) => new Promise((res, rej) => {
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
  const type = xmlData.getElementsByTagName('HEADERREPORT_TYPE')[0].value;
  
  if (type !== 'EXT') {
    const error = new Error(`Document type not supported: ${type}`);
    error.name = 'NOT_SUPPORTED';
    throw error;
  }
  
  // const data = xmlData.getElementsByTagName('relatorio')[0].children || [];

  const data = xmlData.getElementsByTagName('dados');

  const documents = chunkArray(data, 10, true);

  const formatted = documents.map((doc) => {
    const labelsData = doc[1].getElementsByTagName('legenda') || [];
    const monthsData = doc[3].getElementsByTagName('col') || [];
    const [tableTitle, ...tableData] = doc[5]?.children || [];
    const [footerTitle, ...footerData] = doc[7]?.children || [];
    const dateInfo = doc[9]?.children[0]?.children || [];
  
    const labelsText = labelsData.reduce((acc, cur) => {
      const elements = cur.children.map(ch => he.decode(ch?.value || ''));
      return [...acc, ...elements];
    }, []);
    
    const monthsText = monthsData.map((el) => el?.value || '');
  
    const tableTexts = tableData.map((el) => 
      el.children.map((ch) => he.decode(ch?.value || ''))
    );
  
    const footerTexts = footerData.map((el) => 
      el.children.map((ch) => he.decode(ch?.value || ''))
    );
  
    const dateTexts = dateInfo.map((el) => he.decode(el?.value || ''));
  
    return {
      labels: labelsText,
      months: monthsText,
      table: tableTexts,
      footer: footerTexts,
      date: dateTexts,
    };
  });

  return formatted;
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
  .labels,
  .section,
  .table {
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

  .header {
    align-items: center;
    margin-bottom: 30px;
  }

  .labels-line {
    display: flex;
  }

  .labels-line > span {
    flex: 1;
    font-weight: bold;
  }

  .labels-line > span:not(:last-of-type) {
    margin-right: 10px;
  }

  .section {
    margin-top: 30px;
  }

  .section > h3 {
    text-align: center;
    margin: 0;
    margin-bottom: 20px;
  }

  .months > span:not(:last-of-type) {
    margin-right: 26px;
  }

  h1 {
    font-size: 24px;
    margin: 0;
  }

  h2 {
    font-size: 19px;
    margin: 0;
  }

  .table-row {
    display: flex;
  }

  .table-row > span {
    flex: 1;
  }

  .table-row > span:nth-child(1) {
    text-align: center;
  }

  .table-row > span:nth-child(3) {
    text-align: right;
  }

  .table-title > span {
    font-weight: bold;
    text-align: center !important;
  }

  .table-row-centered > span {
    text-align: center !important;
  }

  .obs {
    margin: 30px 0;
  }

  .date {
    display: flex;
    justify-content: space-between;
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