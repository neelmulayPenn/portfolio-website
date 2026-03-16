'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Play, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import researchData from '../data/research.json';

interface VideoData {
  caption?: string;
  link: string;
}

interface FileData {
  caption?: string;
  link: string;
}

interface ResearchItem {
  title: string;
  description: string;
  videos?: VideoData[];
  pdfs?: FileData[];
  images?: string[];
  links?: FileData[];
  achievements?: string[];
  skills?: string[];
}

const getYouTubeId = (url: string): string | null => {
  if (!url) return null;
  try {
    const u = new URL(url);
    // short youtu.be links
    if (u.hostname === 'youtu.be') return u.pathname.slice(1);

    if (u.hostname.includes('youtube.com')) {
      // standard watch?v=ID
      const v = u.searchParams.get('v');
      if (v) return v;

      // handle /shorts/ID and /embed/ID and similar paths
      const pathMatch = u.pathname.match(/\/(?:embed|shorts)\/([a-zA-Z0-9_-]{11})/);
      if (pathMatch && pathMatch[1]) return pathMatch[1];

      // fallback: use last path segment if it looks like an ID
      const seg = u.pathname.split('/').filter(Boolean).pop();
      if (seg && seg.length === 11) return seg;
    }
  } catch (e) {
    const regex = /(?:v=|\/(?:embed|shorts)\/|\/)([a-zA-Z0-9_-]{11})/;
    const m = url.match(regex);
    return m ? m[1] : null;
  }
  return null;
};

const getYoutubeEmbedUrl = (url: string) => {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : null;
};

const getYoutubeThumbnailUrl = (url: string): string | null => {
  const id = getYouTubeId(url);
  if (id) return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  return null;
};

const ResearchDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [item, setItem] = useState<ResearchItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(0);

  useEffect(() => {
    const idx = Number(id);
    if (isNaN(idx)) {
      setIsLoading(false);
      return;
    }
    const data = researchData as { research: ResearchItem[] };
    if (idx < 0 || idx >= data.research.length) {
      setIsLoading(false);
      return;
    }
    setItem(data.research[idx]);
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const getGoogleDriveImageUrl = (url?: string | null) : string | null => {
    if (!url) return null;
    if (!url.includes('drive.google.com/file/d')) return null;
    const m = url.match(/\/d\/([^\/]+)/);
    if (m && m[1]) return `https://lh3.googleusercontent.com/d/${m[1]}`;
    return null;
  };

  const handleImageClick = (imageUrl: string | null) => {
    if (!imageUrl) return;
    setSelectedImage(imageUrl);
    setIsImageOpen(true);
  };

  const closeImage = () => {
    setIsImageOpen(false);
    setSelectedImage(null);
  };

  if (isLoading) return <div className='min-h-screen bg-black text-white flex items-center justify-center'>Loading...</div>;
  if (!item) return <div className='min-h-screen bg-black text-white flex items-center justify-center'>Research item not found</div>;

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='container mx-auto px-4 py-8 md:py-12'>
        <button onClick={() => navigate('/', { state: { scrollTo: 'research' } })} className='inline-flex items-center text-white hover:text-gray-300 mb-6 px-3 py-1 mt-4 rounded-md transition-colors'>
          <ArrowLeft className='mr-2' size={16} /> Back to Research
        </button>

        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className='text-4xl md:text-6xl font-bold mb-4'>
          {item.title.toUpperCase()}
        </motion.h1>
        <div className='w-full h-0.5 bg-white mb-8'></div>

        {item.videos && item.videos.length > 0 && (
          <div className='mb-8'>
            <h2 className='text-3xl font-bold mb-4'>VIDEOS</h2>

            {item.videos[selectedVideoIndex]?.caption && (
              <motion.p key={selectedVideoIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-lg text-gray-300 mb-4 italic'>
                {item.videos[selectedVideoIndex].caption}
              </motion.p>
            )}

            <motion.div layout className='relative w-full aspect-video bg-zinc-900 rounded-lg overflow-hidden shadow-xl mb-6 md:mb-8 border border-zinc-700'>
              {getYoutubeEmbedUrl(item.videos[selectedVideoIndex].link) ? (
                <iframe
                  key={getYoutubeEmbedUrl(item.videos[selectedVideoIndex].link) as string}
                  src={getYoutubeEmbedUrl(item.videos[selectedVideoIndex].link) as string}
                  className='absolute top-0 left-0 w-full h-full'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                  title={item.videos[selectedVideoIndex].caption || `Video ${selectedVideoIndex + 1}`}
                  loading='lazy'
                ></iframe>
              ) : (
                <div className='w-full h-full flex items-center justify-center text-gray-500'>
                  Video could not be loaded.
                </div>
              )}
            </motion.div>

            {item.videos.length > 1 && (
              <div className='relative'>
                <div className='flex space-x-3 sm:space-x-4 overflow-x-auto pb-4 pt-2 px-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900'>
                  {item.videos.map((video, index) => {
                    const thumbnailUrl = getYoutubeThumbnailUrl(video.link);
                    const isSelected = index === selectedVideoIndex;

                    return (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedVideoIndex(index)}
                        aria-current={isSelected ? 'true' : 'false'}
                        aria-label={`Play video: ${video.caption || `Video ${index + 1}`}`}
                        className={`relative flex-shrink-0 w-40 sm:w-48 md:w-56 aspect-video rounded-md overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-white transition-all duration-200 ${
                          isSelected
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-black shadow-lg'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        {thumbnailUrl ? (
                          <img src={thumbnailUrl} alt={video.caption || `Video ${index + 1} Thumbnail`} className='w-full h-full object-cover' />
                        ) : (
                          <div className='w-full h-full bg-zinc-800 flex items-center justify-center text-xs text-gray-400 px-2 text-center'>Thumbnail Unavailable</div>
                        )}
                        <div className='absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-0 transition-opacity flex items-center justify-center'>
                          {!isSelected && <Play size={24} fill='white' className='text-white opacity-70 drop-shadow-lg' />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {item.images && item.images.length > 0 && (
          <div className='mb-8'>
            <h2 className='text-3xl font-bold mb-4'>IMAGES</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {item.images.map((imageUrl, idx) => {
                const display = getGoogleDriveImageUrl(imageUrl) || imageUrl;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className='relative aspect-video rounded-lg overflow-hidden cursor-pointer group bg-zinc-800'
                    onClick={() => handleImageClick(display)}
                  >
                    <img
                      src={display}
                      alt={`Image ${idx + 1}`}
                      className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
                      loading='lazy'
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) parent.innerHTML = '<div class="flex items-center justify-center text-gray-400 p-4">Image unavailable</div>';
                      }}
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity'></div>
                    <div className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent'>
                      <p className='text-white text-sm font-medium'>Image {idx + 1}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {isImageOpen && selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90'
                onClick={closeImage}
              >
                <motion.button
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  onClick={closeImage}
                  className='absolute top-4 right-4 z-20 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors text-white'
                >
                  <X size={24} />
                </motion.button>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className='relative w-full max-w-4xl max-h-[90vh]'
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src={selectedImage} alt='Research image enlarged' className='object-contain w-full h-full rounded-lg shadow-xl block' />
                </motion.div>
              </motion.div>
            )}
          </div>
        )}

        {item.pdfs && item.pdfs.length > 0 && (
          <div className='mb-8'>
            <h2 className='text-3xl font-bold mb-4'>DOCUMENTS</h2>
            <div className='space-y-4'>
              {item.pdfs.map((f, idx) => (
                <div key={idx} className='bg-zinc-900 p-4 rounded'>
                  <a href={f.link} target='_blank' rel='noreferrer' className='text-white underline'>
                    {f.caption || 'Open PDF'}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {item.links && item.links.length > 0 && (
          <div className='mb-8'>
            <h2 className='text-3xl font-bold mb-4'>LINKS</h2>
            <ul className='space-y-2'>
              {item.links.map((l, idx) => (
                <li key={idx}>
                  <a href={l.link} target='_blank' rel='noreferrer' className='text-green-400 underline'>
                    {l.caption || l.link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.achievements && item.achievements.length > 0 && (
          <div className='mb-8'>
            <h2 className='text-3xl font-bold mb-4'>HIGHLIGHTS</h2>
            <ul className='list-disc list-inside text-gray-300 space-y-2'>
              {item.achievements.map((a, idx) => (
                <li key={idx}>{a}</li>
              ))}
            </ul>
          </div>
        )}

        {item.skills && item.skills.length > 0 && (
          <div className='mb-8'>
            <h2 className='text-3xl font-bold mb-4'>SKILLS</h2>
            <div className='flex flex-wrap gap-3'>
              {item.skills.map((s, idx) => (
                <span key={idx} className='bg-zinc-800 px-4 py-2 rounded-full border border-zinc-700'>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer id={'getintouch'} />
    </div>
  );
};

export default ResearchDetail;
