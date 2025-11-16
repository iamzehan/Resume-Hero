export interface EducationItem {
  id:string;
  institute: string;
  degree: string;
  year: string;
}
export interface JobItem {
  id: string;
  organization: string;
  title: string;
  from: string;
  to: string;
}
export interface DataItem {
  name: string;
  phone: string;
  email: string;
  educations: EducationItem[];
  jobs: JobItem[];
}

export class Education implements EducationItem {
  id:string;
  institute: string;
  degree: string;
  year: string;

  constructor(id:string, institute:string, degree:string, year:string){
    this.id = id;
    this.institute = institute;
    this.degree = degree;
    this.year = year;
  }
}

export class Job implements JobItem {
  id: string;
  organization: string;
  title: string;
  from: string;
  to: string;

  constructor(id:string,organization:string, title:string, from:string, to:string){
    this.id = id;
    this.organization = organization;
    this.title = title;
    this.from = from;
    this.to = to;
  }
}

export class Data implements DataItem {
  name: string;
  phone: string;
  email: string;
  educations: EducationItem[];
  jobs: JobItem[];

  constructor(){
    this.name = "";
    this.phone = "";
    this.email = "";
    this.educations = [];
    this.jobs = [];
  }
  
  // Personal Info Methods 
  public setPersonalInfo(name:string, phone:string, email:string):void{
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
  // Educations Methods
  public addEducation(education:EducationItem){
    this.educations.push(education);
  }

  public updateEducation(education:EducationItem):void{
    const index = this.educations.findIndex(item => item.id===education.id);
    this.educations[index] = education;
  }

  public deleteEducation(id:string): void{
    this.educations = this.educations.filter((item)=> item.id!==id)
  }

  // Jobs methods
  public addJob(job:JobItem){
    this.jobs.push(job);
  }

  public updateJob(job:JobItem):void{
    const index = this.jobs.findIndex(item => item.id===job.id);
    this.jobs[index] = job;
  }

  public deleteJob(id:string):void{
    this.jobs = this.jobs.filter((item)=> item.id !== id);
  }
}