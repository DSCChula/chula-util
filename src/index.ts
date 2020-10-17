import { Faculty, FacultyMap, StudentInfo } from "./types";
import f from "./faculties.json";

const faculties = f as FacultyMap;

export const getFacultyList = (): Faculty[] => {
  return Object.entries(faculties).map(([code, { name_en, name_th }]) => ({
    code,
    name_en,
    name_th,
  }));
};

export const getFaculty = (code: string): Faculty | undefined => {
  if (!(code in faculties)) return;
  const res = faculties[code];
  return { code, ...res };
};

export const parseStudentID = (studentID: string): StudentInfo | undefined => {
  if (studentID.length !== 10) {
    return undefined;
  }
  const year = +studentID.substr(0, 2) + 2500 - 543;
  const facultyCode = studentID.substr(-2, 2);
  return { year, faculty: getFaculty(facultyCode) };
};
