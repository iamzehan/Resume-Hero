import {Phone, Email} from '@mui/icons-material';
export default function Personal({
  name,
  phone,
  email,
}: {
  name: string;
  phone: string;
  email: string;
}) {
  return (
    <div className="bg-blue-500 w-[90%] p-5 m-10 flex flex-wrap gap-2 text-white">
      <p className="text-3xl text-white font-semibold">{name}</p>
      <div className="flex flex-col md:flex-row md:gap-2">
        <p className='flex px-2 items-center gap-1'><Phone fontSize='small'/><strong>Phone:</strong> {phone}</p>
        <p className='flex px-2 items-center gap-1'><Email fontSize='small'/><strong>Email:</strong> {email}</p>
      </div>
    </div>
  );
}
