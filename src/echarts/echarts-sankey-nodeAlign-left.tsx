import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Node Align Left in Sankey" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=sankey-nodeAlign-left
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  myChart.showLoading();
  $.get(ROOT_PATH + '/data/asset/data/energy.json', function (data) {
    myChart.hideLoading();

    myChart.setOption(
      (option = {
        title: {
          text: 'Node Align Left'
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'sankey',
            emphasis: {
              focus: 'adjacency'
            },
            nodeAlign: 'left',
            data: data.nodes,
            links: data.links,
            lineStyle: {
              color: 'source',
              curveness: 0.5
            }
          }
        ]
      })
    );
  });
  return option
}

export function EchartsSankeyNodeAlignLeft() {
  return <EChart setup={setup} />
}
