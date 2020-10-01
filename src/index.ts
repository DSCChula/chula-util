import { Faculty } from "./types";
import faculties from "./faculties.json";

export const getFacultyList = (): Faculty[] => {
  return Object.entries(faculties).map(([code, { name_en, name_th }]) => ({
    code,
    name_en,
    name_th,
  }));
};

export const getFaculty = (code: string): Faculty | undefined => {
  if (!(code in faculties)) return;
  const res = (faculties as {
    [index: string]: Pick<Faculty, "name_en" | "name_th">;
  })[code];
  return { code, ...res };
};
