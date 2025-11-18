
import React, { useState } from 'react';
import { User, View } from '../../types';
import Icon from '../common/Icon';

interface HeaderProps {
    user: User | null;
    onNavigate: (view: View) => void;
    onLogin: () => void;
    onLogout: () => void;
    onOpenFollowing: () => void;
    onSearch: (keyword: string) => void; // New prop
}

const ProfileMenu: React.FC<{ user: User, onNavigate: (view: View) => void, onLogout: () => void }> = ({ user, onNavigate, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!user) return null;

    const handleNav = (view: View) => {
        onNavigate(view);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 focus:outline-none">
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-lg border-2 border-transparent hover:border-primary/50 transition-all">
                    {user.username.charAt(0).toUpperCase()}
                </div>
                <Icon name="chevron-down" className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-surface rounded-xl shadow-xl border border-border-color z-50 animate-fade-in overflow-hidden">
                    <div className="bg-slate-50 px-4 py-3 border-b border-border-color">
                        <p className="font-bold text-text-primary text-lg">{user.username}</p>
                        <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-1.5 text-sm text-yellow-600 font-semibold">
                                <Icon name="wallet" className="w-4 h-4" />
                                <span>{user.coins.toLocaleString()}</span>
                            </div>
                             <div className="flex items-center gap-1.5 text-sm text-purple-600 font-semibold">
                                <Icon name="ai" className="w-4 h-4" />
                                <span>{user.aiCredits}</span>
                            </div>
                        </div>
                    </div>

                    <div className="py-2">
                        <button onClick={() => handleNav('profile')} className="w-full text-left px-4 py-2.5 text-text-primary hover:bg-slate-100 flex items-center gap-3 transition-colors">
                            <Icon name="user" className="w-5 h-5 text-text-secondary"/> Hồ sơ cá nhân
                        </button>
                        <button onClick={() => handleNav('library')} className="w-full text-left px-4 py-2.5 text-text-primary hover:bg-slate-100 flex items-center gap-3 transition-colors">
                            <Icon name="book" className="w-5 h-5 text-text-secondary"/> Tủ truyện
                        </button>
                        <button onClick={() => handleNav('quests')} className="w-full text-left px-4 py-2.5 text-text-primary hover:bg-slate-100 flex items-center gap-3 transition-colors">
                            <Icon name="target" className="w-5 h-5 text-text-secondary"/> Nhiệm vụ & Quà
                        </button>
                         <button onClick={() => handleNav('coinShop')} className="w-full text-left px-4 py-2.5 text-text-primary hover:bg-slate-100 flex items-center gap-3 transition-colors">
                            <Icon name="shopping-cart" className="w-5 h-5 text-text-secondary"/> Cửa hàng Xu
                        </button>
                        
                        {user.isAuthor && (
                            <>
                                <div className="border-t border-border-color my-1"></div>
                                <button onClick={() => handleNav('authorDashboard')} className="w-full text-left px-4 py-2.5 text-text-primary hover:bg-slate-100 flex items-center gap-3 transition-colors">
                                    <Icon name="edit-3" className="w-5 h-5 text-accent"/> Khu vực tác giả
                                </button>
                            </>
                        )}
                        
                        <div className="border-t border-border-color my-1"></div>
                        <button onClick={() => { onLogout(); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors font-semibold">
                            <Icon name="log-out" className="w-5 h-5"/> Đăng xuất
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const Header: React.FC<HeaderProps> = ({ user, onNavigate, onLogin, onLogout, onOpenFollowing, onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        onSearch(searchText);
    };

    return (
        <header className="bg-surface/80 backdrop-blur-sm shadow-sm sticky top-0 z-40 border-b border-border-color">
            <div className="container mx-auto p-4 flex justify-between items-center gap-6">
                
                {/* Left: Logo & Main Nav */}
                <div className="flex items-center gap-8">
                    <div onClick={() => onNavigate('home')} className="flex items-center gap-2 cursor-pointer group">
                        <div className="bg-primary text-white p-1.5 rounded-lg group-hover:bg-secondary transition-colors">
                             <Icon name="book" className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-extrabold text-primary hidden sm:block tracking-tight group-hover:text-secondary transition-colors">TDCReader</h1>
                    </div>

                    {/* Navigation Links - Moved to Left */}
                    <nav className="hidden lg:flex items-center gap-1">
                        <button onClick={() => onNavigate('ranking')} className="px-4 py-2 rounded-lg hover:bg-slate-100 font-semibold text-text-secondary hover:text-primary transition-colors flex items-center gap-2">
                            <Icon name="crown" className="w-4 h-4" /> Bảng xếp hạng
                        </button>
                        <button onClick={() => onNavigate('community')} className="px-4 py-2 rounded-lg hover:bg-slate-100 font-semibold text-text-secondary hover:text-primary transition-colors flex items-center gap-2">
                            <Icon name="users" className="w-4 h-4" /> Cộng đồng
                        </button>
                        <button onClick={() => onNavigate('news')} className="px-4 py-2 rounded-lg hover:bg-slate-100 font-semibold text-text-secondary hover:text-primary transition-colors flex items-center gap-2">
                            <Icon name="newspaper" className="w-4 h-4" /> Tin tức
                        </button>
                    </nav>
                </div>

                {/* Center: Search Bar with Button and Advanced Search Toggle */}
                <div className="flex-1 max-w-2xl hidden md:flex items-center gap-2">
                    <form onSubmit={handleSearchSubmit} className="relative flex-grow flex items-center">
                        <div className="relative w-full">
                            <input
                                type="search"
                                placeholder="Tìm kiếm truyện, tác giả..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full bg-slate-100 border-transparent focus:bg-surface border focus:border-primary rounded-l-full py-2.5 pl-10 pr-4 transition-all outline-none shadow-sm focus:shadow-md"
                            />
                            <Icon name="search" className="w-4 h-4 text-text-secondary absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <button 
                            type="submit"
                            className="bg-primary hover:bg-secondary text-white px-6 py-2.5 rounded-r-full font-medium transition-colors shadow-sm"
                        >
                            Tìm
                        </button>
                    </form>
                    <button 
                        onClick={() => onNavigate('advancedSearch')} 
                        className="p-2.5 rounded-full hover:bg-slate-100 text-text-secondary hover:text-primary transition-colors border border-transparent hover:border-border-color"
                        title="Tìm kiếm nâng cao"
                    >
                        <Icon name="sliders" className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Right: Following / User Profile / Login */}
                <div className="flex items-center gap-4">
                     {/* Mobile Search Icon */}
                    <button onClick={() => onNavigate('advancedSearch')} className="md:hidden p-2 rounded-full hover:bg-slate-100 text-text-secondary">
                        <Icon name="search" className="w-6 h-6" />
                    </button>

                    {/* Following / Notification Button */}
                    {user && (
                        <button 
                            onClick={onOpenFollowing} 
                            className="relative p-2 rounded-full hover:bg-slate-100 text-text-secondary hover:text-primary transition-colors mr-1"
                            title="Truyện đang theo dõi (Có cập nhật mới)"
                        >
                            <Icon name="bell" className="w-6 h-6" />
                            {/* Notification Dot - Logic handled by checking updates in a real app */}
                            <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full ring-2 ring-surface bg-red-500 animate-pulse"></span>
                        </button>
                    )}

                    {user ? (
                        <ProfileMenu user={user} onNavigate={onNavigate} onLogout={onLogout} />
                    ) : (
                        <div className="flex items-center gap-2">
                            <button onClick={onLogin} className="bg-primary hover:bg-secondary text-white font-semibold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                                Đăng nhập
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
