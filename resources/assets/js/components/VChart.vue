<template>
    <line-chart style="height: 100%"
                ref="chart"
                :chart-data="chart.chartData"
                :gradient-colors="chart.gradientColors"
                :gradient-stops="chart.gradientStops"
                :extra-options="chart.extraOptions">
    </line-chart>
</template>

<script>
    import LineChart from '@/components/Charts/LineChart';
    import BarChart from '@/components/Charts/BarChart';
    import * as chartConfigs from '@/components/Charts/config';
    import config from '@/config';
    
    export default {
        components : {
            'line-chart' : LineChart
        },
        data: function(){
            return {
                chart: {
                    extraOptions: chartConfigs.purpleChartOptions,
                    gradientColors: config.colors.primaryGradient,
                    gradientStops: [1, 0.4, 0],
                    allData: [
                        [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
                        [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
                        [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
                    ],
                    activeIndex: 0,
                    chartData: null,
                    /* labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [{
                        label: "My First dataset",
                        backgroundColor: 'rgba(23, 162, 184, 0.12)',
                        borderColor: '#17a2b8',
                        data: [0, 10, 5, 2, 20, 30, 45],
                    }] */
                },
                options: {
                    maintainAspectRatio: false,
                }
            }
        },
        methods: {
            initChart(index) {
                let chartData = {
                    datasets: [{
                        fill: true,
                        borderColor: config.colors.primary,
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: config.colors.primary,
                        pointBorderColor: 'rgba(255,255,255,0)',
                        pointHoverBackgroundColor: config.colors.primary,
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: this.chart.allData[index]
                    }],
                    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                }
                this.$refs.chart.updateGradients(chartData);
                this.chart.chartData = chartData;
                this.chart.activeIndex = index;
            }
        },
        mounted : function(){
            this.initChart(0);
        }

    }
</script>
<style>

</style>
