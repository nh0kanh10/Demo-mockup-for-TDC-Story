
import React, { useState } from 'react';
import { User } from '../../types';
import Icon from '../common/Icon';
import ReadingPlant from '../common/ReadingPlant';

interface ProfileViewProps {
    user: User;
    onApplyForAuthor: (penName: string, bio: string) => void;
}

const AuthorApplication: React.FC<{ user: User, onApplyForAuthor: (penName: string, bio: string) => void }> = ({ user, onApplyForAuthor }) => {
    const [penName, setPenName] = useState('');
    const [bio, setBio] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!penName.trim() || !bio.trim()){
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        onApplyForAuthor(penName, bio);
    };

    if (user.isAuthor) {
        return (
            <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
                <Icon name="user" className="w-12 h-12 mx-auto mb-2"/>
                <h3 className="text-xl font-bold">Bạn đã là Tác giả!</h3>
                <p>Cảm ơn bạn đã đóng góp cho cộng đồng. Hãy bắt đầu sáng tác ngay!</p>
            </div>
        );
    }
    
    if (user.authorApplicationStatus === 'pending') {
        return (
            <div className="bg-blue-50 border border-blue-200 text-blue-800 p-6 rounded-lg text-center">
                 <Icon name="clock" className="w-12 h-12 mx-auto mb-2 animate-pulse"/>
                <h3 className="text-xl font-bold">Đang chờ xét duyệt</h3>
                <p>Đơn đăng ký trở thành tác giả của bạn đang được chúng tôi xem xét. Vui lòng quay lại sau.</p>
            </div>
        );
    }


    return (
        <div className="bg-background p-6 rounded-lg border border-border-color">
            <h3 className="text-2xl font-bold text-text-primary">Trở thành Tác giả</h3>
            <p className="text-text-secondary mt-2 mb-6">Chia sẻ câu chuyện của bạn và kiếm thu nhập từ đam mê. Điền vào form bên dưới để bắt đầu.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1">Bút danh của bạn</label>
                    <input type="text" value={penName} onChange={e => setPenName(e.target.value)} required className="w-full bg-white border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none" placeholder="Ví dụ: Alex J. Writer" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1">Giới thiệu ngắn về bản thân</label>
                    <textarea value={bio} onChange={e => setBio(e.target.value)} required rows={4} className="w-full bg-white border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none" placeholder="Hãy cho chúng tôi biết về phong cách viết và niềm đam mê của bạn..."></textarea>
                </div>
                <div className="text-right pt-2">
                    <button type="submit" className="bg-primary hover:bg-secondary text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md">Gửi đơn đăng ký</button>
                </div>
            </form>
        </div>
    );
};


const ProfileView: React.FC<ProfileViewProps> = ({ user, onApplyForAuthor }) => {
    // Calculate plant level based on reading streak.
    // Level 1: 0-5 days, Level 2: 6-15 days, Level 3: 16-30 days, Level 4: 30+ days
    let plantLevel = 1;
    let nextLevelMsg = "Cố lên! Đọc thêm để cây lớn nhé.";
    
    if (user.readingStreak > 30) {
        plantLevel = 4;
        nextLevelMsg = "Tuyệt vời! Cây tri thức của bạn đã nở hoa rực rỡ.";
    } else if (user.readingStreak > 15) {
        plantLevel = 3;
        nextLevelMsg = "Chỉ còn chút nữa thôi là cây sẽ nở hoa!";
    } else if (user.readingStreak > 5) {
        plantLevel = 2;
        nextLevelMsg = "Cây đang phát triển rất tốt!";
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* User Header */}
            <div className="bg-surface p-8 rounded-lg shadow-lg border border-border-color flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent text-white rounded-full flex items-center justify-center font-bold text-6xl shadow-xl">
                    {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl font-bold text-text-primary">{user.username}</h2>
                    <p className="text-text-secondary text-lg mt-1 font-medium">{user.isAuthor ? 'Tác giả Chính thức' : 'Thành viên Tích cực'}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                        {user.favoriteGenres?.map(g => (
                            <span key={g} className="px-3 py-1 bg-slate-100 text-text-secondary rounded-full text-sm border border-slate-200">{g}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gamification Section - Reading Plant */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Wallet Card */}
                <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Icon name="wallet" className="w-24 h-24 text-yellow-600" />
                    </div>
                    <p className="text-sm font-semibold text-text-secondary uppercase tracking-wide">Số dư Ví</p>
                    <p className="text-3xl font-extrabold text-yellow-600 mt-2">{user.coins.toLocaleString()} Xu</p>
                    <button className="mt-4 text-sm text-primary hover:underline font-medium">Nạp thêm</button>
                </div>

                {/* Reading Plant Card */}
                <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color flex flex-col items-center justify-center relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Icon name="book" className="w-24 h-24 text-green-600" />
                    </div>
                    <p className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-2">Cây Tri Thức</p>
                    <ReadingPlant level={plantLevel} />
                    <p className="text-xl font-bold text-green-700 mt-3">Chuỗi {user.readingStreak} ngày</p>
                    <p className="text-xs text-text-secondary mt-1 text-center px-4">{nextLevelMsg}</p>
                </div>

                {/* AI Credits Card */}
                <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color flex flex-col items-center justify-center relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Icon name="ai" className="w-24 h-24 text-accent" />
                    </div>
                    <p className="text-sm font-semibold text-text-secondary uppercase tracking-wide">AI Credits</p>
                    <p className="text-3xl font-extrabold text-accent mt-2">{user.aiCredits}</p>
                    <button className="mt-4 text-sm text-primary hover:underline font-medium">Mua thêm lượt</button>
                </div>
            </div>
            
            {/* Author Application Form */}
            <div className="bg-surface p-1 rounded-lg shadow-lg border border-border-color">
                <AuthorApplication user={user} onApplyForAuthor={onApplyForAuthor} />
            </div>

        </div>
    );
};

export default ProfileView;
