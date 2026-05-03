import { useRef, useState } from 'react';

export default function AudioPlayer({ tracks }: { tracks: { title: string; url: string }[] }) {
  const [idx, setIdx] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  return (
    <div className="card">
      <p className="font-semibold">Now Playing: {tracks[idx].title}</p>
      <audio ref={audioRef} src={tracks[idx].url} controls loop className="w-full mt-2" />
      <div className="flex flex-wrap gap-2 mt-3">
        {tracks.map((t, i) => <button key={t.url} onClick={() => setIdx(i)} className="px-3 py-1 rounded-full bg-amber-100">{t.title}</button>)}
      </div>
    </div>
  );
}
