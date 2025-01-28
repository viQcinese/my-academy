export type CreateStudentDTO = {
  firstName: string;
  lastName: string | null;
  birthdate: Date | null;
  document: string | null;
  cellphone: string | null;
  email: string | null;
};
