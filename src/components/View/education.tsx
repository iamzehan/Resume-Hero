import type { EducationItem } from "../../lib/utils";
import ListStyle from "./list-style";
export default function Educations({ data }: { data: EducationItem[] }) {
  return (
    <>
    <p className="text-4xl font-medium mb-5 border-b-2">Education</p>
      {data?.map((education) => {
        return (
          <div key={education.id} className="w-[90%] flex flex-col borde">
            <div className="flex gap-5 items-baseline">
              <ListStyle/>
              <div className="flex flex-col">
                <p className="text-2xl font-bold">
                  {education.institute} ({education.year})
                </p>
                <p className="italic text-gray-500">{education.degree}</p>
              </div>

            </div>
          </div>
        );
      })}
    </>
  );
}
