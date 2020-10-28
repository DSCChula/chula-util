export interface Building {
  abbreviation: string;
  name_en: string;
  name_th: string;
}

export interface BuildingMap {
  [abbreviation: string]: Omit<Building, "abbreviation">;
}
