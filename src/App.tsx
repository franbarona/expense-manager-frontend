import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
            <Router>
              <div className="flex flex-col" ref={containerRef}>
                <div className="flex z-0">
                  <div className={`z-10 hidden fixed md:block left-[-16rem] md:left-[0rem]`}>
                    <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
                  </div>
                  <div className="fixed block md:hidden top-5 left-5 text-2xl cursor-pointer z-50">
                    <GrMenu onClick={openMobileMenu} className="dark:text-white" />
                  </div>
                  {
                    showMobileMenu &&
                    <div
                      className="fixed inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-50 z-50"
                      onClick={handleOverlayClickMobileMenu} // Detecta el clic en el overlay
                    >
                      <ModalComponent onClose={() => {
                        closeMobileMenu();
                      }}
                        showCloseButton={false}
                      >
                        <div className={`fixed left-[-16rem] md:left-[0rem] ${showMobileMenu ? 'left-[0rem]' : 'left-[-16rem]'}`}>
                          <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} extraFuncOnClick={closeMobileMenu} />
                        </div>
                      </ModalComponent>
                    </div>
                  }

                  <main className={`flex-1 min-h-[100vh] bg-neutral-100 dark:bg-neutral-950 ml-0 ${isSidebarExpanded ? "lg:ml-64 md:ml-14" : "md:ml-14"}`}>
                    <Routes>
                      <Route path="/" element={<StatisticsPage2 />} />
                      <Route path="/transactions" element={<TransactionsPage />} />
                      <Route path="/categories" element={<CategoriesPage />} />
                      <Route path="/statistics" element={<StatisticsPage2 />} />
                    </Routes>
                  </main>
                  {
                    isModalOpen &&
                    <div
                      className="fixed inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-50 flex justify-center items-center z-50"
                      onClick={handleOverlayClick} // Detecta el clic en el overlay
                    >
                      <ModalComponent onClose={() => {
                        closeModal();
                      }}>
                        <DemoModal onClose={() => closeModal()} />
                      </ModalComponent>
                    </div>
                  }
                </div>
              </div>
            </Router>
          </CategoriesProvider>
        </TransactionsProvider>
      </WindowSizeProvider>
    </ThemeProvider>
  );
};

export default App;
