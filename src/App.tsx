import "./App.css";
import Form from "./components/Form";
import { useState } from "react";
import {Data} from './lib/utils'
function App() {
  const [data, setData] = useState(new Data);
  function handleDataState(newData: Data) {
    setData(newData);
  }
  return (
    <main
      className="
    flex flex-col items-center
    w-full h-screen"
    >
      <p className="font-bold text-2xl">Welcome to CV Maker</p>
      <div className="content flex md:justify-center">
        {/* layout Controller(Preview/Edit) */}
        <Form data={data} setData={handleDataState} />
        {/* View */}
      </div>
    </main>
  );
}

export default App;
