
import React, { useState } from 'react';
import Icon from '../common/Icon';

interface WithdrawalModalProps {
    balance: number; // Current withdrawable balance in VND
    onClose: () => void;
    onSubmit: (amount: number, method: string, accountInfo: string) => void;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({ balance, onClose, onSubmit }) => {
    const [amount, setAmount] = useState<number>(0);
    const [method, setMethod] = useState('bank');
    const [accountInfo, setAccountInfo] = useState('VCB - 123456789 - Nguyen Van A');

    const MIN_WITHDRAWAL = 100000; // 100k VND

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (amount < MIN_WITHDRAWAL) {
            alert(`Số tiền rút tối thiểu là ${MIN_WITHDRAWAL.toLocaleString()} VNĐ.`);
            return;
        }
        if (amount > balance) {
            alert("Số dư không đủ.");
            return;
        }
        onSubmit(amount, method, accountInfo);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-surface rounded-lg shadow-2xl w-full max-w-md relative animate-fade-in-up border border-border-color" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-border-color flex justify-between items-center">
                    <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                        <Icon name="wallet" className="w-6 h-6 text-green-600" />
                        Yêu cầu rút tiền
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-text-primary">
                        <Icon name="close" className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                         <p className="text-sm text-green-800 font-semibold mb-1">Số dư khả dụng</p>
                         <p className="text-3xl font-bold text-green-700">{balance.toLocaleString()} VNĐ</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-text-secondary mb-1">Số tiền muốn rút (VNĐ)</label>
                        <input 
                            type="number" 
                            value={amount || ''} 
                            onChange={e => setAmount(Number(e.target.value))} 
                            placeholder="Nhập số tiền..."
                            className="w-full bg-background border border-slate-300 rounded-lg p-3 text-lg font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                         <p className="text-xs text-text-secondary mt-1">Tối thiểu: {MIN_WITHDRAWAL.toLocaleString()} VNĐ</p>
                    </div>

                    <div>
                         <label className="block text-sm font-semibold text-text-secondary mb-1">Phương thức nhận</label>
                         <select value={method} onChange={e => setMethod(e.target.value)} className="w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary">
                             <option value="bank">Chuyển khoản ngân hàng</option>
                             <option value="momo">Ví MoMo</option>
                             <option value="paypal">PayPal</option>
                         </select>
                    </div>

                     <div>
                         <label className="block text-sm font-semibold text-text-secondary mb-1">Thông tin tài khoản (Tự động điền từ Cài đặt)</label>
                         <input 
                            type="text" 
                            value={accountInfo} 
                            readOnly 
                            className="w-full bg-slate-100 border border-slate-200 rounded-lg p-3 text-text-secondary cursor-not-allowed"
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-2">
                        <button type="button" onClick={onClose} className="bg-slate-200 hover:bg-slate-300 text-text-primary font-semibold py-2 px-6 rounded-lg">Hủy</button>
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-colors">
                            Gửi yêu cầu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WithdrawalModal;
