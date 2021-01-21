import he from 'he';

const subtitleParser = (data) => {
  const subtitleClasses = {
    TITULO_REL1: 'page-title',
    TITULO_REL2: 'page-subtitle',
  };
  
  return data.map((datum) => (
    <div className={subtitleClasses[datum.attributes.nome]}>
      {he.decode(datum.value)}
    </div>
  ));
};

const parsingFunctions = {
  subtitulo: subtitleParser,
  default: () => undefined,
};

export const parseDocument = (data) => {
  console.log({ data })
  return data.reduce((acc, cur) => {
    const internal = cur.children.map((el) => {
      const parser = parsingFunctions[el.name] || parsingFunctions.default;
      return parser(el.children);
    });

    return [...acc, ...internal];
  }, []);
};