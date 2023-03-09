function getDays(year, month) {
    return new Date(year, month, 0).getDate();
}
const months = [
    "يناير",
    "فبراير",
    "مارس",
    "إبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
];
const month = new Date().getMonth();
const currentMonth = months.slice(month, month + 1);
const date = new Date();
const currentYear = date.getFullYear();
export const monthDays = getDays(currentYear, month + 1);   
