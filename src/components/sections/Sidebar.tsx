import { NavLink } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import menuConfig from "../../constants/menuConfig"; // ajusta la ruta si es necesario
import { TbLogout2 } from "react-icons/tb";
import { SIZES } from "../../constants/constants";
import { useWindowSize } from "../../context/WindowSizeContext";
import ThemeToggle from "../ui/ThemeToggle";

interface Props {
  isExpanded: boolean;
  toggleSidebar?: () => void;
  extraFuncOnClick?: () => void;
}

const SidebarHeader = ({ isExpanded }: Props) => {
  return (
    <div className={`flex justify-start items-center p-2 font-bold font-outfit ${isExpanded ? "text-2xl" : "text-xl"}`}>
      <img src="/MonetixLogo.svg" alt="" className="dark:hidden" />
      <img src="/MonetixLogo_dark.svg" alt="" className="hidden dark:block" />
      {isExpanded && <h1 className="dark:text-white">MONETIX</h1>}
    </div>
  )
}

const SidebarBottom = ({ isExpanded }: Props) => {
  return (
    <div className="space-y-2">
      <div className={`flex items-center p-2 rounded justify-start text-gray-600 dark:text-gray-50 opacity-50 cursor-default ${isExpanded ? "px-4 gap-3 rounded-xl" : "px-2"}`}>
        <div className="w-6 flex justify-center items-center">
          <TbLogout2 />
        </div>

        <div className={`overflow-hidden transition-transform duration-300 easy-in-out ${isExpanded ? "w-auto ml-2" : "w-0 ml-0"}`}>
          <span className={`block whitespace-nowrap transition-opacity duration-300 easy-in-out delay-300 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
            Logout
          </span>
        </div>
      </div>
      <div className={`flex justify-center ${isExpanded ? 'block' : 'hidden'}`}>
        <ThemeToggle />
      </div>
    </div>
  )
}

const Sidebar = ({ isExpanded, toggleSidebar, extraFuncOnClick }: Props) => {
  const sidebarWidth = isExpanded ? "w-64" : "w-14";
  const navPadding = isExpanded ? "px-4" : "px-2 text-lg";
  const toggleButtonPosition = isExpanded ? "left-60" : "left-10";
  const arrowRotation = isExpanded ? "" : "rotate-180";
  const { width } = useWindowSize();

  return (
    <aside
      className={`h-screen bg-white dark:bg-black flex flex-col shadow-lg dark:border-r-1 dark:border-gray-700 transition-transform duration-300 easy-in-out ${sidebarWidth}`}
    >
      <nav
        className={`flex-1 flex flex-col py-4 space-y-2 ${navPadding}`}
      >
        <div className="border-b border-gray-300 dark:border-gray-700 pb-2 mb-5">
          <SidebarHeader isExpanded={isExpanded} />
        </div>
        {menuConfig.map(({ to, label, icon }) => {
          return (
            <NavLink
              key={to}
              to={to}
              onClick={
                // Tamaño ipad
                width < SIZES.LG && width >= SIZES.MD && isExpanded
                  ? toggleSidebar
                  // Tamaño mobil / normal
                  : extraFuncOnClick}
              className={({ isActive }) =>
                `flex items-center p-2 rounded justify-start dark:text-gray-50
              ${isExpanded ? "px-4 rounded-xl" : "px-2"}
              ${isActive ? "text-white font-normal bg-accent dark:border-1 dark:border-sky-700" : "text-gray-600 hover:bg-indigo-600/10 dark:hover:bg-neutral-700/50"}
              `}
            >
              {/* Icon container with fixed width */}
              <div className={`w-6 flex justify-center items-center ${isExpanded ? "text-xl" : "text-xl"}`}>
                {icon}
              </div>

              {/* Label with animated width and opacity */}
              <div
                className={
                  `overflow-hidden transition-transform duration-300 easy-in-out
                  ${isExpanded ? "w-auto ml-2" : "w-0 ml-0"}
                  `}
              >
                <span
                  className={
                    `block whitespace-nowrap transition-opacity duration-300 easy-in-out delay-300
                    ${isExpanded ? "opacity-100" : "opacity-0"}
                    `}
                >
                  {label}
                </span>
              </div>
            </NavLink>
          );
        })}

        <div className="border-t mt-auto mb-15 border-gray-300 dark:border-gray-700 pt-2">
          <SidebarBottom isExpanded={isExpanded} />
        </div>

        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className={`
            fixed hidden md:block bottom-10 z-50 text-2xl text-neutral-900 cursor-pointer transition-all duration-300 easy-in-out
            ${toggleButtonPosition}
          `}
        >
          <div
            className={`
              p-1 bg-accent hover:scale-105 dark:border-1 dark:border-sky-700 text-white rounded-full transition-transform duration-600 easy-in-out
              ${arrowRotation}
            `}
          >
            <MdKeyboardArrowLeft />
          </div>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
