
import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  Maximize, ArrowLeft, Settings, Tv, Eye, Clock 
} from 'lucide-react';
import { channelsData, getVideoByType } from '@/data/channelsData';

const ChannelView = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [viewCount, setViewCount] = useState<number>(0);
  
  const channel = channelsData.find(ch => ch.id === Number(channelId));
  
  // При монтировании компонента
  useEffect(() => {
    if (channel) {
      // Генерируем случайное количество зрителей от 100 до 50000
      setViewCount(Math.floor(Math.random() * 49900) + 100);
    }
    
    // Очистка при размонтировании
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [channel]);
  
  // Контролирует видимость элементов управления
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isPlaying, showControls]);
  
  // Обработка ошибок и загрузки видео
  const handleVideoError = () => {
    setErrorMessage("Не удалось загрузить видео для этого канала.");
    setIsLoading(false);
  };
  
  const handleVideoLoaded = () => {
    setIsLoading(false);
    setErrorMessage(null);
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error("Ошибка автовоспроизведения:", err);
          setIsPlaying(false);
        });
    }
  };
  
  // Функции управления видео
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.error("Ошибка воспроизведения:", err);
        });
      }
      setIsPlaying(!isPlaying);
      setShowControls(true);
    }
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      handleVideoLoaded();
    }
  };
  
  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (isMuted) {
        videoRef.current.volume = volume;
      } else {
        videoRef.current.volume = 0;
      }
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };
  
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds)) {
      return "0:00";
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
      setShowControls(true);
    }
  };
  
  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
      setShowControls(true);
    }
  };
  
  if (!channel) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Канал не найден</h1>
        <Button onClick={() => navigate('/tv')}>Вернуться в меню</Button>
      </div>
    );
  }
  
  // Получаем соответствующий источник видео для категории канала
  const videoSource = getVideoByType(channel);
  
  return (
    <div 
      className="min-h-screen bg-black flex flex-col relative"
      onMouseMove={() => setShowControls(true)}
    >
      {/* Видео */}
      <div className="flex-grow flex items-center justify-center relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
            <span className="ml-3 text-white">Загрузка канала...</span>
          </div>
        )}
        
        {errorMessage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
            <div className="text-red-500 text-xl mb-4">{errorMessage}</div>
            <Button onClick={() => navigate('/tv')}>Вернуться к списку каналов</Button>
          </div>
        )}
        
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={videoSource}
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleVideoError}
          autoPlay
          controls={false}
          playsInline
        />
        
        {/* Инфо о канале при наведении */}
        {showControls && (
          <div className="absolute top-4 left-4 bg-black/70 p-3 rounded">
            <div className="flex items-center">
              <Tv className="h-5 w-5 text-purple-400 mr-2" />
              <h2 className="text-xl font-bold">{channel.name}</h2>
            </div>
            <p className="text-sm text-gray-300 mt-1">{channel.program}</p>
            <div className="flex items-center mt-2 text-xs text-gray-400">
              <Eye className="h-3 w-3 mr-1" /> 
              <span>{viewCount.toLocaleString()} зрителей</span>
              <Clock className="h-3 w-3 ml-3 mr-1" />
              <span>В эфире: {formatTime(currentTime)}</span>
            </div>
          </div>
        )}
        
        {/* Кнопка возврата */}
        {showControls && (
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute top-4 right-4 hover:bg-white/10"
            onClick={() => navigate('/tv')}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        )}
      </div>
      
      {/* Панель управления */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          {/* Прогресс */}
          <div className="mb-4">
            <Slider 
              value={[currentTime]} 
              max={duration || 100} 
              step={0.1} 
              onValueChange={handleSeek} 
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs mt-1 text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Контроль */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={skipBackward} className="hover:bg-white/10">
                <SkipBack className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={togglePlay}
                className="hover:bg-white/10"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              
              <Button variant="ghost" size="icon" onClick={skipForward} className="hover:bg-white/10">
                <SkipForward className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center ml-4 gap-2">
                <Button variant="ghost" size="icon" onClick={toggleMute} className="hover:bg-white/10">
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                <div className="w-24">
                  <Slider 
                    value={[isMuted ? 0 : volume]} 
                    max={1} 
                    step={0.01} 
                    onValueChange={handleVolumeChange} 
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleFullscreen} className="hover:bg-white/10">
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelView;
