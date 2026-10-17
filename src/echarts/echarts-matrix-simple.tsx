import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Simple Matrix" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=matrix-simple
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    // @ts-ignore
    matrix: {
      x: {
        data: [
          {
            value: 'A',
            children: [
              'A1',
              'A2',
              {
                value: 'A3',
                children: ['A31', 'A32']
              }
            ]
          }
        ]
      },
      y: {
        data: ['U', 'V']
      },
      top: 150,
      bottom: 150
    },
    visualMap: {
      type: 'continuous',
      min: 0,
      max: 80,
      top: 'middle',
      dimension: 2,
      calculable: true
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'matrix',
      data: [
        ['A1', 'U', 10],
        ['A1', 'V', 20],
        ['A2', 'U', 30],
        ['A2', 'V', 40],
        ['A31', 'U', 50],
        ['A3', 'V', 60]
      ],
      label: {
        show: true
      }
    }
  };
  return option
}

export function EchartsMatrixSimple() {
  return <EChart setup={setup} />
}
