export const getMBTIgroup = (option: string) => {
  if (["E", "I"].includes(option)) return "E";
  if (["N", "S"].includes(option)) return "N";
  if (["F", "T"].includes(option)) return "F";
  if (["P", "J"].includes(option)) return "P";
  return "";
};

export const mapAgeToNumber = (age: string | null): number | null => {
  const ageMap: Record<string, number> = {
    "10대": 10,
    "20대": 20,
    "30대 이상": 30
  };
  return age ? (ageMap[age] ?? null) : null;
};
