import Educations from "./education";
import Personal from "./personal";
import Jobs from "./jobs";
import { type Data } from "../../lib/utils";
export default function Form({
  data,
  setData,
}: {
  data: Data;
  setData: (data:Data) => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center">
        <Personal data={data} onSet={setData}/>
        <Educations data={data} onSet={setData}/>
        <Jobs data={data} onSet={setData} />
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
