import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Basic Line Chart" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=line-simple
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
  return option
}

export function EchartsLineSimple() {
  return <EChart setup={setup} />
}
