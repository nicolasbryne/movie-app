<template>
    <div class="container-fluid">
        <div class="card text-dark">
            <div class="card-header">
                <i class="fa fa-user-shield mr-2"></i> Admin users
                <button class="btn btn-sm btn-info float-right"><i class="fa fa-plus mr-2"></i>Add user</button>
            </div>
            <div class="card-body">
                <div class="table-responsive table-admin-users">
                    <v-table :data="table1.data"
                                :columns="table1.columns"
                                thead-classes="text-dark"
                                type="striped">
                    </v-table>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import VTable  from "@/components/VTable";
const tableColumns = ["Id", "Username", "Name", "Email", "Joined", "Role", "Status", "Actions"];
const tableData = [
  {
    id: 1,
    username: "nicolas",
    name : "Kaung Myat",
    email: "nicolasbryne@gmail.com",
    joined: "21-May-2018",
    role: "Admin",
    status: "Active"
  },
  {
    id: 2,
    username: "chothan_th",
    name : "Cho Than Thar",
    email: "chocho@gmail.com",
    joined: "03-Jan-2018",
    role: "Admin",
    status: "Active"
  },
  {
    id: 3,
    username: "yoteshin_user",
    name : "Nyein Saeya Aung",
    email: "cmfounder@gmail.com",
    joined: "16-Jul-2018",
    role: "Admin",
    status: "Active"
  }
];

export default {
  components: {
    VTable
  },
  data() {
    return {
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
        data: [...tableData]
      },
      table2: {
        title: "Table on Plain Background",
        columns: [...tableColumns],
        data: [...tableData]
      }
    };
  }
};
</script>

<style>
    .table-admin-users {
        font-size: 0.875rem;
    }
</style>

