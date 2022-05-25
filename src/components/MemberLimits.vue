<template>
    <div>
      <p
        class="mb-0 weekly-limit"
        :class="{
          'text-muted': !limits.weekly
        }"
      >
        {{ weeklyMessage }}
      </p>

      <p
        class="mb-0 daily-limit"
        :class="{
          'text-muted': !limits.daily
        }"
      >
        {{ dailyMessage }}
      </p>
    </div>
</template>

<script>
export default {
  name: 'MemberLimits',

  props: {
    limits: {
      type: Object,
      required: true
    }
  },

  computed: {
    weeklyMessage () {
      return this.limits.weekly
        ? `${this.limits.weekly}:00 / week`
        : 'No weekly limit'
    },

    dailyMessage () {
      return this.limits.daily
        ? `${this.limits.daily}:00 / day`
        : 'No daily limit'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
