import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Pie Charts in Matrix" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=matrix-pie
const setup: EChartSetup = () => {
  let option!: EChartsOption
  const xCnt = 9;
  const yCnt = 6;
  const series = [];
  for (let i = 0; i < xCnt; ++i) {
    for (let j = 0; j < yCnt; ++j) {
      series.push({
        type: 'pie',
        coordinateSystem: 'matrix',
        center: [`Grade ${i + 1}`, `Class ${j + 1}`],
        radius: 18,
        data: [
          {
            value: Math.round(Math.random() * 10) + 10,
            name: 'Male'
          },
          {
            value: Math.round(Math.random() * 10) + 10,
            name: 'Female'
          }
        ],
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: false
          }
        }
      });
    }
  }

  option = {
    legend: {
      show: true,
      bottom: 40
    },
    // @ts-ignore
    matrix: {
      x: {
        data: [
          {
            value: 'Primary School',
            children: Array.from({ length: 5 }, (_, i) => {
              return `Grade ${i + 1}`;
            })
          },
          {
            value: 'High School',
            children: Array.from({ length: 4 }, (_, i) => {
              return `Grade ${i + 6}`;
            })
          }
        ]
      },
      y: {
        data: Array.from({ length: 6 }, (_, i) => {
          return `Class ${i + 1}`;
        })
      },
      top: 80,
      bottom: 80
    },
    // @ts-ignore
    series,
    tooltip: {
      show: true
    }
  };
  return option
}

export function EchartsMatrixPie() {
  return <EChart setup={setup} />
}
