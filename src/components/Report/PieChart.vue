<template>
  <div>
    <div v-if="!loading">
      <apexcharts
        type="pie"
        height="240"
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
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        legend: {
          position: "bottom",
        },
        labels: ["Team A", "Team B", "Team C"],
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
