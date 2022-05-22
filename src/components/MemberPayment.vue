<template>
    <div>
        <p
            v-if="!payment"
            class="text-muted mb-0"
        >
            No pay rate / No bill rate
        </p>
        <p v-else>
            <!--- payment data goes here -->
        </p>
    </div>
</template>

<script>
export default {
  name: 'MemberPayment',

  props: {
    payment: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
