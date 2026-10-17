import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "From Right to Left Tree" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=tree-orient-right-left
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  myChart.showLoading();
  $.get(ROOT_PATH + '/data/asset/data/flare.json', function (data) {
    myChart.hideLoading();

    data.children.forEach(function (
      datum: { collapsed: boolean },
      index: number
    ) {
      index % 2 === 0 && (datum.collapsed = true);
    });

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

            top: '1%',
            left: '15%',
            bottom: '1%',
            right: '7%',

            symbolSize: 7,

            orient: 'RL',

            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            },

            leaves: {
              label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right'
              }
            },

            emphasis: {
              focus: 'descendant'
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      })
    );
  });
  return option
}

export function EchartsTreeOrientRightLeft() {
  return <EChart setup={setup} />
}
