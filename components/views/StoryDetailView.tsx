
import React, { useState } from 'react';
import { Novel, Chapter, Review, User } from '../../types';
import Icon from '../common/Icon';
import RichTextEditor from '../common/RichTextEditor';
import MarkdownView from '../common/MarkdownView';

interface StoryDetailViewProps {
    novel: Novel;
    user: User | null;
    onBack: () => void;
    onStartReading: (novel: Novel, chapter: Chapter) => void;
    onPostReview: (novelId: string, rating: number, comment: string, isSpoiler: boolean, voteType: 'recommend' | 'critique') => void;
    onGift: () => void;
    onBookmark: () => void;
    onReadingRoom: () => void;
}

const SpoilerContent: React.FC<{ children: string }> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    if (isVisible) {
        return <MarkdownView content={children} className="mt-1" />;
    }

    return (
        <button onClick={() => setIsVisible(true)} className="w-full text-left bg-slate-100 p-3 rounded-md text-text-secondary hover:bg-slate-200 transition-colors mt-1">
            Bình luận này chứa spoiler. Nhấn để xem.
        </button>
    );
};


const StoryDetailView: React.FC<StoryDetailViewProps> = ({ novel, user, onBack, onStartReading, onPostReview, onGift, onBookmark, onReadingRoom }) => {
    const averageRating = (novel.reviews.reduce((acc, r) => acc + r.rating, 0) / (novel.reviews.length || 1)).toFixed(1);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState('');
    const [isSpoiler, setIsSpoiler] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const [voteType, setVoteType] = useState<'recommend' | 'critique' | null>(null);
    const [activeTab, setActiveTab] = useState<'chapters' | 'reviews' | 'fanArt'>('chapters');


    const handleReviewSubmit = () => {
        if (!voteType) {
            alert('Vui lòng chọn Đề cử hoặc Chê trước khi gửi đánh giá.');
            return;
        }
        if (newComment.trim() === '') {
            alert('Vui lòng nhập bình luận của bạn.');
            return;
        }
        
        onPostReview(novel.id, newRating, newComment, isSpoiler, voteType);
        
        setNewRating(5);
        setNewComment('');
        setIsSpoiler(false);
        setVoteType(null);
    };
    
    const TabButton: React.FC<{tabName: typeof activeTab, label: string}> = ({ tabName, label }) => (
         <button 
            onClick={() => setActiveTab(tabName)} 
            className={`px-6 py-3 font-semibold transition-colors ${activeTab === tabName ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-primary'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="space-y-8 animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-text-secondary font-semibold hover:text-primary transition-colors">
                <Icon name="arrow-left" className="w-5 h-5" />
                Quay lại
            </button>

            {/* Novel Header */}
            <div className="flex flex-col md:flex-row gap-8">
                <img src={novel.coverImage} alt={novel.title} className="w-full md:w-64 h-96 object-cover rounded-lg shadow-lg border border-border-color" />
                <div className="flex-1">
                    <h1 className="text-4xl font-bold text-text-primary">{novel.title}</h1>
                    <div className="flex items-center gap-4 mt-2">
                        <p className="text-lg text-text-secondary">bởi <span className="font-semibold text-accent">{novel.author}</span></p>
                        <button onClick={() => alert(`Đã theo dõi tác giả ${novel.author}!`)} className="bg-accent/10 text-accent font-semibold py-1 px-3 rounded-full text-sm hover:bg-accent/20 transition-colors">Theo dõi</button>
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-text-secondary">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${novel.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{novel.status}</span>
                        <span>{novel.chapters.length} chương</span>
                         <div className="flex items-center gap-1">
                            <Icon name="star" className="w-5 h-5 text-yellow-500" />
                            <span className="font-bold">{averageRating}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {novel.genre.map(g => <span key={g} className="bg-slate-200 text-text-secondary text-xs font-semibold px-2.5 py-1 rounded-full">{g}</span>)}
                    </div>
                    <p className="mt-6 text-text-secondary leading-relaxed">{novel.summary}</p>
                    <div className="mt-8 flex items-center gap-2 flex-wrap">
                        <button onClick={() => onStartReading(novel, novel.chapters[0])} className="bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-full text-lg shadow-md hover:shadow-lg transition-all flex-grow sm:flex-grow-0">
                            Đọc từ đầu
                        </button>
                         <button onClick={() => alert('Đã thích truyện!')} className="bg-red-500/10 hover:bg-red-500/20 text-red-600 font-bold py-3 px-6 rounded-full text-lg flex items-center gap-2 transition-colors flex-grow sm:flex-grow-0 justify-center">
                            <Icon name="heart" className="w-5 h-5"/>
                            Thích
                        </button>
                         <button onClick={onBookmark} className="bg-slate-200 hover:bg-slate-300 text-text-primary font-bold py-3 px-6 rounded-full text-lg transition-colors flex items-center gap-2 flex-grow sm:flex-grow-0 justify-center">
                            <Icon name="bookmark" className="w-5 h-5"/>
                            Lưu trữ
                        </button>
                         <button onClick={onGift} className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 font-bold py-3 px-6 rounded-full text-lg transition-colors flex items-center gap-2 flex-grow sm:flex-grow-0 justify-center">
                            <Icon name="gift" className="w-5 h-5"/>
                            Tặng quà
                        </button>
                        <button onClick={onReadingRoom} className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 font-bold py-3 px-6 rounded-full text-lg transition-colors flex items-center gap-2 flex-grow sm:flex-grow-0 justify-center">
                            <Icon name="users" className="w-5 h-5"/>
                            Tạo phòng đọc
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="bg-surface rounded-lg shadow-lg border border-border-color">
                <div className="flex border-b border-border-color">
                    <TabButton tabName="chapters" label={`Chương (${novel.chapters.length})`} />
                    <TabButton tabName="reviews" label={`Đánh giá (${novel.reviews.length})`} />
                    <TabButton tabName="fanArt" label={`Fan Art (${novel.fanArt.length})`} />
                </div>
                <div className="p-6">
                    {activeTab === 'chapters' && (
                        <div>
                            {novel.chapters.map(chapter => (
                                <div key={chapter.id} onClick={() => onStartReading(novel, chapter)} className="flex justify-between items-center p-4 -mx-4 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors">
                                    <p className="text-text-primary">{chapter.title}</p>
                                    <div className="flex items-center gap-3">
                                        {(chapter.aiComicImages || chapter.aiClipUrl) && <Icon name="ai" className="w-5 h-5 text-accent" title="Có bản chuyển đổi AI"/>}
                                        {chapter.isVip && (
                                            user?.unlockedChapterIds.includes(chapter.id)
                                            ? <Icon name="unlock" className="w-5 h-5 text-green-500" title="Đã mở khóa"/>
                                            : <Icon name="lock" className="w-5 h-5 text-yellow-600" title="Chương VIP"/>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                     {activeTab === 'reviews' && (
                         <div className="space-y-8">
                            {/* Write Review Section */}
                            <div className="border-b border-border-color pb-8 bg-slate-50 -mx-6 px-6 pt-6 rounded-t-md">
                                <h3 className="font-bold text-lg text-text-primary mb-4">Đánh giá của bạn</h3>
                                
                                {/* Step 1: Vote Type */}
                                <div className="flex gap-4 mb-4">
                                    <button 
                                        onClick={() => { setVoteType('recommend'); setNewRating(5); }}
                                        className={`flex-1 py-4 px-6 rounded-lg border-2 flex items-center justify-center gap-3 transition-all duration-200 ${voteType === 'recommend' ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-200 bg-white text-text-secondary hover:border-green-200'}`}
                                    >
                                        <Icon name="thumbs-up" className={`w-8 h-8 ${voteType === 'recommend' ? 'fill-green-500' : ''}`} />
                                        <span className="font-bold text-lg">Đề Cử</span>
                                    </button>
                                    <button 
                                        onClick={() => { setVoteType('critique'); setNewRating(1); }}
                                        className={`flex-1 py-4 px-6 rounded-lg border-2 flex items-center justify-center gap-3 transition-all duration-200 ${voteType === 'critique' ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-200 bg-white text-text-secondary hover:border-red-200'}`}
                                    >
                                        <Icon name="thumbs-down" className={`w-8 h-8 ${voteType === 'critique' ? 'fill-red-500' : ''}`} />
                                        <span className="font-bold text-lg">Chê</span>
                                    </button>
                                </div>

                                {voteType && (
                                    <div className="animate-fade-in">
                                         <div className="flex items-center gap-2 mb-3">
                                            <span className="font-semibold text-text-primary">Điểm số:</span>
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button key={star} type="button" onClick={() => setNewRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}>
                                                        <Icon name="star" className={`w-6 h-6 cursor-pointer transition-colors ${ (hoverRating || newRating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300' }`} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <RichTextEditor 
                                            value={newComment}
                                            onChange={setNewComment}
                                            placeholder="Chia sẻ cảm nghĩ, đánh giá, trích đoạn yêu thích của bạn về câu chuyện này..."
                                            minHeight="150px"
                                            className="mb-4"
                                        />

                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer select-none">
                                                <input type="checkbox" checked={isSpoiler} onChange={e => setIsSpoiler(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                                                <span>Review chứa Spoiler</span>
                                            </label>
                                            <button onClick={handleReviewSubmit} className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all">
                                                <Icon name="send" className="w-4 h-4"/> Gửi đánh giá
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {!voteType && <p className="text-text-secondary text-center italic">Hãy chọn "Đề Cử" hoặc "Chê" để bắt đầu viết review.</p>}
                            </div>
                            
                            {/* Review List */}
                            <div className="space-y-6">
                                {novel.reviews.length === 0 ? (
                                    <p className="text-center text-text-secondary py-8">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
                                ) : (
                                    novel.reviews.map(review => (
                                        <div key={review.id} className="border border-border-color rounded-lg p-4 bg-background shadow-sm">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-text-secondary">
                                                        {review.author.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-text-primary">{review.author}</p>
                                                        <div className="flex items-center gap-2 text-sm">
                                                            {review.voteType === 'recommend' && (
                                                                <span className="flex items-center gap-1 text-green-600 font-semibold bg-green-100 px-2 py-0.5 rounded text-xs">
                                                                    <Icon name="thumbs-up" className="w-3 h-3 fill-current" /> Đề Cử
                                                                </span>
                                                            )}
                                                            {review.voteType === 'critique' && (
                                                                <span className="flex items-center gap-1 text-red-600 font-semibold bg-red-100 px-2 py-0.5 rounded text-xs">
                                                                    <Icon name="thumbs-down" className="w-3 h-3 fill-current" /> Chê
                                                                </span>
                                                            )}
                                                            <div className="flex items-center">
                                                                <Icon name="star" className="w-3 h-3 text-yellow-500 fill-current" />
                                                                <span className="ml-1 text-text-secondary">{review.rating}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-3 text-text-primary leading-relaxed">
                                                {review.isSpoiler ? (
                                                    <SpoilerContent>{review.comment}</SpoilerContent>
                                                ) : (
                                                    <MarkdownView content={review.comment} />
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                    {activeTab === 'fanArt' && (
                        <div>
                             <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Thư viện Fan Art</h3>
                                <button className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
                                    <Icon name="plus" className="w-4 h-4" /> Đăng tải
                                </button>
                            </div>
                            {novel.fanArt.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {novel.fanArt.map(art => (
                                    <div key={art.id} className="group relative rounded-lg overflow-hidden">
                                        <img src={art.imageUrl} alt={`Fan art by ${art.author}`} className="w-full h-full object-cover aspect-square" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 text-white">
                                            <p className="text-xs font-bold">by {art.author}</p>
                                            <div className="text-xs flex items-center gap-1"><Icon name="heart" className="w-3 h-3"/> {art.likes}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            ) : (
                                <div className="text-center py-16">
                                    <Icon name="palette" className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                                    <p className="text-text-secondary">Chưa có fan art nào cho truyện này.</p>
                                    <p className="text-text-secondary text-sm">Hãy là người đầu tiên đóng góp!</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoryDetailView;
