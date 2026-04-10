export const checkEligibility = (schemes, userData) => {
  const user = {
    ...userData,
    occupation: userData.occupation?.toLowerCase(),
    category: userData.category?.toLowerCase(),
    state: userData.state?.toLowerCase(),
  };

  return schemes.filter((scheme) => {
    const minAge = Number(scheme.min_age);
    const maxAge = Number(scheme.max_age);
    const incomeLimit = Number(scheme.income_limit);

    // ❗ FIX: enforce valid values
    const ageOk =
      (!isNaN(minAge) ? user.age >= minAge : true) &&
      (!isNaN(maxAge) ? user.age <= maxAge : true);

    const incomeOk = !isNaN(incomeLimit) ? user.income <= incomeLimit : true;

    const occupationOk =
      !scheme.occupation ||
      scheme.occupation.toLowerCase() === "all" ||
      scheme.occupation.toLowerCase() === user.occupation;

    const stateOk =
      !scheme.state ||
      scheme.state.toLowerCase() === "all" ||
      scheme.state.toLowerCase() === "central" ||
      scheme.state.toLowerCase() === user.state;

    return ageOk && incomeOk && occupationOk && stateOk;
  });
};
