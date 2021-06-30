<template>
  <div>
    <apexcharts
      type="pie"
      width="380"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
export default {
  name: "pie-chart",
  data() {
    return {
      series: [44, 55, 13, 43, 22],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style></style>
