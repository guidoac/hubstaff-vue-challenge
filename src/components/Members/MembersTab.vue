<template>
  <div class="col">
    <div class="row mb-3">
      <div class="text-muted h6">
        <span>
          {{ `1 of ${membersCount} counts towards your pricing plan` }}
        </span>

        <div
          v-b-tooltip.hover
          class="ml-1 d-inline-block"
          title="Viewers don't count towards yout Team of 10 (Premium) plan"
        >
          <b-icon
            icon="exclamation-circle-fill"
            variant="secondary"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <BaseSelect
        class="col-3 pl-0"
        label="Role"
        v-bind="roles"
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
      roles: {
        selected: 'all',
        options: [
          { value: 'all', text: 'All Roles' },
          { value: 'owner', text: 'Owner' },
          { value: 'viewer', text: 'Viewer' }
        ]
      },
      timeTracking: {
        selected: 'enabled',
        options: [
          { value: 'enabled', text: 'Enabled' },
          { value: 'disabled', text: 'Disabled' }
        ]
      }
    }
  },

  computed: {
    ...mapGetters('members', [
      'members',
      'membersCount'
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

</style>
