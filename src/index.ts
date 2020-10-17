import { Faculty, FacultyMap, Subject, SubjectMap } from "./types";
import f from "./faculties.json";
import s from "./subjects.json";
import axios from "axios";
import iconv from "iconv-lite";
import fs from "fs";

const faculties = f as FacultyMap;
const subjects = s as SubjectMap;

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

export const getSubjectList = (): Subject[] => {
  return Object.entries(subjects).map(
    ([
      code,
      { abbr, facultyCode, name, isClosed, openSemester, closeSemester },
    ]) => ({
      code,
      abbr,
      facultyCode,
      name,
      isClosed,
      openSemester,
      closeSemester,
    }),
  );
};

export const getSubject = (code: string): Subject | undefined => {
  if (!(code in subjects)) return;
  const res = subjects[code];
  return { code, ...res };
};

export const runGetSubject = async (): Promise<Subject[] | undefined> => {
  const facultyList = getFacultyList();
  const noSubjectFacultyCodeList = ["56", "58", "99", "01"];
  const filteredFacultyList = facultyList.filter((f) => {
    return !noSubjectFacultyCodeList.includes(f.code);
  });
  let results;
  const subjectData: SubjectMap = {};
  for (const f of filteredFacultyList) {
    try {
      const response = await axios.get(
        `https://www.reg.chula.ac.th/document/courseName${f.code}.txt`,
        {
          responseType: "arraybuffer",
          transformResponse: [
            (data) => {
              return iconv.decode(Buffer.concat([data]), "TIS-620");
            },
          ],
        },
      );
      const regex = /(\d+)\s+(\d+)\s+((?:\S+\s)+)\s+(\d\/\d+)(?:\s+)?(\d\/\d+)?\n(?:\ +)?([^\n]+)?\n(?:\ +)?([^\n]+)?\n/g;
      const regexResults: RegExpMatchArray | null = response.data.match(regex);
      if (regexResults === null) throw new Error("regexResult is null");
      regexResults.forEach((s) => {
        const subject = s.split(regex);
        subjectData[subject[2]] = {
          facultyCode: f.code,
          abbr: subject[3].trim(),
          name: {
            en: subject[7],
            th: subject[6],
          },
          isClosed: subject[5] !== undefined,
          openSemester: subject[4],
          closeSemester: subject[5],
        };
      });
    } catch (e) {
      throw e;
    }
  }
  const jsonData = JSON.stringify(subjectData);
  await fs.writeFile(`subjects.json`, jsonData, function (err: any) {
    if (err) {
      console.log(err);
    }
  });
  return results;
};
