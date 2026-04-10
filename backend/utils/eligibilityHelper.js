export const checkFieldEligibility = (
  schemeValue,
  userValue,
  universalValue = "all",
) => {
  // 1. If user didn't provide filter → ignore
  if (!userValue) return true;

  // 2. If scheme doesn't have value → ignore (or treat as "all")
  if (!schemeValue) return true;

  // const schemeVal = schemeValue.toLowerCase().trim();
  // const userVal = userValue.toLowerCase().trim();

  const normalize = (val) => val?.toLowerCase().replace(/\s+/g, " ").trim();

  const schemeVal = normalize(schemeValue);
  const userVal = normalize(userValue);

  // 3. If scheme is universal → allow
  if (schemeVal === universalValue) return true;

  // 4. Exact match only
  // return schemeVal === userVal;
  return schemeVal.includes(userVal);
};
