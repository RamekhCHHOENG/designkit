import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Gradient Edge" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=sankey-energy
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  myChart.showLoading();
  $.get(ROOT_PATH + '/data/asset/data/energy.json', function (data) {
    myChart.hideLoading();

    myChart.setOption(
      (option = {
        title: {
          text: 'Sankey Diagram'
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'sankey',
            data: data.nodes,
            links: data.links,
            emphasis: {
              focus: 'adjacency'
            },
            lineStyle: {
              color: 'gradient',
              curveness: 0.5
            }
          }
        ]
      })
    );
  });
  return option
}

export function EchartsSankeyEnergy() {
  return <EChart setup={setup} />
}
