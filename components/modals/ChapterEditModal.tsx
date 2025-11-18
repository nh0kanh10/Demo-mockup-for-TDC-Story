
import React, { useState } from 'react';
import { Chapter } from '../../types';
import Icon from '../common/Icon';
import RichTextEditor from '../common/RichTextEditor';

interface ChapterEditModalProps {
    chapter: Chapter;
    onClose: () => void;
    onSave: (updatedChapter: Chapter) => void;
}

const ChapterEditModal: React.FC<ChapterEditModalProps> = ({ chapter, onClose, onSave }) => {
    const [title, setTitle] = useState(chapter.title);
    const [content, setContent] = useState(chapter.content);
    const [isVip, setIsVip] = useState(chapter.isVip);
    const [aiContentPrice, setAiContentPrice] = useState<number>(chapter.aiContentPrice || 0);
    const [isAiPaid, setIsAiPaid] = useState<boolean>((chapter.aiContentPrice || 0) > 0);

    const handleSave = () => {
        onSave({
            ...chapter,
            title,
            content,
            isVip,
            aiContentPrice: isAiPaid ? aiContentPrice : 0,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-surface rounded-lg shadow-2xl p-6 w-full max-w-3xl relative animate-fade-in-up border border-border-color flex flex-col h-[90vh]">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-text-primary">
                    <Icon name="close" className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-text-primary">Chỉnh sửa chương</h2>

                <div className="space-y-4 flex-grow flex flex-col overflow-hidden">
                    <div>
                        <label className="font-semibold">Tiêu đề chương</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="mt-1 w-full bg-background border border-slate-300 rounded-lg p-3"
                        />
                    </div>
                    <div className="flex-grow flex flex-col overflow-hidden">
                        <label className="font-semibold mb-1">Nội dung</label>
                        <div className="flex-grow overflow-y-auto">
                             <RichTextEditor 
                                value={content}
                                onChange={setContent}
                                placeholder="Viết nội dung câu chuyện của bạn ở đây..."
                                className="h-full"
                                minHeight="400px"
                             />
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                         <h3 className="font-bold text-sm text-text-secondary uppercase tracking-wide">Cài đặt kiếm tiền</h3>
                         <div className="flex flex-col md:flex-row gap-6">
                             <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isVip}
                                        onChange={e => setIsVip(e.target.checked)}
                                        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="font-semibold text-text-primary">Chương VIP (Bán nội dung text)</span>
                                </label>
                                <p className="text-xs text-text-secondary mt-1 ml-7">Người đọc phải trả xu để đọc văn bản chương này.</p>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isAiPaid}
                                        onChange={e => setIsAiPaid(e.target.checked)}
                                        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="font-semibold text-text-primary">Bán nội dung AI (Comic/Video)</span>
                                </label>
                                <div className={`ml-7 mt-2 transition-all ${isAiPaid ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">Giá bán:</span>
                                        <input 
                                            type="number" 
                                            min="0"
                                            value={aiContentPrice}
                                            onChange={e => setAiContentPrice(Number(e.target.value))}
                                            className="w-24 border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-primary"
                                        />
                                        <span className="text-sm font-bold text-yellow-600">Xu</span>
                                    </div>
                                    <p className="text-xs text-text-secondary mt-1">Giá để xem phiên bản truyện tranh hoặc video của chương này.</p>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-border-color">
                    <button onClick={onClose} className="bg-slate-200 hover:bg-slate-300 text-text-primary font-semibold py-2 px-6 rounded-lg">
                        Hủy
                    </button>
                    <button onClick={handleSave} className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg">
                        Lưu chương
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChapterEditModal;