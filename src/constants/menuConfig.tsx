import { BiBarChartAlt2 } from 'react-icons/bi';
import { GrList } from 'react-icons/gr';
import { LuArrowDownUp } from 'react-icons/lu';
import { PiSquaresFourFill } from 'react-icons/pi';

const menuConfig = [
  {
    label: 'Dashboard',
    to: '/',
    icon: <PiSquaresFourFill />
  },
  {
    label: 'Transactions',
    to: '/transactions',
    icon: <LuArrowDownUp />,
  },
  {
    label: 'Categories',
    to: '/categories',
    icon: <GrList />,
  },
  // {
  //   label: 'Analytics',
  //   to: '/statistics',
  //   icon: <BiBarChartAlt2 />,
  // },
];

export default menuConfig;