'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { AiOutlineAlignCenter } from "react-icons/ai";
import { FaHome, FaServicestack } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import NavMenu from "@/components/partials/sidebar/NavMenu ";
import SubMenu from "@/components/partials/sidebar/Submenu";
import Sidebar from "@/components/partials/sidebar/Sidebar";
import Modal from "../ui/modal/Modal";
import Login from "../ui/Login";
import { MdAccountCircle } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";


const Headerdash = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const router = useRouter();
  const user = useSelector(state => state.auth.user);


  useEffect(() => {
    if (isAuthenticated) {
      setLoginOpen(false);
    }
  }, [isAuthenticated]);


  const handleSidebarItemClick = (path) => {
    if (path) {
      router.push(path);   
      setSidebarOpen(false); 
    }
  };
  
  return (
    <header className="sticky top-0 z-50 bg-gray-700 px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-2xl text-white rounded-full hover:bg-gray-600"
        >
          <AiOutlineAlignCenter />
        </button>

        <div className="text-2xl font-bold text-white">My Dashboard</div>

        {isAuthenticated ? (
              <p className="text-gray-800 flex justify-center text-center ">
                Welcome {user.name}</p>  
            ) : (
              <button className="text-gray-800" onClick={() => setLoginOpen(true)}>
                <MdAccountCircle />
                Login
              </button>
            )}
        <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
          <Login />
        </Modal>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
        <NavMenu title="Menu">
       
          <SubMenu
            label="Products"
            icon={AiOutlineProduct}
            subItems={[
              { label: "All Product", path: "/allproduct" },

              { label: "Add New Product", path: "/addproduct" },
              { label: "Product Appear", path: "/appear" }
            ]}
            onClick={handleSidebarItemClick}
          />
          <SubMenu
            label="Reports"
            icon={TbReportAnalytics}
            subItems={[
              { label: "Sales", path: "/dashboard" },
              { label: "Purchases", path: "/dashboard" }
            ]}
            onClick={handleSidebarItemClick}
          />
        </NavMenu>
      </Sidebar>
    </header>
  );
};

export default Headerdash;
