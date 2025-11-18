import React from 'react';
import { Novel, Chapter, User } from '../../types';
import Icon from '../common/Icon';

interface TableOfContentsModalProps {
    novel: Novel;
    user: User | null;
    currentChapterId: string;
    onClose: () => void;
    onSelectChapter: (chapter: Chapter) => void;
}

const TableOfContentsModal: React.FC<TableOfContentsModalProps> = ({ novel, user, currentChapterId, onClose, onSelectChapter }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-surface rounded-lg shadow-2xl w-full max-w-lg relative animate-fade-in-up border border-border-color flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-border-color flex justify-between items-center">
                    <h2 className="text-xl font-bold text-text-primary">Mục lục</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-text-primary">
                        <Icon name="close" className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-2">
                    {novel.chapters.map(chapter => (
                        <div 
                            key={chapter.id} 
                            onClick={() => onSelectChapter(chapter)} 
                            className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-colors ${
                                chapter.id === currentChapterId 
                                ? 'bg-primary/10 text-primary font-semibold' 
                                : 'hover:bg-slate-100'
                            }`}
                        >
                            <p className="truncate">{chapter.title}</p>
                            <div className="flex items-center gap-3">
                                {chapter.isVip && (
                                    user?.unlockedChapterIds.includes(chapter.id)
                                    ? <Icon name="unlock" className="w-4 h-4 text-green-500 flex-shrink-0 ml-2" title="Đã mở khóa"/>
                                    : <Icon name="lock" className="w-4 h-4 text-yellow-600 flex-shrink-0 ml-2" title="Chương VIP"/>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TableOfContentsModal;