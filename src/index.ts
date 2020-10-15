import { Faculty, FacultyMap, Subject } from "./types";
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

//  TODO: Get subjects from all faculties
export const getSubjectList = (): Subject[] => {
  //  URL = "https://www.reg.chula.ac.th/document/courseName02.txt"
  const data: string = fs.readFileSync('./src/courseName02.txt', 'utf8');
  const regex = /(\d+)\s+(\d+)\s+((?:\S+\s)+)\s+(\d\/\d+)(?:\s+)?(\d\/\d+)?\n(?:\s+)?([^\n]*)?\n(?:\s+)?([^\n]*)\n/g;
  const regexResults: RegExpMatchArray | null = data.match(regex);
  if(regexResults === null) throw Error;
  const subjectList: Subject[] = regexResults.map((subjectString: string) => {
    const subject: string[] = subjectString.split(regex);
    return {
      code: subject[2],
      facultyCode: "02", 
      codeName: subject[7],
      name_en: subject[3],
      name_th: subject[6],
      isClosed: subject[5] !== undefined,
      openSemester: subject[4],
      closeSemester: subject[5],
    };
  });
  return subjectList;
}