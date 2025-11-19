import { Data, Education as Edu, type EducationItem } from "../../../lib/utils";
import { useRef, useState } from "react";
import { Save, Delete } from "@mui/icons-material";
import clsx from "clsx";
import EducationViewMode from "./EducationViewMode";

interface EducationProps {
  id: string;
  index: string;
  data: Data;
  onDelete: (id: string) => void;
  setData: (data: Data) => void;
}

export default function Education({
  id,
  index,
  data,
  onDelete,
  setData,
}: EducationProps) {
  const formRef = useRef<HTMLFormElement>(null);
   // view controller state & data
  const [viewData, setViewData] = useState<EducationItem | null>(null);
  const [viewMode, setViewMode] = useState(false);

  // handling form submit
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const rawData = Object.fromEntries(formData?.entries());
    const parsedData = new Edu(
      rawData._id as string,
      rawData.institute as string,
      rawData.degree as string,
      rawData.year as string
    );

    // set View Data for view mode
    setViewData(parsedData);
    // set View Mode for view
    setViewMode(true);
    const exists = data.educations.find((val) => val.id === parsedData.id);
    // add new education
    if (!exists) {
      data.addEducation(parsedData);
      setData(data);
    }
    // update if exists
    else if (exists) {
      data.updateEducation(parsedData);
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
        <EducationViewMode
          key={viewData?.id}
          data={viewData}
          setViewMode={setViewMode}
        />
      </div>
      <div
        className={clsx(
          ["w-full lg:w-[50%] mb-5"],
          { hidden: !viewMode },
          { block: viewMode }
        )}
      ></div>

      <form
        key={id}
        ref={formRef}
        onSubmit={handleSubmit}
        className={clsx(
          ["transition-all duration-600 delay-100 origin-top"],
          { "hidden!": viewMode },
          { "block!": !viewMode }
        )}
      >
        <fieldset
          id={id.toString()}
          className="relative shadow-sm flex flex-col gap-2 justify-center border-t border-b rounded-none! py-3 md:border md:p-3 md:rounded!"
        >
          <legend className="text-center">Education {index} </legend>

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
          <label htmlFor="institute">Name of Institute</label>
          <input
            type="text"
            name="institute"
            placeholder="Institute name"
            required
          />

          <label htmlFor="degree">Degree/Diploma</label>
          <input
            type="text"
            name="degree"
            placeholder="e.g. Bachelor of Arts"
            required
          />

          <label htmlFor="year">Passing year</label>
          <input
            type="text"
            name="year"
            placeholder="Passing year"
            maxLength={4}
            required
          />
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
