/**
 * ? Component imports
 */

//? Built-in
import React, { Fragment, lazy } from "react";

//? External
import { Route, Routes, BrowserRouter } from "react-router-dom";

//? css
import "./App.css";

/**
 * components imports
 */
const StartPage = lazy(() => import("./components/Pages/StartPage"));

const SubmitProposal = lazy(() => import("./components/Pages/SubmitProposal"));

function App() {
  return (
    <Fragment>
      <div className="body flex-grow-1 px-3" style={{margin: 40}}>

          <BrowserRouter>
            <Routes>
              <Route path="/" exact element={<StartPage />} />
              <Route path="/submitProposal" exact element={<SubmitProposal />} />
            </Routes>
          </BrowserRouter>

      </div>
      {/*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
  </div>*/}
    </Fragment>
  );
}

export default App;
