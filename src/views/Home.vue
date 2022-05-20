<template>
  <div class="home p-4">
    <!-- Your implementation should start here -->
    <h2 class="mb-4">
      Members
    </h2>

    <MembersTable />
  </div>
</template>

<script>
import MembersTable from '@/components/Members/MembersTable'

export default {
  name: 'Home',

  components: {
    MembersTable
  }
}
</script>
