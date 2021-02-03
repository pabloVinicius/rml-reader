export const formatToClassName = (string) => {
  if (!string) return '';
  let formated = string;
  formated = formated.replace(/\W/gi, '');
  formated = formated.replace(/\s/gi, '');
  return formated;
};