import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Radial Polar Bar Label Position" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=bar-polar-label-radial
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    title: [
      {
        text: 'Radial Polar Bar Label Position (middle)'
      }
    ],
    polar: {
      radius: [30, '80%']
    },
    radiusAxis: {
      max: 4
    },
    angleAxis: {
      type: 'category',
      data: ['a', 'b', 'c', 'd'],
      startAngle: 75
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
    },
    animation: false
  };
  return option
}

export function EchartsBarPolarLabelRadial() {
  return <EChart setup={setup} />
}
