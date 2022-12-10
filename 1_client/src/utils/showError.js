// ********** showing ERROR func  ************

export const showError = (errors, fieldName) => {
  const existError = errors.find((err) => err.param === fieldName);
  if (existError) {
    return existError.msg;
  } else {
    return false;
  }
};
