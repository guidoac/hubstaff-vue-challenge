<template>
    <div @mouseleave="itemHovered = null">
      <b-table
        ref="selectableTable"
        v-bind="tableConfig"
        :busy="isBusy"
        :fields="fields"
        :items="members"
        :filter="filterValue"
        :filter-function="filterTable"
        @row-hovered="toggleRowHover"
      >
        <template #head(selected)>
          <b-form-checkbox
            :checked="selectedAll"
            @change="selectAll"
            @click.native.stop
          />
        </template>

        <template #cell(selected)="selectedRow">
          <b-form-checkbox
            v-model="selectedRow.rowSelected"
            @change="select"
            @click.native.stop
          />
        </template>

        <template #cell(name)="nameRow">
          <div class="d-flex align-items-center">
            <div class="bg-success photo-placeholder rounded-circle mr-2" />
            {{ nameRow.value }}
          </div>
        </template>

        <template #cell(payment)="paymentRow">
          <div class="table-data d-flex align-items-center">
            <MemberPayment :payment="paymentRow.value" />

            <template v-if="paymentRow.item.id == itemHovered">
              <EditButton class="icon ml-3" />
            </template>
          </div>

        </template>

        <template #cell(limits)="limitsRow">
          <div class="table-data d-flex align-items-center">
            <MemberLimits :limits="limitsRow.value" />

            <template v-if="limitsRow.item.id == itemHovered">
              <EditButton class="icon ml-3" />
            </template>
          </div>
        </template>

        <template #cell(time_tracking)="timeTrackingRow">
          <div class="table-data">
            <MemberTimeTracking :time-tracking="timeTrackingRow.value" />
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

      <p class="text-muted subtitle">
        {{ `Showing ${currentItemsCount} of ${totalItemsCount} members` }}
      </p>
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

  props: {
    customFilter: {
      type: Array,
      required: false,
      default: () => []
    }
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
    },

    filterValue () {
      return this.customFilter.map(filter => filter.value)
    },

    currentItemsCount () {
      if (!this.isBusy) {
        return this.$refs.selectableTable?.filteredItems.length
      } else {
        return ''
      }
    },

    totalItemsCount () {
      if (!this.isBusy) {
        return this.$refs.selectableTable?.items.length
      } else {
        return ''
      }
    },

    isBusy () {
      return this.members.length === 0
    }
  },

  methods: {
    select (value) {
      this.$refs.selectableTable.selectRow(value.index)
    },

    selectAll (value) {
      value ? this.$refs.selectableTable.selectAllRows() : this.$refs.selectableTable.clearSelected()
    },

    toggleRowHover (item, index) {
      this.itemHovered = index + 1
    },

    filterTable (row, filter) {
      let result = true
      this.customFilter.forEach(filter => {
        if (
          filter.value !== 'all' &&
          filter.key !== 'name' &&
          row[filter.key].toLowerCase() !== filter.value
        ) {
          result = false
        }

        if (filter.key === 'name' && filter.value !== '') {
          result = result && new RegExp(filter.value, 'i').test(row.name)
        }
      })

      return result
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

.photo-placeholder {
  padding: .75rem;
}
</style>
