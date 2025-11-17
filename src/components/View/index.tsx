import { type DataItem } from "../../lib/utils";
import Personal from "./personal";
import Educations from "./education";
import Jobs from "./jobs";
export default function View({ data }: { data: DataItem }) {
  const isEmpty =
    !data.name &&
    !data.phone &&
    !data.email &&
    data.educations.length === 0 &&
    data.jobs.length === 0;

  if (isEmpty) {
    return (
      <div className="w-screen h-screen flex justify-center">
        <p className="text-center font-bold text-gray-200/20 p-10 border-2 border-dashed rounded border-gray-200/20 h-fit w-[90%] lg:w-[50%]">
          Nothing added yet
        </p>
      </div>
    );
  }
  return (
    <div className="w-screen flex flex-col gap-5 items-center bg-white text-black h-screen lg:w-[80%] lg:justify-self-center">
      {/* Personal Section */}

      <Personal name={data.name} phone={data.phone} email={data.email} />
      {/* Education Section */}
      <Educations data={data.educations} />
      <Jobs data={data.jobs} />
    </div>
  );
}
