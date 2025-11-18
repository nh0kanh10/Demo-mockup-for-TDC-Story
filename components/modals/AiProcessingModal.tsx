import React from 'react';
import Icon from '../common/Icon';

const AiProcessingModal: React.FC<{ message: string }> = ({ message }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-surface rounded-lg shadow-2xl p-8 w-full max-w-md relative animate-fade-in-up border border-border-color text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h2 className="text-2xl font-bold mb-2 text-text-primary">AI đang làm việc...</h2>
                <p className="text-text-secondary transition-opacity duration-500">{message}</p>
                <p className="text-xs text-text-secondary mt-6">Quá trình này có thể mất vài phút. Vui lòng không đóng cửa sổ này.</p>
            </div>
        </div>
    );
};

export default AiProcessingModal;