
import React, { useState } from 'react';
import Icon from '../common/Icon';
import { AIConversionRequest } from '../../types';

interface AiResultModalProps {
    request: AIConversionRequest;
    onClose: () => void;
    onRetry?: () => void;
    onSave?: () => void;
}

const AiResultModal: React.FC<AiResultModalProps> = ({ request, onClose, onRetry, onSave }) => {
    const [showOriginalText, setShowOriginalText] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'single'>('grid'); // For comics
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const isViewerMode = !onSave;

    const renderMediaContent = () => {
        if (request.type === 'comic' && request.resultImages) {
            if (viewMode === 'single') {
                return (
                    <div className="relative h-full flex items-center justify-center bg-black">
                        <img 
                            src={request.resultImages[currentImageIndex]} 
                            alt={`Panel ${currentImageIndex + 1}`} 
                            className="max-h-full max-w-full object-contain" 
                        />
                        <button 
                            onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                            disabled={currentImageIndex === 0}
                            className="absolute left-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full disabled:opacity-30 transition-all"
                        >
                            <Icon name="arrow-left" className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={() => setCurrentImageIndex(prev => Math.min(request.resultImages!.length - 1, prev + 1))}
                            disabled={currentImageIndex === request.resultImages!.length - 1}
                            className="absolute right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full disabled:opacity-30 transition-all"
                        >
                            <Icon name="arrow-left" className="w-6 h-6 rotate-180" />
                        </button>
                        <div className="absolute bottom-4 bg-black/60 px-3 py-1 rounded-full text-white text-sm">
                            {currentImageIndex + 1} / {request.resultImages.length}
                        </div>
                    </div>
                );
            }
            return (
                <div className="grid grid-cols-2 gap-4 p-4 overflow-y-auto h-full bg-slate-900">
                    {request.resultImages.map((src, index) => (
                        <div key={index} className="relative group cursor-pointer" onClick={() => { setViewMode('single'); setCurrentImageIndex(index); }}>
                            <img src={src} alt={`Comic panel ${index + 1}`} className="w-full h-auto rounded-lg shadow-md border border-slate-700 group-hover:border-primary transition-colors" />
                            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">#{index + 1}</div>
                        </div>
                    ))}
                </div>
            );
        }
        if (request.type === 'clip' && request.resultVideoUrl) {
            return (
                <div className="w-full h-full flex items-center justify-center bg-black">
                    <video src={request.resultVideoUrl} controls autoPlay className="max-h-full max-w-full rounded-lg shadow-2xl">
                        Trình duyệt của bạn không hỗ trợ thẻ video.
                    </video>
                </div>
            )
        }
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <Icon name="ai" className="w-16 h-16 mb-4 opacity-20" />
                <p>Không tìm thấy nội dung media.</p>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex flex-col animate-fade-in">
            {/* Toolbar Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-black/40 border-b border-white/10 text-white">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Icon name={request.type === 'comic' ? 'image' : 'video'} className="w-5 h-5 text-accent" />
                        Kết quả {request.type === 'comic' ? 'Truyện tranh' : 'Video'}
                    </h2>
                    <span className="text-slate-400 text-sm hidden md:inline-block">|</span>
                    <span className="text-slate-300 text-sm hidden md:inline-block">{request.chapterTitle}</span>
                </div>
                <div className="flex items-center gap-3">
                    {request.type === 'comic' && (
                        <div className="bg-white/10 rounded-lg p-1 flex mr-2">
                            <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-white'}`} title="Lưới"><Icon name="list" className="w-4 h-4"/></button>
                            <button onClick={() => setViewMode('single')} className={`p-2 rounded ${viewMode === 'single' ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-white'}`} title="Chi tiết"><Icon name="image" className="w-4 h-4"/></button>
                        </div>
                    )}
                    <button 
                        onClick={() => setShowOriginalText(!showOriginalText)} 
                        className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${showOriginalText ? 'bg-primary border-primary text-white' : 'border-white/20 text-slate-300 hover:bg-white/10'}`}
                    >
                        {showOriginalText ? 'Ẩn văn bản gốc' : 'So sánh văn bản'}
                    </button>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-colors">
                        <Icon name="close" className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex overflow-hidden">
                {/* Original Text Panel (Collapsible) */}
                {showOriginalText && (
                    <div className="w-1/3 min-w-[300px] bg-white h-full overflow-y-auto p-6 border-r border-slate-200 animate-fade-in-right">
                        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                            <Icon name="book" className="w-5 h-5 text-primary"/> Văn bản gốc
                        </h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {/* This would ideally come from props, simplified here */}
                            Bầu trời đêm hôm đó thật khác lạ. Những vì sao dường như sáng hơn, và mặt trăng tròn vành vạnh tỏa ra một thứ ánh sáng màu xanh kỳ ảo...
                            (Nội dung chương được sử dụng để tạo ra kết quả này)
                        </p>
                        
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">Thông số AI</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span className="text-gray-500">Model:</span> <span className="font-medium">Gemini 2.5 Flash</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Style:</span> <span className="font-medium capitalize">{request.style}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Quality:</span> <span className="font-medium">{request.quality}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Ratio:</span> <span className="font-medium">{request.aspectRatio || '1:1'}</span></div>
                                {request.prompt && (
                                    <div className="mt-2">
                                        <span className="text-gray-500 block mb-1">Prompt bổ sung:</span>
                                        <p className="bg-gray-100 p-2 rounded text-gray-600 text-xs italic">{request.prompt}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Media Viewer */}
                <div className="flex-grow bg-[#0a0a0a] relative">
                     {renderMediaContent()}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-black/80 border-t border-white/10 p-4 flex justify-center gap-4 backdrop-blur-md">
                 {isViewerMode ? (
                    <button onClick={onClose} className="bg-white text-black hover:bg-gray-200 font-bold py-3 px-8 rounded-xl transition-colors shadow-lg">
                        Đóng
                    </button>
                 ) : (
                    <>
                        <button onClick={onRetry} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition-colors border border-slate-600">
                            <Icon name="sliders" className="w-4 h-4" />
                            Thử lại (Edit)
                        </button>
                        <button onClick={() => alert("Đã tải xuống thiết bị!")} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition-colors border border-slate-600">
                            <Icon name="move-down" className="w-4 h-4" />
                            Tải xuống
                        </button>
                        <button onClick={onSave} className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-blue-600 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-primary/50">
                            <Icon name="bookmark" className="w-4 h-4" />
                            Lưu vào Thư viện
                        </button>
                    </>
                 )}
            </div>
        </div>
    );
};

export default AiResultModal;
