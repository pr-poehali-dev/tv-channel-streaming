
export interface Channel {
  id: number;
  name: string;
  description: string;
  category: string;
  program?: string;
  thumbnail?: string;
  videoType?: string; // Тип видео для соответствия контенту
}

// Категории для каналов
export type ChannelCategory = 'news' | 'anime' | 'films' | 'sports' | 'kids' | 'documentary' | 'series' | 'music' | 'nature';

// Функция для получения реальной ссылки на видео контент по типу контента
export const getVideoByType = (channel: Channel): string => {
  // Коллекция видео по категориям
  const videoLibrary: Record<string, string[]> = {
    news: [
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      "https://cdn.flowplayer.com/a30bd6bc-f98b-47bc-abf5-97633d4faea0/hls/de3f6ca7-2db3-4689-8160-0f574a5996ad/playlist.m3u8",
      "https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8",
    ],
    anime: [
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
      "https://cdn.flowplayer.com/a30bd6bc-f98b-47bc-abf5-97633d4faea0/hls/de3f6ca7-2db3-4689-8160-0f574a5996ad/playlist.m3u8",
    ],
    films: [
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
      "https://cdn.flowplayer.com/a30bd6bc-f98b-47bc-abf5-97633d4faea0/hls/de3f6ca7-2db3-4689-8160-0f574a5996ad/playlist.m3u8",
    ],
    sports: [
      "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
      "https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8",
      "https://cdn.flowplayer.com/a30bd6bc-f98b-47bc-abf5-97633d4faea0/hls/de3f6ca7-2db3-4689-8160-0f574a5996ad/playlist.m3u8",
    ],
    kids: [
      "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      "https://cdn.flowplayer.com/a30bd6bc-f98b-47bc-abf5-97633d4faea0/hls/de3f6ca7-2db3-4689-8160-0f574a5996ad/playlist.m3u8",
    ],
    documentary: [
      "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
      "https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8",
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    ],
    series: [
      "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      "https://cdn.flowplayer.com/a30bd6bc-f98b-47bc-abf5-97633d4faea0/hls/de3f6ca7-2db3-4689-8160-0f574a5996ad/playlist.m3u8",
    ],
    music: [
      "https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8",
      "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
      "https://cdn.flowplayer.com/a30bd6bc-f98b-47bc-abf5-97633d4faea0/hls/de3f6ca7-2db3-4689-8160-0f574a5996ad/playlist.m3u8",
    ],
    nature: [
      "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      "https://cdn.flowplayer.com/a30bd6bc-f98b-47bc-abf5-97633d4faea0/hls/de3f6ca7-2db3-4689-8160-0f574a5996ad/playlist.m3u8",
    ],
    // Для всех остальных типов
    default: [
      "https://cdn.flowplayer.com/a30bd6bc-f98b-47bc-abf5-97633d4faea0/hls/de3f6ca7-2db3-4689-8160-0f574a5996ad/playlist.m3u8",
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    ]
  };

  // Выбор коллекции видео по категории канала
  const videoCollection = videoLibrary[channel.category] || videoLibrary.default;
  
  // Получаем видео на основе ID канала (это гарантирует что ID всегда будет соответствовать одному и тому же видео)
  const videoIndex = channel.id % videoCollection.length;
  return videoCollection[videoIndex];
};

// Для большого количества каналов, создаем массив
const generateChannels = (count: number): Channel[] => {
  const categories: ChannelCategory[] = ['news', 'anime', 'films', 'sports', 'kids', 'documentary', 'series', 'music', 'nature'];
  
  const baseChannels: Channel[] = [
    {
      id: 1,
      name: "Первый канал",
      description: "Главный федеральный канал России с новостями, фильмами и шоу",
      category: "news",
      program: "Новости дня",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Аниме ТВ",
      description: "Круглосуточный канал для любителей японской анимации",
      category: "anime",
      program: "Атака титанов",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Кино Премьер",
      description: "Самые популярные и новые фильмы",
      category: "films",
      program: "Мстители: Финал",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Спорт 24",
      description: "Спортивные трансляции и обзоры в прямом эфире",
      category: "sports",
      program: "Футбол: Обзор матчей",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Детский мир",
      description: "Развлекательные программы для детей разного возраста",
      category: "kids",
      program: "Маша и Медведь",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Discovery",
      description: "Познавательные документальные фильмы о природе и науке",
      category: "documentary",
      program: "Мир океанов",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 7,
      name: "Сериал+",
      description: "Лучшие сериалы со всего мира",
      category: "series",
      program: "Игра престолов",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 8,
      name: "MTV",
      description: "Музыкальный канал с клипами и шоу",
      category: "music",
      program: "Топ-10 хитов",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 9,
      name: "CNN",
      description: "Новости со всего мира на английском языке",
      category: "news",
      program: "Breaking News",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 10,
      name: "Боевики 24/7",
      description: "Канал с боевиками и триллерами",
      category: "films",
      program: "Крепкий орешек",
      thumbnail: "/placeholder.svg"
    },
  ];

  // Если запрошено меньше каналов, чем в базе
  if (count <= baseChannels.length) {
    return baseChannels.slice(0, count);
  }

  // Генерируем дополнительные каналы
  const additionalChannels: Channel[] = [];
  for (let i = baseChannels.length + 1; i <= count; i++) {
    const categoryIndex = i % categories.length;
    const category = categories[categoryIndex];
    
    // Генерируем имя и программу, соответствующие категории
    let name = `Канал ${i}`;
    let program = `Программа ${i}`;
    
    // Подбираем название канала в зависимости от категории
    switch (category) {
      case 'news':
        name = `Новости ${i}`;
        program = `Главные события дня`;
        break;
      case 'anime':
        name = `Аниме ${i}`;
        program = `Лучшие аниме сериалы`;
        break;
      case 'films':
        name = `Кино ${i}`;
        program = `Премьера фильма`;
        break;
      case 'sports':
        name = `Спорт ${i}`;
        program = `Футбольный матч`;
        break;
      case 'kids':
        name = `Детский ${i}`;
        program = `Мультфильмы`;
        break;
      case 'documentary':
        name = `Документальный ${i}`;
        program = `Исследования природы`;
        break;
      case 'series':
        name = `Сериал ${i}`;
        program = `Новая серия`;
        break;
      case 'music':
        name = `Музыка ${i}`;
        program = `Хит-парад`;
        break;
      case 'nature':
        name = `Природа ${i}`;
        program = `Дикий мир`;
        break;
    }
    
    additionalChannels.push({
      id: i,
      name: name,
      description: `Канал ${category} с разнообразным контентом`,
      category: category,
      program: program,
      thumbnail: "/placeholder.svg"
    });
  }

  return [...baseChannels, ...additionalChannels];
};

// Создаем 30 каналов для демонстрации (в реальном приложении их будет 600)
export const channelsData: Channel[] = generateChannels(30);
