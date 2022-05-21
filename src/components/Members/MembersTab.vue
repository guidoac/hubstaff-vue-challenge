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

    <div class="row justify-content-between">
      <div class="col-6">
        <div class="row">
          <BaseSelect
            class="col-6 pl-0"
            label="Role"
            v-bind="roles"
            @input="roleHandler"
          />

          <BaseSelect
            class="col-6 pl-0"
            label="Time Tracking"
            v-bind="timeTracking"
            @input="timeTrackingHandler"
          />
        </div>
      </div>

      <div class="col-3 d-flex align-items-end justify-content-end">
        <BaseButton>
          Invite Member
        </BaseButton>
      </div>
    </div>

    <div class="row mt-5">
      <MembersTable />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import BaseSelect from '@/components/Base/BaseSelect'
import BaseButton from '@/components/Base/BaseButton'
import MembersTable from '@/components/Members/MembersTable'

export default {
  name: 'MembersTab',

  components: {
    BaseSelect,
    BaseButton,
    MembersTable
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
      'membersCount'
    ])
  },

  methods: {
    ...mapActions('members', [
      'fetchMembers'
    ]),

    roleHandler (value) {
      this.roles.selected = value
    },

    timeTrackingHandler (value) {
      this.timeTracking.selected = value
    }
  },

  mounted () {
    this.fetchMembers()
  }
}
</script>

<style lang="scss" scoped>

</style>
