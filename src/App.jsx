/**
 * @name App
 * @description
 * @author darcrand
 */

import React from "react";
import LocalRender from "./LocalRender";
import CodeRender from "./CodeRender";

const App = () => {
  return (
    <>
      <h1>App</h1>

      <LocalRender />
      <CodeRender />
    </>
  );
};

export default App;
