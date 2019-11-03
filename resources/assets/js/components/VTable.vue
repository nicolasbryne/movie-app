<template>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
    <tr>
      <slot name="columns">
        <th v-for="column in columns" :key="column"><span>{{column}}</span><i class="fa fa-sort float-right mr-2"></i></th>
      </slot>
    </tr>
    </thead>
    <tbody :class="tbodyClasses">
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td v-for="(column, index) in columns"
              :key="index"
              v-if="hasValue(item, column) && column!=='Actions'">
            <span v-if="column==='Status'" class="badge badge-success">
              {{itemValue(item, column)}}
            </span>
            <span v-else>
              {{itemValue(item, column)}}
            </span>
          </td>
          <td>
            <button class="btn btn-sm btn-info mr-1" data-toggle="tooltip" data-placement="bottom" title="view"><i class="fa fa-eye"></i></button>
            <button class="btn btn-sm btn-dark mr-1 ml-1" data-toggle="tooltip" data-placement="bottom" title="disable"><i class="fa fa-user-slash"></i></button>
            <button class="btn btn-sm btn-danger ml-1" data-toggle="tooltip" data-placement="bottom" title="delete"><i class="fa fa-trash"></i></button>
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'v-table',
    props: {
      columns: {
        type: Array,
        default: () => [],
        description: "Table columns"
      },
      data: {
        type: Array,
        default: () => [],
        description: "Table data"
      },
      type: {
        type: String, // striped | hover
        default: "",
        description: "Whether table is striped or hover type"
      },
      theadClasses: {
        type: String,
        default: '',
        description: "<thead> css classes"
      },
      tbodyClasses: {
        type: String,
        default: '',
        description: "<tbody> css classes"
      }
    },
    computed: {
      tableClass() {
        return this.type && `table-${this.type}`;
      }
    },
    methods: {
      hasValue(item, column) {
        return item[column.toLowerCase()] !== "undefined";
      },
      itemValue(item, column) {
        return item[column.toLowerCase()];
      }
    }
  };
</script>
<style scoped>

</style>
