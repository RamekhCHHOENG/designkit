import { EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Line with Marklines" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=line-markline
const setup: EChartSetup = () => {
  let option!: EChartsOption
  const markLine: echarts.MarkLineComponentOption['data'] = [];
  const positions = [
    'start',
    'middle',
    'end',
    'insideStart',
    'insideStartTop',
    'insideStartBottom',
    'insideMiddle',
    'insideMiddleTop',
    'insideMiddleBottom',
    'insideEnd',
    'insideEndTop',
    'insideEndBottom'
  ] as const;
  for (var i = 0; i < positions.length; ++i) {
    markLine.push({
      name: positions[i],
      yAxis: 1.8 - 0.2 * Math.floor(i / 3),
      label: {
        formatter: '{b}',
        position: positions[i]
      }
    });

    if (positions[i] !== 'middle') {
      const name =
        positions[i] === 'insideMiddle' ? 'insideMiddle / middle' : positions[i];

      markLine.push([
        {
          name: 'start: ' + positions[i],
          coord: [0, 0.3],
          label: {
            formatter: name,
            position: positions[i]
          }
        },
        {
          name: 'end: ' + positions[i],
          coord: [3, 1]
        }
      ]);
    }
  }

  option = {
    animation: false,
    textStyle: {
      fontSize: 14
    },
    xAxis: {
      data: ['A', 'B', 'C', 'D', 'E'],
      boundaryGap: true,
      splitArea: {
        show: true
      }
    },
    yAxis: {
      max: 2
    },
    series: [
      {
        name: 'line',
        type: 'line',
        stack: 'all',
        symbolSize: 6,
        data: [0.3, 1.4, 1.2, 1, 0.6],
        markLine: {
          data: markLine,
          label: {
            distance: [20, 8]
          }
        }
      }
    ],
    grid: {
      top: 30,
      left: 60,
      right: 60,
      bottom: 40
    }
  };
  return option
}

export function EchartsLineMarkline() {
  return <EChart setup={setup} />
}
