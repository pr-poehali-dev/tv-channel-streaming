
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ChannelGrid from '@/components/ChannelGrid';

// Данные категорий
const categories = [
  { id: 'all', name: 'Все' },
  { id: 'films', name: 'Фильмы' },
  { id: 'series', name: 'Сериалы' },
  { id: 'news', name: 'Новости' },
  { id: 'anime', name: 'Аниме' },
  { id: 'sports', name: 'Спорт' },
  { id: 'music', name: 'Музыка' },
  { id: 'kids', name: 'Детские' },
  { id: 'documentary', name: 'Документальные' },
];

const TVMenu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleChannelSelect = (channelId: number) => {
    navigate(`/channel/${channelId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">ТВ Меню</h1>
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Поиск каналов..." 
              className="pl-10 bg-gray-800 border-none text-white" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="bg-gray-800 mb-4">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <ChannelGrid 
                category={category.id} 
                searchQuery={searchQuery} 
                onChannelSelect={handleChannelSelect}
              />
            </TabsContent>
          ))}
        </Tabs>
      </header>
      
      <div className="fixed bottom-6 right-6">
        <Button onClick={() => navigate('/')} variant="secondary">
          Назад
        </Button>
      </div>
    </div>
  );
};

export default TVMenu;
