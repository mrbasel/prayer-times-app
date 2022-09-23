// Find the closest date to the current date that are on the same day
export function getClosestDate(dates: Date[]) {
  const currentDate = new Date();
  for (const date of dates) {
    console.log(date, currentDate);

    if (getIsSameDay(date, currentDate) && date > currentDate) return date;
  }
  return null;
}

export function getIsSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// Get the time difference between two dates in hh:mm:ss format
export function getTimeDifferenceString(date1: Date, date2: Date) {
  const olderDate = date1 > date2 ? date1 : date2;
  const newerDate = date1 > date2 ? date2 : date1;

  const differenceInSeconds =
    Math.abs(olderDate.getTime() - newerDate.getTime()) / 1000;
  
  return new Date(differenceInSeconds * 1000).toISOString().substring(11, 19);
}
