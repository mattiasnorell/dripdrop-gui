const AddZeroToTime = (input: number) => {
  return input.toString().length <= 1 ? '0' + input.toString() : input.toString();
};

const $addZeroToTime = AddZeroToTime;
export default $addZeroToTime;
