import { Data } from "../../lib/utils";
import { Save, ChevronRight } from "@mui/icons-material";
import { useRef } from "react";
export default function Personal({
  data,
  setData,
}: {
  data: Data;
  setData: (data: Data) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const rawData = Object.fromEntries(formData.entries());
    data.setPersonalInfo(
      rawData.name as string,
      rawData.phone as string,
      rawData.email as string
    );
    setData(data);
  }

  return (
    <form className="xl:items-center!" ref={formRef} onSubmit={handleSubmit}>
      <fieldset className="flex flex-col xl:w-[90%]!">
        <legend className="text-center font-semibold! text-3xl! mb-5">
          Personal Information
        </legend>
        <label htmlFor="name">Full name </label>
        <input type="text" name="name" placeholder="Full name" required></input>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex flex-col flex-1">
            <label htmlFor="phone">Phone number </label>
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              required
            ></input>
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="email">Email </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            ></input>
          </div>
        </div>

        <div className="self-end md:self-center py-10">
          <button
            onClick={() => formRef.current?.requestSubmit()}
            className="btn-primary p-3 md:px-3 md:py-1 rounded flex items-center gap-2"
          >
            <span className="hidden md:block text-xl">Save</span>
            <Save fontSize="medium" />
            <ChevronRight fontSize="medium" className="block md:hidden! animate-pulse" />
          </button>
        </div>
      </fieldset>
    </form>
  );
}
