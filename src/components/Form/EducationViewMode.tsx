import type { EducationItem } from "../../lib/utils";
import { EditSquare } from "@mui/icons-material";
import { Suspense } from "react";
export default function EducationViewMode({
  data,
  setViewMode,
}: {
  data: EducationItem | null;
  setViewMode: (T: boolean) => void;
}) {
  return (
    <Suspense fallback={<p className="w-full text-center">Loading...</p>}>
    <div
      className="flex items-center px-2 w-full shadow shadow-gray-500/20 rounded"
    >
      <div className="flex flex-col w-full p-2">
        <p className="md:text-3xl font-bold text-blue-500">
          {data?.institute} {data?.year}
        </p>
        <p>{data?.degree}</p>
      </div>
      <button
        onClick={() => setViewMode(false)}
        className="flex items-center gap-2 w-fit h-fit rounded p-2 md:border md:border-blue-500"
      >
        <span className="md:text-xl hidden md:block">Edit</span>
        <EditSquare className="text-blue-500" />
      </button>
    </div>
    </Suspense>
  );
}
