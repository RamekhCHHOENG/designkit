import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Graph Life Expectancy" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=graph-life-expectancy
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  $.get(ROOT_PATH + '/data/asset/data/life-expectancy.json', function (rawData) {
    const series: NonNullable<echarts.EChartsOption['series']> = [];

    rawData.counties.forEach(function (country: string) {
      const data = rawData.series.map(function (yearData: (string | number)[][]) {
        const item = yearData.filter(function (item: (string | number)[]) {
          return item[3] === country;
        })[0];
        return {
          label: {
            show: +item[4] % 20 === 0 && +item[4] > 1940,
            position: 'top'
          },
          emphasis: {
            label: {
              show: true
            }
          },
          name: item[4],
          value: item
        };
      });
      var links = data.map(function (item: unknown, idx: number) {
        return {
          source: idx,
          target: idx + 1
        };
      });
      links.pop();

      series.push({
        name: country,
        type: 'graph',
        coordinateSystem: 'cartesian2d',
        data: data,
        links: links,
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: 5,
        legendHoverLink: false,
        lineStyle: {
          color: '#333'
        },
        itemStyle: {
          borderWidth: 1,
          borderColor: '#333'
        },
        label: {
          color: '#333',
          position: 'right'
        },
        symbolSize: 10,
        animationDelay: function (idx) {
          return idx * 100;
        }
      });
    });

    option = {
      visualMap: {
        show: false,
        min: 0,
        max: 100,
        dimension: 1
      },
      legend: {
        data: rawData.counties,
        selectedMode: 'single',
        right: 100
      },
      grid: {
        left: 0,
        bottom: 0,
        containLabel: true,
        top: 80
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'value',
        scale: true
      },
      toolbox: {
        feature: {
          dataZoom: {}
        }
      },
      dataZoom: {
        type: 'inside'
      },
      series: series
    };

    myChart.setOption(option);
  });
  return option
}

export function EchartsGraphLifeExpectancy() {
  return <EChart setup={setup} />
}
