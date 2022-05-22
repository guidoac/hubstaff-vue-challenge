<template>
    <div @mouseleave="itemHovered = null">
      <b-table
        ref="selectableTable"
        v-bind="tableConfig"
        :fields="fields"
        :items="members"
        @row-hovered="toggleRowHover"
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
          <div class="table-data d-flex align-items-center">
            <MemberPayment :payment="paymentRow.value" />

            <template v-if="paymentRow.item.id == itemHovered">
              <EditButton class="icon ml-3" />
            </template>
          </div>

        </template>

        <template #cell(limits)="limits">
          <div class="table-data d-flex align-items-center">
            <MemberLimits :limits="limits.value" />

            <template v-if="limits.item.id == itemHovered">
              <EditButton class="icon ml-3" />
            </template>
          </div>
        </template>

        <template #cell(time_tracking)="time_tracking">
          <div class="table-data">
            <MemberTimeTracking :time-tracking="time_tracking.value" />

            <template v-if="time_tracking.item.id == itemHovered">
              <EditButton class="icon ml-3" />
            </template>
          </div>
        </template>

        <template #cell(actions)>
          <BaseSelect
            centralized
            size="sm"
            :options="actions"
          />
        </template>

        <template #cell()="data">
          <div class="table-data">
            {{ data.value }}

            <template v-if="data.item.id == itemHovered">
              <EditButton class="icon ml-2" />
            </template>
          </div>
        </template>
      </b-table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import MemberTimeTracking from '@/components/MemberTimeTracking'
import MemberLimits from '@/components/MemberLimits'
import MemberPayment from '@/components/MemberPayment'
import EditButton from '@/components/EditButton'
import BaseSelect from '@/components/Base/BaseSelect'

export default {
  name: 'MembersTable',

  components: {
    MemberTimeTracking,
    MemberLimits,
    MemberPayment,
    EditButton,
    BaseSelect
  },

  data () {
    return {
      itemHovered: null,

      actions: [
        { value: null, text: 'Actions' }
      ],

      fields: [
        { key: 'selected', label: '', class: 'column-selected' },
        { key: 'name', label: 'Member' },
        { key: 'role', label: 'Role', class: 'column-role' },
        { key: 'projects', label: 'Projects', class: 'column-projects' },
        { key: 'payment', label: 'Payment', class: 'column-payment' },
        'limits',
        'time_tracking',
        { key: 'actions', label: '', class: 'column-actions' }
      ],

      tableConfig: {
        selectedVariant: '',
        selectable: true,
        selectMode: 'multi',
        borderless: true,
        hover: true,
        fixed: true
      }
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
    },

    toggleRowHover (item, index) {
      this.itemHovered = index + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.table-data {
  .icon {
    color: var(--secondary);
  }

  &:hover {
    color: var(--primary);

    .icon {
      color: var(--primary);
    }
  }
}
</style>
