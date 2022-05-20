<template>
  <div class="col">
    <p class="text-muted h6">
      {{ `1 of ${membersCount} counts towards your pricing plan` }}

      <b-button
        v-b-tooltip.hover
        title="Viewers don't count towards yout Team of 10 (Premium) plan"
        class="rounded-circle text-white info-tooltip-buttom border-0 ml-1"
      >
        i
      </b-button>
    </p>

    <div class="row">
      <BaseSelect
        label="Role"
        pre-selected="all"
        :options="roles"
        @input="roleHandler"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import BaseSelect from '@/components/Base/BaseSelect'

export default {
  name: 'MembersTab',

  components: {
    BaseSelect
  },

  data () {
    return {
      roleSelected: 'all'
    }
  },

  computed: {
    ...mapGetters('members', [
      'members',
      'membersCount',
      'roles'
    ])
  },

  methods: {
    ...mapActions('members', [
      'fetchMembers'
    ]),

    roleHandler (value) {
      this.roleSelected = value
    }
  },

  mounted () {
    this.fetchMembers()
  }
}
</script>

<style lang="scss" scoped>

.info-tooltip-buttom {
  padding: 0px 6px;
  font-size: .7rem;
  background-color: #8e9eb3;
}

</style>
