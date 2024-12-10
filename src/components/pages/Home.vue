<template>
  <div class="">
    <!-- Players
  - Total number of players in 4 months
  - Number of positions and top performing positoin 
  - General average performance in 4 month period
  - top 5 performers in 4 month period
  -->
    <div class="flex flex-row">
      <div class="text-2xl text-start bg-gray-200 rounded-md p-4 m-2 w-1/2">
        <div class="font-bold">Team</div>
        <div class="text-gray-500 text-2xl">
          Number of players:
          <span class="text-[#1e3a8a]"> {{ totalNumOfPlayers }}</span>
        </div>

        <div class="text-gray-500 text-2xl">
          Seasons:
          <span class="text-[#1e3a8a]"> {{ totalNumberOfMonths }}</span>
        </div>
        <div class="text-gray-500 text-2xl">
          Top Performing Position:
          <span class="text-[#1e3a8a]"> {{ topPerformingPosition }}</span>
        </div>
        <div class="text-gray-500 text-2xl">
          Top Performing Position score:
          <span class="text-[#1e3a8a]"> {{ topPerformingPositionScore }}</span>
        </div>
      </div>
      <div class="text-2xl text-start bg-gray-200 rounded-md p-4 m-2 w-1/2">
        <div class="font-bold">Overall Top Player</div>
        <div class="text-gray-500 text-2xl">
          Name:
          <span class="text-[#1e3a8a]"> {{ topPlayerOverall }}</span>
        </div>
        <div class="text-gray-500 text-2xl">
          Position:
          <span class="text-[#1e3a8a]"> {{ topPlayerOverallPosition }}</span>
        </div>
        <div class="text-gray-500 text-2xl">
          Score:
          <span class="text-[#1e3a8a]"> {{ topPlayerOverallScore }}</span>
        </div>
      </div>
    </div>

    <hr class="my-4" />
    <!--  charts -->
    <div class="">
      <div class="">
        <h1 class="text-start text-[#1e3a8a] font-bold text-2xl">
          Top Players Per season
        </h1>
        <div style="height: 60vh; width: 80vw" class="flex justify-center">
          <canvas id="topPlayerPerformancePerMonth" class="rounded-lg"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Papa from "papaparse";
import { triageDataPath } from "../../utility/constants";
import { RouterLink } from "vue-router";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the datalabels plugin

export default {
  data() {
    return {
      totalNumOfPlayers: 34,
      totalNumberOfPostions: 4,
      totalNumberOfMonths: 8,
      topPlayerOverall: "Braxton",
      topPlayerOverallScore: 85.34,
      topPlayerOverallPosition: "Forward",
      topPerformingPositionScore: 73.13,
      topPerformingPosition: "Forward",
      topPlayerPerformancePerMonth: [
        { month: 1, Name: "Lennox", Score: 99.75 },
        { month: 2, Name: "Luke", Score: 99.75 },
        { month: 3, Name: "Luke", Score: 99.75 },
        { month: 7, Name: "Phoenix", Score: 85.25 },
        { month: 8, Name: "Alfie", Score: 97.75 },
        { month: 9, Name: "Alfie", Score: 99.25 },
        { month: 10, Name: "Luke", Score: 99.75 },
        { month: 11, Name: "Luke", Score: 99.75 },
      ],
    };
  },
  methods: {
    loadData() {},
    plottopPlayerPerformancePerMonth() {
      this.loadData();
      const data = this.topPlayerPerformancePerMonth;

      // Sort data in descending order based on the month (optional, depending on your requirements)
      data.sort((a, b) => b.month - a.month);

      // Use player names as x-axis labels
      const labels = data.map((item) => `${item.Name} (Season ${item.month})`);
      const scores = data.map((item) => item.Score);

      // Create the chart
      const ctx = document
        .getElementById("topPlayerPerformancePerMonth")
        .getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels, // Use player names as x-axis labels
          datasets: [
            {
              label: "Player Scores",
              data: scores,
              borderColor: "#1e3a8a", // Set bar color to blue
              backgroundColor: "#1e3a8a", // Set bar fill color to blue
            },
          ],
        },
        options: {
          scales: {
            x: {
              // Configure x-axis
              title: {
                display: true,
                text: "Player & Season", // Set x-axis label
              },
              ticks: {
                color: "#1e3a8a", // Set x-axis tick color to black
              },
              grid: {
                display: false, // Remove grid lines from the x-axis
                color: "#1e3a8a",
              },
              border: {
                color: "#1e3a8a", // Set the x-axis bottom line color to black
                width: 1, // Adjust the thickness of the bottom line
              },
            },
            y: {
              beginAtZero: true,
              min: 70,
              title: {
                display: true,
                text: "Score", // Set y-axis label
              },
              ticks: {
                color: "#1e3a8a", // Set y-axis tick color to black
              },
              grid: {
                display: false, // Remove grid lines from the x-axis
                color: "#000000",
              },
              border: {
                color: "#1e3a8a", // Set the x-axis bottom line color to black
                width: 1, // Adjust the thickness of the bottom line
              },
            },
          },
          plugins: {
            legend: {
              display: true,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  label += context.parsed.y;
                  return label;
                },
              },
            },
          },
          elements: {
            point: {
              radius: 0,
            },
          },
        },
      });
    },
  },
  mounted() {
    this.plottopPlayerPerformancePerMonth();
  },
  // props: ["title", "chartTarget"],
};
</script>
