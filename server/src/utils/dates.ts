import moment from 'moment';

export const isDateThreeDaysAhead = (isoString: string): boolean => {
  const threeDaysAhead = moment().add(3, 'days').startOf('day');
  const date = moment(isoString);
  return date.isSameOrAfter(threeDaysAhead);
};
