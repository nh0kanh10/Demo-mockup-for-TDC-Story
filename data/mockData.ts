
import { Novel, User, CommunityPost, CoinPackage, NewsArticle, Gift, Transaction } from '../types';

export const mockUser: User = {
    id: 'user-1',
    username: 'TDC_Reader',
    isAuthor: false,
    authorApplicationStatus: 'none',
    coins: 1250,
    revenue: 1500000, // 1.5M VND
    readingStreak: 23,
    quests: [
        { id: 'q1', description: 'Đọc 3 chương truyện', goal: 3, currentProgress: 1, rewardXp: 50, rewardCoins: 10, isCompleted: false, type: 'daily' },
        { id: 'q2', description: 'Đăng nhập hàng ngày', goal: 1, currentProgress: 1, rewardXp: 20, rewardCoins: 5, isCompleted: true, type: 'daily' },
        { id: 'q3', description: 'Viết một bài đánh giá', goal: 1, currentProgress: 0, rewardXp: 100, rewardCoins: 20, isCompleted: false, type: 'daily' },
        { id: 'q4', description: 'Đọc 20 chương trong tuần', goal: 20, currentProgress: 8, rewardXp: 300, rewardCoins: 100, isCompleted: false, type: 'weekly' },
        { id: 'q5', description: 'Theo dõi 1 tác giả mới', goal: 1, currentProgress: 1, rewardXp: 150, rewardCoins: 50, isCompleted: false, type: 'weekly' },
    ],
    lastRead: {
        novelId: 'novel-1',
        chapterId: 'n1-c2',
        progress: 60,
    },
    collections: [
        { id: 'col1', name: 'Top Tiên Hiệp', novelIds: ['novel-5'] },
        { id: 'col2', name: 'Đọc cuối tuần', novelIds: ['novel-2', 'novel-4'] },
    ],
    favoriteGenres: ['Khoa học viễn tưởng', 'Huyền huyễn'],
    unlockedChapterIds: [],
    unlockedAiContentIds: [],
    aiCredits: 5,
    likedReplyIds: ['reply-1-2'],
};

const novel1Chapters = [
    { id: 'n1-c1', chapterNumber: 1, title: 'Chương 1: Sự khởi đầu bất ngờ', content: 'Bầu trời đêm hôm đó thật khác lạ. Những vì sao dường như sáng hơn, và mặt trăng tròn vành vạnh tỏa ra một thứ ánh sáng màu xanh kỳ ảo.\n\nNhân vật chính của chúng ta, Kai, đang trên đường về nhà sau một ngày làm việc mệt mỏi tại thư viện thành phố. Anh không hề biết rằng, cuộc đời mình sắp sửa thay đổi mãi mãi. Một vệt sáng băng qua bầu trời, không phải sao băng, mà là một vật thể lạ đang lao thẳng xuống công viên gần đó. Tò mò, Kai quyết định đi xem thử.', isVip: false, aiComicImages: [
      'https://placehold.co/500x700/0c0a09/6b7280?text=Panel+1',
      'https://placehold.co/500x700/0c0a09/6b7280?text=Panel+2',
      'https://placehold.co/500x700/0c0a09/6b7280?text=Panel+3',
      'https://placehold.co/500x700/0c0a09/6b7280?text=Panel+4',
    ], aiContentPrice: 20, aiStats: { views: 1200, likes: 350 } },
    { id: 'n1-c2', chapterNumber: 2, title: 'Chương 2: Cổ vật ngoài hành tinh', content: 'Tại nơi vật thể lạ rơi xuống, Kai tìm thấy một khối lập phương kim loại, bề mặt của nó liên tục thay đổi hình dạng và màu sắc. Khi anh tò mò chạm vào, một luồng năng lượng mạnh mẽ truyền vào cơ thể, và những ký hiệu khó hiểu hiện lên trong tâm trí anh. Khối lập phương dường như đang giao tiếp với anh. Nó cho anh thấy những hình ảnh về một cuộc chiến tranh thiên hà xa xôi và một lời kêu gọi giúp đỡ.', isVip: false },
    { id: 'n1-c3', chapterNumber: 3, title: 'Chương 3: Sức mạnh thức tỉnh', content: 'Ngày hôm sau, Kai phát hiện ra mình có những khả năng phi thường. Anh có thể di chuyển đồ vật bằng ý nghĩ và đọc được suy nghĩ của người khác. Sức mạnh mới này vừa đáng sợ vừa thú vị. Anh cố gắng kiểm soát chúng, nhưng không hề dễ dàng. Cùng lúc đó, những kẻ lạ mặt bắt đầu xuất hiện, dường như chúng đang truy tìm khối lập phương và người đã sở hữu nó.', isVip: true },
];

