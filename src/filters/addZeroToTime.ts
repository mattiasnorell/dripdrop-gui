const AddZeroToTime = (input: number) => {
  if(!input && input != 0){
    return input;
  }

  return input.toString().length <= 1 ? '0' + input.toString() : input.toString();
};

const $addZeroToTime = AddZeroToTime;
export default $addZeroToTime;
