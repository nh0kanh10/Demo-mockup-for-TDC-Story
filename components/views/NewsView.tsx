import React from 'react';
import { NewsArticle } from '../../types';
import Icon from '../common/Icon';

interface NewsViewProps {
    articles: NewsArticle[];
}

const NewsView: React.FC<NewsViewProps> = ({ articles }) => {
    
    const getCategoryChip = (category: NewsArticle['category']) => {
        switch (category) {
            case 'Cập nhật':
                return <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{category}</span>;
            case 'Sự kiện':
                return <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{category}</span>;
            case 'Thông báo':
                return <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{category}</span>;
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
                <Icon name="newspaper" className="w-16 h-16 text-primary mx-auto mb-2" />
                <h2 className="text-3xl font-bold text-text-primary">Tin Tức & Thông Báo</h2>
                <p className="text-text-secondary mt-2">Cập nhật những thông tin mới nhất từ chúng tôi.</p>
            </div>
            
            <div className="bg-surface p-6 rounded-lg shadow-lg border border-border-color space-y-6">
                {articles.map(article => (
                    <div key={article.id} className="p-4 rounded-md border-b border-border-color last:border-b-0">
                        <div className="flex items-center gap-4 mb-1">
                            {getCategoryChip(article.category)}
                            <p className="text-sm text-text-secondary">{new Date(article.publishedAt).toLocaleDateString()}</p>
                        </div>
                        <h3 className="text-xl font-bold text-text-primary hover:text-primary cursor-pointer transition-colors">{article.title}</h3>
                        <p className="text-text-secondary mt-1">{article.summary}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsView;
