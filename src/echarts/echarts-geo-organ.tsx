import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import * as echarts from "echarts"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Organ Data with SVG" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=geo-organ
const setup: EChartSetup = ({ myChart }) => {
  let option: any
  $.get(
    ROOT_PATH + '/data/asset/geo/Veins_Medical_Diagram_clip_art.svg',
    function (svg: any) {
      echarts.registerMap('organ_diagram', { svg: svg });

      option = {
        tooltip: {},
        geo: {
          left: 10,
          right: '50%',
          map: 'organ_diagram',
          selectedMode: 'multiple',
          emphasis: {
            focus: 'self',
            itemStyle: {
              color: null
            },
            label: {
              position: 'bottom',
              distance: 0,
              textBorderColor: '#fff',
              textBorderWidth: 2
            }
          },
          blur: {},
          select: {
            itemStyle: {
              color: '#b50205'
            },
            label: {
              show: false,
              textBorderColor: '#fff',
              textBorderWidth: 2
            }
          }
        },
        grid: {
          left: '60%',
          top: '20%',
          bottom: '20%'
        },
        xAxis: {},
        yAxis: {
          data: [
            'heart',
            'large-intestine',
            'small-intestine',
            'spleen',
            'kidney',
            'lung',
            'liver'
          ]
        },
        series: [
          {
            type: 'bar',
            emphasis: {
              focus: 'self'
            },
            data: [121, 321, 141, 52, 198, 289, 139]
          }
        ]
      };

      myChart.setOption(option);

      myChart.on('mouseover', { seriesIndex: 0 }, function (event: any) {
        myChart.dispatchAction({
          type: 'highlight',
          geoIndex: 0,
          name: event.name
        });
      });
      myChart.on('mouseout', { seriesIndex: 0 }, function (event: any) {
        myChart.dispatchAction({
          type: 'downplay',
          geoIndex: 0,
          name: event.name
        });
      });
    }
  );
  return option
}

export function EchartsGeoOrgan() {
  return <EChart setup={setup} />
}
