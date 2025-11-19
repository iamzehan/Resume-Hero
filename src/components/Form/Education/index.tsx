import { useEffect, useRef, useState, lazy} from "react";
import clsx from "clsx";
import Add from "../Add";
import { Add as AddIcon } from "@mui/icons-material";
import { Data } from "../../../lib/utils";

const Education = lazy(()=>import('./EducationEditMode'));

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
  // items to add
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
          <>
            <Education
              key={id}
              id={id}
              data={data}
              index={(idx + 1).toString()}
              onDelete={handleDelete}
              setData={setData}
            />
          </>
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
