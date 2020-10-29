import { getBuilding, getBuildingList } from ".";

describe("getBuildingList", () => {
  it("should return list of buildings containing: abbreviation, name_en, name_th", () => {
    const res = getBuildingList();
    expect(
      res.every((b) => "abbreviation" in b && "name_th" in b && "name_en" in b),
    ).toBe(true);
  });
});

describe("getBuilding", () => {
  it("should return building from the building abbreviation specified", () => {
    expect(getBuilding("ENG1")).toEqual({
      abbreviation: "ENG1",
      name_th: "ตึก 1",
      name_en: "ENGINEERING 1",
    });
    expect(getBuilding("MHMK")).toEqual({
      abbreviation: "MHMK",
      name_th: "อาคารมหามกุฎ",
      name_en: "MAHAMAKUT BUILDING",
    });
  });

  it("should return undefined if the faculty code is not found", () => {
    expect(getBuilding("ENG0")).toBeUndefined();
  });
});
