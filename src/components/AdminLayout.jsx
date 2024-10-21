import React from 'react';
import AdminNavbar from './AdminNavbar';
import { useContext } from 'react';
import { MyContext } from '../context/context';

const AdminLayout = ({ children }) => {
    const{isAdmin}=useContext(MyContext)
  return (
    <div className="layout">
      <AdminNavbar />
        
      <div className='container alllayout ' >
        {children}
      </div>

    </div>
  );
};

export default AdminLayout;
