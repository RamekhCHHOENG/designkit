import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Set Style of Single Bar." (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=bar-data-color
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [
          120,
          {
            value: 200,
            itemStyle: {
              color: '#505372'
            }
          },
          150,
          80,
          70,
          110,
          130
        ],
        type: 'bar'
      }
    ]
  };
  return option
}

export function EchartsBarDataColor() {
  return <EChart setup={setup} />
}
