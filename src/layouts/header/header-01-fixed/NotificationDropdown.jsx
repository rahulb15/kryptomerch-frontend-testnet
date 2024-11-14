// import React from 'react';
// import { Box, List, ListItem, ListItemText, Button, Typography } from '@mui/material';

// const NotificationDropdown = ({ notifications, onViewAll }) => {
//     return (
//         <Box sx={{ position: 'absolute', top: '100%', right: 0, width: 300, maxHeight: 400, overflowY: 'auto', bgcolor: 'background.paper', boxShadow: 3, borderRadius: 1, zIndex: 1000 }}>
//             <List>
//                 {notifications.slice(0, 5).map((notification) => (
//                     <ListItem key={notification.id}>
//                         <ListItemText 
//                             primary={notification.title}
//                             secondary={notification.message}
//                         />
//                     </ListItem>
//                 ))}
//             </List>
//             <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
//                 <Button fullWidth variant="contained" onClick={onViewAll}>
//                     View All Notifications
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// export default NotificationDropdown;


// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// // import './notification-dropdown-dark.css'; // Import dark theme by default

// const formatTime = (date) => {
//   const now = new Date();
//   const diff = now - new Date(date);
//   const minutes = Math.floor(diff / 60000);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);

//   if (minutes < 60) return `${minutes}m ago`;
//   if (hours < 24) return `${hours}h ago`;
//   if (days === 1) return 'Yesterday';
//   if (days < 7) return `${days}d ago`;
//   return new Date(date).toLocaleDateString();
// };

// const NotificationDropdown = ({ notifications = [], onViewAll, onRead }) => {
//   const [unreadCount, setUnreadCount] = useState(0);

//   useEffect(() => {
//     const count = notifications.filter(note => !note.read).length;
//     setUnreadCount(count);
//   }, [notifications]);

//   const handleNotificationClick = (notification) => {
//     if (!notification.read && onRead) {
//       onRead(notification.id);
//     }
//   };

//   return (
//     <motion.div
//       className="notification-dropdown-container"
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       transition={{ duration: 0.2 }}
//     >
//       <div className="notification-header">
//         <h3 className="notification-title">
//           Notifications
//           {unreadCount > 0 && (
//             <span className="notification-count"> ({unreadCount} new)</span>
//           )}
//         </h3>
//       </div>

//       <ul className="notification-list">
//         {notifications.length === 0 ? (
//           <div className="notification-empty">
//             No notifications yet
//           </div>
//         ) : (
//           notifications.slice(0, 5).map((notification) => (
//             <motion.li
//               key={notification.id}
//               className={`notification-item ${!notification.read ? 'unread' : ''}`}
//               onClick={() => handleNotificationClick(notification)}
//               whileHover={{ x: 4 }}
//               transition={{ duration: 0.2 }}
//             >
//               <div className="notification-item-title">
//                 {notification.title}
//               </div>
//               <div className="notification-item-message">
//                 {notification.message}
//               </div>
//               <div className="notification-item-time">
//                 {formatTime(notification.timestamp)}
//               </div>
//             </motion.li>
//           ))
//         )}
//       </ul>

//       <div className="notification-footer">
//         <motion.button
//           className="notification-view-all"
//           onClick={onViewAll}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           View All Notifications
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// };

// export default NotificationDropdown;


import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const formatTime = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
};

const NotificationDropdown = ({ notifications = [], onViewAll }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const count = notifications.filter(note => !note.read).length;
    setUnreadCount(count);
  }, [notifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the notification container
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Find and click the notification toggle button to close the dropdown
        const notificationButton = document.querySelector('.notification-badge button');
        if (notificationButton) {
          notificationButton.click();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      ref={dropdownRef}
      className="notification-dropdown-container"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="notification-header">
        <h3 className="notification-title">
          Notifications
          {unreadCount > 0 && (
            <span className="notification-count"> ({unreadCount} new)</span>
          )}
        </h3>
      </div>

      <ul className="notification-list">
        {notifications.length === 0 ? (
          <div className="notification-empty">
            No notifications yet
          </div>
        ) : (
          notifications.slice(0, 5).map((notification) => (
            <motion.li
              key={notification.id}
              className={`notification-item ${!notification.read ? 'unread' : ''}`}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="notification-item-title">
                {notification.title}
              </div>
              <div className="notification-item-message">
                {notification.message}
              </div>
              <div className="notification-item-time">
                {formatTime(notification.timestamp)}
              </div>
            </motion.li>
          ))
        )}
      </ul>

      <div className="notification-footer">
        <motion.button
          className="notification-view-all"
          onClick={onViewAll}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View All Notifications
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NotificationDropdown;