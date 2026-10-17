import { EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Custom Cartesian Polygon" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=custom-cartesian-polygon
const setup: EChartSetup = () => {
  let option!: EChartsOption
  const data: number[][] = [];
  const dataCount = 7;
  for (let i = 0; i < dataCount; i++) {
    data.push([
      echarts.number.round(Math.random() * 100),
      echarts.number.round(Math.random() * 400)
    ]);
  }

  option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['bar', 'error']
    },
    dataZoom: [
      {
        type: 'slider',
        filterMode: 'none'
      },
      {
        type: 'inside',
        filterMode: 'none'
      }
    ],
    xAxis: {},
    yAxis: {},
    series: [
      {
        type: 'custom',
        renderItem: function (params, api) {
          if (params.context.rendered) {
            return;
          }
          params.context.rendered = true;

          let points: number[][] = [];
          for (let i = 0; i < data.length; i++) {
            points.push(api.coord(data[i]));
          }
          let color = api.visual('color') as string;

          return {
            type: 'polygon',
            transition: ['shape'],
            shape: {
              points: points
            },
            style: api.style({
              fill: color,
              stroke: echarts.color.lift(color, 0.1)
            })
          };
        },
        clip: true,
        data: data
      }
    ]
  };
  return option
}

export function EchartsCustomCartesianPolygon() {
  return <EChart setup={setup} />
}
