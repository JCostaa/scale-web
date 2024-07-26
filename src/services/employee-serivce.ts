import type { IEmployee, IEmployeeResponse } from "@/interfaces/IEmployee";
import { Employee  as EmployeeModel} from "@/models/employee";
import { BaseService } from "./base-api";
import type { IImportCSVResponse } from "@/interfaces/ImportCSV";
import type { IBranchResponse } from "@/interfaces/IBranch";

export class EmployeeService extends BaseService {
  public static async getEmployees(
    year: String,
    month:String,
    branchCode?:String

  ): Promise<EmployeeModel[]> {
    let endpoint: string = `/employees?year=${year}&month=${month}`;

    if(branchCode){
      endpoint += `&branch_code=${branchCode}`
    }
    const response: IEmployeeResponse = await super.api.get(`${endpoint}`);
  
    const employeeResponse: EmployeeModel[] = response.data.map(
      (employee: IEmployee) =>
        new EmployeeModel({
          id:employee.id,
          name: employee.name,
          sunday:employee.sunday,
          registration:employee.registration,
          branch_code: employee.branch_code,
          cycles: employee.cycles,
          status:employee.status
        })
    );
    return employeeResponse;
  }


  public static async getBranchCode(
  ): Promise<IBranchResponse> {
    const endpoint: string = `branch-code`;

    const response: IBranchResponse = await super.api.get(endpoint);
  
    return response;
  }
  

  public static async importCSV(
    data: any
  ): Promise<IImportCSVResponse> {
    console.log(data);
    const endpoint: string = `csv-import`;

    const response: IImportCSVResponse = await super.api.post(endpoint,data);
    
    return response;
  }
}
