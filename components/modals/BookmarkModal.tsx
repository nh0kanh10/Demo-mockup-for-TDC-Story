import React, { useState } from 'react';
import { Novel, User } from '../../types';
import Icon from '../common/Icon';

interface BookmarkModalProps {
    novel: Novel;
    user: User;
    onClose: () => void;
    onUpdateCollections: (novelId: string, collectionIds: string[]) => void;
    onCreateCollection: () => void;
}

const BookmarkModal: React.FC<BookmarkModalProps> = ({ novel, user, onClose, onUpdateCollections, onCreateCollection }) => {
    const initialSelectedIds = user.collections.filter(c => c.novelIds.includes(novel.id)).map(c => c.id);
    const [selectedCollectionIds, setSelectedCollectionIds] = useState<string[]>(initialSelectedIds);

    const toggleCollection = (collectionId: string) => {
        setSelectedCollectionIds(prev =>
            prev.includes(collectionId)
                ? prev.filter(id => id !== collectionId)
                : [...prev, collectionId]
        );
    };

    const handleSave = () => {
        onUpdateCollections(novel.id, selectedCollectionIds);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-surface rounded-lg shadow-2xl w-full max-w-md relative animate-fade-in-up border border-border-color flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-border-color text-center relative">
                    <h2 className="text-xl font-bold text-text-primary">Lưu vào bộ sưu tập</h2>
                    <button onClick={onClose} className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-400 hover:text-text-primary">
                        <Icon name="close" className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-4 space-y-2">
                    {user.collections.length > 0 ? user.collections.map(collection => (
                        <label key={collection.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedCollectionIds.includes(collection.id)}
                                onChange={() => toggleCollection(collection.id)}
                                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="font-semibold text-text-primary">{collection.name}</span>
                        </label>
                    )) : (
                        <p className="text-center text-text-secondary py-8">Bạn chưa có bộ sưu tập nào.</p>
                    )}
                </div>

                <div className="p-4 border-t border-border-color space-y-2">
                    <button onClick={onCreateCollection} className="w-full text-left bg-slate-100 hover:bg-slate-200 text-text-primary font-semibold py-3 px-4 rounded-lg flex items-center gap-2">
                        <Icon name="plus" className="w-5 h-5" /> Tạo bộ sưu tập mới
                    </button>
                    <button onClick={handleSave} className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg">
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookmarkModal;
