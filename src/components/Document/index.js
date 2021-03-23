const DocumentPage = ({ data }) => {
  console.log({ data })
  if (typeof data === 'string') {
    return (<div className="wrapper">
        <div className="container">
          <pre>
            {data}

          </pre>
        </div>
    </div>)
  }

  
  return (
    <div className="wrapper">
      <button id="print-button">
        Imprimir
      </button>
      {data.map((page, pageId) => (
        <div key={pageId} className="container">
          {page.map(el => el.element)}
        </div>
      ))}
    </div>
  );
};

export default DocumentPage;