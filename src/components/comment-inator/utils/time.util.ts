const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: 'auto',
});

const DIVISIONS = [
  { amount: 60, name: 'seconds' },
  { amount: 60, name: 'minutes' },
  { amount: 24, name: 'hours' },
  { amount: 7, name: 'days' },
  { amount: 4.34524, name: 'weeks' },
  { amount: 12, name: 'months' },
  { amount: Number.POSITIVE_INFINITY, name: 'years' },
];

export default function formatTimeAgo(date) {
  let duration = (date - new Date().valueOf()) / 1000;
  
  for (let division of DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name as Intl.RelativeTimeFormatUnit);
    }
    duration = duration / division.amount;
  }
}
