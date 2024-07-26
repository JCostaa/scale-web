export  interface IEmployee {
    id?: Number;
    registration: String;
    name: String;
    branch_code: String;
    cycles: String;
    sunday: String;
    status: String;
    
}
  
  export interface IEmployeeResponse {
    data?: Array<IEmployee>;
  }
  