import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Chord minAngle" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=chord-minAngle
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    tooltip: {},
    legend: {},
    series: [
      {
        type: 'chord',
        label: { show: true },
        minAngle: 30,
        data: [
          { name: 'A' },
          { name: 'B' },
          { name: 'C' },
          { name: 'D' },
          { name: 'E' },
          { name: 'F' }
        ],
        links: [
          { source: 'A', target: 'B', value: 40 },
          { source: 'B', target: 'C', value: 20 },
          { source: 'E', target: 'A', value: 5 }
        ]
      }
    ]
  };
  return option
}

export function EchartsChordMinAngle() {
  return <EChart setup={setup} />
}
