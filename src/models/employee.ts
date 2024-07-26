import type { IEmployee as IEmployeeModelProps } from '@/interfaces/IEmployee'

export class Employee {
  private readonly id?: Number
  private readonly registration: String
  private readonly name: String
  private readonly branch_code: String
  private readonly cycles: String
  private readonly sunday: String
  private readonly status: String

  constructor({ id, registration, name, branch_code, cycles, sunday, status }: IEmployeeModelProps) {
    this.id = id
    this.registration = registration
    this.name = name
    this.branch_code = branch_code
    this.cycles = cycles
    this.sunday = sunday
    this.status = status;
  }

  public getName(): String {
    return this.name
  }

  public getRegistration(): String {
    return this.registration
  }

  public getBranchCode(): String {
    return this.branch_code
  }
  public getCycles(): String{
    return this.cycles
  }
}
