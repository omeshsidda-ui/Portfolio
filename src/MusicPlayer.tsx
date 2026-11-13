import { useEffect, useRef, useState } from 'react';

function PlayerIcon({ name }: { name: 'play' | 'pause' | 'volume' | 'muted' }) {
  const common = {
    className: 'h-5 w-5',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  if (name === 'play') return <svg {...common}><path d="m8 5 12 7-12 7z" /></svg>;
  if (name === 'pause') return <svg {...common}><path d="M8 5h3v14H8zM15 5h3v14h-3z" /></svg>;
  if (name === 'muted') return <svg {...common}><path d="M11 5 6 9H3v6h3l5 4zM16 9l5 6m0-6-5 6" /></svg>;
  return <svg {...common}><path d="M11 5 6 9H3v6h3l5 4zM15.5 8.5a5 5 0 0 1 0 7m3-10a9 9 0 0 1 0 13" /></svg>;
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateDuration = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const seekFromPointer = (clientX: number) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar || !duration) return;
    const bounds = bar.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (clientX - bounds.left) / bounds.width));
    audio.currentTime = progress * duration;
    setCurrentTime(audio.currentTime);
  };

  const formatTime = (seconds: number) => {
    const safeSeconds = Number.isFinite(seconds) ? seconds : 0;
    const minutes = Math.floor(safeSeconds / 60);
    const remainder = Math.floor(safeSeconds % 60);
    return `${minutes}:${remainder.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="music-player-container" aria-label="Music player">
      <audio
        ref={audioRef}
        src="https://raw.githubusercontent.com/SaadArqam/portfolio/main/public/audio/podcast.mp3"
        preload="metadata"
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className={`vinyl-record${isPlaying ? ' rotating' : ''}`} aria-hidden="true">
        <div className="vinyl-label"><div className="vinyl-hole" /></div>
      </div>

      <div className="music-controls">
        <div className="time-display" aria-live="off">
          <span>{formatTime(currentTime)}</span><span>/</span><span>{formatTime(duration)}</span>
        </div>
        <div
          ref={progressRef}
          className="progress-bar"
          role="slider"
          tabIndex={0}
          aria-label="Track progress"
          aria-valuemin={0}
          aria-valuemax={Math.floor(duration)}
          aria-valuenow={Math.floor(currentTime)}
          onClick={(event) => seekFromPointer(event.clientX)}
          onKeyDown={(event) => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
            event.preventDefault();
            const audio = audioRef.current;
            if (!audio || !duration) return;
            audio.currentTime = Math.min(duration, Math.max(0, audio.currentTime + (event.key === 'ArrowRight' ? 5 : -5)));
            setCurrentTime(audio.currentTime);
          }}
        >
          <div className="progress-filled" style={{ width: `${progress}%` }} />
        </div>
        <div className="controls">
          <button type="button" onClick={togglePlay} className="play-pause-btn" aria-label={isPlaying ? 'Pause music' : 'Play music'}>
            <PlayerIcon name={isPlaying ? 'pause' : 'play'} />
          </button>
          <button type="button" onClick={() => setIsMuted((muted) => !muted)} className="mute-btn" aria-label={isMuted ? 'Unmute music' : 'Mute music'} aria-pressed={isMuted}>
            <PlayerIcon name={isMuted ? 'muted' : 'volume'} />
          </button>
        </div>
      </div>
    </div>
  );
}