const novel2Chapters = [
    { id: 'n2-c1', chapterNumber: 1, title: 'Chương 1: Lá thư từ quá khứ', content: 'Elara là một nhà sử học trẻ tuổi, cô dành cả cuộc đời mình để nghiên cứu về một vương quốc cổ đại đã biến mất không dấu vết. Một ngày nọ, cô nhận được một gói hàng bí ẩn. Bên trong là một cuốn nhật ký cũ kỹ và một chiếc la bàn không chỉ về hướng Bắc. Những dòng chữ trong nhật ký được viết bằng một ngôn ngữ cổ mà cô chưa từng thấy, nhưng kỳ lạ thay, cô có thể đọc được nó một cách dễ dàng.', isVip: false },
    { id: 'n2-c2', chapterNumber: 2, title: 'Chương 2: Con đường bị lãng quên', content: 'Làm theo chỉ dẫn trong nhật ký, chiếc la bàn đã đưa Elara đến một thác nước ẩn sâu trong khu rừng cấm. Đằng sau màn nước là một lối vào bí mật, dẫn đến một con đường hầm cổ xưa. Không khí bên trong lạnh lẽo và ẩm ướt, những bức tường được khắc đầy những hình vẽ kể về một nền văn minh huy hoàng và một lời nguyền khủng khiếp.', isVip: false },
];


export const mockNovels: Novel[] = [
    {
        id: 'novel-1',
        title: 'Vệ Binh Dải Ngân Hà Cuối Cùng',
        author: 'Alex J. Writer',
        authorId: 'author-1',
        summary: 'Một nhân viên thư viện bình thường tình cờ nhặt được một cổ vật ngoài hành tinh, mang trong mình sức mạnh thay đổi cả vũ trụ và gánh nặng giải cứu một nền văn minh đang trên bờ vực diệt vong.',
        coverImage: 'https://placehold.co/400x600/3b82f6/ffffff?text=Vệ+Binh',
        genre: ['Khoa học viễn tưởng', 'Hành động', 'Phiêu lưu'],
        tags: ['Vũ trụ', 'Anh hùng', 'Ngoài hành tinh'],
        status: 'Đang tiến hành',
        chapters: novel1Chapters,
        reviews: [
            {id: 'r1', author: 'Reader_Fan', rating: 5, comment: 'Cốt truyện rất hấp dẫn!', isSpoiler: false, voteType: 'recommend'},
            {id: 'r2', author: 'Bookworm_123', rating: 4, comment: 'Bất ngờ thật, không ngờ Kai lại là người được chọn. Đoạn cuối anh ấy thức tỉnh sức mạnh làm mình nổi da gà.', isSpoiler: true, voteType: 'recommend'}
        ],
        stats: { views: 125000, likes: 8200, bookmarks: 4500 },
        createdAt: '2023-10-26T10:00:00Z',
        fanArt: [
            { id: 'fa1', imageUrl: 'https://placehold.co/300x300/3b82f6/ffffff?text=Fan+Art+1', author: 'FanArtist1', likes: 15 },
            { id: 'fa2', imageUrl: 'https://placehold.co/300x300/4f46e5/ffffff?text=Fan+Art+2', author: 'CreativeFan', likes: 22 },
        ],
    },
    {
        id: 'novel-2',
        title: 'Bí Mật Vương Quốc Atlantis',
        author: 'Sarah Lin',
        authorId: 'author-2',
        summary: 'Một nhà sử học trẻ phát hiện ra con đường dẫn đến vương quốc Atlantis đã mất. Nhưng thay vì một kho báu, cô lại tìm thấy một lời nguyền cổ xưa đang đe dọa nhấn chìm cả thế giới hiện đại.',
        coverImage: 'https://placehold.co/400x600/8b5cf6/ffffff?text=Atlantis',
        genre: ['Huyền huyễn', 'Phiêu lưu', 'Bí ẩn'],
        tags: ['Thần thoại', 'Lời nguyền', 'Khám phá'],
        status: 'Hoàn thành',
        chapters: novel2Chapters,
        reviews: [
             {id: 'r3', author: 'HistoryGeek', rating: 5, comment: 'Kết hợp lịch sử và huyền huyễn rất tốt.', isSpoiler: false, voteType: 'recommend'}
        ],
        stats: { views: 250000, likes: 15000, bookmarks: 9800 },
        createdAt: '2023-08-15T14:30:00Z',
        fanArt: [
            { id: 'fa3', imageUrl: 'https://placehold.co/300x300/8b5cf6/ffffff?text=Atlantis+Art', author: 'HistoryLover', likes: 45 },
        ],
    },
    {
        id: 'novel-3',
        title: 'Học Viện Ma Thuật Veridia',
        author: 'TDC_Reader',
        authorId: 'user-1',
        summary: 'Tại một ngôi trường phép thuật danh giá, một nhóm học sinh với những khả năng đặc biệt phải cùng nhau đối mặt với một thế lực hắc ám đang âm mưu chiếm đoạt nguồn ma thuật cổ đại của học viện.',
        coverImage: 'https://placehold.co/400x600/10b981/ffffff?text=Veridia',
        genre: ['Fantasy', 'Học đường', 'Phép thuật'],
        tags: ['Tình bạn', 'Trưởng thành', 'Bí mật'],
        status: 'Đang tiến hành',
        chapters: [
            { id: 'n3-c1', chapterNumber: 1, title: 'Chương 1: Lễ khai giảng', content: '...', isVip: false },
            { id: 'n3-c2', chapterNumber: 2, title: 'Chương 2: Bài kiểm tra đầu tiên', content: '...', isVip: false }
        ],
        reviews: [],
        stats: { views: 78000, likes: 4100, bookmarks: 2200 },
        createdAt: '2023-11-01T12:00:00Z',
        fanArt: [],
    },
    {
        id: 'novel-4',
        title: 'Thám Tử Lừng Danh Kaito',
        author: 'Detective Ink',
        authorId: 'author-4',
        summary: 'Theo chân Kaito, một thám tử trung học với trí tuệ siêu phàm, trong hành trình phá giải những vụ án hóc búa nhất mà cảnh sát phải bó tay.',
        coverImage: 'https://placehold.co/400x600/f59e0b/ffffff?text=Kaito',
        genre: ['Trinh thám', 'Học đường', 'Bí ẩn'],
        tags: ['Vụ án', 'Lập luận', 'Hồi hộp'],
        status: 'Đang tiến hành',
        chapters: [],
        reviews: [],
        stats: { views: 95000, likes: 6300, bookmarks: 3100 },
        createdAt: '2023-11-05T09:00:00Z',
        fanArt: [],
    },
     {
        id: 'novel-5',
        title: 'Lãng Khách Vô Danh',
        author: 'Kiếm Sĩ Giấu Tên',
        authorId: 'author-5',
        summary: 'Một kiếm sĩ mất trí nhớ lang thang khắp giang hồ để tìm lại quá khứ của mình, trên đường đi anh vướng vào những cuộc tranh đoạt quyền lực và bí mật kinh thiên động địa.',
        coverImage: 'https://placehold.co/400x600/ef4444/ffffff?text=Lãng+Khách',
        genre: ['Kiếm hiệp', 'Hành động'],
        tags: ['Giang hồ', 'Võ thuật', 'Mất trí nhớ'],
        status: 'Hoàn thành',
        chapters: [],
        reviews: [],
        stats: { views: 320000, likes: 25000, bookmarks: 12000 },
        createdAt: '2023-01-20T18:00:00Z',
        fanArt: [],
    }
];

