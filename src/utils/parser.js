import he from 'he';

const subtitleParser = (data) => {
  const subtitleClasses = {
    TITULO_REL1: 'page-title',
    TITULO_REL2: 'page-subtitle',
  };

  const subtitleCosts = {
    TITULO_REL1: 4,
    TITULO_REL2: 3,
  };

  const subtitleBreaks = {
    TITULO_REL1: true,
    TITULO_REL2: false,
  };

  const element = data[0];
  const elementName = element.attributes.nome;
  
  return {
    cost: subtitleCosts[elementName],
    break: subtitleBreaks[elementName],
    element: (
      <div className={subtitleClasses[elementName]}>
        {he.decode(element.value)}
      </div>
    ),
  };
};

const labelsParser = (data) => {
  return {
    cost: data.length + 2,
    element: (
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
    ),
  };

};

const sectionTitleParser = (data) => {
  return {
    cost: 3,
    element: (
      <div className="section-title">
        {data.map((row, rowId) => (
          <div key={rowId}>{he.decode(row.value)}</div>
        ))}
      </div>
    ),
  };
};

const tableLineParser = (data) => {
  return {
    cost: 1,
    element: (
      <div className="table-line">
        {data.map((row, rowId) => (
          <div key={rowId}>{he.decode(row.value)}</div>
        ))}
      </div>
    ),
  };
};

const parsingFunctions = {
  subtitulo: subtitleParser,
  quebra: labelsParser,
  titulo: sectionTitleParser,
  linha: tableLineParser,
  default: () => undefined,
};

export const parseDocument = (data) => {
  const elements = data.reduce((acc, cur) => {
    const internal = cur.children.map((el) => {
      const parser = parsingFunctions[el.name] || parsingFunctions.default;
      return parser(el.children);
    });

    return [...acc, ...internal];
  }, []);

  const pageLimit = 75;
  let currentSum = 0;
  let currentPage = 0;

  const pages = elements.reduce((acc, cur, id) => {
    const cost = cur.cost;
    const breakPage = cur.break && id !== 0;
    if (currentSum + cost >= pageLimit || breakPage) {
      currentSum = 0;
      currentPage += 1;

      return {...acc, [currentPage]: [cur]};
    }

    currentSum += cost;
    return { ...acc, [currentPage]: [...acc[currentPage], cur] };
  }, { 0: [] });

  return Object.values(pages);
};