<template>
    <div>
        <label for="base-select">
            {{ label }}
        </label>

        <b-form-select
        v-model="preSelected"
          :options="options"
          @input="inputHandler"
        />
    </div>
</template>

<script>
export default {
  name: 'BaseSelect',

  props: {
    label: {
      type: String,
      default: '',
      required: false
    },

    options: {
      type: Array,
      required: true
    },

    preSelected: {
      type: String,
      required: false,
      default: ''
    }
  },

  methods: {
    inputHandler (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
