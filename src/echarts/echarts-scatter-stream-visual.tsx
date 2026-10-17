import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Visual interaction with stream" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=scatter-stream-visual
const setup: EChartSetup = ({ myChart }) => {
  let option!: EChartsOption
  // Thanks to: 若怀冰
  // http://gallery.echartsjs.com/explore.html?u=bd-16906679
  // http://gallery.echartsjs.com/editor.html?c=xHJw-hVqjW

  $.getJSON(
    ROOT_PATH + '/data/asset/data/house-price-area2.json',
    function (data) {
      var option = {
        title: {
          text: 'Dispersion of house price based on the area',
          left: 'center',
          top: 0
        },
        visualMap: {
          min: 15202,
          max: 159980,
          dimension: 1,
          orient: 'vertical',
          right: 10,
          top: 'center',
          text: ['HIGH', 'LOW'],
          calculable: true,
          inRange: {
            color: ['#f2c31a', '#24b7f2']
          }
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: [
          {
            type: 'value'
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'price-area',
            type: 'scatter',
            symbolSize: 5,
            data: data
          }
        ]
      };

      myChart.setOption(option);
    }
  );
  return option
}

export function EchartsScatterStreamVisual() {
  return <EChart setup={setup} />
}
