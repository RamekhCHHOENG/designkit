import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Graph Webkit Dep" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=graph-webkit-dep
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  myChart.showLoading();

  myChart.showLoading();
  $.get(ROOT_PATH + '/data/asset/data/webkit-dep.json', function (webkitDep) {
    myChart.hideLoading();

    option = {
      legend: {
        data: ['HTMLElement', 'WebGL', 'SVG', 'CSS', 'Other']
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          animation: false,
          roam: true,
          roamTrigger: 'global',
          scaleLimit: {
            max: 8,
            min: 0.5
          },
          label: {
            position: 'right',
            formatter: '{b}'
          },
          draggable: true,
          data: webkitDep.nodes.map(function (node: any, idx: number) {
            node.id = idx;
            return node;
          }),
          categories: webkitDep.categories,
          force: {
            edgeLength: 5,
            repulsion: 20,
            gravity: 0.2
          },
          edges: webkitDep.links
        }
      ],
      thumbnail: {
        width: '15%',
        height: '15%',
        windowStyle: {
          color: 'rgba(140, 212, 250, 0.5)',
          borderColor: 'rgba(30, 64, 175, 0.7)',
          opacity: 1,
        }
      }
    };

    myChart.setOption(option);
  });
  return option
}

export function EchartsGraphWebkitDep() {
  return <EChart setup={setup} />
}
