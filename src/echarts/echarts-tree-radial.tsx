import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Radial Tree" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=tree-radial
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  myChart.showLoading();
  $.get(ROOT_PATH + '/data/asset/data/flare.json', function (data) {
    myChart.hideLoading();

    myChart.setOption(
      (option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',

            data: [data],

            top: '18%',
            bottom: '14%',

            layout: 'radial',

            symbol: 'emptyCircle',

            symbolSize: 7,

            initialTreeDepth: 3,

            animationDurationUpdate: 750,

            emphasis: {
              focus: 'descendant'
            }
          }
        ]
      })
    );
  });
  return option
}

export function EchartsTreeRadial() {
  return <EChart setup={setup} />
}
