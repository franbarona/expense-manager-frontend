import { NavLink } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import menuConfig from "../../constants/menuConfig"; // ajusta la ruta si es necesario
import { TbLogout2 } from "react-icons/tb";

interface Props {
  isExpanded: boolean;
  toggleSidebar?: () => void;
  extraFuncOnClick?: () => void;
}

const SidebarHeader = ({ isExpanded }: Props) => {
  return (
    <div className={`flex justify-start items-center p-2 font-bold font-outfit ${isExpanded ? "text-2xl" : "text-xl"}`}>
      <img src="/MonetixLogo.svg" alt="" />
      {isExpanded && <h1>MONETIX</h1>}
      {/* {
        isExpanded
          ? <span>Track<span className="text-blue-800 font-londrina font-bold"> 2 </span>Save</span>
          : <span>T<span className="text-blue-800 font-londrina font-bold">2</span>S</span>
      } */}
    </div>
  )
}

const SidebarBottom = ({ isExpanded }: Props) => {
  return (
    <div className={`flex items-center p-2 rounded  justify-start text-gray-600 hover:bg-indigo-600/10 cursor-pointer ${isExpanded ? "px-4 gap-3 rounded-xl" : "px-2"}`}>
      <div className="w-6 flex justify-center items-center">
        <TbLogout2 />
      </div>

      <div className={`overflow-hidden transition-transform duration-300 easy-in-out ${isExpanded ? "w-auto ml-2" : "w-0 ml-0"}`}>
        <span className={`block whitespace-nowrap transition-opacity duration-300 easy-in-out delay-300 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
          Logout
        </span>
      </div>
    </div>
  )
}

const Sidebar = ({ isExpanded, toggleSidebar, extraFuncOnClick }: Props) => {
  const sidebarWidth = isExpanded ? "w-64" : "w-14";
  const navPadding = isExpanded ? "px-4" : "px-2 text-lg";
  const toggleButtonPosition = isExpanded ? "left-60" : "left-10";
  const arrowRotation = isExpanded ? "" : "rotate-180";

  return (
    <aside
      className={`h-screen bg-white flex flex-col shadow-lg transition-transform duration-300 easy-in-out ${sidebarWidth}`}
    >
      <nav
        className={`flex-1 py-4 space-y-2 ${navPadding}`}
      >
        <div className="border-b border-gray-300 pb-2 mb-5">
          <SidebarHeader isExpanded={isExpanded} />
        </div>
        {menuConfig.map(({ to, label, icon }) => {
          return (
            <NavLink
              key={to}
              to={to}
              onClick={extraFuncOnClick}
              className={({ isActive }) =>
                `
              flex items-center p-2 rounded  justify-start
              ${isExpanded ? "px-4 rounded-xl" : "px-2"}
              ${isActive ? "text-white font-normal bg-blue-800/70" : "text-gray-600 hover:bg-indigo-600/10"}
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

        <div className="border-t border-gray-300 pt-2">
          <SidebarBottom isExpanded={isExpanded} />
        </div>

        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className={`
            fixed hidden md:block bottom-10 z-10 text-2xl text-neutral-900 cursor-pointer transition-all duration-300 easy-in-out
            ${toggleButtonPosition}
          `}
        >
          <div
            className={`
              p-1 bg-blue-800/70 text-white rounded-full transition-transform duration-600 easy-in-out
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
