import React from 'react';
import { CommunityPost } from '../../types';
import Icon from '../common/Icon';

interface CommunityViewProps {
    posts: CommunityPost[];
    onCreatePost: () => void;
    onSelectPost: (post: CommunityPost) => void;
}

const CommunityView: React.FC<CommunityViewProps> = ({ posts, onCreatePost, onSelectPost }) => {
    
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

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center">
                <Icon name="users" className="w-16 h-16 text-primary mx-auto mb-2" />
                <h2 className="text-3xl font-bold text-text-primary">Cộng Đồng</h2>
                <p className="text-text-secondary mt-2">Tham gia thảo luận, chia sẻ cảm nghĩ và kết nối với các độc giả khác.</p>
            </div>
            
            <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">Chủ đề thảo luận</h3>
                    <button onClick={onCreatePost} className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                        <Icon name="edit-3" className="w-4 h-4" />
                        Tạo chủ đề mới
                    </button>
                </div>
                
                <div className="space-y-2">
                    {posts.map(post => (
                        <div key={post.id} onClick={() => onSelectPost(post)} className="p-4 rounded-md hover:bg-slate-100 cursor-pointer transition-colors flex items-center gap-4">
                            <div className="bg-slate-200 rounded-full p-3">
                                <Icon name="message-circle" className="w-6 h-6 text-text-secondary" />
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-bold text-text-primary hover:text-primary transition-colors">{post.title}</h4>
                                <p className="text-sm text-text-secondary">bởi {post.author} • {timeSince(post.createdAt)}</p>
                            </div>
                            <div className="text-center w-20">
                                <p className="font-bold text-lg text-text-primary">{post.replies.length}</p>
                                <p className="text-xs text-text-secondary">Trả lời</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommunityView;