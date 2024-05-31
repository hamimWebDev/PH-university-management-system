import { TAcademicSemesterNameCodeMapper, TMonth } from "./AcademicSemester.interface";

export const Months: TMonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const AcademicSemesterName = ["Autumn", "Summer", "Fall"];

export const AcademicSemesterCode = ["01", "02", "03"];

export const AcademicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};
