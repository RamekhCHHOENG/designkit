import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Polar endAngle" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=polar-endAngle
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    tooltip: {},
    angleAxis: [
      {
        type: 'category',
        polarIndex: 0,
        startAngle: 90,
        endAngle: 0,
        data: ['S1', 'S2', 'S3']
      },
      {
        type: 'category',
        polarIndex: 1,
        startAngle: -90,
        endAngle: -180,
        data: ['T1', 'T2', 'T3']
      }
    ],
    radiusAxis: [{ polarIndex: 0 }, { polarIndex: 1 }],
    polar: [{}, {}],
    series: [
      {
        type: 'bar',
        polarIndex: 0,
        data: [1, 2, 3],
        coordinateSystem: 'polar'
      },
      {
        type: 'bar',
        polarIndex: 1,
        data: [1, 2, 3],
        coordinateSystem: 'polar'
      }
    ]
  };
  return option
}

export function EchartsPolarEndAngle() {
  return <EChart setup={setup} />
}
