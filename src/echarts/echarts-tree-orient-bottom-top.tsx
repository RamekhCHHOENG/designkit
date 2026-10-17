import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "From Bottom to Top Tree" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=tree-orient-bottom-top
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

            left: '2%',
            right: '2%',
            top: '20%',
            bottom: '8%',

            symbol: 'emptyCircle',

            orient: 'BT',

            expandAndCollapse: true,

            label: {
              position: 'bottom',
              rotate: 90,
              verticalAlign: 'middle',
              align: 'right'
            },

            leaves: {
              label: {
                position: 'top',
                rotate: 90,
                verticalAlign: 'middle',
                align: 'left'
              }
            },

            emphasis: {
              focus: 'descendant'
            },

            animationDurationUpdate: 750
          }
        ]
      })
    );
  });
  return option
}

export function EchartsTreeOrientBottomTop() {
  return <EChart setup={setup} />
}
