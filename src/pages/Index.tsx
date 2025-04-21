
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tv, Power } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleScreenClick = () => {
    navigate('/tv');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-purple-900 cursor-pointer relative overflow-hidden"
      onClick={handleScreenClick}
    >
      {/* Динамический фон */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/40 to-black opacity-70"></div>
      
      {/* Анимированные частицы */}
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          ></div>
        ))}
      </div>
      
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center mb-6">
          <Tv className="text-white h-16 w-16 mr-4" />
          <h1 className="text-6xl font-bold mb-2 text-white">ТВ Онлайн</h1>
        </div>
        
        <p className="text-xl text-gray-300 mb-10">Более 600 каналов на любой вкус</p>
        
        <div className="relative mb-8 group">
          <Button 
            className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-xl py-6 px-10 rounded-full shadow-lg group-hover:animate-pulse"
          >
            <Power className="mr-3 h-6 w-6" />
            Включить ТВ
          </Button>
          <div className="absolute -bottom-8 left-0 right-0 text-gray-400 text-sm animate-bounce">
            Нажмите в любом месте экрана
          </div>
        </div>
        
        <div className="mt-12 flex justify-center space-x-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">600+</div>
            <div className="text-sm text-gray-400">Каналов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">24/7</div>
            <div className="text-sm text-gray-400">Доступность</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">HD</div>
            <div className="text-sm text-gray-400">Качество</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
