'use client'
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftToLine, ArrowRightToLine, House, Boxes, MessageSquare } from 'lucide-react';
import Logo from '@/app/assets/NoAI.svg';
import { useState } from 'react';
import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import Dropdown from './ui/dropdown';

export default function Sidebar() {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState('dashboard');
    const { openUserProfile } = useClerk();
    const { isSignedIn, user, isLoaded } = useUser();

    const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    };

    if (!isLoaded) return <div>Loading...</div>;
    if (!isSignedIn) return <div>Sign in to view this page</div>;



    return (
    <aside className={`h-screen transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <nav className="h-full flex flex-col bg-white border-r">
          <div className="p-4 pb-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image src={Logo} alt="logo" width={32} height={32} className="w-8 h-8" />
              {!isCollapsed && <Link href="/" className="text-xl font-bold">Negotiation.AI</Link>}
            </div>
            <button
              className="p-1.5 rounded-lg hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              {isCollapsed ?
                <ArrowRightToLine className="w-5 h-5" /> :
                <ArrowLeftToLine className="w-5 h-5" />
              }
            </button>
          </div>

          {/* Still unsure about links, will need to be expanded on */}
          <ul className="space-y-2 px-3 mt-4">
            <li>
              <button
                onClick={() => setActiveItem('dashboard')}
                className={`w-full text-left flex items-center gap-3 p-2 rounded-lg 
                ${activeItem === 'dashboard' ? 'bg-[#ff914d] text-white font-semibold' : 'hover:bg-gray-100'} 
                ${isCollapsed ? 'justify-center' : ''}`}
              >
                <House className="w-5 h-5" />
                {!isCollapsed && <span>Dashboard</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveItem('coming-soon')}
                className={`w-full flex items-center gap-3 p-2 rounded-lg 
                ${activeItem === 'coming-soon' ? 'bg-[#ff914d] text-white font-semibold' : 'hover:bg-gray-100'} 
                ${isCollapsed ? 'justify-center' : ''}`}
              >
                <Boxes className="w-5 h-5" />
                {!isCollapsed && <span>Coming Soon</span>}
              </button>
            </li>
            <li>
            
              <div
                onClick={() => setActiveItem('scenarios')}
                className={`w-full text-left flex items-center gap-4 p-2 rounded-lg  
                ${isCollapsed ? 'justify-center' : ''}`}
              >
                <MessageSquare className="w-5 h-5" />
                {!isCollapsed && <Dropdown />}
              </div>
            </li>
          </ul>

          {/* Chat History Section will need to be expanded on to include database load and so on
          this is where all our past chats for each user will display */}
          {!isCollapsed && (
            <div className="mt-6 px-3 flex-1 overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="px-2 text-sm font-semibold text-gray-500">RECENT CHATS</h3>
              </div>
            </div>
          )}

          {/* This is the User Profile Section 
          Below you can see that the user can see their first and last name, and "Manage their account" Thats only true
          if the user clicks on their profile picture. I could not figure out how to make that work. So if someone can figure this
          issue out, please let me know. - solved using useClerk I was able to use a onClick function to open the user profile*/}
          <div className="mt-auto border-t p-4">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
              <UserButton afterSignOutUrl="/" />
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-medium">{user?.firstName} {user?.lastName}</span>
                  <span className="text-sm text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => openUserProfile()}
                  >
                    Manage account
                  </span>
                </div>
              )}
            </div>
          </div>
        </nav>
      </aside>
    )
}
