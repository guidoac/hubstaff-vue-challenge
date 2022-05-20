<template>
    <div>
        <b-tabs
        no-nav-style
        content-class="mt-3"
        active-nav-item-class="bg-transparent border-primary pb-1"
        >
            <b-tab title="MEMBERS">aaaa</b-tab>

            <b-tab
                title="INVITES"
                disabled
            />
        </b-tabs>
    </div>
</template>

<script>
export default {
  name: 'MembersTable',

  mounted () {
    this.$store.dispatch('members/fetchMembers')
  }
}
</script>

<style lang="scss" scoped>

</style>
