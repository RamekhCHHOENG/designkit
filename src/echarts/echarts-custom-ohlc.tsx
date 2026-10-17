import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "OHLC Chart" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=custom-ohlc
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  function splitData(rawData: number[][]) {
    const categoryData = [];
    const values = [];
    for (var i = 0; i < rawData.length; i++) {
      categoryData.push(rawData[i][0]);
      rawData[i][0] = i;
      values.push(rawData[i]);
    }
    return {
      categoryData: categoryData,
      values: values
    };
  }

  function renderItem(
    params: echarts.CustomSeriesRenderItemParams,
    api: echarts.CustomSeriesRenderItemAPI
  ): echarts.CustomSeriesRenderItemReturn {
    var xValue = api.value(0);
    var openPoint = api.coord([xValue, api.value(1)]);
    var closePoint = api.coord([xValue, api.value(2)]);
    var lowPoint = api.coord([xValue, api.value(3)]);
    var highPoint = api.coord([xValue, api.value(4)]);
    var halfWidth = (api.size!([1, 0]) as number[])[0] * 0.35;
    var style = api.style({
      stroke: api.visual('color')
    });

    return {
      type: 'group',
      children: [
        {
          type: 'line',
          shape: {
            x1: lowPoint[0],
            y1: lowPoint[1],
            x2: highPoint[0],
            y2: highPoint[1]
          },
          style: style
        },
        {
          type: 'line',
          shape: {
            x1: openPoint[0],
            y1: openPoint[1],
            x2: openPoint[0] - halfWidth,
            y2: openPoint[1]
          },
          style: style
        },
        {
          type: 'line',
          shape: {
            x1: closePoint[0],
            y1: closePoint[1],
            x2: closePoint[0] + halfWidth,
            y2: closePoint[1]
          },
          style: style
        }
      ]
    };
  }

  $.get(ROOT_PATH + '/data/asset/data/stock-DJI.json', function (rawData) {
    var data = splitData(rawData);

    myChart.setOption(
      (option = {
        animation: false,
        legend: {
          bottom: 10,
          left: 'center',
          data: ['Dow-Jones index']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          position: function (pos, params, el, elRect, size) {
            var obj: Record<string, number> = { top: 10 };
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
          }
        },
        axisPointer: {
          link: [{ xAxisIndex: 'all' }]
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: false
            },
            brush: {
              type: ['lineX', 'clear']
            }
          }
        },
        grid: [
          {
            left: '10%',
            right: '8%',
            bottom: 150
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: data.categoryData,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
              z: 100
            }
          }
        ],
        yAxis: [
          {
            scale: true,
            splitArea: {
              show: true
            }
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            start: 98,
            end: 100,
            minValueSpan: 10
          },
          {
            show: true,
            type: 'slider',
            bottom: 60,
            start: 98,
            end: 100,
            minValueSpan: 10
          }
        ],
        series: [
          {
            name: 'Dow-Jones index',
            type: 'custom',
            renderItem: renderItem,
            dimensions: ['-', 'open', 'close', 'lowest', 'highest'],
            encode: {
              x: 0,
              y: [1, 2, 3, 4],
              tooltip: [1, 2, 3, 4]
            },
            data: data.values
          }
        ]
      }),
      true
    );
  });
  return option
}

export function EchartsCustomOhlc() {
  return <EChart setup={setup} />
}
