
import React, { useState, useMemo } from 'react';
import { Novel } from '../../types';
import Icon from '../common/Icon';

type RankPeriod = 'week' | 'month' | 'all';

const RankingView: React.FC<{ novels: Novel[]; onSelectNovel: (novel: Novel) => void; }> = ({ novels, onSelectNovel }) => {
    const [period, setPeriod] = useState<RankPeriod>('all');

    const rankedNovels = useMemo(() => {
        // In a real app, this logic would be backend-driven
        // Here, we simulate by adjusting view counts based on period
        return [...novels]
            .map(n => ({
                ...n,
                simulatedViews: n.stats.views * (period === 'week' ? 0.1 : period === 'month' ? 0.3 : 1)
            }))
            .sort((a, b) => b.simulatedViews - a.simulatedViews);
    }, [novels, period]);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center">
                <Icon name="crown" className="w-16 h-16 text-yellow-500 mx-auto mb-2" />
                <h2 className="text-3xl font-bold text-text-primary">Bảng Xếp Hạng</h2>
                <p className="text-text-secondary mt-2">Khám phá những câu chuyện được yêu thích nhất.</p>
            </div>

            <div className="bg-surface p-4 rounded-lg shadow-lg border border-border-color">
                <div className="flex justify-center border-b border-border-color">
                    <button onClick={() => setPeriod('week')} className={`px-6 py-2 font-semibold ${period === 'week' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}>Top Tuần</button>
                    <button onClick={() => setPeriod('month')} className={`px-6 py-2 font-semibold ${period === 'month' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}>Top Tháng</button>
                    <button onClick={() => setPeriod('all')} className={`px-6 py-2 font-semibold ${period === 'all' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}>Toàn Thời Gian</button>
                </div>

                <div className="mt-4 space-y-3">
                    {rankedNovels.map((novel, index) => (
                        <div key={novel.id} onClick={() => onSelectNovel(novel)} className="flex items-center gap-4 p-3 rounded-md hover:bg-slate-100 cursor-pointer transition-colors">
                            <span className={`text-2xl font-bold w-10 text-center ${index < 3 ? 'text-yellow-600' : 'text-text-secondary'}`}>{index + 1}</span>
                            <img src={novel.coverImage} alt={novel.title} className="w-12 h-16 object-cover rounded-md" />
                            <div className="flex-grow">
                                <h3 className="font-bold text-text-primary">{novel.title}</h3>
                                <p className="text-sm text-text-secondary">{novel.author}</p>
                            </div>
                            <div className="flex items-center gap-4 text-text-secondary">
                                <div className="flex items-center gap-1">
                                    <Icon name="views" className="w-4 h-4" />
                                    <span>{Math.round(novel.simulatedViews).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Icon name="star" className="w-4 h-4" />
                                    <span>{novel.stats.likes.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RankingView;