import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Half Doughnut Chart" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=pie-half-donut
const setup: EChartSetup = () => {
  let option!: EChartsOption
  // This example requires ECharts v5.5.0 or later
  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        // adjust the start and end angle
        startAngle: 180,
        endAngle: 360,
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };
  return option
}

export function EchartsPieHalfDonut() {
  return <EChart setup={setup} />
}
