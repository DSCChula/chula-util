import { getFaculty, getFacultyList, getSubjectList } from ".";

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
  it("It should return list of subjects containing: code, codeName, facultyCode, name_en, name_th, isClosed, openSemester and closeSemester", () => {
    const subjectList = getSubjectList();
    expect(subjectList.every(s => "code" in s && "codeName" in s && "facultyCode" in s && "name_en" in s && "name_th" in s && "isClosed" in s && "openSemester" in s && "closeSemester" in s)).toBeTruthy();
  });
  it("It should return 110 subjects", () => {
    expect(getSubjectList()).toHaveLength(110);
  });
  //  TODO: All subject's code, codeName, facultyCode, name_en, name_th, openSemester should be string
  //  TODO: closeSemester should be string or undefined
  //  TODO: isClosed should be boolean and should be consistence to closeSemester

});
