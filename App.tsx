
import React, { useState, useEffect, useRef } from 'react';
import { View, User, Novel, Chapter, AIConversionRequest, CoinPackage, AIConversionStatus, Review, Gift, CommunityPost, CommunityReply } from './types';
import { mockNovels, mockUser, mockCommunityPosts, mockCoinPackages, mockNewsArticles, allGenres, mockGifts } from './data/mockData';
import { generateComicPanels, generateShortClip, generateSpeech, analyzeAmbientSound } from './services/geminiService';

import Header from './components/layout/Header';
import NovelListView from './components/views/NovelListView';
import StoryDetailView from './components/views/StoryDetailView';
import ReaderView from './components/views/ReaderView';
import AuthView from './components/views/AuthView';
import LibraryView from './components/views/LibraryView';
import AuthorDashboardView from './components/views/AuthorDashboardView';
import EditStoryView from './components/views/EditStoryView';
import PostStoryView from './components/views/PostStoryView';
import RankingView from './components/views/RankingView';
import CommunityView from './components/views/CommunityView';
import QuestsView from './components/views/QuestsView';
import CoinShopView from './components/views/CoinShopView';
import PaymentView from './components/views/PaymentView';
import StoreView from './components/views/StoreView';
import NewsView from './components/views/NewsView';
import AuthorSettingsView from './components/views/AuthorSettingsView';
import AdvancedSearchView from './components/views/AdvancedSearchView';
import PlaceholderView from './components/views/PlaceholderView';
import AiConversionModal from './components/modals/AiConversionModal';
import AiProcessingModal from './components/modals/AiProcessingModal';
import AiResultModal from './components/modals/AiResultModal';
import CreateCollectionModal from './components/modals/CreateCollectionModal';
import InterestSelectionModal from './components/modals/InterestSelectionModal';
import GiftModal from './components/modals/GiftModal';
import BookmarkModal from './components/modals/BookmarkModal';
import ReadingRoomModal from './components/modals/ReadingRoomModal';
import ProfileView from './components/views/ProfileView';
import CommunityPostDetailView from './components/views/CommunityPostDetailView';
import Icon from './components/common/Icon';

// --- Constants ---
const VIP_CHAPTER_COST = 100; // 100 coins to unlock a chapter
const AI_CREDIT_PACKS = {
    '1': { amount: 1, cost: 100 },
    '5': { amount: 5, cost: 450 },
    '10': { amount: 10, cost: 850 },
}

// --- Audio Utility Functions ---
function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}

// --- MODAL COMPONENTS (Defined here to avoid creating new files) ---

