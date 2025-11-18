
import React, { useState } from 'react';
import Icon from '../common/Icon';
import { AIConversionRequest } from '../../types';

interface AiConversionModalProps {
    novelId: string;
    chapterId: string;
    chapterTitle: string;
    onClose: () => void;
    onSubmit: (request: Omit<AIConversionRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
}

const styles = [
    { id: 'manga', name: 'Manga (B&W)', icon: 'book' },
    { id: 'webtoon', name: 'Webtoon (Màu)', icon: 'image' },
    { id: 'anime', name: 'Anime Style', icon: 'video' },
    { id: 'realistic', name: 'Thực tế (Cinematic)', icon: 'camera' },
    { id: 'watercolor', name: 'Màu nước', icon: 'palette' },
    { id: '3d-render', name: '3D Render', icon: 'box' },
];

const aspectRatios = [
    { id: '1:1', label: 'Vuông (1:1)', icon: 'square' },
    { id: '16:9', label: 'Ngang (16:9)', icon: 'rectangle-horizontal' },
    { id: '9:16', label: 'Dọc (9:16)', icon: 'rectangle-vertical' },
];

const AiConversionModal: React.FC<AiConversionModalProps> = ({ novelId, chapterId, chapterTitle, onClose, onSubmit }) => {
    const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');
    
    // Form State
    const [conversionType, setConversionType] = useState<'comic' | 'clip'>('comic');
    const [selectedStyle, setSelectedStyle] = useState('manga');
    const [quality, setQuality] = useState<'720p' | '1000p'>('720p');
    const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');
    const [prompt, setPrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('');
    const [creativityLevel, setCreativityLevel] = useState(70); // 0 - 100

    const handleSubmit = () => {
        onSubmit({
            novelId,
            chapterId,
            chapterTitle,
            type: conversionType,
            style: selectedStyle,
            quality,
            prompt,
            negativePrompt,
            aspectRatio,
            creativityLevel,
        });
    };

    const estimatedCost = conversionType === 'comic' ? 1 : 3; // 1 credit for comic, 3 for video

    return (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex justify-center items-center p-4">
            <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden border border-border-color animate-fade-in-up max-h-[90vh]">
                
                {/* Left Panel: Context & Preview Info */}
                <div className="w-full md:w-1/3 bg-slate-50 p-6 border-r border-border-color flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">AI Studio</h2>
                        <p className="text-text-secondary text-sm mb-6">Biến câu chuyện của bạn thành tác phẩm nghệ thuật trực quan.</p>
                        
                        <div className="mb-6">
                            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Chương đang chọn</h3>
                            <div className="bg-white p-3 rounded-lg border border-border-color shadow-sm">
                                <p className="font-semibold text-text-primary line-clamp-2">{chapterTitle}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Chi phí dự kiến</h3>
                            <div className="flex items-center gap-2 text-accent font-bold text-lg">
                                <Icon name="ai" className="w-5 h-5" />
                                <span>{estimatedCost} Credits</span>
                            </div>
                            <p className="text-xs text-text-secondary mt-1">Số dư hiện tại của bạn đủ để thực hiện.</p>
                        </div>
                    </div>
                    
                    <div className="hidden md:block">
                         <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
                            <p className="flex items-center gap-2 font-semibold mb-1"><Icon name="star" className="w-4 h-4 fill-current"/> Mẹo Pro:</p>
                            Sử dụng tab "Nâng cao" để kiểm soát chi tiết ánh sáng và bố cục của khung hình.
                         </div>
                    </div>
                </div>

                {/* Right Panel: Controls */}
                <div className="w-full md:w-2/3 p-6 flex flex-col h-full overflow-hidden bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            <button 
                                onClick={() => setActiveTab('basic')} 
                                className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${activeTab === 'basic' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
                            >
                                Cơ bản
                            </button>
                            <button 
                                onClick={() => setActiveTab('advanced')} 
                                className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${activeTab === 'advanced' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
                            >
                                Nâng cao
                            </button>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-text-primary transition-colors p-1 rounded-full hover:bg-slate-100">
                            <Icon name="close" className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto pr-2 space-y-6">
                        {activeTab === 'basic' ? (
                            <>
                                {/* Type Selection */}
                                <div>
                                    <label className="block text-sm font-bold text-text-primary mb-3">Loại nội dung</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button 
                                            onClick={() => setConversionType('comic')}
                                            className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${conversionType === 'comic' ? 'border-primary bg-primary/5' : 'border-border-color hover:border-primary/50'}`}
                                        >
                                            <div className={`p-3 rounded-full ${conversionType === 'comic' ? 'bg-primary text-white' : 'bg-slate-100 text-text-secondary'}`}>
                                                <Icon name="image" className="w-6 h-6" />
                                            </div>
                                            <span className={`font-bold ${conversionType === 'comic' ? 'text-primary' : 'text-text-secondary'}`}>Truyện Tranh</span>
                                            {conversionType === 'comic' && <span className="absolute top-3 right-3 text-primary"><Icon name="check-circle" className="w-5 h-5"/></span>}
                                        </button>
                                        
                                        <button 
                                            onClick={() => setConversionType('clip')}
                                            className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${conversionType === 'clip' ? 'border-accent bg-accent/5' : 'border-border-color hover:border-accent/50'}`}
                                        >
                                            <div className={`p-3 rounded-full ${conversionType === 'clip' ? 'bg-accent text-white' : 'bg-slate-100 text-text-secondary'}`}>
                                                <Icon name="video" className="w-6 h-6" />
                                            </div>
                                            <span className={`font-bold ${conversionType === 'clip' ? 'text-accent' : 'text-text-secondary'}`}>Video Ngắn</span>
                                             {conversionType === 'clip' && <span className="absolute top-3 right-3 text-accent"><Icon name="check-circle" className="w-5 h-5"/></span>}
                                        </button>
                                    </div>
                                </div>

                                {/* Style Selection */}
                                <div>
                                    <label className="block text-sm font-bold text-text-primary mb-3">Phong cách nghệ thuật</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {styles.map(style => (
                                            <button
                                                key={style.id}
                                                onClick={() => setSelectedStyle(style.id)}
                                                className={`p-3 rounded-lg border text-left transition-all text-sm flex items-center gap-2 ${selectedStyle === style.id ? 'border-primary bg-primary/10 ring-1 ring-primary font-semibold text-primary' : 'border-border-color hover:bg-slate-50 text-text-secondary'}`}
                                            >
                                                <Icon name={style.icon} className="w-4 h-4" />
                                                {style.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Prompt */}
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="block text-sm font-bold text-text-primary">Mô tả ý tưởng (Prompt)</label>
                                        <span className="text-xs text-text-secondary">Tùy chọn</span>
                                    </div>
                                    <textarea
                                        value={prompt}
                                        onChange={e => setPrompt(e.target.value)}
                                        rows={3}
                                        className="w-full bg-slate-50 border border-border-color rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow resize-none"
                                        placeholder="Mô tả chi tiết ngoại hình nhân vật, bối cảnh, màu sắc chủ đạo..."
                                    ></textarea>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Advanced: Aspect Ratio */}
                                <div>
                                    <label className="block text-sm font-bold text-text-primary mb-3">Tỷ lệ khung hình</label>
                                    <div className="flex gap-3">
                                        {aspectRatios.map(ratio => (
                                            <button
                                                key={ratio.id}
                                                onClick={() => setAspectRatio(ratio.id as any)}
                                                className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all ${aspectRatio === ratio.id ? 'bg-primary text-white border-primary shadow-md' : 'bg-white border-border-color text-text-secondary hover:bg-slate-50'}`}
                                            >
                                                {ratio.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Advanced: Quality */}
                                <div>
                                    <label className="block text-sm font-bold text-text-primary mb-3">Chất lượng đầu ra</label>
                                    <div className="bg-slate-100 p-1 rounded-lg flex">
                                        <button 
                                            onClick={() => setQuality('720p')}
                                            className={`flex-1 py-2 text-sm rounded-md font-medium transition-all ${quality === '720p' ? 'bg-white shadow text-text-primary' : 'text-text-secondary'}`}
                                        >
                                            Tiêu chuẩn (720p) - Nhanh
                                        </button>
                                        <button 
                                            onClick={() => setQuality('1000p')}
                                            className={`flex-1 py-2 text-sm rounded-md font-medium transition-all ${quality === '1000p' ? 'bg-white shadow text-text-primary' : 'text-text-secondary'}`}
                                        >
                                            Cao cấp (1000p) - Chậm
                                        </button>
                                    </div>
                                </div>

                                {/* Advanced: Negative Prompt */}
                                <div>
                                    <label className="block text-sm font-bold text-text-primary mb-2">Loại trừ (Negative Prompt)</label>
                                    <input 
                                        type="text" 
                                        value={negativePrompt}
                                        onChange={e => setNegativePrompt(e.target.value)}
                                        placeholder="Ví dụ: mờ, biến dạng, text, logo, nhiều ngón tay..."
                                        className="w-full bg-slate-50 border border-border-color rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>

                                {/* Advanced: Creativity Slider */}
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="block text-sm font-bold text-text-primary">Mức độ sáng tạo (Temperature)</label>
                                        <span className="text-sm font-bold text-primary">{creativityLevel}%</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        value={creativityLevel} 
                                        onChange={e => setCreativityLevel(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between text-xs text-text-secondary mt-1">
                                        <span>Bám sát văn bản</span>
                                        <span>Cân bằng</span>
                                        <span>Phá cách</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="pt-6 mt-auto border-t border-border-color">
                        <button 
                            onClick={handleSubmit} 
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-blue-600 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex justify-center items-center gap-2"
                        >
                            <Icon name="ai" className="w-5 h-5" />
                            <span>Bắt đầu tạo ({estimatedCost} Credits)</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiConversionModal;
