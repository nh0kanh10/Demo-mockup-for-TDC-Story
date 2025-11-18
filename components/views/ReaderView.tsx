
import React, { useState, useEffect, useRef } from 'react';
import { Novel, Chapter, User } from '../../types';
import Icon from '../common/Icon';
import TableOfContentsModal from '../modals/TableOfContentsModal';

interface ReaderViewProps {
    novel: Novel;
    chapter: Chapter;
    user: User | null;
    onBack: () => void;
    onNavigateChapter: (direction: 'next' | 'prev') => void;
    onPlayAudio: (text: string) => void;
    onGetAmbientSound: (text: string) => void;
    isAudioLoading: boolean;
    onUnlockChapter: (chapter: Chapter) => void;
    vipChapterCost: number;
    onStartReading: (novel: Novel, chapter: Chapter) => void;
    onViewAiContent: (chapter: Chapter) => void;
    onUnlockAiContent?: (chapter: Chapter) => void; // New prop
}

type Theme = 'light' | 'dark' | 'sepia';

const ReaderView: React.FC<ReaderViewProps> = ({ novel, chapter, user, onBack, onNavigateChapter, onPlayAudio, onGetAmbientSound, isAudioLoading, onUnlockChapter, vipChapterCost, onStartReading, onViewAiContent, onUnlockAiContent }) => {
    const [fontSize, setFontSize] = useState(18);
    const [lineHeight, setLineHeight] = useState(1.8);
    const [theme, setTheme] = useState<Theme>('light');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isAutoScrolling, setIsAutoScrolling] = useState(false);
    const [isTocOpen, setIsTocOpen] = useState(false);
    const autoScrollIntervalRef = useRef<number | null>(null);

    // Logic checking
    const isChapterUnlocked = !chapter.isVip || (user?.unlockedChapterIds.includes(chapter.id) ?? false);
    const hasAiContent = !!(chapter.aiComicImages || chapter.aiClipUrl);
    
    const aiPrice = chapter.aiContentPrice || 0;
    const isAiContentUnlocked = aiPrice === 0 || (user?.unlockedAiContentIds?.includes(chapter.id) ?? false);


    const themeClasses = {
        light: 'bg-white text-gray-800',
        dark: 'bg-gray-900 text-gray-200',
        sepia: 'bg-[#fbf0d9] text-[#5b4636]',
    };

    const chapterIndex = novel.chapters.findIndex(c => c.id === chapter.id);
    const isFirstChapter = chapterIndex === 0;
    const isLastChapter = chapterIndex === novel.chapters.length - 1;

    const toggleAutoScroll = () => {
        if (isAutoScrolling) {
            if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
            setIsAutoScrolling(false);
        } else {
            setIsAutoScrolling(true);
            autoScrollIntervalRef.current = window.setInterval(() => {
                window.scrollBy(0, 1);
            }, 50);
        }
    };

    useEffect(() => {
        return () => {
            if (autoScrollIntervalRef.current) {
                clearInterval(autoScrollIntervalRef.current);
            }
        };
    }, []);
    
    const handleAiButtonClick = () => {
        if (!hasAiContent) return;
        
        if (isAiContentUnlocked) {
            onViewAiContent(chapter);
        } else {
            // Trigger unlock flow
            if (onUnlockAiContent) {
                onUnlockAiContent(chapter);
            } else {
                alert("Chức năng mở khóa chưa được cấu hình.");
            }
        }
    };

    const paragraphs = chapter.content.split(/\n\s*\n/).filter(p => p.trim() !== '');

    // Helper to parse inline markdown for paragraphs (safe-ish basic replace)
    const parseInlineMarkdown = (text: string) => {
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/__(.*?)__/g, '<u>$1</u>');
        return { __html: html };
    };

    const Paywall = () => (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col justify-center items-center text-center p-8 z-20">
            <Icon name="lock" className="w-16 h-16 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold text-text-primary">Đây là chương VIP</h2>
            <p className="text-text-secondary mt-2 max-w-sm">Bạn cần mở khóa chương này để tiếp tục đọc. Thao tác này sẽ sử dụng Xu từ ví của bạn.</p>
            <div className="mt-6">
                <button 
                    onClick={() => onUnlockChapter(chapter)} 
                    disabled={!user || user.coins < vipChapterCost}
                    className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full text-lg shadow-md hover:shadow-lg transition-all disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    Mở khóa với {vipChapterCost} Xu
                </button>
                {!user || user.coins < vipChapterCost && (
                     <p className="text-red-500 text-sm mt-2">Bạn không đủ Xu. Vui lòng nạp thêm.</p>
                )}
            </div>
        </div>
    );

    // New Component: AI Promotion Card at the bottom of the chapter
    const AiPromotionCard = () => {
        if (!hasAiContent) return null;

        return (
            <div className="mt-12 mb-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-900 to-purple-900 text-white shadow-xl border border-purple-500/30 relative overflow-hidden group cursor-pointer" onClick={handleAiButtonClick}>
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-30 transition-opacity transform group-hover:scale-110 duration-500">
                    <Icon name={chapter.aiComicImages ? "image" : "video"} className="w-40 h-40" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">Trải nghiệm mới</span>
                        {chapter.aiComicImages ? (
                            <span className="flex items-center gap-1 text-xs font-semibold text-blue-200"><Icon name="image" className="w-3 h-3"/> Comic Mode</span>
                        ) : (
                            <span className="flex items-center gap-1 text-xs font-semibold text-pink-200"><Icon name="video" className="w-3 h-3"/> Video Mode</span>
                        )}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Xem chương này dưới dạng {chapter.aiComicImages ? 'Truyện Tranh' : 'Phim Hoạt Hình'}!</h3>
                    <p className="text-indigo-200 mb-6 max-w-lg">Công nghệ AI của chúng tôi đã chuyển thể văn bản thành hình ảnh sống động. Hãy thưởng thức ngay.</p>
                    
                    <button 
                        className={`flex items-center gap-2 font-bold py-3 px-8 rounded-full shadow-lg transition-all transform group-hover:-translate-y-1 ${isAiContentUnlocked ? 'bg-white text-indigo-900 hover:bg-indigo-50' : 'bg-yellow-500 text-white hover:bg-yellow-400'}`}
                    >
                        {isAiContentUnlocked ? (
                            <>
                                <Icon name="eye" className="w-5 h-5"/>
                                Xem Ngay (Miễn phí)
                            </>
                        ) : (
                            <>
                                <Icon name="lock" className="w-5 h-5"/>
                                Mở khóa ({aiPrice} Xu)
                            </>
                        )}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className={`fixed inset-0 z-50 transition-colors ${themeClasses[theme]}`}>
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-surface/80 backdrop-blur-sm shadow-md z-10 border-b border-border-color">
                <div className="container mx-auto p-4 flex justify-between items-center">
                    <button onClick={onBack} className="flex items-center gap-2 font-semibold hover:text-primary">
                        <Icon name="arrow-left" className="w-6 h-6" />
                        <span className="max-w-[150px] sm:max-w-md truncate">{novel.title}</span>
                    </button>
                    <div className="flex items-center gap-2">
                        {hasAiContent && (
                            <div className="relative group">
                                <button 
                                    onClick={handleAiButtonClick} 
                                    className={`p-2 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors ${isAiContentUnlocked ? 'text-accent' : 'text-yellow-600 bg-yellow-50'}`} 
                                    disabled={!isChapterUnlocked}
                                    title={isAiContentUnlocked ? "Xem bản AI" : `Mở khóa nội dung AI (${aiPrice} Xu)`}
                                >
                                    <Icon name={isAiContentUnlocked ? "ai" : "lock"} className="w-6 h-6" />
                                    {!isAiContentUnlocked && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full border border-white">{aiPrice}</span>}
                                </button>
                                {!isAiContentUnlocked && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-black/80 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        Nội dung AI có phí: {aiPrice} Xu
                                    </div>
                                )}
                            </div>
                        )}
                        <button onClick={() => onPlayAudio(chapter.content)} title="Nghe Audio AI" className={`p-2 rounded-full hover:bg-slate-200 ${isAudioLoading ? 'animate-pulse text-primary' : ''}`} disabled={isAudioLoading || !isChapterUnlocked}>
                            <Icon name="volume-2" className="w-6 h-6" />
                        </button>
                         <button onClick={() => onGetAmbientSound(chapter.content)} title="Âm thanh không gian" className="p-2 rounded-full hover:bg-slate-200" disabled={!isChapterUnlocked}>
                            <Icon name="waves" className="w-6 h-6" />
                        </button>
                        <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} title="Cài đặt" className="p-2 rounded-full hover:bg-slate-200">
                            <Icon name="settings" className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Settings Panel */}
            {isSettingsOpen && (
                <div className="fixed top-20 right-4 bg-surface rounded-lg shadow-xl p-4 border border-border-color w-72 z-20 animate-fade-in">
                    <div className="space-y-4">
                        <div>
                            <label className="font-semibold text-sm text-text-primary">Cỡ chữ</label>
                            <div className="flex items-center gap-2 mt-1">
                                <button onClick={() => setFontSize(s => Math.max(12, s - 2))} className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300 text-text-primary">-</button>
                                <span className="flex-1 text-center text-text-primary font-medium">{fontSize}px</span>
                                <button onClick={() => setFontSize(s => Math.min(32, s + 2))} className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300 text-text-primary">+</button>
                            </div>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-text-primary">Giãn dòng</label>
                             <div className="flex items-center gap-2 mt-1">
                                <button onClick={() => setLineHeight(lh => Math.max(1.4, lh - 0.2))} className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300 text-text-primary">-</button>
                                <span className="flex-1 text-center text-text-primary font-medium">{lineHeight.toFixed(1)}</span>
                                <button onClick={() => setLineHeight(lh => Math.min(2.4, lh + 0.2))} className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300 text-text-primary">+</button>
                            </div>
                        </div>
                        <div>
                             <label className="font-semibold text-sm text-text-primary">Màu nền</label>
                             <div className="flex justify-between mt-2 gap-2">
                                <button onClick={() => setTheme('light')} className={`flex-1 h-10 rounded-lg bg-white border-2 ${theme === 'light' ? 'border-primary' : 'border-slate-300'}`} title="Sáng"></button>
                                <button onClick={() => setTheme('sepia')} className={`flex-1 h-10 rounded-lg bg-[#fbf0d9] border-2 ${theme === 'sepia' ? 'border-primary' : 'border-slate-300'}`} title="Sepia"></button>
                                <button onClick={() => setTheme('dark')} className={`flex-1 h-10 rounded-lg bg-gray-900 border-2 ${theme === 'dark' ? 'border-primary' : 'border-slate-300'}`} title="Tối"></button>
                             </div>
                        </div>
                         <div>
                             <label className="font-semibold text-sm text-text-primary">Cuộn tự động</label>
                            <button onClick={toggleAutoScroll} disabled={!isChapterUnlocked} className={`mt-2 w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${isAutoScrolling ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-text-primary'} disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed`}>
                                 <Icon name={isAutoScrolling ? "close" : "move-down"} className="w-4 h-4"/>
                                 {isAutoScrolling ? 'Dừng cuộn' : 'Bắt đầu cuộn'}
                             </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Content */}
            <main className="container relative mx-auto max-w-3xl px-4 pt-24 pb-32 overflow-y-auto h-full scroll-smooth" onClick={() => isSettingsOpen && setIsSettingsOpen(false)}>
                {!isChapterUnlocked && <Paywall />}
                <div className={`${!isChapterUnlocked ? 'blur-sm select-none' : ''}`}>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center leading-tight">{chapter.title}</h1>
                    <p className="text-center text-sm text-text-secondary mb-8 font-medium">Chương {chapter.chapterNumber}</p>
                    <div 
                        className="prose prose-lg max-w-none prose-p:text-justify"
                        style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }}
                    >
                        {paragraphs.map((p, index) => (
                            <div key={index} className="relative group my-4">
                                <p className="mb-0" dangerouslySetInnerHTML={parseInlineMarkdown(p)}></p>
                                {/* Comment bubble placeholder */}
                                <button onClick={() => alert(`Bình luận cho đoạn ${index+1}`)} className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-text-secondary shadow-sm hidden md:block">
                                    <Icon name="message-circle" className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* AI Promotion Card */}
                    {isChapterUnlocked && <AiPromotionCard />}
                </div>
            </main>

            {/* Footer / Navigation */}
            <footer className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md z-10 border-t border-border-color shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="container mx-auto p-4 flex justify-between items-center max-w-3xl">
                    <button onClick={() => onNavigateChapter('prev')} disabled={isFirstChapter} className="bg-surface hover:bg-slate-100 border border-border-color text-text-primary font-semibold py-2 px-4 md:px-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-sm">
                        <Icon name="arrow-left" className="w-4 h-4"/> <span className="hidden sm:inline">Chương Trước</span>
                    </button>
                    <button onClick={() => setIsTocOpen(true)} className="flex flex-col items-center justify-center gap-1 text-xs font-semibold text-text-secondary hover:text-primary transition-colors px-4">
                        <Icon name="list" className="w-6 h-6"/>
                        <span>Mục lục</span>
                    </button>
                     <button onClick={() => onNavigateChapter('next')} disabled={isLastChapter} className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 md:px-6 rounded-full disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-sm shadow-md">
                        <span className="hidden sm:inline">Chương Sau</span> <Icon name="arrow-left" className="w-4 h-4 transform rotate-180"/>
                    </button>
                </div>
            </footer>

            {isTocOpen && (
                <TableOfContentsModal 
                    novel={novel}
                    user={user}
                    currentChapterId={chapter.id}
                    onClose={() => setIsTocOpen(false)}
                    onSelectChapter={(selectedChapter) => {
                        onStartReading(novel, selectedChapter);
                        setIsTocOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default ReaderView;
