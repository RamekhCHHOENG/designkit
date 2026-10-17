import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Line Chart in Cartesian Coordinate System" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=line-in-cartesian-coordinate-system
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    xAxis: {},
    yAxis: {},
    series: [
      {
        data: [
          [10, 40],
          [50, 100],
          [40, 20]
        ],
        type: 'line'
      }
    ]
  };
  return option
}

export function EchartsLineInCartesianCoordinateSystem() {
  return <EChart setup={setup} />
}
