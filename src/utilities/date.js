export function formatDate(unformatted) {
  if (!unformatted) {
    return "Date posted not found...";
  }

  const date = new Date(unformatted);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}
