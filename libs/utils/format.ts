export const formatTime = (timeInSecond: number) => {
  const hour = Math.floor(timeInSecond / 3600);
  const min = Math.floor((timeInSecond - hour * 3600) / 60);
  const sec = timeInSecond - hour * 3600 - min * 60;
  const hourString = String(hour).padStart(2, '0');
  const minString = String(min).padStart(2, '0');
  const secString = String(sec).padStart(2, '0');
  return `${hourString}:${minString}:${secString}`;
};

export const formatDate = (date: Date) => {
  const localeDateString = new Date(date).toLocaleDateString('ko-KR');
  const [year, month, day] = localeDateString.split('.');

  return [
    year.slice(2),
    month.trim().padStart(2, '0'),
    day.trim().padStart(2, '0'),
  ].join('.');
};
