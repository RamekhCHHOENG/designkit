import { EChart, type EChartSetup } from "@/components/ui/echart"
import type { EChartsOption } from "echarts"

// Adapted from the Apache ECharts example "Monochrome Sunburst" (Apache-2.0):
// https://echarts.apache.org/examples/en/editor.html?c=sunburst-monochrome
const setup: EChartSetup = () => {
  let option!: EChartsOption
  const item1 = {
    color: '#F54F4A'
  };
  const item2 = {
    color: '#FF8C75'
  };
  const item3 = {
    color: '#FFB499'
  };

  const data = [
    {
      children: [
        {
          value: 5,
          children: [
            {
              value: 1,
              itemStyle: item1
            },
            {
              value: 2,
              children: [
                {
                  value: 1,
                  itemStyle: item2
                }
              ]
            },
            {
              children: [
                {
                  value: 1
                }
              ]
            }
          ],
          itemStyle: item1
        },
        {
          value: 10,
          children: [
            {
              value: 6,
              children: [
                {
                  value: 1,
                  itemStyle: item1
                },
                {
                  value: 1
                },
                {
                  value: 1,
                  itemStyle: item2
                },
                {
                  value: 1
                }
              ],
              itemStyle: item3
            },
            {
              value: 2,
              children: [
                {
                  value: 1
                }
              ],
              itemStyle: item3
            },
            {
              children: [
                {
                  value: 1,
                  itemStyle: item2
                }
              ]
            }
          ],
          itemStyle: item1
        }
      ],
      itemStyle: item1
    },
    {
      value: 9,
      children: [
        {
          value: 4,
          children: [
            {
              value: 2,
              itemStyle: item2
            },
            {
              children: [
                {
                  value: 1,
                  itemStyle: item1
                }
              ]
            }
          ],
          itemStyle: item1
        },
        {
          children: [
            {
              value: 3,
              children: [
                {
                  value: 1
                },
                {
                  value: 1,
                  itemStyle: item2
                }
              ]
            }
          ],
          itemStyle: item3
        }
      ],
      itemStyle: item2
    },
    {
      value: 7,
      children: [
        {
          children: [
            {
              value: 1,
              itemStyle: item3
            },
            {
              value: 3,
              children: [
                {
                  value: 1,
                  itemStyle: item2
                },
                {
                  value: 1
                }
              ],
              itemStyle: item2
            },
            {
              value: 2,
              children: [
                {
                  value: 1
                },
                {
                  value: 1,
                  itemStyle: item1
                }
              ],
              itemStyle: item1
            }
          ],
          itemStyle: item3
        }
      ],
      itemStyle: item1
    },
    {
      children: [
        {
          value: 6,
          children: [
            {
              value: 1,
              itemStyle: item2
            },
            {
              value: 2,
              children: [
                {
                  value: 2,
                  itemStyle: item2
                }
              ],
              itemStyle: item1
            },
            {
              value: 1,
              itemStyle: item3
            }
          ],
          itemStyle: item3
        },
        {
          value: 3,
          children: [
            {
              value: 1
            },
            {
              children: [
                {
                  value: 1,
                  itemStyle: item2
                }
              ]
            },
            {
              value: 1
            }
          ],
          itemStyle: item3
        }
      ],
      itemStyle: item1
    }
  ];

  option = {
    series: {
      radius: ['15%', '80%'],
      type: 'sunburst',
      sort: undefined,
      emphasis: {
        focus: 'ancestor'
      },
      data: data,
      label: {
        rotate: 'radial'
      },
      levels: [],
      itemStyle: {
        color: '#ddd',
        borderWidth: 2
      }
    }
  };
  return option
}

export function EchartsSunburstMonochrome() {
  return <EChart setup={setup} />
}
