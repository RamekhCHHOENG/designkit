import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "NPM Dependencies" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=graph-npm
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  interface RawNode {
    x: number;
    y: number;
    id: string;
    label: string;
    size: number;
    color: string;
  }

  interface RawEdge {
    sourceID: string;
    targetID: string;
  }

  myChart.showLoading();
  $.getJSON(
    ROOT_PATH + '/data/asset/data/npmdepgraph.min10.json',
    function (json) {
      myChart.hideLoading();
      myChart.setOption(
        (option = {
          title: {
            text: 'NPM Dependencies'
          },
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              type: 'graph',
              layout: 'none',
              // progressiveThreshold: 700,
              data: json.nodes.map(function (node: RawNode) {
                return {
                  x: node.x,
                  y: node.y,
                  id: node.id,
                  name: node.label,
                  symbolSize: node.size,
                  itemStyle: {
                    color: node.color
                  }
                };
              }),
              edges: json.edges.map(function (edge: RawEdge) {
                return {
                  source: edge.sourceID,
                  target: edge.targetID
                };
              }),
              emphasis: {
                focus: 'adjacency',
                label: {
                  position: 'right',
                  show: true
                }
              },
              roam: true,
              roamTrigger: 'global',
              lineStyle: {
                width: 0.5,
                curveness: 0.3,
                opacity: 0.7
              }
            }
          ],
          thumbnail: {
            width: '20%',
            height: '20%',
            windowStyle: {
              color: 'rgba(140, 212, 250, 0.5)',
              borderColor: 'rgba(30, 64, 175, 0.7)',
              opacity: 1,
            }
          }
        }),
        true
      );
    }
  );
  return option
}

export function EchartsGraphNpm() {
  return <EChart setup={setup} />
}
