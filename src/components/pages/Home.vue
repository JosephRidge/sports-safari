<template>
  <div class="">
    <!-- Players
  - Total number of players in 4 months
  - Number of positions and top performing positoin 
  - General average performance in 4 month period
  - top 5 performers in 4 month period
  -->
    <div class="text-2xl text-start bg-gray-200 rounded-md p-4 m-2 w-96">
      <div class="font-bold">Team</div>
      <div class="text-gray-500 text-2xl">
        Number of players:
        <span class="text-blue-600"> {{ totalNumOfPlayers }}</span>
      </div>

      <div class="text-gray-500 text-2xl">
        Seasons: <span class="text-blue-600"> {{ totalNumberOfMonths }}</span>
      </div>
      <div class="text-gray-500 text-2xl">
        Top Performing Position:
        <span class="text-blue-600"> {{ topPerformingPosition }}</span>
      </div>
      <div class="text-gray-500 text-2xl">
        Top Performing Position score:
        <span class="text-blue-600"> {{ topPerformingPositionScore }}</span>
      </div>
    </div>
    <div class="text-2xl text-start bg-gray-200 rounded-md p-4 m-2 w-96">
      <div class="font-bold">Overall Top Player</div>
      <div class="text-gray-500 text-2xl">
        Name:
        <span class="text-blue-600"> {{ topPlayerOverall }}</span>
      </div>
      <div class="text-gray-500 text-2xl">
        Position:
        <span class="text-blue-600"> {{ topPlayerOverallPosition }}</span>
      </div>
      <div class="text-gray-500 text-2xl">
        Score: <span class="text-blue-600"> {{ topPlayerOverallScore }}</span>
      </div>
    </div>

    <!--  charts -->
    <div class="">
      <div class="">
        <h1 class="pt-4 text-center">Top Players Per season</h1>
        <div style="height: 35vh; width: 80vw" class="flex justify-center">
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
        { month: 14, Name: "Lennox", Score: 99.75 },
        { month: 42, Name: "Luke", Score: 99.75 },
        { month: 67, Name: "Luke", Score: 99.75 },
        { month: 81, Name: "Phoenix", Score: 85.25 },
        { month: 82, Name: "Alfie", Score: 97.75 },
        { month: 116, Name: "Alfie", Score: 99.25 },
        { month: 173, Name: "Luke", Score: 99.75 },
        { month: 207, Name: "Luke", Score: 99.75 },
      ],
    };
  },
  methods: {
    loadData() {},
    plottopPlayerPerformancePerMonth() {
    this.loadData();
    const data = this.topPlayerPerformancePerMonth;

    // Sort data in descending order based on the month
    data.sort((a, b) => b.month - a.month);

    const labels = data.map((item) => item.month);
    const scores = data.map((item) => item.Score);
    const playerNames = data.map((item) => item.Name);

    // Create the chart
    const ctx = document.getElementById("topPlayerPerformancePerMonth").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels, // Use month as x-axis labels
            datasets: [{
                label: "Player Scores",
                data: scores,
                borderColor: "blue", // Set bar color to blue
                backgroundColor: "blue" // Set bar fill color to blue
            }]
        },
        options: {
            scales: {
                x: { // Configure x-axis
                    title: {
                        display: true,
                        text: "season" // Set x-axis label
                    },
                    ticks: {
                        color: 'black' // Set x-axis tick color to black
                    },
                    grid: {
                        display: false // Hide x-axis gridlines
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Score" // Set y-axis label
                    },
                    ticks: {
                        color: 'black' // Set y-axis tick color to black
                    },
                    grid: {
                        display: false // Hide y-axis gridlines
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || "";
                            if (label) {
                                label += ": ";
                            }
                            label += context.parsed.y;
                            label += " (" + playerNames[context.dataIndex] + ")";
                            return label;
                        }
                    }
                }
            },
            elements: {
                point: {
                    radius: 0 // Hide points
                }
            }
        }
    });
}
  },
  mounted() {
    this.plottopPlayerPerformancePerMonth();
  },
  // props: ["title", "chartTarget"],
};
</script>
