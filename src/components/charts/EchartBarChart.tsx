import { useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartBarChartData } from '../../types/types';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  data: EChartBarChartData[];
}

const EchartBarChart = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [textColor, setTextColor] = useState('#000');
  const { isDarkMode } = useTheme();
  const dimensions = data.length ? Object.keys(data[0]) : [];

  useEffect(() => {
    setTextColor(isDarkMode ? '#fff' : '#000');
  }, [isDarkMode])

  const series = Array.from({ length: data.length ? Object.keys(data[0])?.length - 1 : 0 }, () => ({
    type: 'bar',
    itemStyle: {
      borderRadius: [5, 5, 0, 0], // Rounded borders on top
      shadowBlur: 5, // Blur
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffsetX: 5, // Shadow X
      shadowOffsetY: 5, // Shadow Y
    },
  }));

  const option = {
    grid: {
      left: '45px',
      right: '5px',
    },
    tooltip: {},
    legend: {
      bottom: 0,
      itemWidth: 20,
      itemHeight: 20,
      padding: 20,
      width: 200,
      height: 200,
      textStyle: {
        color: textColor
      },
      formatter: function (name: string) {
        return name.charAt(0).toUpperCase() + name.slice(1); // Capitalizes the legend text
      }
    },
    dataset: {
      dimensions,
      source: data
    },
    color: ['#768FD6', '#E3BBED'], // Theme colors for series
    xAxis: { type: 'category' },
    yAxis: {},
    series
  };

  return (
    <div className='w-full h-full my-auto' ref={containerRef}>
      <ReactECharts option={option} style={{ width: '100%' }} />
    </div>
  );
};

export default EchartBarChart;
