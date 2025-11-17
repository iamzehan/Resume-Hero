import ListStyle from "./list-style";
import { type JobItem } from "../../lib/utils";

export default function Jobs({ data }: { data: JobItem[] }) {
  if (data.length === 0) {
    return (
      <>
        <p className="text-4xl font-medium text-gray-200 border-b-2">Experience</p>
        <p className="text-center text-gray-300 font-bold p-10 border-2 border-dashed rounded border-gray-200 h-fit w-[90%]">
          Nothing added yet
        </p>
      </>
    );
  }
  return (
    <>
      <p className="text-4xl font-medium mb-5 border-b-2">Experience</p>
      {data?.map((job) => {
        return (
          <div key={job.id} className="w-[90%] flex flex-col borde">
            <div className="flex gap-5 items-baseline">
              <ListStyle />
              <div className="flex flex-col">
                <p className="text-3xl font-bold">{job.organization}</p>
                <i className="text-gray-500">
                  ({job.from} - {job.to})
                </i>
                <p className="font-semibold text-xl text-gray-500">
                  {job.title}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
