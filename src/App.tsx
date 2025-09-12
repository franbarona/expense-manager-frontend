import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { GrMenu } from "react-icons/gr";
import Sidebar from "./components/sections/Sidebar";
import TransactionsPage from "./pages/TransactionsPage";
import { useEffect, useRef, useState } from "react";
import CategoriesPage from "./pages/CategoriesPage";
import StatisticsPage2 from "./pages/DashboardPage";
import { WindowSizeProvider } from "./context/WindowSizeContext";
import { TransactionsProvider } from "./context/TransactionsContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import { ModalComponent } from "./components/ui/ModalComponent";
import useModal from "./hooks/useModal";
import useDisableScroll from "./hooks/useDisableScroll";
import DemoModal from "./components/DemoModal";
import { ThemeProvider } from "./context/ThemeContext";
import { getCurrentYear } from "./utils/dateUtils";
import AlertManager from "./components/ui/AlertManager";
import { AlertProvider } from "./context/AlertContext";

const App: React.FC = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isModalOpen, openModal, closeModal, handleOverlayClick } = useModal();
  const { isModalOpen: showMobileMenu, openModal: openMobileMenu, closeModal: closeMobileMenu, handleOverlayClick: handleOverlayClickMobileMenu } = useModal();
  useDisableScroll(isModalOpen);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  useEffect(() => {
    const hideDemoModal = localStorage.getItem("hideDemoModal");;

    if (!hideDemoModal) {
      openModal();
    }
  }, []);

  return (
    <ThemeProvider>
      <WindowSizeProvider>
        <TransactionsProvider>
          <CategoriesProvider>
            <AlertProvider>
              <Router>
                <div className="flex flex-col" ref={containerRef}>
                  <div className="flex z-0">
                    <div className={`z-50 hidden fixed md:block left-[-16rem] md:left-[0rem]`}>
                      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
                    </div>
                    <div className="fixed block md:hidden top-5 left-5 text-2xl cursor-pointer z-50">
                      <GrMenu onClick={openMobileMenu} className="text-primary" />
                    </div>
                    {
                      showMobileMenu &&
                      <ModalComponent onClose={() => closeMobileMenu()} handleOverlayClick={handleOverlayClickMobileMenu} showCloseButton={false} specialClass='items-start'>
                        <div className={`fixed left-[-16rem] md:left-[0rem] ${showMobileMenu ? 'left-[0rem]' : 'left-[-16rem]'}`}>
                          <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} extraFuncOnClick={closeMobileMenu} />
                        </div>
                      </ModalComponent>
                    }

                    <main className={`relative flex-1 min-h-[100vh] bg-primary ml-0 ${isSidebarExpanded ? "lg:ml-64 md:ml-14" : "md:ml-14"}`}>
                      <div className="mb-10">
                        <Routes>
                          <Route path="/" element={<StatisticsPage2 />} />
                          <Route path="/transactions" element={<TransactionsPage />} />
                          <Route path="/categories" element={<CategoriesPage />} />
                        </Routes>
                      </div>
                      <footer className={`absolute flex bottom-5 left-[50%] translate-x-[-50%] text-[var(--color-text-secondary)] text-xs md:text-sm text-center whitespace-nowrap`}>
                        <Link to="https://www.franbarona.dev" target="_blank" rel="noopener noreferrer">
                          Copyright © {getCurrentYear()} franbarona.dev
                        </Link>
                      </footer>
                    </main>
                    {
                      isModalOpen &&
                      <ModalComponent onClose={() => closeModal()} handleOverlayClick={handleOverlayClick}>
                        <DemoModal action={() => closeModal()} />
                      </ModalComponent>
                    }
                  </div>
                  <AlertManager position="top-right" />
                </div>
              </Router>
            </AlertProvider>
          </CategoriesProvider>
        </TransactionsProvider>
      </WindowSizeProvider>
    </ThemeProvider>
  );
};

export default App;
