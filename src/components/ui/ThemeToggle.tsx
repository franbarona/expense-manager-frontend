import { SegmentedControlComponent } from './SegmentedControlComponent';
import { ThemeOptions } from '../../constants/constants';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();

  const handleChangeTheme = (value: string) => {
    if (value === 'dark') {
      localStorage.setItem("theme", 'dark');
      setIsDarkMode(true);
    }
    else {
      localStorage.setItem("theme", 'light');
      setIsDarkMode(false);
    }
  }

  return (
    <SegmentedControlComponent options={ThemeOptions} value={isDarkMode ? 'dark' : 'light'} onChange={handleChangeTheme as (value: string) => void} />
  );
}

export default ThemeToggle;