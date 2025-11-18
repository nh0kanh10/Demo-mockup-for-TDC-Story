import React, { useState } from 'react';
import { CommunityPost, User } from '../../types';
import Icon from '../common/Icon';

interface CommunityPostDetailViewProps {
    post: CommunityPost;
    user: User | null;
    onBack: () => void;
    onPostReply: (postId: string, content: string) => void;
    onLikeReply: (postId: string, replyId: string) => void;
}

const CommunityPostDetailView: React.FC<CommunityPostDetailViewProps> = ({ post, user, onBack, onPostReply, onLikeReply }) => {
    const [replyContent, setReplyContent] = useState('');

    const timeSince = (date: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " năm trước";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " tháng trước";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " ngày trước";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " giờ trước";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " phút trước";
        return "vài giây trước";
    }

    const handleSubmitReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (replyContent.trim()) {
            onPostReply(post.id, replyContent);
            setReplyContent('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <div>
                <button onClick={onBack} className="flex items-center gap-2 text-text-secondary font-semibold hover:text-primary transition-colors mb-4">
                    <Icon name="arrow-left" className="w-5 h-5" />
                    Quay lại Cộng đồng
                </button>
            </div>

            {/* Original Post */}
            <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color">
                <h1 className="text-3xl font-bold text-text-primary">{post.title}</h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary border-b border-border-color pb-4 mb-4">
                    <span>Đăng bởi <span className="font-semibold text-accent">{post.author}</span></span>
                    <span>•</span>
                    <span>{timeSince(post.createdAt)}</span>
                </div>
                <div className="prose max-w-none text-text-primary">
                    <p>{post.content}</p>
                </div>
            </div>

            {/* Replies */}
            <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color">
                <h2 className="text-2xl font-bold mb-4">Trả lời ({post.replies.length})</h2>
                <div className="space-y-6">
                    {post.replies.map(reply => {
                        const isLiked = user?.likedReplyIds?.includes(reply.id);
                        return (
                            <div key={reply.id} className="flex gap-4">
                                <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 mt-1">
                                    {reply.author.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-grow bg-background p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-text-primary">{reply.author}</span>
                                        <span className="text-xs text-text-secondary">{timeSince(reply.createdAt)}</span>
                                    </div>
                                    <p className="text-text-primary mb-2">{reply.content}</p>
                                    <div className="flex items-center justify-end">
                                        <button 
                                            onClick={() => onLikeReply(post.id, reply.id)} 
                                            className={`flex items-center gap-1.5 text-sm font-medium p-1 rounded-md transition-colors ${isLiked ? 'text-red-500 bg-red-100' : 'text-text-secondary hover:bg-slate-200'}`}
                                        >
                                            <Icon name="heart" className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                                            <span>{reply.likes}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {post.replies.length === 0 && (
                        <p className="text-center text-text-secondary py-8">Chưa có trả lời nào. Hãy là người đầu tiên!</p>
                    )}
                </div>
            </div>

            {/* Reply Form */}
            {user ? (
                <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color">
                    <h3 className="text-xl font-bold mb-3">Viết trả lời của bạn</h3>
                    <form onSubmit={handleSubmitReply}>
                        <textarea
                            value={replyContent}
                            onChange={e => setReplyContent(e.target.value)}
                            rows={5}
                            placeholder="Chia sẻ ý kiến của bạn..."
                            className="w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <div className="text-right mt-4">
                            <button type="submit" className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2 ml-auto">
                                <Icon name="send" className="w-4 h-4" />
                                Gửi trả lời
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="text-center p-6 bg-surface rounded-lg shadow-lg border border-border-color">
                    <p className="text-text-secondary">Bạn cần <span className="font-semibold text-accent">đăng nhập</span> để có thể trả lời chủ đề này.</p>
                </div>
            )}
        </div>
    );
};

export default CommunityPostDetailView;