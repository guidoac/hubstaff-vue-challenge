<template>
    <div>
      <p
        v-if="limits.weekly"
        class="mb-0"
      >
        {{ `${limits.weekly}:00 / week` }}
      </p>
      <p
        v-else
        class="text-muted mb-0"
      >
        No weekly limit
      </p>
      <p
        v-if="limits.daily"
        class="mb-0"
      >
        {{ `${limits.daily}:00 / week` }}
      </p>
      <p
        v-else
        class="text-muted mb-0"
      >
        No day limit
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
  }
}
</script>

<style lang="scss" scoped>

</style>
