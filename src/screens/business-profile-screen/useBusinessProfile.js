export const useBusinessProfile = businessHourse => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  console.log('businessHourse:::', businessHourse);
  const getDays = hourIndex =>
    days.filter((item, index) => hourIndex === index);

  //making array of object
  const getUpdatedBusinessHours = () => {
    return businessHourse?.map((objectKey, index) => ({
      workingTime: objectKey,
      day: getDays(index)[0],
    }));
  };

  return {getUpdatedBusinessHours};
};
