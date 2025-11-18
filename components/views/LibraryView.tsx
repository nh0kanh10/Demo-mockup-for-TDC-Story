
import React, { useState, useEffect } from 'react';
import { Novel, User } from '../../types';
import Icon from '../common/Icon';

interface LibraryViewProps {
    user: User;
    novels: Novel[];
    onSelectNovel: (novel: Novel) => void;
    onCreateCollection: () => void;
    defaultTab?: string; // New prop
}

const LibraryView: React.FC<LibraryViewProps> = ({ user, novels, onSelectNovel, onCreateCollection, defaultTab = 'history' }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    // Sync internal state if prop changes (e.g., from Header navigation)
    useEffect(() => {
        setActiveTab(defaultTab);
    }, [defaultTab]);

    const renderNovelList = (list: Novel[], showUpdates: boolean = false) => {
        if (list.length === 0) {
            return (
                <div className="text-center py-16">
                    <Icon name="book" className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-text-secondary">Không có truyện nào trong mục này.</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {list.map((novel, index) => (
                    <div key={novel.id} onClick={() => onSelectNovel(novel)} className="flex items-center gap-4 p-4 bg-surface rounded-lg shadow-sm border border-border-color hover:shadow-lg hover:border-primary/50 cursor-pointer transition-all relative">
                        {/* Mock Update Badge for first item in Following list */}
                        {showUpdates && index === 0 && (
                            <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse z-10">
                                Chương mới
                            </span>
                        )}
                        <div className="relative">
                            <img src={novel.coverImage} alt={novel.title} className="w-16 h-24 object-cover rounded-md" />
                        </div>
                        <div className="flex-grow">
                            <h3 className="font-bold text-lg text-text-primary">{novel.title}</h3>
                            <p className="text-sm text-text-secondary">Tác giả: {novel.author}</p>
                            <p className="text-sm text-text-secondary mt-1">Đã đọc: 5/{novel.chapters.length} chương</p>
                            {showUpdates && index === 0 && <p className="text-xs text-green-600 font-semibold mt-1">Vừa cập nhật: Chương 6</p>}
                        </div>
                        <button className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg">
                            Đọc tiếp
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    const renderCollections = () => (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={onCreateCollection} className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
                    <Icon name="plus" className="w-5 h-5" /> Tạo bộ sưu tập mới
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {user.collections.map(collection => {
                    const collectionNovels = novels.filter(n => collection.novelIds.includes(n.id));
                    return (
                        <div key={collection.id} className="bg-background p-4 rounded-lg border border-border-color shadow-sm hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-bold text-text-primary border-b border-border-color pb-2 mb-3">{collection.name}</h3>
                            <div className="space-y-2">
                                {collectionNovels.length > 0 ? collectionNovels.map(novel => (
                                     <p key={novel.id} className="text-sm text-text-secondary truncate">{novel.title}</p>
                                )) : <p className="text-sm text-slate-400 italic">Bộ sưu tập trống</p>}
                                {collection.novelIds.length > collectionNovels.length && <p className="text-sm text-slate-400 italic">... và các truyện khác</p>}
                            </div>
                        </div>
                    );
                 })}
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center">
                 <Icon name="book" className="w-16 h-16 text-primary mx-auto mb-2" />
                <h2 className="text-3xl font-bold text-text-primary">Tủ Truyện Thông Minh</h2>
                <p className="text-text-secondary mt-2">Nơi lưu trữ và sắp xếp những cuộc phiêu lưu của bạn.</p>
            </div>

            <div className="bg-surface rounded-lg shadow-lg border border-border-color">
                <div className="flex border-b border-border-color">
                    <button onClick={() => setActiveTab('history')} className={`px-6 py-3 font-semibold ${activeTab === 'history' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}>Lịch sử đọc</button>
                    <button onClick={() => setActiveTab('following')} className={`px-6 py-3 font-semibold ${activeTab === 'following' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}>Đang theo dõi</button>
                    <button onClick={() => setActiveTab('collections')} className={`px-6 py-3 font-semibold ${activeTab === 'collections' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}>Bộ sưu tập</button>
                </div>
                <div className="p-6">
                    {activeTab === 'history' && renderNovelList(novels.slice(0, 3))}
                    {/* Render following list with update badges enabled */}
                    {activeTab === 'following' && renderNovelList(novels.slice(0, 2), true)}
                    {activeTab === 'collections' && renderCollections()}
                </div>
            </div>
        </div>
    );
};

export default LibraryView;
