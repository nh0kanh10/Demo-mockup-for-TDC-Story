import React, { useState } from 'react';
import { Novel, Chapter } from '../../types';
import Icon from '../common/Icon';
import ChapterEditModal from '../modals/ChapterEditModal';

interface EditStoryViewProps {
    novel: Novel;
    onSave: (updatedNovel: Novel) => void;
    onBack: () => void;
    onRequestAIConversion: (novel: Novel, chapter: Chapter) => void;
}

const EditStoryView: React.FC<EditStoryViewProps> = ({ novel, onSave, onBack, onRequestAIConversion }) => {
    const [editableNovel, setEditableNovel] = useState<Novel>(novel);
    const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);

    const handleNovelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditableNovel(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChapter = (updatedChapter: Chapter) => {
        let chapters = [...editableNovel.chapters];
        const index = chapters.findIndex(c => c.id === updatedChapter.id);
        if (index > -1) {
            chapters[index] = updatedChapter;
        } else {
            chapters.push(updatedChapter);
        }
        setEditableNovel(prev => ({ ...prev, chapters }));
        setEditingChapter(null);
    };

    const handleAddNewChapter = () => {
        const newChapter: Chapter = {
            id: `chapter-${Date.now()}`,
            title: `Chương mới ${editableNovel.chapters.length + 1}`,
            content: '',
            isVip: false,
            chapterNumber: editableNovel.chapters.length + 1,
        };
        setEditingChapter(newChapter);
    };
    
    const handleDeleteChapter = (chapterId: string) => {
        if(window.confirm('Bạn có chắc muốn xóa chương này không?')) {
            setEditableNovel(prev => ({
                ...prev,
                chapters: prev.chapters.filter(c => c.id !== chapterId)
            }));
        }
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-text-secondary font-semibold hover:text-primary transition-colors">
                <Icon name="arrow-left" className="w-5 h-5" />
                Quay lại Dashboard
            </button>

            <div className="bg-surface p-8 rounded-lg shadow-lg border border-border-color space-y-6">
                 <h2 className="text-3xl font-bold text-text-primary">Chỉnh sửa truyện: {novel.title}</h2>
                 <div>
                    <label className="block text-lg font-semibold text-text-primary mb-2">Tên truyện</label>
                    <input type="text" name="title" value={editableNovel.title} onChange={handleNovelChange} className="w-full bg-background border border-slate-300 rounded-lg p-3" />
                </div>
                 <div>
                    <label className="block text-lg font-semibold text-text-primary mb-2">Mô tả</label>
                    <textarea name="summary" value={editableNovel.summary} onChange={handleNovelChange} rows={6} className="w-full bg-background border border-slate-300 rounded-lg p-3" />
                </div>
            </div>

            <div className="bg-surface rounded-lg shadow-lg border border-border-color">
                <div className="p-4 border-b border-border-color flex justify-between items-center">
                    <h3 className="text-xl font-bold">Danh sách chương</h3>
                    <button onClick={handleAddNewChapter} className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
                        <Icon name="plus" className="w-5 h-5" /> Thêm chương
                    </button>
                </div>
                <div className="divide-y divide-border-color">
                    {editableNovel.chapters.map(chapter => (
                        <div key={chapter.id} className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-slate-50">
                            <div className="flex-grow mb-2 md:mb-0">
                                <p className="font-semibold text-text-primary">{chapter.title}</p>
                                <p className="text-sm text-text-secondary">{chapter.content.substring(0, 80)}...</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <button onClick={() => onRequestAIConversion(novel, chapter)} title="Chuyển đổi AI" className="p-2 hover:bg-accent/10 rounded-full text-accent transition-colors">
                                    <Icon name="ai" className="w-5 h-5"/>
                                </button>
                                <button onClick={() => setEditingChapter(chapter)} title="Chỉnh sửa" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                                    <Icon name="edit-3" className="w-5 h-5"/>
                                </button>
                                <button onClick={() => handleDeleteChapter(chapter.id)} title="Xóa" className="p-2 hover:bg-red-100 rounded-full text-red-600 transition-colors">
                                    <Icon name="close" className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

             <div className="pt-6 text-right">
                <button onClick={() => onSave(editableNovel)} className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">Lưu thay đổi</button>
            </div>
            
            {editingChapter && (
                <ChapterEditModal 
                    chapter={editingChapter}
                    onClose={() => setEditingChapter(null)}
                    onSave={handleSaveChapter}
                />
            )}
        </div>
    );
};

export default EditStoryView;