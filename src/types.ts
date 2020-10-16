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
  abbr: string;
  facultyCode: string;
  name: {
    th: string;
    en: string;
  };
  isClosed: boolean;
  openSemester: string;
  closeSemester: string;
}
