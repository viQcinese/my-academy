import { CreateClassDTO } from "./class.dto";

export class Class {
  public id: number | null;
  public name: string;
  public isActive: boolean | null;

  constructor(params: CreateClassDTO) {
    this.name = params.name;
    this.id = params.id;
    this.isActive = params.isActive;
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }
}
