<template>
  <input
    :value="modelValue"
    :type="type"
    class="text-input"
    @input="
      (event) => handleUpdate((event.target as HTMLInputElement).value)
    " />
</template>

<script
  setup
  lang="ts"
  generic="
    I extends 'number' | 'text',
    T extends
      | { type: Extract<I, 'number'>; value: number }
      | { type: Extract<I, 'text'>; value: string }
  ">
const props = defineProps<{ modelValue: T['value']; type: I }>();

const emit = defineEmits<{
  'update:modelValue': [modelValue: T['value']];
}>();

function handleUpdate(value: string) {
  emit(
    'update:modelValue',
    props.type === 'number'
      ? (parseInt(value, 10) as T['value'])
      : (value as T['value']),
  );
}
</script>

<style lang="css">
.text-input {
  -webkit-box-shadow: none !important;
  -webkit-box-shadow: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-transform: rotateZ(0deg);
  -webkit-transition:
    width 0.1s ease,
    -webkit-box-shadow 0.1s ease;
  background: #ffffff;
  background: none transparent !important;
  border-radius: 0.28571429rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
  box-shadow: none !important;
  box-shadow: none;
  box-sizing: border-box;
  color: #000000de;
  cursor: pointer;
  cursor: text;
  display: block;
  display: inline-block;
  font-size: 14px;
  left: 1px;
  line-height: 1.21428571em;
  min-height: 2.71428571em;
  min-width: 14em;
  outline: 0;
  padding: 0.78571429em 0.78571429em 0.78571429em 1em;
  transform: rotate(0);
  transition:
    box-shadow 0.1s ease,
    width 0.1s ease,
    -webkit-box-shadow 0.1s ease;
  transition:
    box-shadow 0.1s ease,
    width 0.1s ease;
  transition:
    width 0.1s ease,
    -webkit-box-shadow 0.1s ease;
  white-space: normal;
  width: 100%;
  width: 100%;
  word-wrap: break-word;
}
</style>
