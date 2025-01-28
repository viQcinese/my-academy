import { CreateStudentDTO } from "./student.dto";

export class Student {
  public id: number | null;
  public firstName: string;
  public lastName: string | null;
  public birthdate: Date | null;
  public document: string | null;
  public cellphone: string | null;
  public email: string | null;
  public isActive: boolean;

  constructor(params: CreateStudentDTO) {
    this.id = params.id;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.birthdate = params.birthdate;
    this.document = params.document;
    this.cellphone = params.cellphone;
    this.email = params.email;
    this.isActive = true;
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }
}
