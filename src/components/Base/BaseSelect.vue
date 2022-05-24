<template>
    <div>
        <label
          v-if="label"
          for="base-select"
          class="text-uppercase text-muted font-weight-bold"
        >
            {{ label }}
        </label>

        <div class="position-relative input-container d-flex align-items-center">
          <b-form-select
            class="base-select"
            :class="{
              'text-center': centralized
            }"
            :value="selected"
            :size="size"
            :options="options"
            @input="inputHandler"
          />

          <b-icon-chevron-down
            class="position-absolute icon"
            variant="muted"
          />
        </div>
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

    selected: {
      type: String,
      required: false,
      default: null
    },

    centralized: {
      type: Boolean,
      required: false,
      default: false
    },

    size: {
      type: String,
      required: false,
      default: 'md'
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
label {
  font-size: .9rem;
}
</style>
