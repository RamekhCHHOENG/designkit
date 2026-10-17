import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Simple Gauge" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=gauge-simple
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
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
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

export function EchartsGaugeSimple() {
  return <EChart setup={setup} />
}
