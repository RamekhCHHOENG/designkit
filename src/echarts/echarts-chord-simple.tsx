import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Basic Chord" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=chord-simple
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    tooltip: {},
    legend: {},
    series: [
      {
        type: 'chord',
        clockwise: false,
        label: { show: true },
        lineStyle: { color: 'target' },
        data: [
          { name: 'A' },
          { name: 'B' },
          { name: 'C' },
          { name: 'D' }
        ],
        links: [
          { source: 'A', target: 'B', value: 40 },
          { source: 'A', target: 'C', value: 20 },
          { source: 'B', target: 'D', value: 20 },
        ]
      }
    ]
  };
  return option
}

export function EchartsChordSimple() {
  return <EChart setup={setup} />
}
