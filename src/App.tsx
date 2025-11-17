import "./App.css";

import Navigation from "./components/Navigation";
import Form from "./components/Form";
import View from "./components/View";
import { useState } from "react";
import { Data} from "./lib/utils";
import clsx from "clsx";

function App() {
  const [path, setPath] = useState("Edit");
  const [data, setData] = useState(new Data());
  function handleDataState(newData: Data) {
    setData(newData);
  }
  const viewData = path === "Preview"
  ? {
      name: data.name,
      phone: data.phone,
      email: data.email,
      educations: [...data.educations],
      jobs: [...data.jobs],
    }
  : {name: "",
  phone: "",
  email: "",
  educations: [],
  jobs: [],
};

  return (
    <main
      className="
    flex flex-col items-center
    w-full h-screen"
    >
      <Navigation setPath={setPath} />

      <div className="content flex justify-center over mt-20">
        <section id="Edit" className={clsx({ hidden: path === "Preview" })}>
          <Form data={data} setData={handleDataState} />
        </section>
        <section id="Preview" className={clsx({ hidden: path === "Edit" })}>
          <View data={viewData} />
        </section>
      </div>
    </main>
  );
}

export default App;
