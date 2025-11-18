
import React, { useState } from 'react';
import { Novel, Transaction, User, Chapter } from '../../types';
import Icon from '../common/Icon';
import { mockTransactions } from '../../data/mockData';
import WithdrawalModal from '../modals/WithdrawalModal';

interface AuthorDashboardViewProps {
    novels: Novel[];
    user: User;
    onEditNovel: (novel: Novel) => void;
    onPostNewStory: () => void;
}

const AuthorDashboardView: React.FC<AuthorDashboardViewProps> = ({ novels, user, onEditNovel, onPostNewStory }) => {
    const [activeTab, setActiveTab] = useState<'stories' | 'ai-studio' | 'income'>('stories');
    const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
    const [currentRevenue, setCurrentRevenue] = useState(user.revenue || 0);

    const totalViews = novels.reduce((sum, n) => sum + n.stats.views, 0);
    const totalLikes = novels.reduce((sum, n) => sum + n.stats.likes, 0);

    // Filter chapters that have AI content
    const aiChapters: { novelTitle: string; chapter: Chapter }[] = [];
    novels.forEach(novel => {
        novel.chapters.forEach(chapter => {
            if (chapter.aiComicImages || chapter.aiClipUrl) {
                aiChapters.push({ novelTitle: novel.title, chapter });
            }
        });
    });

    const handleWithdrawal = (amount: number, method: string, accountInfo: string) => {
        const newTx: Transaction = {
            id: `tx-${Date.now()}`,
            type: 'withdrawal',
            amount: -amount,
            description: `Rút tiền qua ${method} (${accountInfo})`,
            date: new Date().toISOString().split('T')[0],
            status: 'pending'
        };
        setTransactions([newTx, ...transactions]);
        setCurrentRevenue(prev => prev - amount);
        setIsWithdrawalModalOpen(false);
        alert("Yêu cầu rút tiền đã được gửi thành công!");
    };

    const TabButton: React.FC<{ id: typeof activeTab, label: string, icon: string }> = ({ id, label, icon }) => (
        <button 
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === id 
                ? 'text-primary border-primary bg-primary/5' 
                : 'text-text-secondary border-transparent hover:text-text-primary hover:bg-slate-50'
            }`}
        >
            <Icon name={icon} className="w-5 h-5" />
            {label}
        </button>
    );

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-text-primary">Bảng điều khiển Tác giả</h2>
                    <p className="text-text-secondary mt-2">Quản lý tác phẩm, nội dung AI và thu nhập của bạn.</p>
                </div>
                {activeTab === 'stories' && (
                    <button onClick={onPostNewStory} className="bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-md">
                        <Icon name="plus" className="w-5 h-5" />
                        Đăng truyện mới
                    </button>
                )}
            </div>

            {/* Navigation Tabs */}
            <div className="bg-surface rounded-lg shadow-sm border border-border-color overflow-hidden">
                <div className="flex overflow-x-auto">
                    <TabButton id="stories" label="Truyện của tôi" icon="book" />
                    <TabButton id="ai-studio" label="AI Studio" icon="ai" />
                    <TabButton id="income" label="Thu nhập & Quà tặng" icon="wallet" />
                </div>
            </div>
            
            {/* Tab Content: Stories */}
            {activeTab === 'stories' && (
                <>
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color">
                            <h3 className="text-lg font-semibold text-text-secondary">Tổng số truyện</h3>
                            <p className="text-4xl font-bold text-primary mt-2">{novels.length}</p>
                        </div>
                         <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color">
                            <h3 className="text-lg font-semibold text-text-secondary">Tổng lượt xem</h3>
                            <p className="text-4xl font-bold text-primary mt-2">{totalViews.toLocaleString()}</p>
                        </div>
                         <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color">
                            <h3 className="text-lg font-semibold text-text-secondary">Tổng lượt thích</h3>
                            <p className="text-4xl font-bold text-primary mt-2">{totalLikes.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Novels List */}
                    <div className="bg-surface rounded-lg shadow-lg border border-border-color">
                         <h3 className="text-xl font-bold p-4 border-b border-border-color">Danh sách tác phẩm</h3>
                         <div className="divide-y divide-border-color">
                            {novels.length > 0 ? novels.map(novel => (
                                <div key={novel.id} className="p-4 flex flex-col md:flex-row items-center gap-4 hover:bg-slate-50 transition-colors">
                                    <img src={novel.coverImage} alt={novel.title} className="w-16 h-24 object-cover rounded-md shadow-sm"/>
                                    <div className="flex-grow text-center md:text-left">
                                        <h4 className="font-bold text-lg text-text-primary">{novel.title}</h4>
                                        <p className="text-sm text-text-secondary mt-1 flex items-center gap-2 justify-center md:justify-start">
                                            <span className={`w-2 h-2 rounded-full ${novel.status === 'Hoàn thành' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                                            {novel.chapters.length} chương - {novel.status}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-6 text-text-secondary text-sm">
                                        <div className="flex items-center gap-1" title="Lượt xem"><Icon name="eye" className="w-4 h-4"/> {novel.stats.views.toLocaleString()}</div>
                                        <div className="flex items-center gap-1" title="Lượt thích"><Icon name="heart" className="w-4 h-4"/> {novel.stats.likes.toLocaleString()}</div>
                                        <div className="flex items-center gap-1" title="Lưu trữ"><Icon name="bookmark" className="w-4 h-4"/> {novel.stats.bookmarks.toLocaleString()}</div>
                                    </div>
                                    <button onClick={() => onEditNovel(novel)} className="bg-white border border-border-color hover:bg-slate-100 text-text-primary font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm">
                                        Quản lý
                                    </button>
                                </div>
                            )) : (
                                <p className="text-center text-text-secondary p-8">Bạn chưa đăng truyện nào.</p>
                            )}
                         </div>
                    </div>
                </>
            )}

            {/* Tab Content: AI Studio */}
            {activeTab === 'ai-studio' && (
                <div className="bg-surface rounded-lg shadow-lg border border-border-color">
                    <div className="p-6 border-b border-border-color bg-slate-50">
                         <h3 className="text-xl font-bold text-text-primary">Quản lý nội dung chuyển đổi AI</h3>
                         <p className="text-text-secondary text-sm mt-1">Theo dõi hiệu quả của các phiên bản truyện tranh và video.</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-100 text-text-secondary text-sm uppercase">
                                    <th className="p-4 font-semibold">Nội dung</th>
                                    <th className="p-4 font-semibold">Loại</th>
                                    <th className="p-4 font-semibold">Lượt xem AI</th>
                                    <th className="p-4 font-semibold">Tương tác</th>
                                    <th className="p-4 font-semibold text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-color">
                                {aiChapters.length > 0 ? aiChapters.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50">
                                        <td className="p-4">
                                            <p className="font-bold text-text-primary">{item.novelTitle}</p>
                                            <p className="text-sm text-text-secondary">{item.chapter.title}</p>
                                        </td>
                                        <td className="p-4">
                                            {item.chapter.aiComicImages ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold"><Icon name="image" className="w-3 h-3"/> Comic</span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold"><Icon name="video" className="w-3 h-3"/> Video</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-text-primary font-medium">
                                            {item.chapter.aiStats?.views.toLocaleString() || 0}
                                        </td>
                                        <td className="p-4 text-text-primary font-medium">
                                             <div className="flex items-center gap-1"><Icon name="heart" className="w-3 h-3 text-red-500"/> {item.chapter.aiStats?.likes.toLocaleString() || 0}</div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-primary hover:underline text-sm font-semibold">Xem chi tiết</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-text-secondary italic">
                                            Bạn chưa có nội dung chuyển đổi AI nào. Hãy vào phần "Quản lý truyện" để tạo.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Tab Content: Income */}
            {activeTab === 'income' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Wallet Card */}
                        <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-20"><Icon name="wallet" className="w-32 h-32"/></div>
                            <p className="text-green-100 font-medium uppercase tracking-wider">Số dư khả dụng</p>
                            <h3 className="text-4xl font-bold mt-2">{currentRevenue.toLocaleString()} VNĐ</h3>
                            <div className="mt-8">
                                <button 
                                    onClick={() => setIsWithdrawalModalOpen(true)}
                                    className="bg-white text-green-800 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-green-50 transition-colors"
                                >
                                    Rút tiền
                                </button>
                                <p className="text-xs text-green-200 mt-3 opacity-80">* Số tiền tối thiểu mỗi lần rút là 100.000 VNĐ</p>
                            </div>
                        </div>

                         {/* Recent Summary */}
                        <div className="bg-surface p-6 rounded-xl shadow-lg border border-border-color flex flex-col justify-center">
                             <h4 className="text-lg font-bold text-text-primary mb-4">Nguồn thu nhập tháng này</h4>
                             <div className="space-y-4">
                                 <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                                     <div className="flex items-center gap-3">
                                         <div className="p-2 bg-yellow-100 rounded-full text-yellow-600"><Icon name="crown" className="w-5 h-5"/></div>
                                         <span className="font-semibold text-text-primary">Chương VIP</span>
                                     </div>
                                     <span className="font-bold text-yellow-700">+400.000 đ</span>
                                 </div>
                                 <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg border border-pink-100">
                                     <div className="flex items-center gap-3">
                                         <div className="p-2 bg-pink-100 rounded-full text-pink-600"><Icon name="gift" className="w-5 h-5"/></div>
                                         <span className="font-semibold text-text-primary">Quà tặng độc giả</span>
                                     </div>
                                     <span className="font-bold text-pink-700">+1.500.000 đ</span>
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="bg-surface rounded-lg shadow-lg border border-border-color">
                        <div className="p-6 border-b border-border-color">
                            <h3 className="text-xl font-bold text-text-primary">Lịch sử giao dịch</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-100 text-text-secondary text-sm uppercase">
                                        <th className="p-4 font-semibold">Ngày</th>
                                        <th className="p-4 font-semibold">Nội dung</th>
                                        <th className="p-4 font-semibold text-right">Số tiền</th>
                                        <th className="p-4 font-semibold text-center">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-color">
                                    {transactions.map(tx => (
                                        <tr key={tx.id} className="hover:bg-slate-50">
                                            <td className="p-4 text-text-secondary text-sm">{tx.date}</td>
                                            <td className="p-4 font-medium text-text-primary">{tx.description}</td>
                                            <td className={`p-4 text-right font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} đ
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                                    tx.status === 'completed' ? 'bg-green-100 text-green-700' : 
                                                    tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {tx.status === 'completed' ? 'Hoàn thành' : tx.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {isWithdrawalModalOpen && (
                <WithdrawalModal 
                    balance={currentRevenue}
                    onClose={() => setIsWithdrawalModalOpen(false)}
                    onSubmit={handleWithdrawal}
                />
            )}
        </div>
    );
};

export default AuthorDashboardView;
