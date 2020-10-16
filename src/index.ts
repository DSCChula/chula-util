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

export const getSubjectList = async (
  facultyCode: string,
): Promise<Subject[] | undefined> => {
  let response;
  try {
    response = await axios.get(
      `https://www.reg.chula.ac.th/document/courseName${facultyCode}.txt`,
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
    return undefined;
  }
  const regex = /(\d+)\s+(\d+)\s+((?:\S+\s)+)\s+(\d\/\d+)(?:\s+)?(\d\/\d+)?\n(?:\s+)?([^\n]*)?\n(?:\s+)?([^\n]*)\n/g;
  const regexResults: RegExpMatchArray | null = response.data.match(regex);
  if (regexResults === null) return undefined;
  const subjectList = regexResults.map<Subject>((s) => {
    const subject = s.split(regex);
    return {
      code: subject[2],
      facultyCode,
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
