import { EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Graph Dynamic" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=graph-force-dynamic
const setup: EChartSetup = ({ myChart, setInterval }) => {
  let option!: EChartsOption
  const data: NonNullable<echarts.GraphSeriesOption['data']> = [
    {
      fixed: true,
      x: myChart.getWidth() / 2,
      y: myChart.getHeight() / 2,
      symbolSize: 20,
      id: '-1'
    }
  ];

  const edges: NonNullable<echarts.GraphSeriesOption['edges']> = [];

  option = {
    series: [
      {
        type: 'graph',
        layout: 'force',
        animation: false,
        data: data,
        force: {
          // initLayout: 'circular'
          // gravity: 0
          repulsion: 100,
          edgeLength: 5
        },
        edges: edges
      }
    ]
  };

  setInterval(function () {
    data.push({
      id: data.length + ''
    });
    var source = Math.round((data.length - 1) * Math.random());
    var target = Math.round((data.length - 1) * Math.random());
    if (source !== target) {
      edges.push({
        source: source,
        target: target
      });
    }
    myChart.setOption({
      series: [
        {
          roam: true,
          data: data,
          edges: edges
        }
      ]
    });

    // console.log('nodes: ' + data.length);
    // console.log('links: ' + data.length);
  }, 200);
  return option
}

export function EchartsGraphForceDynamic() {
  return <EChart setup={setup} />
}
