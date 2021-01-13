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

export const formatXMLData = (xmlData) => {
  const data = xmlData.getElementsByTagName('relatorio')[0].children;
  const labels = xmlData.getElementsByTagName('legenda');
  const [tableTitle, ...tableData] = data[7].children;
  const [footerTitle, ...footerData] = data[9].children;
  const dateInfo = data[11].children[0].children;

  const labelsText = labels.reduce((acc, cur) => {
    const elements = cur.children.map(ch => he.decode(ch.value));
    return [...acc, ...elements];
  }, []);
  
  const monthsText = data[5].getElementsByTagName('col').map((el) => el.value);

  const tableTexts = tableData.map((el) => 
    el.children.map((ch) => he.decode(ch.value))
  );

  const footerTexts = footerData.map((el) => 
    el.children.map((ch) => he.decode(ch.value))
  );

  const dateTexts = dateInfo.map((el) => he.decode(el.value));

  return {
    labels: labelsText,
    months: monthsText,
    table: tableTexts,
    footer: footerTexts,
    date: dateTexts,
  };
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
  }
`;