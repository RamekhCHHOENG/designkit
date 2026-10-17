import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Two Value-Axes in Polar" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=line-polar
const setup: EChartSetup = () => {
  let option!: EChartsOption
  const data: number[][] = [];

  for (let i = 0; i <= 100; i++) {
    let theta = (i / 100) * 360;
    let r = 5 * (1 + Math.sin((theta / 180) * Math.PI));
    data.push([r, theta]);
  }

  option = {
    title: {
      text: 'Two Value-Axes in Polar'
    },
    legend: {
      data: ['line']
    },
    polar: {},
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    angleAxis: {
      type: 'value',
      startAngle: 0
    },
    radiusAxis: {},
    series: [
      {
        coordinateSystem: 'polar',
        name: 'line',
        type: 'line',
        data: data
      }
    ]
  };
  return option
}

export function EchartsLinePolar() {
  return <EChart setup={setup} />
}
