import React, { useState } from 'react';
import { Novel, User, Gift } from '../../types';
import Icon from '../common/Icon';

interface GiftModalProps {
    novel: Novel;
    user: User;
    gifts: Gift[];
    onClose: () => void;
    onSendGift: (gift: Gift) => void;
}

const GiftModal: React.FC<GiftModalProps> = ({ novel, user, gifts, onClose, onSendGift }) => {
    const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);

    const selectedGift = gifts.find(g => g.id === selectedGiftId);

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-surface rounded-lg shadow-2xl w-full max-w-lg relative animate-fade-in-up border border-border-color" onClick={e => e.stopPropagation()}>
                <div className="p-6 text-center">
                    <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-text-primary">
                        <Icon name="close" className="w-6 h-6" />
                    </button>
                    <Icon name="gift" className="w-12 h-12 text-primary mx-auto mb-2" />
                    <h2 className="text-2xl font-bold text-text-primary">Tặng quà cho tác giả</h2>
                    <p className="text-text-secondary mt-1">Ủng hộ <span className="font-semibold text-accent">{novel.author}</span> để họ có thêm động lực sáng tác!</p>
                </div>

                <div className="px-6 pb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {gifts.map(gift => {
                             const isSelected = selectedGiftId === gift.id;
                             return (
                                <div 
                                    key={gift.id} 
                                    onClick={() => setSelectedGiftId(gift.id)}
                                    className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all ${isSelected ? 'border-primary bg-primary/10 scale-105' : 'border-border-color hover:border-primary/50'}`}
                                >
                                    <Icon name={gift.icon} className="w-8 h-8 mx-auto text-accent mb-2" />
                                    <p className="font-semibold text-sm">{gift.name}</p>
                                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-yellow-600 mt-1">
                                        <Icon name="wallet" className="w-3 h-3"/>
                                        <span>{gift.price}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                
                <div className="bg-background px-6 py-4 border-t border-border-color flex flex-col sm:flex-row justify-between items-center gap-4">
                     <div>
                        <p className="text-sm text-text-secondary">Số dư của bạn:</p>
                        <div className="flex items-center gap-2 font-bold text-lg text-yellow-700">
                             <Icon name="wallet" className="w-5 h-5"/>
                             <span>{user.coins.toLocaleString()} Xu</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => selectedGift && onSendGift(selectedGift)}
                        disabled={!selectedGift}
                        className="w-full sm:w-auto bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                        Tặng {selectedGift ? selectedGift.name : ''}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GiftModal;