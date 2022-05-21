<template>
    <span
        class="px-3 py-1 time-tracking-badge text-light font-weight-bold"
        :class="{
            'bg-success': timeTracking === 'enabled',
            'bg-danger': timeTracking === 'disabled',
        }"
    >
        {{ timeTracking | capitalize }}
    </span>
</template>

<script>
export default {
  name: 'MemberTimeTracking',

  props: {
    timeTracking: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.time-tracking-badge {
  border-radius: 7px;
}
</style>
