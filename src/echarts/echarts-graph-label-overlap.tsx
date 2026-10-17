import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Hide Overlapped Label" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=graph-label-overlap
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  myChart.showLoading();
  $.getJSON(ROOT_PATH + '/data/asset/data/les-miserables.json', function (graph) {
    myChart.hideLoading();

    option = {
      tooltip: {},
      legend: [
        {
          data: graph.categories.map(function (a: { name: string }) {
            return a.name;
          })
        }
      ],
      series: [
        {
          name: 'Les Miserables',
          type: 'graph',
          layout: 'none',
          data: graph.nodes,
          links: graph.links,
          categories: graph.categories,
          roam: true,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}'
          },
          labelLayout: {
            hideOverlap: true
          },
          scaleLimit: {
            min: 0.4,
            max: 2
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

export function EchartsGraphLabelOverlap() {
  return <EChart setup={setup} />
}
