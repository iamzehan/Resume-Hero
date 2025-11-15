import { useState } from "react";
import clsx from "clsx";
import { Add as AddIcon, Delete } from "@mui/icons-material";
import { type Data, type Job as JobItem } from "../../lib/utils";
function getID() {
  return self.crypto.randomUUID();
}

export default function Jobs({
  data,
  onSet,
}: {
  data: Data;
  onSet:(data:Data) => void;
}) {
  const [items, setItems] = useState<string[]>([]);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItems((prev) => [...prev, getID()]); // unique ID
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item !== id));
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
  onDelete: (id: string) => void;
}

function Job({ id, index, onDelete }: JobProps) {
  return (
    <form>
      <fieldset
        id={id.toString()}
        className="relative flex flex-col gap-2 justify-center border-t border-b rounded-none! py-3 md:border md:p-3 md:rounded!"
      >
        <legend className="text-center">Experience {index} </legend>

        <label htmlFor="Organization">Name of Organization</label>
        <input
          type="text"
          name="Organization"
          placeholder="Organization name"
        />

        <label htmlFor="degree">Title/Designation</label>
        <input type="text" name="degree" placeholder="e.g. Junior Sales Rep." />
        <div className="flex flex-col md:flex-row md:gap-2">
          <div className="flex flex-col flex-1">
            <label htmlFor="year">From</label>
            <input type="text" name="year" placeholder="Started at" />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="year">To</label>
            <input type="text" name="year" placeholder="Ended at" />
          </div>
        </div>

        <div className="absolute md:static top-0 w-full flex justify-end">
          <button
            className="border border-red-500 bg-gray-500/20 w-fit rounded px-2 py-1"
            onClick={() => onDelete(id)}
          >
            <Delete className="text-red-500" />
          </button>
        </div>
      </fieldset>
    </form>
  );
}