export const mockCommunityPosts: CommunityPost[] = [
    { 
        id: 'post-1', 
        title: 'Thảo luận "Vệ Binh Dải Ngân Hà Cuối Cùng" - Giả thuyết chương 4', 
        content: 'Mình nghĩ rằng khối lập phương không chỉ là một công cụ, mà còn là một thực thể sống có ý thức. Nó đã chọn Kai vì một lý do nào đó mà chúng ta chưa biết. Có thể Kai có một dòng máu đặc biệt, hoặc có một tần số năng lượng tương thích với khối lập phương. Mọi người nghĩ sao?', 
        author: 'SciFi_Lover', 
        createdAt: '2023-11-12T10:00:00Z',
        replies: [
            { id: 'reply-1-1', author: 'Bookworm_123', content: 'Đồng ý! Mình cũng nghĩ vậy. Chi tiết khối lập phương thay đổi hình dạng khi Kai chạm vào làm mình rất tò mò.', createdAt: '2023-11-12T10:05:00Z', likes: 12 },
            { id: 'reply-1-2', author: 'Alex J. Writer', content: 'Rất vui khi thấy các bạn thảo luận sôi nổi. Hãy chờ xem chương tiếp theo nhé ;) ', createdAt: '2023-11-12T11:30:00Z', likes: 45 },
        ] 
    },
    { 
        id: 'post-2', 
        title: 'Tác giả nào có văn phong giống Sarah Lin không?', 
        content: 'Mình rất thích cách Sarah Lin xây dựng thế giới trong "Bí Mật Vương Quốc Atlantis". Cách miêu tả vừa chi tiết, vừa lãng mạn, lại có chút bí ẩn. Mọi người có thể gợi ý cho mình một vài tác giả có phong cách tương tự không? Cảm ơn nhiều!', 
        author: 'Bookworm_123', 
        createdAt: '2023-11-12T08:15:00Z',
        replies: [
            { id: 'reply-2-1', author: 'HistoryGeek', content: 'Bạn có thể thử đọc "Kiếm Sĩ Giấu Tên", cũng là một tác phẩm có cách xây dựng thế giới rất độc đáo.', createdAt: '2023-11-12T09:00:00Z', likes: 5 },
        ]
    },
    { 
        id: 'post-3', 
        title: 'Top 5 truyện huyền huyễn đáng đọc nhất tháng này', 
        content: 'Đây là danh sách cá nhân của mình, mọi người cùng vào đóng góp ý kiến nhé:\n1. Bí Mật Vương Quốc Atlantis\n2. Học Viện Ma Thuật Veridia\n3. ...', 
        author: 'Admin', 
        createdAt: '2023-11-11T14:00:00Z',
        replies: [] 
    },
];

