import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Confusion Matrix" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=matrix-confusion
const setup: EChartSetup = () => {
  let option!: EChartsOption
  const label = {
    fontSize: 16,
    color: '#555'
  };
  option = {
    matrix: {
      x: {
        data: ['Positive', 'Negative'],
        label
      },
      y: {
        data: ['Positive', 'Negative'],
        label
      },
      top: 80,
      width: 600,
      left: 'center'
    },
    series: {
      type: 'custom',
      coordinateSystem: 'matrix',
      data: [
        ['Positive', 'Positive', 10],
        ['Positive', 'Negative', 2],
        ['Negative', 'Positive', 3],
        ['Negative', 'Negative', 5]
      ],
      label: {
        show: true,
        // @ts-ignore
        formatter: (params) => {
          const value = params.value[2];
          return (
            '{name|' +
            (params.value[0] === params.value[1] ? 'True ' : 'False ') +
            params.value[1] +
            '}\n{value|' +
            value +
            '}'
          );
        },
        rich: {
          name: {
            color: '#fff',
            backgroundColor: '#999',
            textBorderColor: '#333',
            padding: 5,
            fontSize: 18
          },
          value: {
            color: '#444',
            textBorderWidth: 0,
            padding: 5,
            fontSize: 16,
            align: 'center'
          }
        }
      },
      renderItem: function (params, api) {
        const x = api.value(0);
        const y = api.value(1);
        // @ts-ignore
        const rect = api.layout([x, y]).rect;
        return {
          type: 'rect',
          shape: {
            // @ts-ignore
            x: rect.x,
            // @ts-ignore
            y: rect.y,
            // @ts-ignore
            width: rect.width,
            // @ts-ignore
            height: rect.height,
          },
          style: api.style({
            fill: x === y ? '#8f8' : '#f88'
          })
        };
      }
    },
    graphic: {
      elements: [
        {
          type: 'text',
          style: {
            text: 'True Class',
            fill: '#333',
            font: 'bold 24px serif',
            // @ts-ignore
            textAlign: 'center'
          },
          x: (window.innerWidth - 600) / 2 + (600 / 6) * 4,
          y: 40
        },
        {
          type: 'text',
          style: {
            text: 'Predicted Class',
            fill: '#333',
            font: 'bold 24px serif',
            textAlign: 'center'
          },
          x: (window.innerWidth - 600) / 2 - 50,
          y: 270,
          rotation: Math.PI / 2
        }
      ]
    }
  };
  return option
}

export function EchartsMatrixConfusion() {
  return <EChart setup={setup} />
}
