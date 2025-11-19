import { Save, Delete } from "@mui/icons-material";
import {Data, Job as JobData, type JobItem } from "../../../lib/utils";
import { useState, useRef } from "react";
import JobViewMode from "./JobsViewMode";
import clsx from "clsx";
interface JobProps {
  id: string;
  index: string;
  data: Data;
  onDelete: (id: string) => void;
  setData: (data: Data) => void;
}


export default function Job({ id, index, data, onDelete, setData }: JobProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [viewMode, setViewMode] = useState(false);

  const [viewData, setViewData] = useState<JobItem | null>(null);

  // handling current Job status with checkbox
  const [isCurrent, setIsCurrent] = useState(false);
  const handleCurrent = () => {
    setIsCurrent(!isCurrent);
  };

  // handling form submit
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const rawData = Object.fromEntries(formData?.entries());
    const parsedData = new JobData(
      rawData._id as string,
      rawData.organization as string,
      rawData.title as string,
      rawData.from as string,
      rawData.to as string
    );
    // set View Data and View Mode
    setViewData(parsedData);
    setViewMode(true);

    const exists = data.jobs.find((val) => val.id === parsedData.id);
    // add new education
    if (!exists) {
      data.addJob(parsedData);
      setData(data);
    }
    // update if exists
    else if (exists) {
      data.updateJob(parsedData);
      setData(data);
    }
  }
  return (
    <>
      <div
        className={clsx(
          ["w-full lg:w-[50%] mb-5"],
          { hidden: !viewMode },
          { block: viewMode }
        )}
      >
        <JobViewMode data={viewData} setViewMode={setViewMode} />
      </div>
      <form
        key={id}
        ref={formRef}
        onSubmit={handleSubmit}
        className={clsx({ "hidden!": viewMode }, { "block!": viewMode })}
      >
        <fieldset
          id={id.toString()}
          className="relative shadow-sm flex flex-col gap-2 justify-center border-t border-b rounded-none! py-3 md:border md:p-3 md:rounded!"
        >
          <legend className="text-center">Experience {index} </legend>
          <label htmlFor="_id" className="hidden">
            id
          </label>
          <input
            type="text"
            name="_id"
            className="hidden"
            placeholder="id"
            defaultValue={id.toString() || ""}
          />

          <label htmlFor="organization">Name of Organization</label>
          <input
            type="text"
            name="organization"
            placeholder="Organization name"
            required
          />

          <label htmlFor="title">Title/Designation</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Junior Sales Rep."
            required
          />
          <div className="flex flex-col md:flex-row md:gap-2">
            <div className="flex flex-col flex-1">
              <label htmlFor="from">From</label>
              <input
                type="text"
                name="from"
                placeholder="Started at"
                required
              />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="to">To</label>
              <input
                type="text"
                name="to"
                defaultValue={isCurrent ? "I currently work here" : ""}
                placeholder="Ended at"
                disabled={isCurrent}
              />
            </div>
          </div>
          <label
            className="
        flex flex-row-reverse 
        w-full justify-end items-center gap-2"
            htmlFor="isCurrent"
          >
            I currently work here
            <input
              className="size-5 bg-blue-500"
              type="checkbox"
              name="isCurrent"
              placeholder=""
              onChange={handleCurrent}
              checked={isCurrent}
            />
          </label>

          <div className=" w-full flex gap-2 justify-between md:justify-end">
            <button
              type="button"
              formMethod="POST"
              onClick={() => formRef.current?.requestSubmit()}
              className="btn-primary flex-1 md:flex-0 w-fit rounded px-2 py-1"
            >
              <Save className="text-white" />
            </button>
            <button
              className="border flex-1 md:flex-0 border-red-500 bg-gray-500/20 w-fit rounded px-2 py-1"
              onClick={(e) => {
                e.preventDefault();
                onDelete(id);
              }}
            >
              <Delete className="text-red-500" />
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}