import React from 'react';
import { CoinPackage } from '../../types';
import Icon from '../common/Icon';

interface CoinShopViewProps {
    packages: CoinPackage[];
    onSelectPackage: (pkg: CoinPackage) => void;
}

const CoinShopView: React.FC<CoinShopViewProps> = ({ packages, onSelectPackage }) => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
                <Icon name="wallet" className="w-16 h-16 text-primary mx-auto mb-2" />
                <h2 className="text-3xl font-bold text-text-primary">Nạp Xu</h2>
                <p className="text-text-secondary mt-2">Chọn gói xu phù hợp để ủng hộ tác giả và đọc các chương VIP.</p>
            </div>

            <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {packages.map((pkg, index) => (
                        <div 
                            key={pkg.id} 
                            onClick={() => onSelectPackage(pkg)}
                            className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${index === 2 ? 'border-accent bg-accent/5' : 'border-border-color hover:border-primary bg-background'}`}
                        >
                            {index === 2 && (
                                <span className="absolute top-0 right-4 -mt-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">Phổ biến</span>
                            )}
                            <div className="flex items-center gap-4">
                                <Icon name="star" className="w-10 h-10 text-yellow-500" />
                                <div>
                                    <h3 className="text-2xl font-bold text-text-primary">{pkg.amount.toLocaleString()} Xu</h3>
                                    {pkg.bonus > 0 && <p className="text-sm text-green-600 font-semibold">+ Tặng {pkg.bonus.toLocaleString()} Xu</p>}
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <span className="text-3xl font-extrabold text-primary">{pkg.price.toLocaleString()} VNĐ</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoinShopView;
