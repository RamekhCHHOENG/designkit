import { $, registerBuiltinMap, EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "微博签到数据点亮中国" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=scattergl-weibo
const setup: EChartSetup = async ({ myChart }) => {
  let option: any
  await registerBuiltinMap("china")
  $.getJSON(ROOT_PATH + '/data/asset/data/weibo.json', function (weiboData: any) {
    weiboData = weiboData.map(function (serieData: any, idx: any) {
      var px = serieData[0] / 1000;
      var py = serieData[1] / 1000;
      var res: any = [[px, py]];

      for (var i = 2; i < serieData.length; i += 2) {
        var dx = serieData[i] / 1000;
        var dy = serieData[i + 1] / 1000;
        var x = px + dx;
        var y = py + dy;
        res.push([x.toFixed(2), y.toFixed(2), 1]);

        px = x;
        py = y;
      }
      return res;
    });
    myChart.setOption(
      (option = {
        title: {
          text: '微博签到数据点亮中国',
          subtext: 'From ThinkGIS',
          sublink: 'http://www.thinkgis.cn/public/sina',
          left: 'center',
          top: 'top',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {},
        legend: {
          left: 'left',
          data: ['强', '中', '弱'],
          textStyle: {
            color: '#ccc'
          }
        },
        geo: {
          map: 'china',
          roam: true,
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [
          {
            name: '弱',
            type: 'scatterGL',
            coordinateSystem: 'geo',
            symbolSize: 1,
            itemStyle: {
              shadowBlur: 2,
              shadowColor: 'rgba(37, 140, 249, 0.8)',
              color: 'rgba(37, 140, 249, 0.8)'
            },
            data: weiboData[0]
          },
          {
            name: '中',
            type: 'scatterGL',
            coordinateSystem: 'geo',
            symbolSize: 1,
            itemStyle: {
              shadowBlur: 2,
              shadowColor: 'rgba(14, 241, 242, 0.8)',
              color: 'rgba(14, 241, 242, 0.8)'
            },
            data: weiboData[1]
          },
          {
            name: '强',
            type: 'scatterGL',
            coordinateSystem: 'geo',
            symbolSize: 1,
            itemStyle: {
              shadowBlur: 2,
              shadowColor: 'rgba(255, 255, 255, 0.8)',
              color: 'rgba(255, 255, 255, 0.8)'
            },
            data: weiboData[2]
          }
        ]
      })
    );
  });
  return option
}

export function EchartsScatterglWeibo() {
  return <EChart setup={setup} theme="dark" />
}
