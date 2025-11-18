
import React from 'react';
import { Novel, User, Chapter } from '../../types';
import Icon from '../common/Icon';

interface NovelCardProps {
    novel: Novel;
    onSelectNovel: (novel: Novel) => void;
}

const NovelCard: React.FC<NovelCardProps> = ({ novel, onSelectNovel }) => (
    <div 
        onClick={() => onSelectNovel(novel)}
        className="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-2xl border border-border-color group cursor-pointer transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
        <div className="relative w-full pt-[150%] overflow-hidden">
            <img 
                src={novel.coverImage} 
                alt={novel.title} 
                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-white/90 text-text-primary font-bold py-2 px-6 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    Đọc ngay
                </span>
            </div>
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                <Icon name="star" className="w-3 h-3 text-yellow-400 fill-yellow-400"/>
                {/* Mock rating */}
                4.8
            </div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
            <h3 className="font-bold text-lg text-text-primary line-clamp-2 group-hover:text-primary transition-colors mb-1" title={novel.title}>
                {novel.title}
            </h3>
            <p className="text-sm text-text-secondary mb-3">{novel.author}</p>
            <div className="mt-auto flex items-center justify-between text-xs text-text-secondary border-t border-border-color pt-3">
                <div className="flex items-center gap-1">
                     <Icon name="eye" className="w-3 h-3"/> {novel.stats.views.toLocaleString()}
                </div>
                <span className={`px-2 py-0.5 rounded-full ${novel.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {novel.status}
                </span>
            </div>
        </div>
    </div>
);

const ContinueReadingCard: React.FC<{
    user: User;
    novels: Novel[];
    onStartReading: (novel: Novel, chapter: Chapter) => void;
}> = ({ user, novels, onStartReading }) => {
    if (!user.lastRead) return null;

    const lastReadNovel = novels.find(n => n.id === user.lastRead?.novelId);
    const lastReadChapter = lastReadNovel?.chapters.find(c => c.id === user.lastRead?.chapterId);

    if (!lastReadNovel || !lastReadChapter) return null;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-text-primary flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                Tiếp tục hành trình
            </h2>
            <div className="bg-surface p-6 rounded-2xl shadow-lg border border-border-color flex flex-col md:flex-row items-center gap-8 transition-transform hover:scale-[1.01]">
                <div className="relative w-32 md:w-40 flex-shrink-0 shadow-xl rounded-lg overflow-hidden group cursor-pointer" onClick={() => onStartReading(lastReadNovel, lastReadChapter)}>
                    <img src={lastReadNovel.coverImage} alt={lastReadNovel.title} className="w-full h-auto object-cover aspect-[2/3] transition-transform group-hover:scale-105"/>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                </div>
                
                <div className="flex-1 w-full text-center md:text-left">
                    <h3 className="text-2xl font-bold text-text-primary mb-2">{lastReadNovel.title}</h3>
                    <p className="text-lg text-text-secondary font-medium mb-4">Đang đọc: <span className="text-primary">{lastReadChapter.title}</span></p>
                    
                    <div className="max-w-md mx-auto md:mx-0">
                        <div className="flex justify-between items-center text-sm text-text-secondary mb-2 font-semibold">
                            <span>Tiến độ</span>
                            <span>{user.lastRead.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                            <div 
                                className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000 ease-out" 
                                style={{ width: `${user.lastRead.progress}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">Cập nhật lần cuối: Vừa xong</p>
                    </div>
                </div>
                
                <button onClick={() => onStartReading(lastReadNovel, lastReadChapter)} className="flex-shrink-0 bg-primary hover:bg-secondary text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1 text-lg flex items-center gap-2">
                    <Icon name="book" className="w-5 h-5"/>
                    Đọc tiếp
                </button>
            </div>
        </div>
    );
};


interface NovelListViewProps {
    novels: Novel[];
    user: User | null;
    onSelectNovel: (novel: Novel) => void;
    onStartReading: (novel: Novel, chapter: Chapter) => void;
}

const NovelListView: React.FC<NovelListViewProps> = ({ novels, user, onSelectNovel, onStartReading }) => {
    const featuredNovel = novels[0];
    const newReleases = novels.slice(1, 5);
    const popularNovels = [...novels].sort((a, b) => b.stats.views - a.stats.views).slice(0, 5);

    return (
        <div className="space-y-16 animate-fade-in pb-12">
            {/* Featured Novel Banner */}
            {featuredNovel && (
                <div onClick={() => onSelectNovel(featuredNovel)} className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-2xl h-[500px]">
                    <img src={featuredNovel.coverImage} alt={featuredNovel.title} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3 text-white">
                        <div className="inline-block px-3 py-1 bg-accent text-white text-xs font-bold uppercase tracking-wider mb-4 rounded-md">Truyện Nổi Bật</div>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight group-hover:text-secondary transition-colors">{featuredNovel.title}</h1>
                        <p className="text-lg text-slate-200 mb-6 line-clamp-2">{featuredNovel.summary}</p>
                        <div className="flex items-center gap-6">
                            <button className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition-all transform group-hover:scale-105 shadow-lg">
                                Đọc Ngay
                            </button>
                            <div className="flex items-center gap-6 text-sm font-semibold">
                                <div className="flex items-center gap-2"><Icon name="eye" className="w-5 h-5"/> {featuredNovel.stats.views.toLocaleString()}</div>
                                <div className="flex items-center gap-2"><Icon name="heart" className="w-5 h-5 text-red-500 fill-red-500"/> {featuredNovel.stats.likes.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Continue Reading Section */}
            {user && <ContinueReadingCard user={user} novels={novels} onStartReading={onStartReading} />}

            {/* New Releases */}
            <div>
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold text-text-primary flex items-center gap-3">
                        <span className="w-2 h-8 bg-accent rounded-full"></span>
                        Mới phát hành
                    </h2>
                    <button className="text-primary font-semibold hover:underline">Xem tất cả</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {newReleases.map(novel => (
                        <NovelCard key={novel.id} novel={novel} onSelectNovel={onSelectNovel} />
                    ))}
                </div>
            </div>

             {/* Popular Novels */}
            <div>
                 <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold text-text-primary flex items-center gap-3">
                        <span className="w-2 h-8 bg-yellow-500 rounded-full"></span>
                        Thịnh hành tuần này
                    </h2>
                    <button className="text-primary font-semibold hover:underline">Xem bảng xếp hạng</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {popularNovels.map(novel => (
                        <NovelCard key={novel.id} novel={novel} onSelectNovel={onSelectNovel} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NovelListView;
