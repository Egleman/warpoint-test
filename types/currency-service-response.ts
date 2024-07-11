export interface CurrencyServiceResponse {
    conversion_rates: {
        [key: string]: number
    }
}