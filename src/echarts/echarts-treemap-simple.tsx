import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Basic Treemap" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=treemap-simple
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    series: [
      {
        type: 'treemap',
        data: [
          {
            name: 'nodeA', // First tree
            value: 10,
            children: [
              {
                name: 'nodeAa', // First leaf of first tree
                value: 4
              },
              {
                name: 'nodeAb', // Second leaf of first tree
                value: 6
              }
            ]
          },
          {
            name: 'nodeB', // Second tree
            value: 20,
            children: [
              {
                name: 'nodeBa', // Son of first tree
                value: 20,
                children: [
                  {
                    name: 'nodeBa1', // Granson of first tree
                    value: 20
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
  return option
}

export function EchartsTreemapSimple() {
  return <EChart setup={setup} />
}
