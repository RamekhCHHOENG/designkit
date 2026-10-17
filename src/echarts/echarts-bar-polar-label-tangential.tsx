import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Tangential Polar Bar Label Position" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=bar-polar-label-tangential
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    title: [
      {
        text: 'Tangential Polar Bar Label Position (middle)'
      }
    ],
    polar: {
      radius: [30, '80%']
    },
    angleAxis: {
      max: 4,
      startAngle: 75
    },
    radiusAxis: {
      type: 'category',
      data: ['a', 'b', 'c', 'd']
    },
    tooltip: {},
    series: {
      type: 'bar',
      data: [2, 1.2, 2.4, 3.6],
      coordinateSystem: 'polar',
      label: {
        show: true,
        position: 'middle', // or 'start', 'insideStart', 'end', 'insideEnd'
        formatter: '{b}: {c}'
      }
    }
  };
  return option
}

export function EchartsBarPolarLabelTangential() {
  return <EChart setup={setup} />
}
