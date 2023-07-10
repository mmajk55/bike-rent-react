export type GetBikePriceParams = {
  start_time: string;
  end_time: string;
  price_per_day: number;
};

export const getBikePrice = ({
  start_time,
  end_time,
  price_per_day,
}: GetBikePriceParams) => {
  const diff = Math.abs(
    new Date(end_time).getTime() - new Date(start_time).getTime()
  );

  if (diff <= 0) {
    return price_per_day;
  }

  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

  return price_per_day * diffDays;
};
