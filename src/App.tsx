import "./App.css";
import Notifications from "./components/Notifications";
import Navigation from "./components/Navigation";
import Form from "./components/Form";
import View from "./components/View";
import { useState } from "react";
import { Data} from "./lib/utils";
import clsx from "clsx";

function App() {
  const [path, setPath] = useState("Edit");
  const [data, setData] = useState(new Data());
  const [notification, setNotification] = useState<string | null>(null);
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

  const year = new Date().getFullYear();

  return (
    <main
      className="
    flex flex-col items-center
    w-full h-screen"
    >
      <Notifications notification={notification} setNotification={setNotification} />
      <Navigation setPath={setPath} />

      <div className="content flex justify-center over pb-25! mt-3 md:mt-20">
        <section id="Edit" className={clsx({ hidden: path === "Preview" })}>
          <Form data={data} setData={handleDataState} setNotification={setNotification}/>
        </section>
        <section id="Preview" className={clsx({ hidden: path === "Edit" })}>
          <View data={viewData} />
        </section>
      </div>
      <footer className="text-balance pb-25 md:pb-10 w-full text-center"> 
        Copyright © {year} | <a rel="noopener" className="font-bold text-blue-500" href="https://github.com/iamzehan" target="_blank">Md Ziaul Karim</a>
      </footer>
    </main>
  );
}

export default App;
