<template>
  <div class="container-fluid">
    <section class="card-wrapper">
      <div class="row">
        <div class="col-sm-6 col-lg-3">
          <stat-card counts="1234" label="Total" color="primary">           
            <!-- <div slot="action" class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div> -->
            
              <v-dropdown icon="cog"
                          tag="div"
                          classes="btn-group float-right"
                          btnTag="button"
                          btnClasses="btn btn-transparent dropdown-toggle p-0 text-light"
                          slot="dropdown"
              >
                <template slot="dropdown-items">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </template>
              </v-dropdown>
            
          </stat-card>
        </div>

        <div class="col-sm-6 col-lg-3">
          <stat-card counts="204" label="Your links" color="info">
            <v-dropdown icon="cog"
                          tag="div"
                          classes="btn-group float-right"
                          btnTag="button"
                          btnClasses="btn btn-transparent dropdown-toggle p-0 text-light"
                          slot="dropdown"
              >
                <template slot="dropdown-items">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </template>
              </v-dropdown>
          </stat-card>
        </div>

        <div class="col-sm-6 col-lg-3">
          <stat-card counts="9825" label="Total views" color="warning"></stat-card>
        </div>

        <div class="col-sm-6 col-lg-3">
          <stat-card counts="3214" label="Views per month" color="danger"></stat-card>
        </div>

      </div>
    </section>

    <div class="card bg-dark">
      <div class="card-body">
        <div class="card-title">
          <h4>Traffic</h4>
          <div class="small text-muted">November 2018</div>
        </div>
        <div class="chart-wrapper mt-5" style="height: 300px;">
          <line-chart></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LineChart from "@/components/VChart";
  import VCard from '@/components/VCard';
  import VDropdown from '@/components/VDropdown';

  export default {
    components: {
      VDropdown,
      "stat-card" : VCard,
      "line-chart": LineChart
    }
  };

</script>
