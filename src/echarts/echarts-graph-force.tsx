import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Force Layout" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=graph-force
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  interface GraphNode {
    symbolSize: number;
    label?: {
      show?: boolean;
    };
  }
  myChart.showLoading();
  $.get(ROOT_PATH + '/data/asset/data/les-miserables.json', function (graph) {
    myChart.hideLoading();
    graph.nodes.forEach(function (node: GraphNode) {
      node.symbolSize = 5;
    });
    option = {
      title: {
        text: 'Les Miserables',
        subtext: 'Default layout',
        top: 'bottom',
        left: 'right'
      },
      tooltip: {},
      legend: [
        {
          // selectedMode: 'single',
          data: graph.categories.map(function (a: { name: string }) {
            return a.name;
          })
        }
      ],
      series: [
        {
          name: 'Les Miserables',
          type: 'graph',
          layout: 'force',
          data: graph.nodes,
          links: graph.links,
          categories: graph.categories,
          roam: true,
          label: {
            position: 'right'
          },
          force: {
            repulsion: 100
          }
        }
      ]
    };

    myChart.setOption(option);
  });
  return option
}

export function EchartsGraphForce() {
  return <EChart setup={setup} />
}
