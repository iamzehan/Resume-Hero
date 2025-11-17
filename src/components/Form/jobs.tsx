import { useState, useRef} from "react";
import clsx from "clsx";
import { Add as AddIcon, Save, Delete } from "@mui/icons-material";
import { Data, Job as JobData } from "../../lib/utils";
function getID() {
  return self.crypto.randomUUID();
}

export default function Jobs({
  data,
  setData,
}: {
  data: Data;
  setData: (data: Data) => void;
}) {
  const [items, setItems] = useState<string[]>([]);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItems((prev) => [...prev, getID()]); // unique ID
  };

  const handleDelete = (id: string) => {
    // Setting the view after delete
    setItems((prev) => prev.filter((item) => item !== id));

    // Setting the data after delete
    data.deleteJob(id);
    setData(data);
  };

  return (
    <>
      <fieldset className="flex flex-col items-center gap-2 w-[90%]">
        <legend
          className={clsx(
            "text-center font-semibold text-3xl! md:block",
            { "block w-full text-center md:w-auto": items.length === 0 },
            { hidden: items.length > 0 }
          )}
        >
          Jobs
        </legend>
        <div
          className={clsx(
            [
              "w-[90%] xl:w-[50%] flex gap-2 justify-center items-center text-center my-3 py-15 font-semibold border-2 rounded-xl border-dashed text-xl text-gray-500/40",
            ],
            {
              ["hidden"]: items.length > 0,
            }
          )}
        >
          <div className="flex flex-col md:flex-row gap-2 items-center">
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
          <Job
            key={id}
            id={id}
            data={data}
            setData={setData}
            index={(idx + 1).toString()}
            onDelete={handleDelete}
          />
        ))}
        <div
          className={clsx(
            ["w-full flex justify-center"],
            { ["hidden"]: items.length == 0 },
            { ["block"]: items.length > 0 }
          )}
        >
          <Add onAdd={handleAdd} />
        </div>
      </fieldset>
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
        onClick={onAdd}
        className="
            p-2 bg-blue-500! text-white
            rounded-full
          "
      >
        <AddIcon fontSize="large" />
      </button>
    </>
  );
}

interface JobProps {
  id: string;
  index: string;
  data: Data;
  onDelete: (id: string) => void;
  setData: (data: Data) => void;
}

function Job({ id, index, data, onDelete, setData }: JobProps) {
  const formRef = useRef<HTMLFormElement>(null);

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
    <form key={id} ref={formRef} onSubmit={handleSubmit}>
      <fieldset
        id={id.toString()}
        className="relative flex flex-col gap-2 justify-center border-t border-b rounded-none! py-3 md:border md:p-3 md:rounded!"
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
            <input type="text" name="from" placeholder="Started at" required />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="to">To</label>
            <input
              type="text"
              name="to"
              defaultValue={(isCurrent)?"I currently work here":""}
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

        <div className="absolute md:static top-0 w-full flex justify-end gap-2">
          <button
            type="button"
            formMethod="POST"
            onClick={() => formRef.current?.requestSubmit()}
            className="btn-primary w-fit rounded px-2 py-1"
          >
            <Save className="text-white" />
          </button>
          <button
            className="border border-red-500 bg-gray-500/20 w-fit rounded px-2 py-1"
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
  );
}
