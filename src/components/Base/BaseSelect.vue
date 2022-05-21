<template>
    <div>
        <label
          class="text-uppercase text-muted font-weight-bold"
          for="base-select"
        >
            {{ label }}
        </label>

        <div class="position-relative input-container d-flex align-items-center">
          <b-form-select
            v-model="selected"
            class="base-select"
            size="lg"
            :options="options"
            @input="inputHandler"
          />

          <b-icon-chevron-down
            variant="muted"
            class="position-absolute icon"
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
label {
  font-size: .9rem;
}

.input-container {
  .base-select {
    border-radius: .5rem;
    background: white;
    padding: .5rem 1.75rem 0.5rem 1rem;
    font-size: 1rem;
  }

  .icon {
    right: 1rem;
  }
}
</style>
