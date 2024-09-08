import { AnimatePresence, motion } from 'framer-motion';
import React, { Dispatch, useEffect, useRef, useState, useCallback } from 'react'
import { IoIosSettings } from 'react-icons/io'
import { RiCloseCircleLine } from 'react-icons/ri';
import { twMerge } from 'tailwind-merge';

interface SettingProps {
  showSetting: boolean,
  setShowSetting: Dispatch<React.SetStateAction<boolean>>
}

const Setting: React.FC<SettingProps> = ({ showSetting, setShowSetting }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'account'>('profile');
  const [name, setName] = useState('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setShowSetting(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowSetting]);

  const handleUpdateName = async () => {
    try {
      const response = await fetch('/api/update-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        alert('Name updated successfully');
      } else {
        alert('Failed to update name');
      }
    } catch (error) {
      console.error('Error updating name:', error);
      alert('An error occurred while updating name');
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const response = await fetch('/api/deleteAccount', {
          method: 'POST',
        });

        if (response.ok) {
          alert('Account deleted successfully');
          setShowSetting(false);
        } else {
          alert('Failed to delete account');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred while deleting account');
      }
    }
  };

  const handleActiveTab = useCallback((tab: "profile" | "account") => {
    console.log('Changing tab to:', tab);
    setActiveTab(tab);
  }, []);

  useEffect(() => {
    console.log('Active tab changed to:', activeTab);
  }, [activeTab]);

  const TabButton: React.FC<{ tab: 'profile' | 'account' }> = ({ tab }) => (
    <button 
      key={tab}
      onClick={() => handleActiveTab(tab)} 
      className={twMerge(
        "px-3 text-sm py-1 hover:bg-neutral-600 rounded-xl",
        activeTab === tab ? "border bg-neutral-700 border-neutral-600" : ""
      )}
    >
      {tab.charAt(0).toUpperCase() + tab.slice(1)}
    </button>
  );

  return (
    <AnimatePresence>
      {showSetting && (
        <motion.div
          className='fixed w-screen p-2 h-screen inset-0 z-[99999] bg-black bg-opacity-70 flex items-center justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            ref={dialogRef}
            className='max-w-2xl rounded-xl min-h-[300px] w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 flex flex-col'
            initial={{ y: 1 }}
            animate={{ y: 0 }}
            exit={{ y: 1 }}
          >
            <div className='flex p-6 justify-between items-center'>
              <h2 className='text-xl flex items-center gap-2'>
                <IoIosSettings className='text-2xl' /> Settings
              </h2>
              <button
                onClick={() => setShowSetting(false)}
                className='text-2xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors'
                aria-label="Close settings"
              >
                <RiCloseCircleLine />
              </button>
            </div>
            <span className='h-[1px] w-full bg-neutral-200 dark:bg-neutral-600' />
            <div className='flex-grow p-6 overflow-y-auto'>
              <div className='flex mb-4'>
                <div className='border p-2 px-4 flex gap-1 bg-neutral-800 border-neutral-700 rounded-xl'>
                  <TabButton tab="profile" />
                  <TabButton tab="account" />
                </div>
              </div>
              {activeTab === 'profile' ? (
                <div>
                  <h3 className='text-lg font-semibold mb-2'>Update Profile</h3>
                  <div className='mb-4'>
                    <label htmlFor='name' className='block mb-1'>Name</label>
                    <input
                      type='text'
                      id='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-600'
                    />
                  </div>
                  <button
                    onClick={handleUpdateName}
                    className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors'
                  >
                    Update Name
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className='text-lg font-semibold mb-2'>Account Settings</h3>
                  <button
                    onClick={handleDeleteAccount}
                    className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors'
                  >
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Setting