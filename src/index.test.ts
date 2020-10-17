import { getFaculty, getFacultyList, parseStudentID } from ".";

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

describe("parseStudentID", () => {
  it("should return undefined if the student ID is wrong formatted", () => {
    expect(parseStudentID("123973534")).toBeUndefined();
  });

  it("should return student info from the student ID", () => {
    const result = parseStudentID("6031308121");

    expect(result).toBeDefined();
    expect(result!.year).toEqual(2017);
    expect(result!.faculty?.code).toEqual("21");
  });
});
