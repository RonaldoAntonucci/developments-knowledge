export default ({ page = 1, limit = 20 }) => {
  const maxLimit = 100;

  const finalPage = page < 1 ? 1 : page;

  let finalLimit = limit;
  if (limit < 1) {
    finalLimit = 20;
  } else if (limit > maxLimit) {
    finalLimit = 100;
  }

  return { page: finalPage, limit: finalLimit };
};
