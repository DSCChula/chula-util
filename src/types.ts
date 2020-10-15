export interface Faculty {
  code: string;
  name_en: string;
  name_th: string;
}

export interface FacultyMap {
  [code: string]: Omit<Faculty, "code">;
}

export interface Subject {
  code: string;
  codeName: string;
  facultyCode: string;
  name_en: string;
  name_th: string;
  isClosed: boolean;
  openSemester: string;
  closeSemester: string;
}
