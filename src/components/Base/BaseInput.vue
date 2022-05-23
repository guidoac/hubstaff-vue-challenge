<template>
    <div class="row bg-white align-items-center px-3 py-2 rounded-pill">
        <slot name="left-icon" />

        <input
            class="bg-transparent border-0 col-11 h-100"
            :placeholder="placeholder"
            :value="value"
            @input="$emit('input', $event.target.value)"
        />
    </div>
</template>

<script>
export default {
  name: 'BaseInput',

  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },

    placeholder: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
