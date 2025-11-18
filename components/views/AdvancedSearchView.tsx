
import React, { useState, useEffect, useMemo } from 'react';
import { Novel, NovelSortOption } from '../../types';
import Icon from '../common/Icon';

const NovelCard: React.FC<{ novel: Novel; onSelectNovel: (novel: Novel) => void; }> = ({ novel, onSelectNovel }) => (
    <div 
        onClick={() => onSelectNovel(novel)}
        className="bg-surface rounded-lg overflow-hidden shadow-lg border border-border-color group cursor-pointer transform hover:-translate-y-1 transition-transform duration-300"
    >
        <img src={novel.coverImage} alt={novel.title} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="font-bold text-md text-text-primary truncate group-hover:text-primary transition-colors">{novel.title}</h3>
            <p className="text-sm text-text-secondary">{novel.author}</p>
        </div>
    </div>
);

const AdvancedSearchView: React.FC<{
    onFilterChange: (filters: { [key: string]: string | number | undefined }) => void;
    genres: string[];
    novels: Novel[];
    onSelectNovel: (novel: Novel) => void;
    initialKeyword?: string; // New prop
}> = ({ onFilterChange, genres, novels, onSelectNovel, initialKeyword }) => {
    const [filters, setFilters] = useState<{ [key: string]: string | number | undefined }>({
        keyword: initialKeyword || '',
        description: '',
        tags: '',
        chapters: '',
        sort: 'newest',
        status: '',
        genre: ''
    });

    useEffect(() => {
        if (initialKeyword !== undefined) {
            setFilters(prev => ({ ...prev, keyword: initialKeyword }));
        }
    }, [initialKeyword]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilterChange(filters);
    };

    const filteredNovels = useMemo(() => {
        return novels.filter(novel => {
            const keyword = (filters.keyword as string).toLowerCase();
            const description = (filters.description as string).toLowerCase();
            const tags = (filters.tags as string).toLowerCase().split(',').map(t => t.trim()).filter(Boolean);
            const minChapters = filters.chapters ? parseInt(filters.chapters as string) : 0;
            const status = filters.status as string;
            const genre = filters.genre as string;

            const matchesKeyword = !keyword || novel.title.toLowerCase().includes(keyword) || novel.author.toLowerCase().includes(keyword);
            const matchesDescription = !description || novel.summary.toLowerCase().includes(description);
            const matchesChapters = novel.chapters.length >= minChapters;
            const matchesStatus = !status || novel.status === status;
            const matchesGenre = !genre || novel.genre.includes(genre);
            const matchesTags = tags.length === 0 || tags.every(tag => novel.tags.some(nt => nt.toLowerCase().includes(tag)));

            return matchesKeyword && matchesDescription && matchesChapters && matchesStatus && matchesGenre && matchesTags;
        }).sort((a, b) => {
            if (filters.sort === 'most_viewed') return b.stats.views - a.stats.views;
            if (filters.sort === 'most_liked') return b.stats.likes - a.stats.likes;
            // Default newest
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }, [novels, filters]);

    const renderInput = (name: string, placeholder: string, label: string) => (
         <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-semibold text-text-secondary mb-2 block">{label}</label>
            <div className="relative">
                 <Icon name="search" className="w-5 h-5 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
                 <input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    value={filters[name] as string}
                    onChange={handleInputChange}
                    className="w-full bg-blue-50/50 border border-blue-200 rounded-full py-3 pl-12 pr-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary placeholder-blue-400"
                />
            </div>
        </div>
    );
    
    const renderSelect = (name: string, label: string, options: {value:string, label:string}[]) => (
        <div className="flex-1 min-w-[150px]">
            <label className="text-sm font-semibold text-text-secondary mb-2 block">{label}</label>
            <div className="relative">
                <select 
                    name={name}
                    value={filters[name]}
                    onChange={handleInputChange}
                    className="w-full appearance-none bg-background border border-border-color rounded-lg py-3 px-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <Icon name="chevron-down" className="w-5 h-5 text-text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-fade-in">
            <form onSubmit={handleSubmit} className="bg-surface p-6 rounded-lg shadow-lg border border-border-color space-y-6">
                 <h2 className="text-2xl font-bold text-text-primary">Tìm kiếm nâng cao</h2>
                 <div className="flex flex-wrap items-end gap-4">
                     {renderInput('keyword', 'Nhập Tên truyện...', 'Từ khoá')}
                     {renderInput('description', 'Nhập mô tả...', 'Tìm mô tả')}
                 </div>
                 <div className="flex flex-wrap items-end gap-4">
                     {renderSelect('chapters', 'Số Chương', [{value: "", label: 'Tất cả'}, {value:"50", label: '> 50'}, {value: "100", label: '> 100'}, {value: "200", label: '> 200'}])}
                     {renderSelect('sort', 'Sắp Xếp', [{value: "newest", label: 'Mới nhất'}, {value: "most_viewed", label: 'Xem nhiều nhất'}, {value: "most_liked", label: 'Thích nhiều nhất'}])}
                     {renderSelect('status', 'Trạng thái', [{value: "", label: 'Tất cả'}, {value: "Đang tiến hành", label: 'Đang tiến hành'}, {value: "Hoàn thành", label: 'Hoàn thành'}])}
                     {renderSelect('genre', 'Thể loại', [{value: "", label: 'Tất cả'}, ...genres.map(g => ({value: g, label: g}))])}
                 </div>
                 <div className="flex flex-wrap items-end gap-4">
                      {renderInput('tags', 'Nhập nhãn dán...', 'Nhãn dán')}
                 </div>

                 <div className="text-center pt-4">
                     <button type="submit" className="bg-primary hover:bg-secondary text-white font-bold py-3 px-12 rounded-full transition-colors text-lg shadow-md hover:shadow-lg">
                        LỌC KẾT QUẢ
                    </button>
                 </div>
            </form>

             <div>
                <h3 className="text-xl font-bold mb-4">Kết quả tìm kiếm ({filteredNovels.length})</h3>
                {filteredNovels.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filteredNovels.map(novel => (
                            <NovelCard key={novel.id} novel={novel} onSelectNovel={onSelectNovel} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-surface rounded-lg">
                        <Icon name="search" className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-text-primary">Không có kết quả nào</h3>
                        <p className="text-text-secondary mt-2">Vui lòng thử lại với bộ lọc khác.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdvancedSearchView;
