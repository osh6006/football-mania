export function timeStampToDate(date: string): string {
  if (date) {
    const newDate = new Date(date);

    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = newDate.getDate().toString().padStart(2, "0");
    const hours = newDate.getHours().toString().padStart(2, "0");
    const minutes = newDate.getMinutes().toString().padStart(2, "0");

    const formattedDateTime = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;

    return formattedDateTime;
  }

  return "Not Data In timeStampToDate";
}

export function formatDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
