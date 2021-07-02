<template>
  <div>
    <div v-if="!loading">
      <apexcharts
        type="pie"
        :width="width"
        height="350"
        :options="chartOptions"
        :series="series"
      />
    </div>
    <div v-else>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  name: "pie-chart",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    series: {
      type: Array,
    },
  },
  data() {
    return {
      width: "100%",
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        legend: {
          position: "bottom",
        },
        tooltip: {
          enabled: true,
          y: {
            formatter(val) {
              return `${val} Horas`;
            },
          },
        },
        labels: ["Projeto X", "Projeto Y", "Projeto Z"],
      },
    };
  },
  methods: {
    updateLabels(labels) {
      this.chartOptions.labels = labels;
    },
  },
};
</script>

<style></style>
