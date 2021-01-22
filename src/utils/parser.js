import he from 'he';

const subtitleParser = (data) => {
  const subtitleClasses = {
    TITULO_REL1: 'page-title',
    TITULO_REL2: 'page-subtitle',
  };
  
  return (
    <div className={subtitleClasses[data[0].attributes.nome]}>
      {he.decode(data[0].value)}
    </div>
  );
};

const labelsParser = (data) => (
  <div className="labels">
    {data.map((line, lineId) => (
      <div key={lineId} className="labels-line">
        {line.children.map((label, labelId) => (
          <div key={labelId}>
            {he.decode(label.value)}
          </div>
        ))}
      </div>
    ))}
  </div>
);

const sectionTitleParser = (data) => (
  <div className="section-title">
    {data.map((row, rowId) => (
      <div key={rowId}>{he.decode(row.value)}</div>
    ))}
  </div>
);

const tableLineParser = (data) => (
  <div className="table-line">
    {data.map((row, rowId) => (
      <div key={rowId}>{he.decode(row.value)}</div>
    ))}
  </div>
);

const parsingFunctions = {
  subtitulo: subtitleParser,
  quebra: labelsParser,
  titulo: sectionTitleParser,
  linha: tableLineParser,
  default: () => undefined,
};

export const parseDocument = (data) => {
  return data.reduce((acc, cur) => {
    const internal = cur.children.map((el) => {
      const parser = parsingFunctions[el.name] || parsingFunctions.default;
      return parser(el.children);
    });

    return [...acc, ...internal];
  }, []);
};