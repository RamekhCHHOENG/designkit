import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Basic Sankey" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=sankey-simple
const setup: EChartSetup = () => {
  let option!: EChartsOption
  option = {
    series: {
      type: 'sankey',
      // @ts-ignore
      layout: 'none',
      emphasis: {
        focus: 'adjacency'
      },
      data: [
        {
          name: 'a'
        },
        {
          name: 'b'
        },
        {
          name: 'a1'
        },
        {
          name: 'a2'
        },
        {
          name: 'b1'
        },
        {
          name: 'c'
        }
      ],
      links: [
        {
          source: 'a',
          target: 'a1',
          value: 5
        },
        {
          source: 'a',
          target: 'a2',
          value: 3
        },
        {
          source: 'b',
          target: 'b1',
          value: 8
        },
        {
          source: 'a',
          target: 'b1',
          value: 3
        },
        {
          source: 'b1',
          target: 'a1',
          value: 1
        },
        {
          source: 'b1',
          target: 'c',
          value: 2
        }
      ]
    }
  };
  return option
}

export function EchartsSankeySimple() {
  return <EChart setup={setup} />
}
