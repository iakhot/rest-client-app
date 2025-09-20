export const dateFormat = (timestamp: number | string) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
};
