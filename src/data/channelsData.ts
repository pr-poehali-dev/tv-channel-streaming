
export interface Channel {
  id: number;
  name: string;
  description: string;
  category: string;
  program?: string;
  thumbnail?: string;
  videoUrl?: string;
}

// Создаем 30 каналов для демонстрации (в реальном приложении их будет 600)
export const channelsData: Channel[] = [
  {
    id: 1,
    name: "Первый канал",
    description: "Главный федеральный канал России с новостями, фильмами и шоу",
    category: "news",
    program: "Новости",
    thumbnail: "/placeholder.svg",
    videoUrl: "https://example.com/video1.mp4"
  },
  {
    id: 2,
    name: "Аниме ТВ",
    description: "Круглосуточный канал для любителей японской анимации",
    category: "anime",
    program: "Атака титанов",
    thumbnail: "/placeholder.svg",
    videoUrl: "https://example.com/video2.mp4"
  },
  {
    id: 3,
    name: "Кино Премьер",
    description: "Самые популярные и новые фильмы",
    category: "films",
    program: "Мстители: Финал",
    thumbnail: "/placeholder.svg",
    videoUrl: "https://example.com/video3.mp4"
  },
  {
    id: 4,
    name: "Спорт 24",
    description: "Спортивные трансляции и обзоры в прямом эфире",
    category: "sports",
    program: "Футбол: Обзор матчей",
    thumbnail: "/placeholder.svg",
    videoUrl: "https://example.com/video4.mp4"
  },
  {
    id: 5,
    name: "Детский мир",
    description: "Развлекательные программы для детей разного возраста",
    category: "kids",
    program: "Маша и Медведь",
    thumbnail: "/placeholder.svg",
    videoUrl: "https://example.com/video5.mp4"
  },
  {
    id: 6,
    name: "Discovery",
    description: "Познавательные документальные фильмы о природе и науке",
    category: "documentary",
    program: "Мир океанов",
    thumbnail: "/placeholder.svg",
    videoUrl: "https://example.com/video6.mp4"
  },
  {
    id: 7,
    name: "Сериал+",
    description: "Лучшие сериалы со всего мира",
    category: "series",
    program: "Игра престолов",
    thumbnail: "/placeholder.svg",
    videoUrl: "https://example.com/video7.mp4"
  },
  {
    id: 8,
    name: "MTV",
    description: "Музыкальный канал с клипами и шоу",
    category: "music",
    program: "Топ-10 хитов",
    thumbnail: "/placeholder.svg",
    videoUrl: "https://example.com/video8.mp4"
  },
  {
    id: 9,
    name: "CNN",
    description: "Новости со всего мира на английском языке",
    category: "news",
    program: "Breaking News",
    thumbnail: "/placeholder.svg",
    videoUrl: "https://example.com/video9.mp4"
  },
  {
    id: 10,
    name: "Боевики 24/7",
    description: "Канал с боевиками и триллерами",
    category: "films",
    program: "Крепкий орешек",
    thumbnail: "/placeholder.svg",
    videoUrl: "https://example.com/video10.mp4"
  },
  // Добавляем еще 20 каналов для демонстрации
  ...Array.from({ length: 20 }).map((_, index) => {
    const id = index + 11;
    const categoryIndex = id % 9;
    const categories = ['news', 'anime', 'films', 'sports', 'kids', 'documentary', 'series', 'music', 'documentary'];
    
    return {
      id,
      name: `Канал ${id}`,
      description: `Описание канала ${id}`,
      category: categories[categoryIndex],
      program: `Программа ${id}`,
      thumbnail: "/placeholder.svg",
      videoUrl: `https://example.com/video${id}.mp4`
    };
  })
];
