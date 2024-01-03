import React from 'react';
import ReactDOM from 'react-dom/client';
import Map from './Map';
import {BrowserRouter} from "react-router-dom";
import Form from "./Form";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          {/*<Map/>*/}
              <Form />
      </BrowserRouter>
  </React.StrictMode>
);
