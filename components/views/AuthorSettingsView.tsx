import React, { useState } from 'react';
import Icon from '../common/Icon';

const AuthorSettingsView: React.FC = () => {
    const [penName, setPenName] = useState('Tác Giả Mẫu');
    const [paymentMethod, setPaymentMethod] = useState('paypal');
    const [paymentEmail, setPaymentEmail] = useState('author@example.com');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Cài đặt tác giả đã được lưu!');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
             <div className="text-center">
                <Icon name="edit-3" className="w-16 h-16 text-primary mx-auto mb-2" />
                <h2 className="text-3xl font-bold text-text-primary">Cài Đặt Tác Giả</h2>
                <p className="text-text-secondary mt-2">Quản lý thông tin bút danh và phương thức thanh toán của bạn.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-lg shadow-lg border border-border-color space-y-6">
                 <div>
                    <label className="block text-lg font-semibold text-text-primary mb-2">Bút danh</label>
                    <input 
                        type="text" 
                        value={penName} 
                        onChange={e => setPenName(e.target.value)} 
                        required 
                        className="w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" 
                    />
                    <p className="text-xs text-text-secondary mt-1">Đây là tên sẽ hiển thị cho các tác phẩm của bạn.</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Thông tin thanh toán</h3>
                    <p className="text-sm text-text-secondary mb-4">Chúng tôi sẽ sử dụng thông tin này để gửi thanh toán cho bạn.</p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Phương thức</label>
                             <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary">
                                <option value="paypal">PayPal</option>
                                <option value="bank">Chuyển khoản ngân hàng</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                                {paymentMethod === 'paypal' ? 'Email PayPal' : 'Số tài khoản'}
                            </label>
                            <input 
                                type="text" 
                                value={paymentEmail} 
                                onChange={e => setPaymentEmail(e.target.value)} 
                                required 
                                className="w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" 
                            />
                        </div>
                    </div>
                </div>

                 <div className="pt-6 border-t border-border-color text-right">
                    <button type="submit" className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">Lưu cài đặt</button>
                </div>
            </form>
        </div>
    );
};

export default AuthorSettingsView;
