import { useState, useEffect } from 'react';
import { Bell, X, AlertCircle, Info, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Extended mock data for full page
const mockNotifications = [
  {
    id: 1,
    type: 'NEW_ORDER',
    title: 'New Order Received',
    message: 'Blood Test - Order #12345',
    fullDescription: 'A new blood test order has been placed by John Doe. The test includes CBC, Blood Sugar, and Cholesterol levels. Patient contact: +91-9876543210',
    timestamp: new Date().toISOString(),
    read: false,
    priority: 'high'
  },
  {
    id: 2,
    type: 'TEST_COMPLETED',
    title: 'Test Completed',
    message: 'X-Ray for Patient Jane Smith is ready',
    fullDescription: 'X-Ray test for Jane Smith has been completed successfully. Results are ready for review and can be sent to the patient.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
    priority: 'medium'
  },
  {
    id: 3,
    type: 'SYSTEM_ALERT',
    title: 'System Maintenance',
    message: 'Scheduled maintenance at 2 AM tonight',
    fullDescription: 'System maintenance is scheduled for tonight at 2:00 AM. Expected downtime is 30 minutes. Please save all work before the maintenance window.',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    read: true,
    priority: 'low'
  },
  {
    id: 4,
    type: 'PAYMENT_RECEIVED',
    title: 'Payment Received',
    message: 'Payment of ₹2,500 received for Order #12340',
    fullDescription: 'Payment confirmation: ₹2,500 has been received via UPI for MRI scan order #12340. Transaction ID: TXN123456789',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: 'medium'
  },
  {
    id: 5,
    type: 'NEW_ORDER',
    title: 'Urgent Order',
    message: 'Emergency CT Scan - Order #12399',
    fullDescription: 'Emergency CT scan ordered for patient Sarah Wilson. Priority: URGENT. Expected completion time: 2 hours.',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    read: false,
    priority: 'high'
  },
  {
    id: 6,
    type: 'TEST_COMPLETED',
    title: 'Multiple Tests Ready',
    message: 'Lab results for 3 patients are ready',
    fullDescription: 'Blood test results are now available for patients: Mike Johnson, Lisa Brown, and David Wilson. All tests completed successfully.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: 'medium'
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.timestamp) - new Date(a.timestamp);
    if (sortBy === 'oldest') return new Date(a.timestamp) - new Date(b.timestamp);
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'NEW_ORDER':
        return <Info className="w-6 h-6 text-blue-500" />;
      case 'TEST_COMPLETED':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'SYSTEM_ALERT':
        return <AlertCircle className="w-6 h-6 text-orange-500" />;
      case 'PAYMENT_RECEIVED':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      default:
        return <Info className="w-6 h-6 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                📢 All Notifications
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage and view all your notifications ({unreadCount} unread)
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Mark All as Read
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mt-6">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {['all', 'unread', 'read'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${filter === filterOption
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
              >
                {filterOption} {filterOption === 'unread' && unreadCount > 0 && `(${unreadCount})`}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">By Priority</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {sortedNotifications.length > 0 ? (
            sortedNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-md ${!notification.read ? 'ring-2 ring-blue-100 dark:ring-blue-900/20' : ''
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`text-lg font-semibold ${!notification.read
                          ? 'text-gray-900 dark:text-gray-100'
                          : 'text-gray-700 dark:text-gray-300'
                          }`}>
                          {notification.title}
                          {!notification.read && (
                            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block" />
                          )}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                          {notification.priority}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {notification.fullDescription}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(notification.timestamp).toLocaleString()}
                      </span>

                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No notifications found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {filter === 'unread' ? 'All caught up! No unread notifications.' :
                  filter === 'read' ? 'No read notifications found.' :
                    'No notifications to display.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}