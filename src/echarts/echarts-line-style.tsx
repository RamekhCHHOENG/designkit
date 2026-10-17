import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Line Style and Item Style" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=line-style
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
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line',
        symbol: 'triangle',
        symbolSize: 20,
        lineStyle: {
          color: '#5470C6',
          width: 4,
          type: 'dashed'
        },
        itemStyle: {
          borderWidth: 3,
          borderColor: '#EE6666',
          color: 'yellow'
        }
      }
    ]
  };
  return option
}

export function EchartsLineStyle() {
  return <EChart setup={setup} />
}
