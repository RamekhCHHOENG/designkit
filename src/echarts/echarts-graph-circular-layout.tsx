import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Les Miserables" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=graph-circular-layout
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  interface GraphNode {
    symbolSize: number;
    label?: {
      show?: boolean;
    };
  }

  myChart.showLoading();
  $.getJSON(ROOT_PATH + '/data/asset/data/les-miserables.json', function (graph) {
    myChart.hideLoading();

    graph.nodes.forEach(function (node: GraphNode) {
      node.label = {
        show: node.symbolSize > 30
      };
    });

    option = {
      title: {
        text: 'Les Miserables',
        subtext: 'Circular layout',
        top: 'bottom',
        left: 'right'
      },
      tooltip: {},
      legend: [
        {
          data: graph.categories.map(function (a: { name: string }) {
            return a.name;
          })
        }
      ],
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          name: 'Les Miserables',
          type: 'graph',
          layout: 'circular',
          circular: {
            rotateLabel: true
          },
          data: graph.nodes,
          links: graph.links,
          categories: graph.categories,
          roam: true,
          label: {
            position: 'right',
            formatter: '{b}'
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          }
        }
      ]
    };

    myChart.setOption(option);
  });
  return option
}

export function EchartsGraphCircularLayout() {
  return <EChart setup={setup} />
}
