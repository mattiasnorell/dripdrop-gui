const DateTimeFilter = (input: Date) => {
  return `${input.toLocaleDateString()} ${input.toLocaleTimeString()}`;
};

const $dateTimeFilter = DateTimeFilter;
export default $dateTimeFilter;
