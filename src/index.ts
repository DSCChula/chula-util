import { Faculty, FacultyMap, Subject } from "./types";
import f from "./faculties.json";
import axios from "axios";
import iconv from "iconv-lite";
const fs = require("fs");

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
  const facultyList = getFacultyList();
  const noSubjectFacultyCodeList = ["56", "58", "99", "01"];
  const filteredFacultyList = facultyList.filter((f) => {
    return !noSubjectFacultyCodeList.includes(f.code);
  });
  let results: any[] = [];
  for (const fc of filteredFacultyList) {
    try {
      const response = await axios.get(
        `https://www.reg.chula.ac.th/document/courseName${fc.code}.txt`,
        {
          responseType: "arraybuffer",
          transformResponse: [
            (data) => {
              return iconv.decode(Buffer.concat([data]), "TIS-620");
            },
          ],
        },
      );
      const regex = /(\d+)\s+(\d+)\s+((?:\S+\s)+)\s+(\d\/\d+)(?:\s+)?(\d\/\d+)?\n(?:\s+)?([^\n]*)?\n(?:\s+)?([^\n]*)\n/g;
      const regexResults: RegExpMatchArray | null = response.data.match(regex);
      if (regexResults === null) throw new Error("NULL");
      const subjectList = regexResults.map<Subject>((s) => {
        const subject = s.split(regex);
        return {
          code: subject[2],
          facultyCode: fc.code,
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
      results = results.concat(subjectList);
    } catch (e) {
      throw e;
    }
  }
  const jsonData = JSON.stringify(results);
  fs.writeFile(`subjects.json`, jsonData, function (err: any) {
    if (err) {
      console.log(err);
    }
  });
  return results;
};
