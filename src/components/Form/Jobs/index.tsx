import { useState, useRef, useEffect} from "react";
import clsx from "clsx";
import Add from "../Add";
import Job from "./JobsEditMode";
import { Data } from "../../../lib/utils";
import NothingAdded from "../NothingAdded";

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
    data.deleteJob(id);
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
          Jobs
        </legend>
        <>
        {(items.length===0)?<NothingAdded handleAdd={handleAdd}/>:null}
        </>
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
        {/* Add new items */}
        <div
          className={clsx(
            ["w-full lg:w-[50%] flex justify-center items-center"],
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



