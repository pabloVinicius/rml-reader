import { useCallback, useState } from 'react';
import * as Sentry from "@sentry/react";
import { renderToString } from 'react-dom/server';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import XMLParser from 'react-xml-parser';
import Document from '../Document';
import { formatXMLData, readFile, documentPageStyles, errorMessages } from './utils';
import './styles.css';

const Dropzone = () => {
  const [error, setError] = useState();
  const [showButton, setShowButton] = useState(false);
  const [formattedDocument, setFormattedDocument] = useState();
  const [filename, setFilename] = useState('');
  const [loading, setLoading] = useState(false);

  const printFile = () => {
    window.gtag('event', 'open_print');
    const container = document.createElement('div');

    container.innerHTML = renderToString(<Document data={formattedDocument} />);

    const styles = document.createElement('style');
    styles.setAttribute('type', 'text/css');
    styles.innerHTML = documentPageStyles;

    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.innerHTML = "document.querySelector('#print-button').addEventListener('click', () => {window.print(); window.close();});"

    const newWindow = window.open('', 'Impressão de Documento');

    newWindow.document.body.appendChild(container);
    newWindow.document.body.appendChild(script);
    newWindow.document.head.appendChild(styles);
  };

  const clearState = () => {
    setError();
    setShowButton(false);
    setFormattedDocument();
    setFilename('');
  };

  const onDrop = useCallback(async ([file]) => {
    try {
      setLoading(true);
      clearState();  

      const fileString = await readFile(file);
      setFilename(file.name);
      
      const xml = new XMLParser().parseFromString(fileString);
      const formatted = formatXMLData(xml);
      setFormattedDocument(formatted);
      setShowButton(true);
      window.gtag('event', 'format_success');
    } catch (err) {
      // Sentry.captureException(err);
      window.gtag('event', 'format_failure');
      setError(err?.name || 'default');
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: '.rml, .RML'
  });
 
  return (
    <div className="d-flex flex-fill flex-column dropzone-container">
      {error && (
        <Alert
          variant="danger"
          className="dropzone-alert"
          onClose={() => setError(false)}
          dismissible
        >
          {errorMessages[error] || errorMessages.default}
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
          onClick={printFile}
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
