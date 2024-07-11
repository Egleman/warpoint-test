export class CurrencyService {
    async get_rates() {
        const runtime_config = useRuntimeConfig()
        const url = runtime_config.public.currency_api
        const token = runtime_config.public.currency_token
        return await use_api().get(`${url}${token}/latest/RUB`)
    }
}