
import { Card, CardContent } from "@/components/ui/card";
import { channelsData } from "@/data/channelsData";

interface ChannelGridProps {
  category: string;
  searchQuery: string;
  onChannelSelect: (channelId: number) => void;
}

const ChannelGrid = ({ category, searchQuery, onChannelSelect }: ChannelGridProps) => {
  let filteredChannels = channelsData;
  
  // Фильтрация по категории
  if (category !== 'all') {
    filteredChannels = channelsData.filter(channel => channel.category === category);
  }
  
  // Фильтрация по поисковому запросу
  if (searchQuery) {
    filteredChannels = filteredChannels.filter(channel => 
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {filteredChannels.map(channel => (
        <Card 
          key={channel.id} 
          className="cursor-pointer hover:scale-105 transition-transform bg-gray-800 border-gray-700"
          onClick={() => onChannelSelect(channel.id)}
        >
          <CardContent className="p-4">
            <div className="aspect-video relative mb-3 overflow-hidden rounded-md bg-gray-700">
              {channel.thumbnail ? (
                <img 
                  src={channel.thumbnail} 
                  alt={channel.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-3xl">{channel.id}</span>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-black/70 px-1 text-xs rounded">
                {channel.id}
              </div>
            </div>
            <h3 className="font-medium text-white line-clamp-1">{channel.name}</h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">{channel.description}</p>
            <div className="mt-2">
              <span className="inline-block bg-gray-700 text-xs px-2 py-1 rounded-full text-gray-300">
                {channel.program || 'Сейчас в эфире'}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChannelGrid;
