import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "GraphGL - Large Internet" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=graphgl-large-internet
const setup: EChartSetup = ({ myChart }) => {
  $.getJSON(
    ROOT_PATH + '/data-gl/asset/data/internet.graph.json',
    function (graph: any) {
      var edges = graph.edges.map(function (edge: any) {
        return {
          source: edge[0],
          target: edge[1],
          value: 2
        };
      });
      var categories: any[] = [];
      var categoriesMap: any = {};
      var nodes = graph.nodes.map(function (node: any) {
        if (!categoriesMap[node[3]]) {
          categories.push({
            name: node[3]
          });
          categoriesMap[node[3]] = true;
        }
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          // x: node[0],
          // y: node[1],
          symbolSize: node[2],
          category: node[3],
          value: 1
        };
      });

      myChart.setOption({
        color: [
          'rgb(203,239,15)',
          'rgb(73,15,239)',
          'rgb(239,231,15)',
          'rgb(15,217,239)',
          'rgb(30,15,239)',
          'rgb(15,174,239)',
          'rgb(116,239,15)',
          'rgb(239,15,58)',
          'rgb(15,239,174)',
          'rgb(239,102,15)',
          'rgb(239,15,15)',
          'rgb(15,44,239)',
          'rgb(239,145,15)',
          'rgb(30,239,15)',
          'rgb(239,188,15)',
          'rgb(159,239,15)',
          'rgb(159,15,239)',
          'rgb(15,239,44)',
          'rgb(15,239,87)',
          'rgb(15,239,217)',
          'rgb(203,15,239)',
          'rgb(239,15,188)',
          'rgb(239,15,102)',
          'rgb(239,58,15)',
          'rgb(239,15,145)',
          'rgb(116,15,239)',
          'rgb(15,131,239)',
          'rgb(73,239,15)',
          'rgb(15,239,131)',
          'rgb(15,87,239)',
          'rgb(239,15,231)'
        ],
        series: [
          {
            type: 'graphGL',
            nodes: nodes,
            edges: edges,
            categories: categories.sort(function (a: any, b: any) {
              return a.name - b.name;
            }),
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            },
            itemStyle: {
              opacity: 1
            },
            forceAtlas2: {
              steps: 1,
              stopThreshold: 1,
              jitterTolerence: 10,
              edgeWeight: [0.2, 1],
              gravity: 0,
              edgeWeightInfluence: 1,
              scaling: 0.2
            }
          }
        ]
      });
    }
  );
}

export function EchartsGraphglLargeInternet() {
  return <EChart setup={setup} theme="dark" />
}
