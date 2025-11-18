import React from 'react';
import Icon from '../common/Icon';
import { User } from '../../types';

interface StoreViewProps {
    user: User | null;
    onPurchaseCredit: (pack: '1' | '5' | '10') => void;
}

const StoreView: React.FC<StoreViewProps> = ({ user, onPurchaseCredit }) => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
                <Icon name="shopping-cart" className="w-16 h-16 text-primary mx-auto mb-2" />
                <h2 className="text-3xl font-bold text-text-primary">Cửa Hàng Vật Phẩm</h2>
                <p className="text-text-secondary mt-2">Sử dụng xu của bạn để mở khóa các nội dung và tính năng đặc biệt.</p>
                {user && (
                    <div className="mt-4 inline-flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 font-semibold px-3 py-1.5 rounded-full text-sm">
                            <Icon name="wallet" className="w-5 h-5" />
                            <span>Số dư: {user.coins.toLocaleString()} Xu</span>
                        </div>
                         <div className="flex items-center gap-2 bg-purple-100 text-purple-800 font-semibold px-3 py-1.5 rounded-full text-sm">
                            <Icon name="ai" className="w-5 h-5" />
                            <span>AI Credits: {user.aiCredits}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color">
                <h3 className="text-2xl font-bold mb-4">Mua lượt chuyển đổi AI</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-lg border-2 border-border-color bg-background text-center">
                         <Icon name="ai" className="w-10 h-10 text-accent mx-auto mb-2" />
                         <h4 className="text-xl font-bold">1 Lượt</h4>
                         <p className="text-lg font-semibold text-primary mt-2">100 Xu</p>
                         <button onClick={() => onPurchaseCredit('1')} className="mt-4 w-full bg-primary/20 text-primary font-semibold py-2 px-4 rounded-lg transition-colors hover:bg-primary hover:text-white">Mua</button>
                    </div>
                     <div className="p-6 rounded-lg border-2 border-accent bg-accent/5 text-center">
                         <Icon name="ai" className="w-10 h-10 text-accent mx-auto mb-2" />
                         <h4 className="text-xl font-bold">5 Lượt</h4>
                         <p className="text-lg font-semibold text-primary mt-2"><span className="line-through text-text-secondary">500</span> 450 Xu</p>
                         <button onClick={() => onPurchaseCredit('5')} className="mt-4 w-full bg-accent text-white font-semibold py-2 px-4 rounded-lg transition-colors hover:bg-accent/80">Mua</button>
                    </div>
                     <div className="p-6 rounded-lg border-2 border-border-color bg-background text-center">
                         <Icon name="ai" className="w-10 h-10 text-accent mx-auto mb-2" />
                         <h4 className="text-xl font-bold">10 Lượt</h4>
                         <p className="text-lg font-semibold text-primary mt-2"><span className="line-through text-text-secondary">1000</span> 850 Xu</p>
                         <button onClick={() => onPurchaseCredit('10')} className="mt-4 w-full bg-primary/20 text-primary font-semibold py-2 px-4 rounded-lg transition-colors hover:bg-primary hover:text-white">Mua</button>
                    </div>
                </div>
            </div>
             <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color">
                <h3 className="text-2xl font-bold mb-4">Mở khóa chương VIP</h3>
                <p className="text-center text-text-secondary py-8">Truy cập vào truyện để mở khóa các chương VIP.</p>
            </div>
        </div>
    );
};

export default StoreView;