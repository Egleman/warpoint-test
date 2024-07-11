<script setup lang="ts">
const props = defineProps<{
  label: string,
  options: any
}>();
const {label,options} = toRefs(props);
const select_value = defineModel()
</script>
<template>
  <div class="form__item">
    <p class="form__label">{{label}}</p>
    <VSelect
      :options="options"
      :text-by="(option) => option.label"
      :value-by="(option) => option.value"
      v-model="select_value"
      searchable
    />
  </div>
</template>