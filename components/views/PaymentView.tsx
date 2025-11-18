import React, { useState } from 'react';
import { CoinPackage } from '../../types';
import Icon from '../common/Icon';

interface PaymentViewProps {
    selectedPackage: CoinPackage | null;
    onBack: () => void;
    onCompletePurchase: (pkg: CoinPackage) => void;
}

const PaymentView: React.FC<PaymentViewProps> = ({ selectedPackage, onBack, onCompletePurchase }) => {
    const [paymentMethod, setPaymentMethod] = useState('card');

    if (!selectedPackage) {
        return (
            <div className="text-center p-8">
                <p>Không có gói nào được chọn.</p>
                <button onClick={onBack} className="mt-4 text-accent hover:underline">Quay lại cửa hàng</button>
            </div>
        )
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Thanh toán thành công gói ${selectedPackage.amount} xu qua ${paymentMethod}!`);
        onCompletePurchase(selectedPackage);
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
             <div className="text-center">
                <h2 className="text-3xl font-bold text-text-primary">Xác nhận Thanh toán</h2>
                <p className="text-text-secondary mt-2">Kiểm tra lại thông tin và hoàn tất giao dịch.</p>
            </div>

            <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color">
                <div className="border-b border-border-color pb-4 mb-4">
                     <h3 className="text-xl font-bold">Gói đã chọn</h3>
                     <div className="flex justify-between items-center mt-2">
                        <p className="text-text-secondary">{selectedPackage.amount.toLocaleString()} Xu (+{selectedPackage.bonus} bonus)</p>
                        <p className="text-xl font-bold text-primary">{selectedPackage.price.toLocaleString()} VNĐ</p>
                     </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Chọn phương thức thanh toán</h3>
                    <div className="flex gap-2 p-1 bg-background rounded-lg border border-slate-300">
                        <button onClick={() => setPaymentMethod('card')} className={`flex-1 text-center py-2 rounded-md cursor-pointer transition-colors ${paymentMethod === 'card' ? 'bg-primary text-white shadow' : 'hover:bg-slate-200'}`}>Thẻ ngân hàng</button>
                        <button onClick={() => setPaymentMethod('momo')} className={`flex-1 text-center py-2 rounded-md cursor-pointer transition-colors ${paymentMethod === 'momo' ? 'bg-pink-500 text-white shadow' : 'hover:bg-slate-200'}`}>MoMo</button>
                        <button onClick={() => setPaymentMethod('zalo')} className={`flex-1 text-center py-2 rounded-md cursor-pointer transition-colors ${paymentMethod === 'zalo' ? 'bg-blue-500 text-white shadow' : 'hover:bg-slate-200'}`}>ZaloPay</button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                     {paymentMethod === 'card' ? (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Số thẻ</label>
                                <input type="text" placeholder="**** **** **** 1234" required className="w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1">Ngày hết hạn</label>
                                    <input type="text" placeholder="MM/YY" required className="w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1">CVC</label>
                                    <input type="text" placeholder="123" required className="w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
                                </div>
                            </div>
                        </>
                     ) : (
                        <div className="text-center p-8 bg-background rounded-lg">
                            <p className="font-semibold">Quét mã QR để thanh toán</p>
                            <div className="w-40 h-40 bg-slate-300 mx-auto mt-4 flex items-center justify-center">
                                <p className="text-sm text-text-secondary">QR Code</p>
                            </div>
                        </div>
                     )}
                     <div className="pt-4 flex items-center gap-4">
                         <button type="button" onClick={onBack} className="flex-1 bg-slate-200 hover:bg-slate-300 text-text-primary font-bold py-3 px-6 rounded-lg transition-colors">
                            Quay lại
                        </button>
                        <button type="submit" className="flex-1 bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-lg transition-colors">
                            Thanh toán
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentView;