import Educations from "./Education";
import Personal from "./personal";
import Jobs from "./Jobs";
import { Data } from "../../lib/utils";
import { GitHub } from "@mui/icons-material";

export default function Form({
  data,
  setData,
  setNotification
}: {
  data: Data;
  setData: (data:Data) => void;
  setNotification: (notification:string) => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center">
        <a 
        className="
        flex gap-2 items-center border p-2 
        rounded shadow text-black bg-white w-fit font-medium
        xl:fixed md:top-20 xl:right-0 transform-all duration-300 xl:translate-x-[70%] xl:hover:translate-x-0
        xl:animate-bounce hover:animate-none
        "
        href="https://github.com/iamzehan/Resume-Hero" rel="noopener" target="_blank">
        <GitHub fontSize="small" className="text-purple-500"/> Source </a>
        <Personal data={data} setData={setData}/>
        <Educations data={data} setData={setData} setNotification={setNotification}/>
        <Jobs data={data} setData={setData} setNotification={setNotification}/>
        <div className="flex w-full md:justify-end">
          {/* <input
            type="submit"
            value="Submit"
            className="btn-primary border-0! rounded-full px-3 py-3 w-full md:w-fit md:text-xl"
          /> */}
        </div>
    </div>
  );
}
