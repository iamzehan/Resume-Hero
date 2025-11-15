export interface Education {
  id:string;
  institute: string;
  degree: string;
  year: string;
}
export interface Job {
  organization: string;
  title: string;
  form: string;
  to: string;
}
export interface Data {
  name: string;
  phone: string;
  email: string;
  education: Education[];
  job: Job[];
}