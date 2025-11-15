import { useRef, useState } from "react";
import clsx from "clsx";
import { Add as AddIcon, Delete } from "@mui/icons-material";
import { type Data, type Education as Edu } from "../../lib/utils";
function getID() {
  return self.crypto.randomUUID();
}

export default function Educations({
  data,
  onSet,
}: {
  data: Data;
  onSet: (data: Data) => void;
}) {
  const [items, setItems] = useState<string[]>([]);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItems((prev) => [...prev, getID()]); // unique ID
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item !== id));
    onSet({...data, education: data.education.filter((item)=> item.id!==id)});
  };
  return (
    <>
      <div className="flex flex-col gap-2 items-center w-[90%] mb-20">
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
            onSet={onSet}
            data={data}
          />
        ))}
        <div
          className={clsx(
            ["w-full flex justify-center"],
            { hidden: items.length == 0 },
            { block: items.length > 0 }
          )}
        >
          <Add onAdd={handleAdd} />
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
        id="AddJobs"
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

interface EducationProps {
  id: string;
  index: string;
  data: Data;
  onDelete: (id: string) => void;
  onSet: (data: Data) => void;
}

function Education({ id, index, data, onDelete, onSet }: EducationProps) {
  const formRef = useRef<HTMLFormElement>(null);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const rawData = Object.fromEntries(formData?.entries());
    const parsedData: Edu = {
      id: rawData.id as string,
      institute: rawData.institute as string,
      degree: rawData.degree as string,
      year: rawData.year as string,
    };
    
    const exists = data.education.find(val => val.id===parsedData.id);
    if (!exists){
      data.education.push(parsedData);
      onSet(data);
      console.log(data);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <fieldset
        id={id.toString()}
        className="relative flex flex-col gap-2 justify-center border-t border-b rounded-none! py-3 md:border md:p-3 md:rounded!"
      >
        <legend className="text-center">Education {index} </legend>
        <label htmlFor="id" className="hidden">
          id
        </label>
        <input
          type="text"
          name="id"
          className="hidden"
          placeholder="id"
          defaultValue={id.toString() || ""}
        />
        <label htmlFor="institute">Name of Institute</label>
        <input type="text" name="institute" placeholder="Institute name" />

        <label htmlFor="degree">Degree/Diploma</label>
        <input type="text" name="degree" placeholder="e.g. Bachelor of Arts" />

        <label htmlFor="year">Passing year</label>
        <input type="text" name="year" placeholder="Passing year" />
        <div className="absolute md:static top-0 w-full flex gap-2 justify-end">
          <button
            type="button"
            formMethod="POST"
            onClick={() => formRef.current?.requestSubmit()}
            className="btn-primary w-fit rounded px-2 py-1"
          >
            <AddIcon className="text-white" />
          </button>
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
