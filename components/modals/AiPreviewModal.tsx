import React, { useState } from 'react';
import Icon from '../common/Icon';
import { AIConversionRequest } from '../../types';

interface AiPreviewModalProps {
    request: AIConversionRequest;
    onClose: () => void;
    onUpdateRequest: (requestId: string, newStatus: AIConversionRequest['status'], notes?: string) => void;
}

const AiPreviewModal: React.FC<AiPreviewModalProps> = ({ request, onClose, onUpdateRequest }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editNotes, setEditNotes] = useState('');

    const handleRequestEdit = () => {
        if (editNotes.trim()) {
            onUpdateRequest(request.id, 'editing', editNotes);
            onClose();
        }
    };

    const handleApprove = () => {
        onUpdateRequest(request.id, 'rendering');
        onClose();
    };

    const handleCancel = () => {
        if(window.confirm('Bạn có chắc muốn hủy yêu cầu này không? Hành động này không thể hoàn tác.')){
            onUpdateRequest(request.id, 'cancelled');
            onClose();
        }
    };

    const renderContent = () => {
        if (isEditing) {
            return (
                <div>
                    <h3 className="text-xl font-bold mb-4">Yêu cầu chỉnh sửa</h3>
                    <textarea 
                        value={editNotes}
                        onChange={e => setEditNotes(e.target.value)}
                        placeholder="Vui lòng mô tả chi tiết các thay đổi bạn muốn, ví dụ: 'Ở khung hình 3, thay đổi màu tóc nhân vật thành màu đỏ'."
                        rows={6}
                        className="w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                    <div className="flex justify-end gap-4 mt-4">
                        <button onClick={() => setIsEditing(false)} className="bg-slate-200 hover:bg-slate-300 text-text-primary font-semibold py-2 px-4 rounded-lg transition-colors">Hủy</button>
                        <button onClick={handleRequestEdit} disabled={!editNotes.trim()} className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-slate-400">Gửi yêu cầu</button>
                    </div>
                </div>
            )
        }

        return (
            <div>
                 <h2 className="text-2xl font-bold mb-2 text-text-primary">Xem trước bản chuyển đổi</h2>
                 <p className="text-text-secondary mb-4">Chương: <span className="font-semibold">{request.chapterTitle}</span></p>

                 <div className="w-full aspect-video bg-slate-800 text-white flex items-center justify-center rounded-lg mb-6">
                    <p>Đây là bản xem trước (preview) của {request.type === 'comic' ? 'truyện tranh' : 'video'}.</p>
                    {/* In a real app, you would display the actual comic panels or video player here */}
                 </div>

                 <div className="flex flex-col md:flex-row justify-center gap-4">
                    <button onClick={handleApprove} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        Phê duyệt
                    </button>
                    <button onClick={() => setIsEditing(true)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        Yêu cầu chỉnh sửa
                    </button>
                     <button onClick={handleCancel} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        Hủy bỏ
                    </button>
                </div>
            </div>
        )
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-surface rounded-lg shadow-2xl p-6 w-full max-w-3xl relative animate-fade-in-up border border-border-color" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-text-primary transition-colors">
                    <Icon name="close" className="w-6 h-6" />
                </button>
                {renderContent()}
            </div>
        </div>
    );
};

export default AiPreviewModal;