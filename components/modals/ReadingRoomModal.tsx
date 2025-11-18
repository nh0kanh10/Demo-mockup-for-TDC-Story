import React from 'react';
import { Novel } from '../../types';
import Icon from '../common/Icon';

interface ReadingRoomModalProps {
    novel: Novel;
    onClose: () => void;
}

const ReadingRoomModal: React.FC<ReadingRoomModalProps> = ({ novel, onClose }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-surface rounded-lg shadow-2xl w-full max-w-md relative animate-fade-in-up border border-border-color" onClick={e => e.stopPropagation()}>
                <div className="p-6 text-center">
                    <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-text-primary">
                        <Icon name="close" className="w-6 h-6" />
                    </button>
                    <Icon name="users" className="w-12 h-12 text-primary mx-auto mb-2" />
                    <h2 className="text-2xl font-bold text-text-primary">Tạo phòng đọc chung</h2>
                    <p className="text-text-secondary mt-1">Mời bạn bè cùng đọc và thảo luận về truyện <span className="font-semibold text-text-primary">{novel.title}</span>!</p>
                </div>

                <div className="px-6 pb-6 space-y-4">
                     <div>
                        <label className="font-semibold text-text-secondary text-sm">Mời bạn bè (nhập tên)</label>
                        <input
                            type="text"
                            placeholder="Tên người dùng, cách nhau bởi dấu phẩy..."
                            className="mt-1 w-full bg-background border border-slate-300 rounded-lg p-3"
                        />
                    </div>
                     <p className="text-xs text-center text-text-secondary">Tính năng này đang được phát triển và sẽ sớm ra mắt.</p>
                </div>
                
                <div className="px-6 pb-6">
                    <button 
                        onClick={() => alert('Tính năng sắp ra mắt!')}
                        className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg transition-colors"
                    >
                        Tạo phòng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReadingRoomModal;
