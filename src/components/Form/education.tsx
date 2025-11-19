import { useEffect, useRef, useState, lazy } from "react";
import clsx from "clsx";

import { Add as AddIcon, Save, Delete } from "@mui/icons-material";
import { Data, Education as Edu, type EducationItem } from "../../lib/utils";

const EducationViewMode = lazy(() => import("./EducationViewMode"));

function getID() {
  return self.crypto.randomUUID();
}

export default function Educations({
  data,
  setData,
}: {
  data: Data;
  setData: (data: Data) => void;
}) {
  const [items, setItems] = useState<string[]>([]);
  const added = items.length > 0;
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItems((prev) => [...prev, getID()]); // unique ID
  };

  // When new Item is added scroll to bottom
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (added) {
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [items, added]);

  const handleDelete = (id: string) => {
    // Setting the view after delete
    setItems((prev) => prev.filter((item) => item !== id));
    // Setting the data after delete
    data.deleteEducation(id);
    setData(data);
  };
  return (
    <>
      <div
        ref={containerRef}
        className="flex flex-col gap-2 items-center w-[90%] mb-20"
      >
        <legend
          className={clsx(
            "text-center font-semibold text-3xl! md:block",
            { "block w-full text-center md:w-auto": items.length === 0 },
            { hidden: items.length > 0 }
          )}
        >
          Education
        </legend>
        <div
          className={clsx(
            [
              "w-[90%] xl:w-[50%] flex gap-2 justify-center items-center text-center my-3 py-15 border-2 rounded-xl border-dashed text-xl text-gray-500/40",
            ],
            {
              ["hidden"]: items.length > 0,
            }
          )}
        >
          <div className="flex flex-col md:flex-row gap-2 items-center font-semibold">
            <p> Nothing added yet </p>
            <button
              className="text-2xl flex w-fit border border-blue-500 animate-pulse justify-center"
              onClick={handleAdd}
            >
              <AddIcon
                fontSize="large"
                className="text-blue-500 animate-pulse"
              />
            </button>
          </div>
        </div>
        {items?.map((id, idx) => (
          <Education
            key={id}
            id={id}
            index={(idx + 1).toString()}
            onDelete={handleDelete}
            setData={setData}
            data={data}
          />
        ))}

        {/* Adde new items */}
        <div
          className={clsx(
            ["w-full flex justify-center items-center lg:w-[50%]"],
            { hidden: items.length == 0 },
            { block: items.length > 0 }
          )}
        >
          <span className="h-1 w-full bg-gray-500/20 rounded text-gray-500"></span>
          <Add onAdd={handleAdd} />
          <span className="h-1 w-full bg-gray-500/20 rounded"></span>
        </div>
      </div>
    </>
  );
}

function Add({
  onAdd,
}: {
  onAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <>
      <button
        id="addEducation"
        onClick={onAdd}
        className="
            md:p-2 bg-blue-500! text-white
            rounded-full
          "
      >
        <AddIcon fontSize="large" />
      </button>
    </>
  );
}

interface EducationProps {
  id: string;
  index: string;
  data: Data;
  onDelete: (id: string) => void;
  setData: (data: Data) => void;
}

function Education({ id, index, data, onDelete, setData }: EducationProps) {
  const formRef = useRef<HTMLFormElement>(null);
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
        className={clsx(["w-full lg:w-[50%] mb-5"], { hidden: !viewMode }, { block: viewMode })}
      >
        <EducationViewMode data={viewData} setViewMode={setViewMode} />
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
