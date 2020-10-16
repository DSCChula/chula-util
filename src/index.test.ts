import { getFaculty, getFacultyList, getSubjectList } from ".";
import { Subject } from "./types";

describe("getFacultyList", () => {
  it("should return list of faculties containing: code, name_en, name_th", () => {
    const res = getFacultyList();
    expect(
      res.every((f) => "code" in f && "name_th" in f && "name_en" in f),
    ).toBeTruthy();
  });
  it("should return 29 faculties", () => {
    const res = getFacultyList();
    expect(res.length).toBe(29);
  });
});

describe("getFaculty", () => {
  it("should return faculty from the faculty code specified", () => {
    expect(getFaculty("21")).toEqual({
      code: "21",
      name_th: "คณะวิศวกรรมศาสตร์",
      name_en: "Faculty of Engineering",
    });
    expect(getFaculty("22")).toEqual({
      code: "22",
      name_th: "คณะอักษรศาสตร์",
      name_en: "Faculty of Arts",
    });
  });

  it("should return undefined if the faculty code is not found", () => {
    expect(getFaculty("123")).toBeUndefined();
  });
});

describe("getSubject", () => {
  const facultyList = getFacultyList();
  const noSubjectFacultyCodeList = ["56", "58", "99", "01"];
  const filteredFacultyList = facultyList.filter((f) => {
    return !noSubjectFacultyCodeList.includes(f.code);
  });
  filteredFacultyList.forEach((faculty) => {
    describe(`when getting subjects from facultyId ${faculty.code}`, () => {
      it(`should not be undefined`, async () => {
        const subjectList = await getSubjectList(faculty.code);
        expect(subjectList).not.toBeUndefined();
      });
      it("should return list of subjects with correct properties", async () => {
        const subjectList = await getSubjectList(faculty.code);
        if (subjectList === undefined) throw Error("subjectList is undefined");
        subjectList.forEach((s) => {
          expect(s).toHaveProperty("code");
          expect(s).toHaveProperty("abbr");
          expect(s).toHaveProperty("facultyCode");
          expect(s).toHaveProperty("name");
          expect(s).toHaveProperty("isClosed");
          expect(s).toHaveProperty("openSemester");
          expect(s).toHaveProperty("closeSemester");
        });
      });
    });
  });
  describe(`when getting subjects from faculty with no subjects`, () => {
    it(`should return undefined`, async () => {
      const subjectList = await getSubjectList(noSubjectFacultyCodeList[0]);
      expect(subjectList).toBeUndefined();
    });
  });
});
