'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export default function DashboardLayout({ children }) {
  const [openParent, setOpenParent] = useState(null);

  const handleClick = (parent) => {
    setOpenParent(openParent === parent ? null : parent);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 shadow-lg border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-slate-300"><Link href="/pages/cd-dashboard/">Dashboard</Link></h1>
        </div>

        <List component="nav" className="p-2">
          {/* Parent: Users */}
          <ListItemButton onClick={() => handleClick('users')}>
            <ListItemText primary="Users" />
            {openParent === 'users' ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openParent === 'users'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href="/pages/cd-dashboard/user-configuration/">
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemText primary="User Configuration" />
                </ListItemButton>
              </Link>
              <Link href="/pages/cd-dashboard/user-view">
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemText primary="User View" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>

          <Divider className="my-2" />

          {/* Parent: Reports */}
          <ListItemButton onClick={() => handleClick('reports')}>
            <ListItemText primary="Reports" />
            {openParent === 'reports' ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openParent === 'reports'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href="/dashboard/reports/sales">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Sales Report" />
                </ListItemButton>
              </Link>
              <Link href="/dashboard/reports/inventory">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Inventory Report" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
        </List>
      </aside>
      {/* Right Side Content */}
      <main className="flex-1 p-2 bg-black overflow-y-auto">
       {children}
      </main>
    </div>
  );
}
