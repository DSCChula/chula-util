import { Faculty, FacultyMap, Subject } from "./types";
import f from "./faculties.json";
import axios from "axios";
import iconv from "iconv-lite";

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
export const getSubjectList = async (): Promise<Subject[]> => {
  const GEN_ED_FACULTY_CODE = "02";
  let response;
  try {
    response = await axios.get(
      "https://www.reg.chula.ac.th/document/courseName02.txt",
      {
        responseType: "arraybuffer",
        transformResponse: [
          (data) => {
            return iconv.decode(Buffer.concat([data]), "TIS-620");
          },
        ],
      },
    );
  } catch (e) {
    throw e;
  }
  const regex = /(\d+)\s+(\d+)\s+((?:\S+\s)+)\s+(\d\/\d+)(?:\s+)?(\d\/\d+)?\n(?:\s+)?([^\n]*)?\n(?:\s+)?([^\n]*)\n/g;
  const regexResults: RegExpMatchArray | null = response.data.match(regex);
  if (regexResults === null) throw Error("subject data format doesn't match");
  const subjectList = regexResults.map<Subject>((s) => {
    const subject = s.split(regex);
    return {
      code: subject[2],
      facultyCode: GEN_ED_FACULTY_CODE,
      abbr: subject[7],
      name: {
        en: subject[3].trim(),
        th: subject[6].trim(),
      },
      isClosed: subject[5] !== undefined,
      openSemester: subject[4],
      closeSemester: subject[5],
    };
  });
  return subjectList;
};
