export interface Faculty {
  code: string;
  name_en: string;
  name_th: string;
}

export interface FacultyMap {
  [code: string]: Omit<Faculty, "code">;
}

export interface StudentInfo {
  year: number;
  faculty?: Faculty;
}
