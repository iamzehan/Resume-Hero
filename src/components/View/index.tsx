import { type DataItem } from "../../lib/utils";
import Personal from "./personal";
import Educations from "./education";
import Jobs from "./jobs";
export default function View({data}: {data:DataItem}){
    
    return <div className="w-screen flex flex-col gap-5 items-center bg-white text-black h-screen lg:w-[80%] lg:justify-self-center">
        {/* Personal Section */}
        
        <Personal 
        name={data.name}
        phone={data.phone} 
        email={data.email}/>
        {/* Education Section */}
        <Educations
        data={data.educations}
        />
        <Jobs
        data={data.jobs}
        />
    </div>
}