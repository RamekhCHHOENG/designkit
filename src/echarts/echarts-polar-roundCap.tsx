import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Rounded Bar on Polar" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=polar-roundCap
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    angleAxis: {
      max: 2,
      startAngle: 30,
      splitLine: {
        show: false
      }
    },
    radiusAxis: {
      type: 'category',
      data: ['v', 'w', 'x', 'y', 'z'],
      z: 10
    },
    polar: {},
    series: [
      {
        type: 'bar',
        data: [4, 3, 2, 1, 0],
        coordinateSystem: 'polar',
        name: 'Without Round Cap',
        itemStyle: {
          borderColor: 'red',
          opacity: 0.8,
          borderWidth: 1
        }
      },
      {
        type: 'bar',
        data: [4, 3, 2, 1, 0],
        coordinateSystem: 'polar',
        name: 'With Round Cap',
        roundCap: true,
        itemStyle: {
          borderColor: 'green',
          opacity: 0.8,
          borderWidth: 1
        }
      }
    ],
    legend: {
      show: true,
      data: ['Without Round Cap', 'With Round Cap']
    }
  };
  return option
}

export function EchartsPolarRoundCap() {
  return <EChart setup={setup} />
}
