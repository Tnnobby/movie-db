export type ReleaseDateProps = {
  date?: Date | string;
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ReleaseDate = ({ date }: ReleaseDateProps) => {
  if (!date) return null;
  const _date = new Date(date);

  return (
    <>{`${
      MONTHS[_date.getMonth()]
    } ${_date.getDate()}, ${_date.getFullYear()}`}</>
  );
};

export default ReleaseDate;
