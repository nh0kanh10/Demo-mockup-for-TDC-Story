import React, { useState } from 'react';
import Icon from '../common/Icon';

interface InterestSelectionModalProps {
    genres: string[];
    onComplete: (selectedGenres: string[]) => void;
}

const InterestSelectionModal: React.FC<InterestSelectionModalProps> = ({ genres, onComplete }) => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const toggleGenre = (genre: string) => {
        setSelectedGenres(prev => 
            prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
        );
    };

    const handleSubmit = () => {
        if (selectedGenres.length < 3) {
            alert('Vui lòng chọn ít nhất 3 thể loại yêu thích.');
            return;
        }
        onComplete(selectedGenres);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-surface rounded-lg shadow-2xl p-6 w-full max-w-2xl relative animate-fade-in-up border border-border-color flex flex-col max-h-[90vh]">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-text-primary">Chào mừng bạn mới!</h2>
                    <p className="text-text-secondary mt-1">Chọn ít nhất 3 thể loại bạn yêu thích để chúng tôi có thể gợi ý những câu chuyện hay nhất cho bạn.</p>
                </div>

                <div className="flex-grow overflow-y-auto my-4 pr-2">
                    <div className="flex flex-wrap justify-center gap-3">
                        {genres.map(genre => {
                            const isSelected = selectedGenres.includes(genre);
                            return (
                                <button 
                                    key={genre}
                                    onClick={() => toggleGenre(genre)}
                                    className={`px-4 py-2 rounded-full font-semibold border-2 transition-all duration-200 transform hover:scale-105 ${
                                        isSelected 
                                        ? 'bg-primary border-primary text-white' 
                                        : 'bg-background border-border-color text-text-secondary hover:border-primary/50'
                                    }`}
                                >
                                    {genre}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="pt-4 border-t border-border-color">
                    <button 
                        onClick={handleSubmit} 
                        disabled={selectedGenres.length < 3}
                        className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                        Tiếp tục ({selectedGenres.length}/3)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InterestSelectionModal;
