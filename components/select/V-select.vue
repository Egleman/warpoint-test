<script setup lang="ts">
interface Props {
	options: any;
	valueBy: Function;
	textBy: Function;
	modelValue: any;
	searchable?: boolean;
	placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
	searchable: false,
	placeholder: 'Выбрать',
});
const {
	options,
	modelValue,
	searchable,
	placeholder,
	valueBy,
	textBy,
} = toRefs(props);

const emit = defineEmits(['change', 'update:modelValue']);
const input = ref('')
const searchString = ref('')
const dropdown = ref(false)
const search_input = ref<HTMLInputElement | null>(null)

const check_selected_property = () => {
	if (modelValue.value) {
		const body = options.value.find(
			(item) => valueBy.value(item) === modelValue.value,
		)
		input.value = textBy.value(body)
	}
}
const change_option = (item: any) => {
	input.value = item === null ? '' : textBy.value(item)
	close_drop_down()
	emit('update:modelValue', item === null ? null : valueBy.value(item))
}

const filteredList = computed(() =>
	options.value.filter((item: any) => {
		return textBy
			.value(item)
			.toLocaleLowerCase()
			.includes(searchString.value.toLocaleLowerCase())
	}),
)

const close_drop_down = () => {
	searchString.value = ''
	dropdown.value = false
}

const open_drop_down = () => {
	if (dropdown.value === false) {
		dropdown.value = true
		setTimeout(() => {
			if (search_input.value) {
				search_input.value.focus()
			}
		}, 100)
	} else {
		dropdown.value = false
	}
}

const clear_select = () => {
	input.value = ''
	emit('update:modelValue', null)
}
check_selected_property()
</script>
<template>
	<div
		class="v-select f-border" v-click-outside="close_drop_down">
		<div
			  @click="open_drop_down"
			  class="v-select__display"
		>
			<input type="text" name="value" readonly class="v-select__value" :placeholder="placeholder" v-model="input">
			<span
				class="v-select__arrow"
				:style="`${dropdown ? 'transform: rotate(180deg)' : ''}`"
			>
			  <ion-icon :icon="ioniconsCaretDownOutline"></ion-icon>
			</span>
		</div>
		<div v-if="dropdown" class="v-select__options">
			<input
				v-if="searchable"
				v-model="searchString"
				type="text"
				class="v-select__search"
				placeholder="Поиск..."
				ref="search_input"
			/>
			<template v-for="(item, index) in filteredList" :key="`value-${index}`">
				<a
					href="#"
					class="v-select__option"
					@click.prevent="change_option(item)"
				>
					{{ textBy(item) }}
				</a>
			</template>
		</div>
	</div>
</template>


<style lang="scss" scoped>
.v-select {
	position: relative;
	width: 100%;
	box-sizing: border-box;
	cursor: pointer;
	user-select: none;
	height: 36px;
	&__display {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 15px;
		box-sizing: border-box;
		position: relative;
    cursor: pointer;
	}
	&__value {
		font-size: 14px;
		color: #333;
		width: 100%;
		height: 100%;
		border: none;
    cursor: pointer;
		&::placeholder {
			color: #818c99;
		}
	}
  &__arrow {
    position: absolute;
    background: transparent;
    padding: 0;
    border: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 5px;
    transition: 0.6s all;
    ion-icon {
      font-size: 15px;
      color: #b9b5b5;
    }
  }
	&__options {
		position: absolute;
		top: 103%;
		border-left: 1px solid #bfbfbf;
		border-bottom: 1px solid #bfbfbf;
		border-right: 1px solid #bfbfbf;
		display: flex;
		flex-direction: column;
		background: #fff;
		width: calc(100% + 2px);
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		max-height: 205px;
		overflow-y: auto;
	}
	&__option {
		font-size: 14px;
		line-height: 34px;
		display: block;
		height: 34px;
		padding: 0 15px;
		box-sizing: border-box;
		color: #333;
		text-decoration: none;
		user-select: none;
		white-space: nowrap;
		&:hover {
			background: #ffc000;
		}
	}
	&__search {
		margin: 0 5px;
		border-left: none;
		border-top: none;
		border-right: none;
		border-bottom: 1px solid #bfbfbf;
		background: #fff;
		font-size: 14px;
		line-height: 34px;
		height: 34px;
		box-sizing: border-box;
		padding: 0 15px;
		&::placeholder {
			color: #818c99;
		}
	}
}
.f-border {
	border: 1px solid #bfbfbf;
}
</style>
