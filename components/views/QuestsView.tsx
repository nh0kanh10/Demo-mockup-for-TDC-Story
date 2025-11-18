import React from 'react';
import { User, Quest } from '../../types';
import Icon from '../common/Icon';

interface QuestsViewProps {
    user: User;
    onClaimQuest: (questId: string) => void;
}

const QuestItem: React.FC<{ quest: Quest, onClaim: (questId: string) => void }> = ({ quest, onClaim }) => {
    const progress = Math.min((quest.currentProgress / quest.goal) * 100, 100);
    const canClaim = progress >= 100 && !quest.isCompleted;

    return (
        <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border-color">
            <div className={`p-3 rounded-full ${canClaim ? 'bg-green-100' : 'bg-slate-100'}`}>
                <Icon name="target" className={`w-8 h-8 ${canClaim ? 'text-green-600' : 'text-slate-500'}`} />
            </div>
            <div className="flex-grow">
                <p className="font-bold text-text-primary">{quest.description}</p>
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="text-sm font-semibold text-text-secondary">{quest.currentProgress}/{quest.goal}</span>
                </div>
            </div>
            <div className="text-right w-40">
                <div className="font-semibold text-accent">+ {quest.rewardXp} XP</div>
                <div className="font-semibold text-yellow-600">+ {quest.rewardCoins} Xu</div>
            </div>
            {quest.isCompleted ? (
                <button disabled className="w-32 bg-slate-300 text-slate-500 font-bold py-2 px-4 rounded-lg cursor-not-allowed">Đã nhận</button>
            ) : canClaim ? (
                <button onClick={() => onClaim(quest.id)} className="w-32 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Nhận thưởng</button>
            ) : (
                <button disabled className="w-32 bg-primary/50 text-white font-bold py-2 px-4 rounded-lg cursor-not-allowed">Chưa xong</button>
            )}
        </div>
    );
};

const QuestsView: React.FC<QuestsViewProps> = ({ user, onClaimQuest }) => {
    const dailyQuests = user.quests.filter(q => q.type === 'daily');
    const weeklyQuests = user.quests.filter(q => q.type === 'weekly');

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
                <Icon name="target" className="w-16 h-16 text-primary mx-auto mb-2" />
                <h2 className="text-3xl font-bold text-text-primary">Nhiệm Vụ & Phần Thưởng</h2>
                <p className="text-text-secondary mt-2">Hoàn thành nhiệm vụ để nhận kinh nghiệm và xu!</p>
            </div>

            <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color">
                <h3 className="text-2xl font-bold mb-4">Nhiệm vụ hàng ngày</h3>
                <div className="space-y-3">
                    {dailyQuests.map(quest => (
                        <QuestItem key={quest.id} quest={quest} onClaim={onClaimQuest} />
                    ))}
                </div>
            </div>

            <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color">
                <h3 className="text-2xl font-bold mb-4">Nhiệm vụ hàng tuần</h3>
                 <div className="space-y-3">
                    {weeklyQuests.map(quest => (
                        <QuestItem key={quest.id} quest={quest} onClaim={onClaimQuest} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestsView;