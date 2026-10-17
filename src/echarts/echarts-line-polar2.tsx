import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Two Value-Axes in Polar" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=line-polar2
const setup: EChartSetup = () => {
  let option!: EChartsOption
  const data: number[][] = [];

  for (let i = 0; i <= 360; i++) {
    let t = (i / 180) * Math.PI;
    let r = Math.sin(2 * t) * Math.cos(2 * t);
    data.push([r, i]);
  }

  option = {
    title: {
      text: 'Two Value-Axes in Polar'
    },
    legend: {
      data: ['line']
    },
    polar: {
      center: ['50%', '54%']
    },
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
    radiusAxis: {
      min: 0
    },
    series: [
      {
        coordinateSystem: 'polar',
        name: 'line',
        type: 'line',
        showSymbol: false,
        data: data
      }
    ],
    animationDuration: 2000
  };
  return option
}

export function EchartsLinePolar2() {
  return <EChart setup={setup} />
}
