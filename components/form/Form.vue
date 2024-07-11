<script setup lang="ts">
import {rates_type, currency_type, periods} from "~/data";
import type {CurrencyServiceResponse} from "~/types/currency-service-response";
const currency_service = new CurrencyService()
const processing = ref(true)
const form_body = ref({
  rate: 'standard',
  currency: 'RUB',
  period: 'month',
})
const exchange_rates = ref({
  CNY: 0,
  KZT: 0,
})
const get_rates = async () => {
  processing.value = true
  const response: CurrencyServiceResponse = await currency_service.get_rates()
  for (const key in exchange_rates.value) {
    exchange_rates.value[key] = response.conversion_rates[key]
  }
  processing.value = false
}
get_rates()

</script>
<template>
  <transition name="processing">
    <div class="form" v-if="!processing">
      <h1 class="form__title">Тарифный калькулятор</h1>
      <FormItem
          label="Выберите тариф:"
          :options="rates_type"
          v-model="form_body.rate"
      />
      <FormItem
          label="Выберите валюту:"
          :options="currency_type"
          v-model="form_body.currency"
      />
      <FormItem
          label="Выберите валюту:"
          :options="periods"
          v-model="form_body.period"
      />
      <FormAmountToPay
          :currency="form_body.currency"
          :period="form_body.period"
          :rate="form_body.rate"
          :exchange_rates="exchange_rates"
      />
    </div>
  </transition>
</template>
<style lang="scss">
.form {
  max-width: 600px;
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #eee;
  &__title {
    margin: 0 0 20px 0;
    text-align: center;
  }
  &__item {
    margin-bottom: 20px;
  }
  &__label {
    padding-left: 10px;
    margin-bottom: 3px;
    color: #818c99;
  }
  &__text {
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    &:not(:last-of-type) {
      margin-bottom: 10px;
    }
  }
}
@media (max-width: 576px) {
  .form {
    &__text {
      font-size: 14px;
    }
    h1.form__title {
      font-size: 18px;
    }
    h2.form__title {
      font-size: 16px;
    }
  }
}
</style>