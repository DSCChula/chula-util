import { Building, BuildingMap } from "./types";
import b from "./buildings.json";

const buildings = b as BuildingMap;
export const getBuildingList = (): Building[] => {
  return Object.entries(buildings).map(
    ([abbreviation, { name_en, name_th }]) => ({
      abbreviation,
      name_en,
      name_th,
    }),
  );
};

export const getBuilding = (abbreviation: string): Building | undefined => {
  if (!(abbreviation in buildings)) return;
  const res = buildings[abbreviation];
  return { abbreviation, ...res };
};
