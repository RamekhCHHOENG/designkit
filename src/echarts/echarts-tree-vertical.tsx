import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "From Top to Bottom Tree" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=tree-vertical
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
            top: '8%',
            bottom: '20%',

            symbol: 'emptyCircle',

            orient: 'vertical',

            expandAndCollapse: true,

            label: {
              position: 'top',
              rotate: -90,
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 9
            },

            leaves: {
              label: {
                position: 'bottom',
                rotate: -90,
                verticalAlign: 'middle',
                align: 'left'
              }
            },

            animationDurationUpdate: 750
          }
        ]
      })
    );
  });
  return option
}

export function EchartsTreeVertical() {
  return <EChart setup={setup} />
}
