<script setup lang="ts">
import {tariffs} from "~/data";

const props = defineProps<{
  rate: string;
  currency: string;
  period: string;
  exchange_rates: {[key: string]: number};
}>();
const { rate, currency, period, exchange_rates} = toRefs(props);
</script>
<template>
  <div class="form__amount">
    <h2 class="form__title">Сумма для оплаты:</h2>
    <p class="form__text">
      {{get_total(tariffs[rate][period], currency, exchange_rates[currency]).toFixed(2)}} {{currency}}
    </p>
    <p v-if="period === 'year'" class="form__text">
      Сумма скидки: {{get_discount(tariffs[rate], currency, exchange_rates[currency]).toFixed(2)}} {{currency}}
    </p>
  </div>
</template>