import ReactECharts from 'echarts-for-react';
interface PieChartProps {
  data: { name: string; value: number; color: string }[];
}

export default function PieChart({ data }: PieChartProps) {
  const filteredData = data
    .map(item => ({ ...item, itemStyle: { color: item.color } }))
    .filter(item => item.value > 0);

  const option = {
    title: {
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '20',
      show: true,
      itemGap: 20,
      textStyle: {
        color: '#fff',
      },
    },
    series: [
      {
        type: 'pie',
        radius: '70%',
        center: ['50%', '42%'],
        label: {
          show: true,
          position: 'inner',
          formatter: '{c}',
          color: '#fff',
          fontSize: 15,
        },
        data: filteredData,
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: 300, width: '100%' }} />
  );
}
