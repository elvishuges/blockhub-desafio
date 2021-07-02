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
import { formatNumberToStringMonth } from "@/utils/functions";
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
      formatNumberToStringMonth,
      width: "100%",
      chartOptions: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [],
          labels: {
            formatter: (val) => {
              return formatNumberToStringMonth(val);
            },
          },
        },
      },
    };
  },
  methods: {
    updateCategories(categories) {
      console.log("new categories", categories);
      this.chartOptions.xaxis.categories = categories;
    },
  },
};
</script>