interface CreatePostModalProps {
    onClose: () => void;
    onCreatePost: (post: { title: string; content: string }) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onCreatePost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && content.trim()) {
            onCreatePost({ title, content });
        } else {
            alert("Vui lòng nhập đầy đủ tiêu đề và nội dung.");
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-surface rounded-lg shadow-2xl p-6 w-full max-w-2xl relative animate-fade-in-up border border-border-color" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-text-primary transition-colors">
                    <Icon name="close" className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-text-primary text-center">Tạo chủ đề mới</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="post-title" className="font-semibold text-text-primary">Tiêu đề</label>
                        <input
                            id="post-title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="mt-1 w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Nhập tiêu đề hấp dẫn..."
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="post-content" className="font-semibold text-text-primary">Nội dung</label>
                        <textarea
                            id="post-content"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={8}
                            className="mt-1 w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Chia sẻ cảm nghĩ, giả thuyết hoặc câu hỏi của bạn..."
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4 border-t border-border-color">
                        <button type="button" onClick={onClose} className="bg-slate-200 hover:bg-slate-300 text-text-primary font-semibold py-2 px-6 rounded-lg">
                            Hủy
                        </button>
                        <button type="submit" className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg">
                            Đăng bài
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const App: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [user, setUser] = useState<User | null>(null);
    const [novels, setNovels] = useState<Novel[]>(mockNovels);
    const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(mockCommunityPosts);
    const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
    const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
    const [selectedCoinPackage, setSelectedCoinPackage] = useState<CoinPackage | null>(null);
    const [selectedCommunityPost, setSelectedCommunityPost] = useState<CommunityPost | null>(null);
    const [pendingUser, setPendingUser] = useState<Partial<User> | null>(null);
    
    // State for Library Tab Control
    const [libraryTab, setLibraryTab] = useState('history');

    // State for Search
    const [searchKeyword, setSearchKeyword] = useState('');

    // Modal States
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isCreateCollectionModalOpen, setIsCreateCollectionModalOpen] = useState(false);
    const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
    const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
    const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
    const [isReadingRoomModalOpen, setIsReadingRoomModalOpen] = useState(false);
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

    // AI Conversion State
    const [aiRequest, setAiRequest] = useState<AIConversionRequest | null>(null);
    const [isAiConversionModalOpen, setIsAiConversionModalOpen] = useState(false);
    const [isAiProcessingModalOpen, setIsAiProcessingModalOpen] = useState(false);
    const [isAiResultModalOpen, setIsAiResultModalOpen] = useState(false);
    const [processingMessage, setProcessingMessage] = useState('Yêu cầu của bạn đang được xử lý...');
    const [viewingChapter, setViewingChapter] = useState<Chapter | null>(null);


    // Audio State
    const audioContextRef = useRef<AudioContext | null>(null);
    const [isAudioLoading, setIsAudioLoading] = useState(false);

    const handleNavigate = (newView: View) => {
        setView(newView);
        setSelectedNovel(null);
        setSelectedChapter(null);
        setSelectedCommunityPost(null);
        // Do not clear searchKeyword here if navigating to advancedSearch, 
        // but you might want to clear it if going to 'home'. 
        // For simplicity, we keep it or the AdvancedSearchView handles its own clear on mount if needed.
        if (newView !== 'advancedSearch') {
            setSearchKeyword('');
        }
    };

    const handleSearch = (keyword: string) => {
        setSearchKeyword(keyword);
        setView('advancedSearch');
    };

    const handleLogin = (partialUser: Partial<User>) => {
        setUser({ ...mockUser, username: partialUser.username! });
        setIsAuthModalOpen(false);
    };

    const handleRegister = (partialUser: Partial<User>) => {
        setPendingUser(partialUser);
        setIsAuthModalOpen(false);
        setIsInterestModalOpen(true);
    };

    const handleFinishRegistration = (favoriteGenres: string[]) => {
        if (!pendingUser) return;
        const newUser: User = {
            ...mockUser,
            username: pendingUser.username!,
            isAuthor: false, // All new users are readers by default
            authorApplicationStatus: 'none',
            favoriteGenres: favoriteGenres,
        };
        setUser(newUser);
        setIsInterestModalOpen(false);
        setPendingUser(null);
    };
    
    const handleApplyForAuthor = (penName: string, bio: string) => {
        if(!user) return;
        // In a real app, this would send a request to the backend.
        // Here, we simulate the process.
        setUser(prev => prev ? ({ ...prev, authorApplicationStatus: 'pending' }) : null);
        
        // Simulate an approval process
        setTimeout(() => {
            alert(`Chúc mừng ${penName}! Đơn đăng ký tác giả của bạn đã được duyệt.`);
            setUser(prev => prev ? ({
                ...prev,
                isAuthor: true,
                authorApplicationStatus: 'approved'
            }) : null);
        }, 3000); // Auto-approve after 3 seconds for demo
    };


    const handleLogout = () => {
        setUser(null);
        setView('home');
    };

    const handleSelectNovel = (novel: Novel) => {
        setSelectedNovel(novel);
        setView('storyDetail');
    };

    const handleStartReading = (novel: Novel, chapter: Chapter) => {
        setSelectedNovel(novel);
        setSelectedChapter(chapter);
        setView('reader');
    };

    const handleNavigateChapter = (direction: 'next' | 'prev') => {
        if (!selectedNovel || !selectedChapter) return;
        const currentIndex = selectedNovel.chapters.findIndex(c => c.id === selectedChapter.id);
        const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (newIndex >= 0 && newIndex < selectedNovel.chapters.length) {
            handleStartReading(selectedNovel, selectedNovel.chapters[newIndex]);
        }
    };
    
    const handlePostStory = (newNovelData: Omit<Novel, 'id' | 'authorId' | 'reviews' | 'stats' | 'createdAt' | 'author' | 'fanArt'>) => {
        if(!user) return;
        const newNovel: Novel = {
            ...newNovelData,
            id: `novel-${Date.now()}`,
            author: user.username,
            authorId: user.id,
            reviews: [],
            stats: { views: 0, likes: 0, bookmarks: 0 },
            createdAt: new Date().toISOString(),
            fanArt: [],
        };
        setNovels(prev => [newNovel, ...prev]);
        setView('authorDashboard');
    };

    const handleEditStory = (novel: Novel) => {
        setSelectedNovel(novel);
        setView('editStory');
    }

    const handleSaveNovel = (updatedNovel: Novel) => {
        setNovels(novels.map(n => n.id === updatedNovel.id ? updatedNovel : n));
        setView('authorDashboard');
    }
    
    const handleClaimQuest = (questId: string) => {
        if(!user) return;
        const updatedUser = { ...user };
        const quest = updatedUser.quests.find(q => q.id === questId);
        if(quest && !quest.isCompleted && quest.currentProgress >= quest.goal) {
            quest.isCompleted = true;
            updatedUser.coins += quest.rewardCoins;
            setUser(updatedUser);
        }
    }

    const handlePostReview = (novelId: string, rating: number, comment: string, isSpoiler: boolean, voteType?: 'recommend' | 'critique') => {
        if (!user) {
            alert("Bạn cần đăng nhập để viết đánh giá.");
            setIsAuthModalOpen(true);
            return;
        }
        setNovels(prevNovels => {
            return prevNovels.map(novel => {
                if (novel.id === novelId) {
                    const newReview: Review = {
                        id: `review-${Date.now()}`,
                        author: user.username,
                        rating,
                        comment,
                        isSpoiler,
                        voteType,
                    };
                    return { ...novel, reviews: [newReview, ...novel.reviews] };
                }
                return novel;
            });
        });
    };
    
    const handleCreateCollection = (name: string) => {
        if (!user) return;
        const newCollection = {
            id: `col-${Date.now()}`,
            name,
            novelIds: [],
        };
        setUser(prevUser => prevUser ? { ...prevUser, collections: [...prevUser.collections, newCollection] } : null);
        setIsCreateCollectionModalOpen(false);
    };

    const handleCreatePost = (post: { title: string; content: string }) => {
        if (!user) {
            alert("Bạn cần đăng nhập để đăng bài.");
            setIsAuthModalOpen(true);
            return;
        }
        const newPost: CommunityPost = {
            id: `post-${Date.now()}`,
            title: post.title,
            content: post.content,
            author: user.username,
            createdAt: new Date().toISOString(),
            replies: [],
        };
        setCommunityPosts(prev => [newPost, ...prev]);
        setIsCreatePostModalOpen(false);
    };

    const handleSelectCommunityPost = (post: CommunityPost) => {
        setSelectedCommunityPost(post);
        setView('communityPostDetail');
    };

    const handlePostReply = (postId: string, content: string) => {
        if (!user) {
            alert("Bạn cần đăng nhập để trả lời.");
            setIsAuthModalOpen(true);
            return;
        }
        const newReply: CommunityReply = {
            id: `reply-${Date.now()}`,
            author: user.username,
            content,
            createdAt: new Date().toISOString(),
            likes: 0,
        };

        const updatedPosts = communityPosts.map(post => {
            if (post.id === postId) {
                return { ...post, replies: [...post.replies, newReply] };
            }
            return post;
        });
        setCommunityPosts(updatedPosts);
        setSelectedCommunityPost(updatedPosts.find(p => p.id === postId) || null);
    };

    const handleLikeReply = (postId: string, replyId: string) => {
        if (!user) {
            alert("Bạn cần đăng nhập để thích trả lời.");
            setIsAuthModalOpen(true);
            return;
        }

        const likedReplyIds = user.likedReplyIds || [];
        const isLiked = likedReplyIds.includes(replyId);
        
        const updatedUser = {
            ...user,
            likedReplyIds: isLiked
                ? likedReplyIds.filter(id => id !== replyId)
                : [...likedReplyIds, replyId],
        };
        setUser(updatedUser);

        const updatedPosts = communityPosts.map(post => {
            if (post.id === postId) {
                const updatedReplies = post.replies.map(reply => {
                    if (reply.id === replyId) {
                        return { ...reply, likes: isLiked ? reply.likes - 1 : reply.likes + 1 };
                    }
                    return reply;
                });
                return { ...post, replies: updatedReplies };
            }
            return post;
        });
        setCommunityPosts(updatedPosts);
        setSelectedCommunityPost(updatedPosts.find(p => p.id === postId) || null);
    };


    const handleRequestAIConversion = (novel: Novel, chapter: Chapter) => {
        if(!user){
            alert("Bạn cần đăng nhập để sử dụng tính năng này.");
            setIsAuthModalOpen(true);
            return;
        }
        if(user.aiCredits <= 0) {
            alert("Bạn đã hết lượt chuyển đổi AI. Vui lòng mua thêm trong Cửa hàng.");
            setView('store');
            return;
        }
        setSelectedNovel(novel);
        setSelectedChapter(chapter);
        setIsAiConversionModalOpen(true);
    };

    const handleSubmitAIRequest = async (request: Omit<AIConversionRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
        if (!user) return;
        setIsAiConversionModalOpen(false);
        const fullRequest: AIConversionRequest = { ...request, id: `ai-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), status: 'processing' };
        setAiRequest(fullRequest);
        setIsAiProcessingModalOpen(true);
        
        setUser(prev => prev ? ({ ...prev, aiCredits: prev.aiCredits - 1 }) : null);

        try {
            const chapterContent = selectedNovel?.chapters.find(c => c.id === request.chapterId)?.content || '';
            if (request.type === 'comic') {
                setProcessingMessage("AI đang phân tích văn bản và phác thảo các khung hình...");
                const images = await generateComicPanels(chapterContent, request.prompt);
                setProcessingMessage("Hoàn tất! Đang tạo bản xem trước...");
                setAiRequest({ ...fullRequest, status: 'completed', resultImages: images });
            } else {
                setProcessingMessage("AI đang dựng cảnh và tạo hoạt ảnh cho video...");
                const videoUrl = await generateShortClip(chapterContent, request.prompt);
                setProcessingMessage("Hoàn tất! Đang tạo bản xem trước...");
                setAiRequest({ ...fullRequest, status: 'completed', resultVideoUrl: videoUrl });
            }
            setTimeout(() => { setIsAiProcessingModalOpen(false); setIsAiResultModalOpen(true); }, 1000);
        } catch(error) {
            console.error("AI Generation failed:", error);
            setAiRequest({ ...fullRequest, status: 'failed' });
            setIsAiProcessingModalOpen(false);
            // Refund credit on failure
            setUser(prev => prev ? ({ ...prev, aiCredits: prev.aiCredits + 1 }) : null);
        }
    };
    
    const handleSaveAiResult = () => {
        if (!aiRequest || !selectedNovel || !selectedChapter) return;
        const updatedNovels = novels.map(novel => {
            if (novel.id === selectedNovel.id) {
                const updatedChapters = novel.chapters.map(chapter => {
                    if (chapter.id === selectedChapter.id) {
                        return {
                            ...chapter,
                            aiComicImages: aiRequest.resultImages,
                            aiClipUrl: aiRequest.resultVideoUrl,
                            aiStats: { views: 0, likes: 0 } // Initialize stats
                        };
                    }
                    return chapter;
                });
                return { ...novel, chapters: updatedChapters };
            }
            return novel;
        });
        setNovels(updatedNovels);
        setIsAiResultModalOpen(false);
    };
    
    const handleViewAiContent = (chapter: Chapter) => {
        setViewingChapter(chapter);
    };


    const handlePlayAudio = async (text: string) => {
        if (isAudioLoading) return;
        setIsAudioLoading(true);
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            }
            const audioContext = audioContextRef.current;
            const base64Audio = await generateSpeech(text);
            const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext, 24000, 1);
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start();
        } catch (error) {
            console.error("Failed to play audio:", error);
            alert("Không thể phát âm thanh. Vui lòng thử lại.");
        } finally {
            setIsAudioLoading(false);
        }
    };
    
    const handleGetAmbientSound = async (text: string) => {
        try {
            const soundDescription = await analyzeAmbientSound(text);
            alert(`Âm thanh môi trường: ${soundDescription}`);
        } catch (error) {
            alert("Không thể phân tích âm thanh môi trường.");
        }
    };
    
    const handleCompletePurchase = (pkg: CoinPackage) => {
        if (!user) return;
        const totalCoins = pkg.amount + pkg.bonus;
        setUser(prev => prev ? ({ ...prev, coins: prev.coins + totalCoins }) : null);
        alert(`Bạn đã nạp thành công ${totalCoins.toLocaleString()} Xu!`);
        setView('coinShop');
    };

    const handlePurchaseAiCredits = (pack: keyof typeof AI_CREDIT_PACKS) => {
        if (!user) { setIsAuthModalOpen(true); return; }
        const { amount, cost } = AI_CREDIT_PACKS[pack];
        if (user.coins < cost) {
            alert("Bạn không đủ Xu để mua gói này. Vui lòng nạp thêm.");
            setView('coinShop');
            return;
        }
        if (window.confirm(`Bạn có chắc muốn dùng ${cost} Xu để mua ${amount} lượt chuyển đổi AI không?`)) {
            setUser(prev => prev ? ({ ...prev, coins: prev.coins - cost, aiCredits: prev.aiCredits + amount }) : null);
            alert(`Mua thành công! Bạn nhận được ${amount} lượt chuyển đổi AI.`);
        }
    };

    const handleUnlockChapter = (chapter: Chapter) => {
        if (!user) { setIsAuthModalOpen(true); return; }
        if (user.coins < VIP_CHAPTER_COST) {
            alert("Bạn không đủ Xu để mở khóa chương này. Vui lòng nạp thêm.");
            setView('coinShop');
            return;
        }
        if (window.confirm(`Bạn có muốn dùng ${VIP_CHAPTER_COST} Xu để mở khóa "${chapter.title}" không?`)) {
            setUser(prev => prev ? ({ 
                ...prev, 
                coins: prev.coins - VIP_CHAPTER_COST,
                unlockedChapterIds: [...prev.unlockedChapterIds, chapter.id]
            }) : null);
        }
    };

    const handleUnlockAiContent = (chapter: Chapter) => {
        if (!user) { setIsAuthModalOpen(true); return; }
        const cost = chapter.aiContentPrice || 0;
        if (user.coins < cost) {
            alert("Bạn không đủ Xu để mở khóa nội dung AI này. Vui lòng nạp thêm.");
            setView('coinShop');
            return;
        }
        if (window.confirm(`Bạn có muốn dùng ${cost} Xu để xem nội dung AI (Truyện tranh/Video) của chương này không?`)) {
            setUser(prev => prev ? ({
                ...prev,
                coins: prev.coins - cost,
                unlockedAiContentIds: [...(prev.unlockedAiContentIds || []), chapter.id]
            }) : null);
            // Automatically view content after unlock
            setViewingChapter(chapter);
        }
    };

    // --- Demo Modal Handlers ---
    const handleOpenGiftModal = (novel: Novel) => { setSelectedNovel(novel); setIsGiftModalOpen(true); };
    const handleOpenBookmarkModal = (novel: Novel) => { setSelectedNovel(novel); setIsBookmarkModalOpen(true); };
    const handleOpenReadingRoomModal = (novel: Novel) => { setSelectedNovel(novel); setIsReadingRoomModalOpen(true); };

    const handleSendGift = (gift: Gift) => {
        if (!user || !selectedNovel) return;
        if (user.coins < gift.price) {
            alert("Bạn không đủ Xu để tặng quà này.");
            return;
        }
        setUser(prev => prev ? ({ ...prev, coins: prev.coins - gift.price }) : null);
        alert(`Bạn đã tặng "${gift.name}" cho tác giả của truyện "${selectedNovel.title}"!`);
        setIsGiftModalOpen(false);
    };

    const handleUpdateCollections = (novelId: string, collectionIds: string[]) => {
        if (!user) return;
        const collectionIdsSet = new Set(collectionIds);
        const updatedCollections = user.collections.map(collection => {
            const hasNovel = collection.novelIds.includes(novelId);
            const shouldHaveNovel = collectionIdsSet.has(collection.id);
            if (hasNovel && !shouldHaveNovel) {
                return { ...collection, novelIds: collection.novelIds.filter(id => id !== novelId) };
            }
            if (!hasNovel && shouldHaveNovel) {
                return { ...collection, novelIds: [...collection.novelIds, novelId] };
            }
            return collection;
        });
        setUser({ ...user, collections: updatedCollections });
        setIsBookmarkModalOpen(false);
        alert("Đã cập nhật bộ sưu tập!");
    };


    const renderView = () => {
        switch (view) {
            case 'home': return <NovelListView novels={novels} onSelectNovel={handleSelectNovel} user={user} onStartReading={handleStartReading} />;
            case 'storyDetail': return selectedNovel && <StoryDetailView novel={selectedNovel} user={user} onBack={() => handleNavigate('home')} onStartReading={handleStartReading} onPostReview={handlePostReview} onGift={() => handleOpenGiftModal(selectedNovel)} onBookmark={() => handleOpenBookmarkModal(selectedNovel)} onReadingRoom={() => handleOpenReadingRoomModal(selectedNovel)} />;
            case 'reader': return selectedNovel && selectedChapter && <ReaderView novel={selectedNovel} chapter={selectedChapter} user={user} onBack={() => handleNavigate('storyDetail')} onNavigateChapter={handleNavigateChapter} onPlayAudio={handlePlayAudio} onGetAmbientSound={handleGetAmbientSound} isAudioLoading={isAudioLoading} onUnlockChapter={handleUnlockChapter} vipChapterCost={VIP_CHAPTER_COST} onStartReading={handleStartReading} onViewAiContent={handleViewAiContent} onUnlockAiContent={handleUnlockAiContent}/>;
            case 'library': return user ? <LibraryView user={user} novels={novels} onSelectNovel={handleSelectNovel} onCreateCollection={() => setIsCreateCollectionModalOpen(true)} defaultTab={libraryTab}/> : <PlaceholderView title="Yêu cầu đăng nhập" message="Bạn cần đăng nhập để xem tủ truyện." icon="log-in" />;
            case 'profile': return user ? <ProfileView user={user} onApplyForAuthor={handleApplyForAuthor} /> : <PlaceholderView title="Yêu cầu đăng nhập" message="Bạn cần đăng nhập để xem hồ sơ." icon="log-in" />;
            case 'ranking': return <RankingView novels={novels} onSelectNovel={handleSelectNovel} />;
            case 'community': return <CommunityView posts={communityPosts} onCreatePost={() => setIsCreatePostModalOpen(true)} onSelectPost={handleSelectCommunityPost} />;
            case 'communityPostDetail': return selectedCommunityPost && <CommunityPostDetailView post={selectedCommunityPost} user={user} onBack={() => handleNavigate('community')} onPostReply={handlePostReply} onLikeReply={handleLikeReply} />;
            case 'quests': return user ? <QuestsView user={user} onClaimQuest={handleClaimQuest}/> : <PlaceholderView title="Yêu cầu đăng nhập" message="Bạn cần đăng nhập để xem nhiệm vụ." icon="log-in" />;
            case 'coinShop': return <CoinShopView packages={mockCoinPackages} onSelectPackage={(pkg) => { setSelectedCoinPackage(pkg); setView('payment'); }} />;
            case 'payment': return <PaymentView selectedPackage={selectedCoinPackage} onBack={() => setView('coinShop')} onCompletePurchase={handleCompletePurchase} />;
            case 'store': return <StoreView user={user} onPurchaseCredit={handlePurchaseAiCredits} />;
            case 'news': return <NewsView articles={mockNewsArticles} />;
            case 'advancedSearch': return <AdvancedSearchView onFilterChange={(filters) => console.log(filters)} genres={allGenres} novels={novels} onSelectNovel={handleSelectNovel} initialKeyword={searchKeyword}/>;
            case 'authorDashboard': return user?.isAuthor ? <AuthorDashboardView novels={novels.filter(n => n.authorId === user.id)} user={user} onEditNovel={handleEditStory} onPostNewStory={() => setView('postStory')}/> : <PlaceholderView title="Truy cập bị từ chối" message="Bạn không phải là tác giả." icon="lock" />;
            case 'editStory': return selectedNovel && <EditStoryView novel={selectedNovel} onSave={handleSaveNovel} onBack={() => setView('authorDashboard')} onRequestAIConversion={handleRequestAIConversion} />;
            case 'postStory': return <PostStoryView onPostStory={handlePostStory} onCancel={() => setView('authorDashboard')}/>;
            case 'authorSettings': return user?.isAuthor ? <AuthorSettingsView /> : <PlaceholderView title="Truy cập bị từ chối" message="Bạn không phải là tác giả." icon="lock" />;
            default: return <PlaceholderView title={view} message="Tính năng này đang được phát triển." icon="construct" />;
        }
    };

    return (
        <div className="bg-background min-h-screen font-sans text-text-primary">
            <Header 
                user={user} 
                onNavigate={(v) => { setLibraryTab('history'); handleNavigate(v); }} 
                onLogin={() => setIsAuthModalOpen(true)} 
                onLogout={handleLogout} 
                onOpenFollowing={() => { setLibraryTab('following'); setView('library'); }}
                onSearch={handleSearch}
            />
            <main className="container mx-auto p-4 md:p-8">
                {renderView()}
            </main>
            {isAuthModalOpen && <AuthView onLogin={handleLogin} onRegister={handleRegister} onClose={() => setIsAuthModalOpen(false)} />}
            {isInterestModalOpen && <InterestSelectionModal genres={allGenres} onComplete={handleFinishRegistration} />}
            {isCreateCollectionModalOpen && <CreateCollectionModal onClose={() => setIsCreateCollectionModalOpen(false)} onCreate={handleCreateCollection} />}
            {isCreatePostModalOpen && <CreatePostModal onClose={() => setIsCreatePostModalOpen(false)} onCreatePost={handleCreatePost} />}
            {isAiConversionModalOpen && selectedNovel && selectedChapter && (
                <AiConversionModal 
                    novelId={selectedNovel.id}
                    chapterId={selectedChapter.id}
                    chapterTitle={selectedChapter.title}
                    onClose={() => setIsAiConversionModalOpen(false)}
                    onSubmit={handleSubmitAIRequest}
                />
            )}
            {isAiProcessingModalOpen && <AiProcessingModal message={processingMessage} />}
            {isAiResultModalOpen && aiRequest && (
                <AiResultModal
                    request={aiRequest}
                    onClose={() => setIsAiResultModalOpen(false)}
                    onRetry={() => { setIsAiResultModalOpen(false); handleRequestAIConversion(selectedNovel!, selectedChapter!); }}
                    onSave={handleSaveAiResult}
                />
            )}
            {viewingChapter && (
                 <AiResultModal
                    request={{ // build a request-like object
                        id: `view-${viewingChapter.id}`,
                        chapterTitle: viewingChapter.title,
                        type: viewingChapter.aiComicImages ? 'comic' : 'clip',
                        status: 'completed',
                        resultImages: viewingChapter.aiComicImages,
                        resultVideoUrl: viewingChapter.aiClipUrl,
                        // dummy values for other required fields
                        novelId: '', chapterId: '', style: '', quality: '720p', createdAt: '', updatedAt: ''
                    }}
                    onClose={() => setViewingChapter(null)}
                />
            )}
        </div>
    );
};

export default App;