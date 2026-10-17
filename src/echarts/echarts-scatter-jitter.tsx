import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Scatter with Jittering" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=scatter-jitter
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  const grid = {
    left: 80,
    right: 50
  };
  const width = myChart.getWidth() - grid.left - grid.right;
  const data = [];
  for (let day = 0; day < 7; ++day) {
    for (let i = 0; i < 1000; ++i) {
      const y = Math.tan(i) / 2 + 7;
      data.push([day, y, Math.random()]);
    }
  }
  option = {
    title: {
      text: 'Scatter with Jittering'
    },
    grid,
    xAxis: {
      type: 'category',
      jitter: (width / 7) * 0.8,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      max: 10,
      min: 0
    },
    series: [
      {
        name: 'Sleeping Hours',
        type: 'scatter',
        data,
        colorBy: 'data',
        itemStyle: {
          opacity: 0.4
        }
      }
    ]
  };
  return option
}

export function EchartsScatterJitter() {
  return <EChart setup={setup} />
}
