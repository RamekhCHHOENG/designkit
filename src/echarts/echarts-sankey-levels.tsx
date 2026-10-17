import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Sankey with Levels Setting" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=sankey-levels
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  myChart.showLoading();
  $.get(ROOT_PATH + '/data/asset/data/product.json', function (data) {
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
            levels: [
              {
                depth: 0,
                itemStyle: {
                  color: '#fbb4ae'
                },
                lineStyle: {
                  color: 'source',
                  opacity: 0.6
                }
              },
              {
                depth: 1,
                itemStyle: {
                  color: '#b3cde3'
                },
                lineStyle: {
                  color: 'source',
                  opacity: 0.6
                }
              },
              {
                depth: 2,
                itemStyle: {
                  color: '#ccebc5'
                },
                lineStyle: {
                  color: 'source',
                  opacity: 0.6
                }
              },
              {
                depth: 3,
                itemStyle: {
                  color: '#decbe4'
                },
                lineStyle: {
                  color: 'source',
                  opacity: 0.6
                }
              }
            ],
            lineStyle: {
              curveness: 0.5
            }
          }
        ]
      })
    );
  });
  return option
}

export function EchartsSankeyLevels() {
  return <EChart setup={setup} />
}
