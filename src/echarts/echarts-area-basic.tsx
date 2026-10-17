import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Basic area chart" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=area-basic
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
      }
    ]
  };
  return option
}

export function EchartsAreaBasic() {
  return <EChart setup={setup} />
}
