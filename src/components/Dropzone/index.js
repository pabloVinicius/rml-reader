import { useCallback, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import XMLParser from 'react-xml-parser';
import { formatXMLData, readFile, documentPageStyles } from './utils';
import './styles.css';
import Document from '../Document';

const Dropzone = () => {
  const [showError, setShowError] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [filename, setFilename] = useState('');
  const [loading, setLoading] = useState(false);

  const printFile = async ({ filter } = {}) => {
   
    const container = document.createElement('div');
    container.innerHTML = renderToString(<Document />);

    const styles = document.createElement('style');
    styles.setAttribute('type', 'text/css');
    styles.innerHTML = documentPageStyles;

    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.innerHTML = "document.querySelector('#print-button').addEventListener('click', () => window.print());"

    const newWindow = window.open('', 'Impressão de Documento');

    newWindow.document.body.appendChild(container);
    newWindow.document.body.appendChild(script);
    newWindow.document.head.appendChild(styles);
    
  };

  const onDrop = useCallback(async ([file]) => {
    printFile();
    /* try {
      setLoading(true);
      setShowError(false);
      setShowButton(false);

      const fileString = await readFile(file);
      setFilename(file.name);
      
      const xml = new XMLParser().parseFromString(fileString);
      const formatted = formatXMLData(xml);
      console.log({ formatted })
      
    } catch (e) {
      setShowError(true);
    } finally {
      setLoading(false);
    } */
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles:
    1,
    multiple:
    false,
    accept:
    '.rml, .RML'
  });
 
  return (
    <div className="d-flex flex-fill flex-column dropzone-container">
      {showError && (
        <Alert
          variant="danger"
          className="dropzone-alert"
          onClose={() => setShowError(false)}
          dismissible
        >
          Algo deu errado no processamento do arquivo. Verifique-o e tente novamente.
        </Alert>
      )}
      <div
        className="dropzone d-flex align-items-center justify-content-center w-100" 
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>{filename || 'Arraste o arquivo RML ou clique para selecionar'}</p>
      </div>
      {showButton && (
        <Button
          className="mt-4"
          variant="success"
          size="lg"
          block
        >
          Visualizar
        </Button>
      )}
      {loading && (
        <div className="loading-container d-flex align-items-center justify-content-center">
          <Spinner animation="border" />
        </div>
      )}
    </div>
  )
}

export default Dropzone;
