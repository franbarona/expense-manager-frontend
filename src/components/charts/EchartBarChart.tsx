import { useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartBarChartData } from '../../types/types';

interface Props {
  data: EChartBarChartData[];
}

const EchartBarChart = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = data.length ? Object.keys(data[0]) : [];
  const series = Array.from({ length: data.length ? Object.keys(data[0])?.length - 1 : 0 }, () => ({
    type: 'bar',
    itemStyle: {
      borderRadius: [5, 5, 0, 0], // Bordes redondeados solo en la parte superior
      shadowBlur: 5, // Desenfoque de la sombra
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffsetX: 5, // Desplazamiento de la sombra en el eje X
      shadowOffsetY: 5, // Desplazamiento de la sombra en el eje Y
    },
  }));


  const option = {
    tooltip: {},
    legend: {
      bottom: 0,
      itemWidth: 20,
      itemHeight: 20,
      padding: 20,
      width: 200,
      height: 200
    },
    dataset: {
      dimensions,
      source: data
    },
    color: ['#768FD6', '#E3BBED'], // Colores para las series
    xAxis: { type: 'category' },
    yAxis: {},
    series
  };

  return (
    <div className='w-full h-full mx-0 my-auto' ref={containerRef}>
      <ReactECharts option={option} />
    </div>
  );
};

export default EchartBarChart;
