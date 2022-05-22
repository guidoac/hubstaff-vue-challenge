<template>
    <div>
      <b-table
        ref="selectableTable"
        v-bind="tableConfig"
        :fields="fields"
        :items="members"
      >
        <template #head(selected)>
          <b-form-checkbox
            :checked="selectedAll"
            @change="selectAll"
            @click.native.stop
          />
        </template>

        <template #cell(selected)="row">
          <b-form-checkbox
            @change="select"
            v-model="row.rowSelected"
            @click.native.stop
          />
        </template>

        <template #cell(payment)="paymentRow">
          <MemberPayment :payment="paymentRow.value" />
        </template>

        <template #cell(limits)="limits">
          <MemberLimits :limits="limits.value" />
        </template>

        <template #cell(time_tracking)="time_tracking">
          <MemberTimeTracking :time-tracking="time_tracking.value" />
        </template>

        <template #cell(actions)>
          <BaseSelect :options="actions" />
        </template>

        <template #cell()="data">
          {{ data.value }}
        </template>
      </b-table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import MemberTimeTracking from '@/components/MemberTimeTracking'
import MemberLimits from '@/components/MemberLimits'
import MemberPayment from '@/components/MemberPayment'
import BaseSelect from '@/components/Base/BaseSelect'

export default {
  name: 'MembersTable',

  components: {
    MemberTimeTracking,
    MemberLimits,
    MemberPayment,
    BaseSelect
  },

  data () {
    return {
      fields: [
        { key: 'selected', label: '', class: 'column-selected' },
        { key: 'name', label: 'Member' },
        { key: 'role', label: 'Role', class: 'column-role' },
        { key: 'projects', label: 'Projects', class: 'column-projects' },
        'payment',
        'limits',
        'time_tracking',
        { key: 'actions', label: '' }
      ],

      tableConfig: {
        selectedVariant: '',
        selectable: true,
        selectMode: 'multi',
        borderless: true,
        hover: true,
        fixed: true
      },

      actions: [
        { value: null, text: 'Actions' }
      ]
    }
  },

  computed: {
    ...mapGetters('members', [
      'members'
    ]),

    selectedAll () {
      if (this.$refs.selectableTable) {
        return this.$refs.selectableTable.selectedRows.every(isSelected => isSelected === true)
      } else {
        return false
      }
    }
  },

  methods: {
    select (value) {
      console.log(value)
      this.$refs.selectableTable.selectRow(value.index)
    },

    selectAll (value) {
      value ? this.$refs.selectableTable.selectAllRows() : this.$refs.selectableTable.clearSelected()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
