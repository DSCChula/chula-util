import { getFaculty, getFacultyList, getSubject, getSubjectList } from ".";

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

describe("getSubjectList", () => {
  it(`should return list of subjects containing correct properties`, () => {
    const subjectList = getSubjectList();
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

describe("getSubject", () => {
  it(`should return subject from the subject code specified`, () => {
    expect(getSubject("2000501")).toEqual({
      code: "2000501",
      facultyCode: "20",
      abbr: "CON PDG PEACE CONF",
      name: {
        en: "CONCEPTS AND PARADIGMS IN PEACE AND CONFLICT STUDIES",
        th: "มโนทัศน์และกระบวนทัศน์ในการศึกษาสันติภาพและความขัดแย้ง",
      },
      isClosed: false,
      openSemester: "1/2552",
    });
    expect(getSubject("2110413")).toEqual({
      code: "2110413",
      facultyCode: "21",
      abbr: "COMP SECURITY",
      name: {
        en: "COMPUTER SECURITY",
        th: "ความมั่นคงของคอมพิวเตอร์",
      },
      isClosed: false,
      openSemester: "2/2546",
    });
  });
});
