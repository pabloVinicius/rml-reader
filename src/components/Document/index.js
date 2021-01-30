const DocumentPage = ({ data }) => {
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