export const get_discount = (
    rate: Record<string, number>,
    currency: string,
    exchange_rate: number,
) => {
    const discount = (rate.month * 12) - rate.year;
    const new_rate = currency === 'RUB' ? 1 : exchange_rate;
    return discount * new_rate;
};