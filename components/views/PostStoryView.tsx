import React, { useState } from 'react';
import Icon from '../common/Icon';
import { Novel } from '../../types';

interface PostStoryViewProps {
    // FIX: Aligned prop type with parent component by adding 'fanArt' to Omit.
    onPostStory: (novel: Omit<Novel, 'id' | 'authorId' | 'reviews' | 'stats' | 'createdAt' | 'author' | 'fanArt'>) => void;
    onCancel: () => void;
}

const PostStoryView: React.FC<PostStoryViewProps> = ({ onPostStory, onCancel }) => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [genre, setGenre] = useState<string[]>([]);
    const [tags, setTags] = useState('');
    const [status, setStatus] = useState<'Đang tiến hành' | 'Hoàn thành'>('Đang tiến hành');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if (!title || !summary || !coverImage) {
            alert('Vui lòng điền đầy đủ các trường bắt buộc.');
            return;
        }
        onPostStory({
            title,
            summary,
            coverImage,
            genre,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            status,
            chapters: [],
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
                <Icon name="edit-3" className="w-16 h-16 text-primary mx-auto mb-2" />
                <h2 className="text-3xl font-bold text-text-primary">Đăng truyện mới</h2>
                <p className="text-text-secondary mt-2">Chia sẻ câu chuyện của bạn với cộng đồng.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-lg shadow-lg border border-border-color space-y-6">
                <div>
                    <label className="block text-lg font-semibold text-text-primary mb-2">Tên truyện</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-background border border-slate-300 rounded-lg p-3" />
                </div>
                <div>
                    <label className="block text-lg font-semibold text-text-primary mb-2">Mô tả</label>
                    <textarea value={summary} onChange={e => setSummary(e.target.value)} required rows={6} className="w-full bg-background border border-slate-300 rounded-lg p-3" />
                </div>
                <div>
                    <label className="block text-lg font-semibold text-text-primary mb-2">URL ảnh bìa</label>
                    <input type="text" value={coverImage} onChange={e => setCoverImage(e.target.value)} required placeholder="https://..." className="w-full bg-background border border-slate-300 rounded-lg p-3" />
                </div>
                 <div>
                    <label className="block text-lg font-semibold text-text-primary mb-2">Thể loại (cách nhau bởi dấu phẩy)</label>
                    <input type="text" value={genre.join(', ')} onChange={e => setGenre(e.target.value.split(',').map(g => g.trim()))} placeholder="Hành động, Phiêu lưu..." className="w-full bg-background border border-slate-300 rounded-lg p-3" />
                </div>
                 <div>
                    <label className="block text-lg font-semibold text-text-primary mb-2">Trạng thái</label>
                    <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full bg-background border border-slate-300 rounded-lg p-3">
                        <option value="Đang tiến hành">Đang tiến hành</option>
                        <option value="Hoàn thành">Hoàn thành</option>
                    </select>
                </div>

                <div className="pt-6 border-t border-border-color flex justify-end gap-4">
                     <button type="button" onClick={onCancel} className="bg-slate-200 hover:bg-slate-300 text-text-primary font-bold py-3 px-8 rounded-lg">Hủy</button>
                    <button type="submit" className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg">Đăng truyện</button>
                </div>
            </form>
        </div>
    );
};

export default PostStoryView;