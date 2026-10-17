import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Gauge Basic chart" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=gauge
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        detail: {
          formatter: '{value}'
        },
        data: [
          {
            value: 50,
            name: 'SCORE'
          }
        ]
      }
    ]
  };
  return option
}

export function EchartsGauge() {
  return <EChart setup={setup} />
}
