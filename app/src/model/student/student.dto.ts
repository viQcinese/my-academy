export type CreateStudentDTO = {
  id: number | null;
  isActive: boolean | null;
  firstName: string;
  lastName: string | null;
  birthdate: Date | null;
  document: string | null;
  cellphone: string | null;
  email: string | null;
};
