import "./App.css";

import Navigation from "./components/Navigation";
import Form from "./components/Form";

import { useState } from "react";
import { Data } from "./lib/utils";
function App() {
  const [data, setData] = useState(new Data());
  function handleDataState(newData: Data) {
    setData(newData);
  }
  return (
    <main
      className="
    flex flex-col items-center
    w-full h-screen"
    >
      <Navigation />

      <div className="content flex md:justify-center mt-10">
        <Form data={data} setData={handleDataState} />
        {/* View */}
      </div>
    </main>
  );
}

export default App;
