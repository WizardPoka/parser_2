import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import Testapp from './components/Testapp';

// ReactDOM.render(
//   <React.StrictMode>
//     {/* <App /> */}
//     <Testapp />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Testapp />
  </React.StrictMode>
);