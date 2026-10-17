import { EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Stage Speed Gauge" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=gauge-stage
const setup: EChartSetup = ({ myChart, setInterval }) => {
  let option!: EChartsOption
  option = {
    series: [
      {
        type: 'gauge',
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#37a2da'],
              [1, '#fd666d']
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: '#fff',
            width: 4
          }
        },
        axisLabel: {
          color: 'inherit',
          distance: 40,
          fontSize: 20
        },
        detail: {
          valueAnimation: true,
          formatter: '{value} km/h',
          color: 'inherit'
        },
        data: [
          {
            value: 70
          }
        ]
      }
    ]
  };

  setInterval(function () {
    myChart.setOption<echarts.EChartsOption>({
      series: [
        {
          data: [
            {
              value: +(Math.random() * 100).toFixed(2)
            }
          ]
        }
      ]
    });
  }, 2000);
  return option
}

export function EchartsGaugeStage() {
  return <EChart setup={setup} />
}
