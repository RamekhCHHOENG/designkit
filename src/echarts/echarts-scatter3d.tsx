import { $, EChart, type EChartSetup } from "@/components/ui/echart"
import "echarts-gl"

const ROOT_PATH = "https://cdn.jsdelivr.net/gh/apache/echarts-examples@88ca004030e999073a15303e5fe32462b8fefae2/public"

// Adapted from the Apache ECharts example "Scatter3D" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=scatter3d
const setup: EChartSetup = ({ myChart, app }) => {
  var indices: any = {
    name: 0,
    group: 1,
    id: 16
  };
  var schema: any = [
    { name: 'name', index: 0 },
    { name: 'group', index: 1 },
    { name: 'protein', index: 2 },
    { name: 'calcium', index: 3 },
    { name: 'sodium', index: 4 },
    { name: 'fiber', index: 5 },
    { name: 'vitaminc', index: 6 },
    { name: 'potassium', index: 7 },
    { name: 'carbohydrate', index: 8 },
    { name: 'sugars', index: 9 },
    { name: 'fat', index: 10 },
    { name: 'water', index: 11 },
    { name: 'calories', index: 12 },
    { name: 'saturated', index: 13 },
    { name: 'monounsat', index: 14 },
    { name: 'polyunsat', index: 15 },
    { name: 'id', index: 16 }
  ];
  var data: any;

  var fieldIndices = schema.reduce(function (obj: any, item: any) {
    obj[item.name] = item.index;
    return obj;
  }, {});

  var groupCategories: any[] = [];
  var groupColors: any[] = [];
  var data: any;
  var fieldNames = schema.map(function (item: any) {
    return item.name;
  });
  fieldNames = fieldNames.slice(2, fieldNames.length - 2);

  function getMaxOnExtent(data: any) {
    var colorMax = -Infinity;
    var symbolSizeMax = -Infinity;
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var colorVal = item[fieldIndices[config.color]];
      var symbolSizeVal = item[fieldIndices[config.symbolSize]];
      colorMax = Math.max(colorVal, colorMax);
      symbolSizeMax = Math.max(symbolSizeVal, symbolSizeMax);
    }
    return {
      color: colorMax,
      symbolSize: symbolSizeMax
    };
  }

  var config = (app.config = {
    xAxis3D: 'protein',
    yAxis3D: 'fiber',
    zAxis3D: 'sodium',
    color: 'fiber',
    symbolSize: 'vitaminc',

    onChange: function () {
      var max = getMaxOnExtent(data);
      if (data) {
        myChart.setOption({
          visualMap: [
            {
              max: max.color / 2
            },
            {
              max: max.symbolSize / 2
            }
          ],
          xAxis3D: {
            name: config.xAxis3D
          },
          yAxis3D: {
            name: config.yAxis3D
          },
          zAxis3D: {
            name: config.zAxis3D
          },
          series: {
            dimensions: [
              config.xAxis3D,
              config.yAxis3D,
              config.yAxis3D,
              config.color,
              // @ts-ignore
              config.symbolSiz
            ],
            data: data.map(function (item: any, idx: any) {
              return [
                item[fieldIndices[config.xAxis3D]],
                item[fieldIndices[config.yAxis3D]],
                item[fieldIndices[config.zAxis3D]],
                item[fieldIndices[config.color]],
                item[fieldIndices[config.symbolSize]],
                idx
              ];
            })
          }
        });
      }
    }
  });
  app.configParameters = {};
  ['xAxis3D', 'yAxis3D', 'zAxis3D', 'color', 'symbolSize'].forEach(function (
    fieldName: any
  ) {
    app.configParameters[fieldName] = {
      options: fieldNames
    };
  });

  $.getJSON(ROOT_PATH + '/data/asset/data/nutrients.json', function (_data: any) {
    data = _data;

    var max = getMaxOnExtent(data);
    myChart.setOption({
      tooltip: {},
      visualMap: [
        {
          top: 10,
          calculable: true,
          dimension: 3,
          max: max.color / 2,
          inRange: {
            color: [
              '#1710c0',
              '#0b9df0',
              '#00fea8',
              '#00ff0d',
              '#f5f811',
              '#f09a09',
              '#fe0300'
            ]
          },
          textStyle: {
            color: '#fff'
          }
        },
        {
          bottom: 10,
          calculable: true,
          dimension: 4,
          max: max.symbolSize / 2,
          inRange: {
            symbolSize: [10, 40]
          },
          textStyle: {
            color: '#fff'
          }
        }
      ],
      xAxis3D: {
        name: config.xAxis3D,
        type: 'value'
      },
      yAxis3D: {
        name: config.yAxis3D,
        type: 'value'
      },
      zAxis3D: {
        name: config.zAxis3D,
        type: 'value'
      },
      grid3D: {
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisPointer: {
          lineStyle: {
            color: '#ffbd67'
          }
        },
        viewControl: {
          // autoRotate: true
          // projection: 'orthographic'
        }
      },
      series: [
        {
          type: 'scatter3D',
          dimensions: [
            config.xAxis3D,
            config.yAxis3D,
            config.yAxis3D,
            config.color,
            // @ts-ignore
            config.symbolSiz
          ],
          data: data.map(function (item: any, idx: any) {
            return [
              item[fieldIndices[config.xAxis3D]],
              item[fieldIndices[config.yAxis3D]],
              item[fieldIndices[config.zAxis3D]],
              item[fieldIndices[config.color]],
              item[fieldIndices[config.symbolSize]],
              idx
            ];
          }),
          symbolSize: 12,
          // symbol: 'triangle',
          itemStyle: {
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.8)'
          },
          emphasis: {
            itemStyle: {
              color: '#fff'
            }
          }
        }
      ]
    });
  });
}

export function EchartsScatter3d() {
  return <EChart setup={setup} theme="dark" />
}
