
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleScreenClick = () => {
    navigate('/tv');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-black cursor-pointer"
      onClick={handleScreenClick}
    >
      <div className="text-center animate-pulse">
        <h1 className="text-5xl font-bold mb-6 text-white">Телевизор</h1>
        <p className="text-xl text-gray-300 mb-8">Нажмите в любом месте экрана, чтобы продолжить</p>
        <div className="border-2 border-white p-6 rounded-lg">
          <span className="text-white text-4xl">▶</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
