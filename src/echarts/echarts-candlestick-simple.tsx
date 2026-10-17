import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Basic Candlestick" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=candlestick-simple
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    xAxis: {
      data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
    },
    yAxis: {},
    series: [
      {
        type: 'candlestick',
        data: [
          [20, 34, 10, 38],
          [40, 35, 30, 50],
          [31, 38, 33, 44],
          [38, 15, 5, 42]
        ]
      }
    ]
  };
  return option
}

export function EchartsCandlestickSimple() {
  return <EChart setup={setup} />
}
