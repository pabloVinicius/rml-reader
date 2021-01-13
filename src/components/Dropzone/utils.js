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
    const elements = cur.children.map(ch => ch.value);
    return [...acc, ...elements];
  }, []);
  
  const monthsText = data[5].getElementsByTagName('col').map((el) => el.value);

  const tableTexts = tableData.map((el) => 
    el.children.map((ch) => ch.value)
  );

  const footerTexts = footerData.map((el) => 
    el.children.map((ch) => ch.value)
  );

  const dateTexts = dateInfo.map((el) => el.value);



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
  }

  body {
    margin: 0;
    padding: 0;
  }

  @page {
    size: A4;
    margin: 0;
  }
  
  .document-wrapper {
    max-width: 80rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 2rem;
  }
  
  .document-wrapper > button {
    margin: 1rem 0;
  }
  
  .document-container {
    border: 1px solid black;
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }
  
  @media print {
    html, body {
      width: 210mm;
      height: 297mm;
    }
  
    .document-wrapper {
      margin: 0;
    }
  
    .document-wrapper > button {
      display: none;
    }
    
    .document-container {
      border: none;
    }
  }
  
  
  
`;