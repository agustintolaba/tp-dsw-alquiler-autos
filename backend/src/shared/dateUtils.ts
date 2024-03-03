export const addDays = (date: Date, days: number) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const dateDiffInDays = (date1: string, date2: string) => {
  var diffInMillis = new Date(date1).getTime() - new Date(date2).getTime();
  return Math.floor(diffInMillis / (1000 * 60 * 60 * 24));
};
