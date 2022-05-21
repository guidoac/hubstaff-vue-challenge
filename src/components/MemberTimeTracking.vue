<template>
    <span
        class="p-2 rounded-"
        :class="{
            'bg-success': timeTracking === 'enabled'
        }"
    >
        {{ timeTracking }}
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

</style>
