import { Add as AddIcon } from "@mui/icons-material";
export default function Add({
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