import React, { useState } from 'react';
import Icon from '../common/Icon';

interface CreateCollectionModalProps {
    onClose: () => void;
    onCreate: (name: string) => void;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({ onClose, onCreate }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onCreate(name.trim());
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-surface rounded-lg shadow-2xl p-6 w-full max-w-md relative animate-fade-in-up border border-border-color">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-text-primary">
                    <Icon name="close" className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-text-primary">Tạo bộ sưu tập mới</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="collection-name" className="font-semibold text-text-secondary">Tên bộ sưu tập</label>
                        <input
                            id="collection-name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="mt-1 w-full bg-background border border-slate-300 rounded-lg p-3"
                            placeholder="Ví dụ: Top Tiên Hiệp"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-slate-200 hover:bg-slate-300 text-text-primary font-semibold py-2 px-6 rounded-lg">
                            Hủy
                        </button>
                        <button type="submit" className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg">
                            Tạo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCollectionModal;