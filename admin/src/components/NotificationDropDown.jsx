import { useState, useEffect } from 'react';
import { Bell, X, Check, AlertCircle, Info, CheckCircle, ExternalLink } from 'lucide-react';

// Mock notification data - replace with your API call
const mockNotifications = [
    {
        id: 1,
        type: 'NEW_ORDER',
        title: 'New Order Received',
        message: 'Blood Test - Order #12345',
        timestamp: new Date().toISOString(),
        read: false,
        priority: 'high'
    },
    {
        id: 2,
        type: 'TEST_COMPLETED',
        title: 'Test Completed',
        message: 'X-Ray for Patient John Doe is ready',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        read: false,
        priority: 'medium'
    },
    {
        id: 3,
        type: 'SYSTEM_ALERT',
        title: 'System Maintenance',
        message: 'Scheduled maintenance at 2 AM tonight',
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        read: true,
        priority: 'low'
    }
];

export default function NotificationDropdown({ onViewAll }) {
    const [notifications, setNotifications] = useState(mockNotifications);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    // Calculate unread count
    useEffect(() => {
        const count = notifications.filter(n => !n.read).length;
        setUnreadCount(count);
    }, [notifications]);

    // Simulate real-time notifications (optional)
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const newNotification = {
    //             id: Date.now(),
    //             type: 'NEW_ORDER',
    //             title: 'New Order',
    //             message: `Order #${Math.floor(Math.random() * 10000)}`,
    //             timestamp: new Date().toISOString(),
    //             read: false,
    //             priority: 'high'
    //         };

    //         setNotifications(prev => [newNotification, ...prev]);
    //     }, 60000); // New notification every minute for demo

    //     return () => clearInterval(interval);
    // }, []);

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

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'NEW_ORDER':
                return <Info className="w-4 h-4 text-blue-500" />;
            case 'TEST_COMPLETED':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'SYSTEM_ALERT':
                return <AlertCircle className="w-4 h-4 text-orange-500" />;
            default:
                return <Info className="w-4 h-4 text-gray-500" />;
        }
    };

    const formatTimestamp = (timestamp) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diff = now - time;

        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return time.toLocaleDateString();
    };

    return (
        <div className="relative">
            {/* Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Notification Dropdown */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown Panel */}
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Notifications
                            </h3>
                            <div className="flex items-center gap-2">
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        Mark all read
                                    </button>
                                )}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Notifications List (Show first 5) */}
                        <div className="max-h-80 overflow-y-auto">
                            {notifications.length > 0 ? (
                                notifications.slice(0, 5).map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 mt-0.5">
                                                {getNotificationIcon(notification.type)}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <p className={`text-sm font-medium truncate ${!notification.read
                                                        ? 'text-gray-900 dark:text-gray-100'
                                                        : 'text-gray-700 dark:text-gray-300'
                                                        }`}>
                                                        {notification.title}
                                                    </p>
                                                    {!notification.read && (
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2" />
                                                    )}
                                                </div>

                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                                                    {notification.message}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {formatTimestamp(notification.timestamp)}
                                                    </span>

                                                    {!notification.read && (
                                                        <button
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                                            title="Mark as read"
                                                        >
                                                            <Check className="w-3 h-3" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                                    <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>No notifications</p>
                                </div>
                            )}
                        </div>

                        {/* Footer - View All Button */}
                        <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    onViewAll(); // This will navigate to full page
                                }}
                                className="w-full flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline py-1"
                            >
                                View All Notifications
                                <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}