export const get_total = (
    amount: number,
    currency: string,
    exchange_rate: number
) => {
    const rate = currency === 'RUB' ? 1 : exchange_rate;
    return amount * rate;
};