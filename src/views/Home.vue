<template>
  <div class="home">
    <!-- Your implementation should start here -->
    <h2 class="mb-4">
      Members
    </h2>

    <b-tabs
      no-nav-style
      content-class="mt-3"
      active-nav-item-class="bg-transparent border-primary pb-1"
    >
      <b-tab
        active
        :title="`MEMBERS (${membersCount})`"
      >
        <MembersTab />
      </b-tab>

      <b-tab
        disabled
        title="INVITES"
      >
        <!-- <InvitesTab /> goes here -->
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import MembersTab from '@/components/Members/MembersTab'

export default {
  name: 'Home',

  computed: {
    ...mapGetters('members', [
      'membersCount'
    ])
  },

  components: {
    MembersTab
  }
}
</script>