export const mockCoinPackages: CoinPackage[] = [
    { id: 'pkg1', amount: 100, bonus: 0, price: 20000 },
    { id: 'pkg2', amount: 550, bonus: 50, price: 100000 },
    { id: 'pkg3', amount: 1200, bonus: 200, price: 200000 },
    { id: 'pkg4', amount: 3500, bonus: 500, price: 500000 },
];

export const mockNewsArticles: NewsArticle[] = [
    { id: 'news1', title: 'Cập nhật tính năng chuyển đổi AI sang truyện tranh', summary: 'Chúng tôi vui mừng thông báo tính năng mới cho phép các tác giả chuyển đổi chương truyện của mình sang định dạng truyện tranh một cách tự động...', category: 'Cập nhật', publishedAt: '2023-11-10T09:00:00Z' },
    { id: 'news2', title: 'Sự kiện "Sáng Tác Mùa Đông" - Tổng giải thưởng lên đến 10.000.000 Xu', summary: 'Hãy tham gia sự kiện sáng tác lớn nhất năm để có cơ hội nhận được những phần thưởng giá trị và vinh danh tác phẩm của bạn!', category: 'Sự kiện', publishedAt: '2023-11-08T15:00:00Z' },
    { id: 'news3', title: 'Thông báo bảo trì hệ thống ngày 15/11', summary: 'Hệ thống sẽ tạm thời bảo trì để nâng cấp cơ sở hạ tầng. Thời gian dự kiến từ 2:00 AM đến 4:00 AM...', category: 'Thông báo', publishedAt: '2023-11-05T18:00:00Z' },
];

export const mockGifts: Gift[] = [
    { id: 'gift1', name: 'Hoa hồng', icon: 'heart', price: 10 },
    { id: 'gift2', name: 'Tách trà', icon: 'coffee', price: 50 },
    { id: 'gift3', name: 'Kim cương', icon: 'gem', price: 500 },
    { id: 'gift4', name: 'Vương miện', icon: 'crown', price: 1000 },
];


export const allGenres = [
    'Khoa học viễn tưởng', 'Hành động', 'Phiêu lưu', 'Huyền huyễn', 'Bí ẩn',
    'Fantasy', 'Học đường', 'Phép thuật', 'Trinh thám', 'Kiếm hiệp', 'Lãng mạn',
    'Đô thị', 'Lịch sử', 'Quân sự', 'Võng du'
];

export const mockTransactions: Transaction[] = [
    { id: 'tx1', type: 'income_gift', amount: 500, description: 'Quà tặng "Kim cương" từ User123', date: '2023-11-10', status: 'completed' },
    { id: 'tx2', type: 'income_vip', amount: 200, description: 'Mở khóa chương VIP: Chương 15 - Học Viện Ma Thuật', date: '2023-11-11', status: 'completed' },
    { id: 'tx3', type: 'income_vip', amount: 200, description: 'Mở khóa chương VIP: Chương 16 - Học Viện Ma Thuật', date: '2023-11-12', status: 'completed' },
    { id: 'tx4', type: 'withdrawal', amount: -500000, description: 'Rút tiền về tài khoản ngân hàng VCB', date: '2023-11-05', status: 'completed' },
    { id: 'tx5', type: 'income_gift', amount: 1000, description: 'Quà tặng "Vương miện" từ FanCung', date: '2023-11-13', status: 'completed' },
];