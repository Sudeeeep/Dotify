export function changeDateFormat(date: string) {
  const day = date.slice(8, 10);
  const month = date.slice(4, 7);
  const year = date.slice(11, 15);
  return `${day} ${month} ${year}`;
}
