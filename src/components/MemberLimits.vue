<template>
    <div>
      <p
        :class="{
          'text-muted': !limits.weekly
        }"
        class="mb-0 weekly-limit"
      >
        {{ weeklyMessage }}
      </p>

      <p
        :class="{
          'text-muted': !limits.daily
        }"
        class="mb-0 daily-limit"
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
