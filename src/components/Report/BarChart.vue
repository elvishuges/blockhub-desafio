<template>
  <div>
    <div v-if="!loading">
      <apexcharts
        :width="width"
        height="350"
        type="bar"
        :options="chartOptions"
        :series="series"
      ></apexcharts>
    </div>
    <div class="d-flex justify-center" v-else>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  name: "bar-chart",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    series: {
      type: Array,
    },
  },

  data: function() {
    return {
      width: "100%",
      chartOptions: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      //   series: [
      //     {
      //       name: "series-1",
      //       data: [30, 40, 45, 50, 49, 60, 70, 91],
      //     },
      //   ],
    };
  },
  methods: {
    updateCategories(categories) {
      this.chartOptions.xaxis.categories = categories;
    },
  },
};
</script>
