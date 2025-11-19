import {Add} from "@mui/icons-material";
export default function NothingAdded({ handleAdd }: { handleAdd: (e:React.MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <>
      <div className="w-[90%] xl:w-[50%] flex gap-2 justify-center items-center text-center my-3 py-15 font-semibold border-2 rounded-xl border-dashed text-xl text-gray-500/40">
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <p> Nothing added yet </p>
          <button
            className="text-2xl flex w-fit border border-blue-500 animate-pulse justify-center"
            onClick={handleAdd}
          >
            <Add fontSize="large" className="text-blue-500 animate-pulse" />
          </button>
        </div>
      </div>
    </>
  );
}