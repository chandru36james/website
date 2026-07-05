import React from 'react';
import { useVFMS } from '../context/VFMSContext';
import { Bell, Coins, FileText, Wallet, ShieldAlert, Settings, Check, ArrowRight } from 'lucide-react';
import { Notification } from '../types';

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationAsRead, userRole, currentUser } = useVFMS();

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
    } catch (err: any) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  // Filter notifications appropriate for this role/user
  const myNotifications = notifications.filter(n => {
    if (n.recipientRole !== 'all' && n.recipientRole !== userRole) return false;
    if (n.recipientId && n.recipientId !== currentUser?.uid) return false;
    return true;
  });

  const getCategoryIcon = (category: Notification['category']) => {
    switch (category) {
      case 'Collections':
        return <Coins className="h-4 w-4 text-emerald-600" />;
      case 'Loans':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'Expenses':
        return <Wallet className="h-4 w-4 text-amber-600" />;
      case 'Cash':
        return <ShieldAlert className="h-4 w-4 text-red-600" />;
      case 'System':
        return <Settings className="h-4 w-4 text-slate-600" />;
      default:
        return <Bell className="h-4 w-4 text-indigo-600" />;
    }
  };

  const categories: Notification['category'][] = ['Collections', 'Loans', 'Expenses', 'Cash', 'System'];

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="h-5 w-5 text-red-600" />
            Smart Notification Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Differentiated logs for collections, pending approvals, daily closing alerts, and escalations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Categorized Tabs/Feeds */}
        <div className="lg:col-span-12 space-y-6">
          
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs font-bold">
              <span className="text-slate-900">Notifications Inbox</span>
              <span className="text-[10px] font-mono text-slate-400">{myNotifications.length} items</span>
            </div>

            <div className="divide-y divide-slate-100">
              {myNotifications.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs font-bold">
                  No notifications.
                </div>
              ) : (
                myNotifications.map(n => (
                  <div 
                    key={n.id} 
                    className={`p-4 flex justify-between items-start gap-4 transition-colors text-xs ${n.read ? 'opacity-60 bg-white' : 'bg-indigo-50/10 font-medium'}`}
                  >
                    <div className="flex gap-3">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                        n.priority === 'high' ? 'bg-red-50 text-red-600' :
                        n.priority === 'medium' ? 'bg-indigo-50 text-indigo-600' :
                        'bg-slate-50 text-slate-500'
                      }`}>
                        {getCategoryIcon(n.category)}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{n.title}</span>
                          <span className="text-[9px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                            {n.category}
                          </span>
                          {n.priority === 'high' && (
                            <span className="text-[9px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-red-100 text-red-600">
                              Urgent
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{n.message}</p>
                        <p className="text-[9px] text-slate-400 font-mono mt-1">
                          {new Date(n.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                        </p>
                      </div>
                    </div>

                    {!n.read && (
                      <button
                        onClick={() => handleMarkAsRead(n.id)}
                        className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg border border-transparent hover:border-emerald-150 cursor-pointer transition-all"
                        title="Mark as read"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
