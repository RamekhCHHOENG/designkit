import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Basic Parallel" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=parallel-simple
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    parallelAxis: [
      { dim: 0, name: 'Price' },
      { dim: 1, name: 'Net Weight' },
      { dim: 2, name: 'Amount' },
      {
        dim: 3,
        name: 'Score',
        type: 'category',
        data: ['Excellent', 'Good', 'OK', 'Bad']
      }
    ],
    series: {
      type: 'parallel',
      lineStyle: {
        width: 4
      },
      data: [
        [12.99, 100, 82, 'Good'],
        [9.99, 80, 77, 'OK'],
        [20, 120, 60, 'Excellent']
      ]
    }
  };
  return option
}

export function EchartsParallelSimple() {
  return <EChart setup={setup} />
}
