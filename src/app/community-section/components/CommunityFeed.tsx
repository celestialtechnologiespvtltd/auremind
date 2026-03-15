'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Send, X } from 'lucide-react';
import { toast } from 'sonner';

// Backend: GET /api/community-posts?limit=10&page=1
const initialPosts = [
  {
    id: 1,
    avatar: '🦊',
    name: 'Mia K.',
    handle: '@mia_blooms',
    time: '2h ago',
    gradient: 'gradient-peach',
    tag: 'Milestone',
    tagColor: 'bg-green-100 text-green-700',
    text: "30 days of daily journaling! 🎉 I can't believe how much has shifted. I used to dread sitting with my thoughts but now it's my favourite part of the day. If you're on the fence about starting — just do it. Even 3 sentences counts.",
    likes: 47,
    comments: 14,
    liked: false,
    commentList: [
      { avatar: '🐻', name: 'James R.', text: 'This is so inspiring! I just started my first week 💪', time: '1h ago' },
      { avatar: '🦋', name: 'Priya S.', text: 'Congratulations!! 30 days is huge 🌸', time: '45m ago' },
    ],
  },
  {
    id: 2,
    avatar: '🐻',
    name: 'James R.',
    handle: '@james_wellness',
    time: '4h ago',
    gradient: 'gradient-blue',
    tag: 'Advice',
    tagColor: 'bg-blue-100 text-blue-700',
    text: "Does anyone else find mornings really hard? I wake up and the anxiety just hits immediately before I've even opened my eyes. I've been trying the 5-4-3-2-1 grounding technique but would love to hear what works for others 🙏",
    likes: 23,
    comments: 19,
    liked: false,
    commentList: [
      { avatar: '🌺', name: 'Leila N.', text: 'I do this too! What helped me was keeping a glass of water on my nightstand — drinking it first thing before anything else.', time: '3h ago' },
      { avatar: '🦁', name: 'Carlos M.', text: 'Morning pages changed my life. 3 pages of stream of consciousness writing before anything else. No filter, no judgment.', time: '2h ago' },
    ],
  },
  {
    id: 3,
    avatar: '🦋',
    name: 'Priya S.',
    handle: '@priya_mindful',
    time: '6h ago',
    gradient: 'gradient-lavender',
    tag: 'Gratitude',
    tagColor: 'bg-yellow-100 text-yellow-700',
    text: "Gratitude log for today ☀️\n1. The smell of coffee this morning\n2. A stranger who held the door and smiled\n3. The fact that I finished the breathing exercise even when I didn't want to\n\nSmall things, big shifts 🌿",
    likes: 68,
    comments: 22,
    liked: true,
    commentList: [
      { avatar: '🐝', name: 'Hana T.', text: 'I love this format! Saving this to try tonight 💛', time: '5h ago' },
    ],
  },
  {
    id: 4,
    avatar: '🌺',
    name: 'Leila N.',
    handle: '@leila_heals',
    time: '8h ago',
    gradient: 'gradient-pink',
    tag: 'Sharing',
    tagColor: 'bg-pink-100 text-pink-700',
    text: "Today was a hard day. I'm not going to pretend otherwise. But I did one thing: I went outside for 10 minutes. That's it. And somehow that tiny thing made the evening feel survivable. Sending love to anyone else who's just trying to make it through 💜",
    likes: 91,
    comments: 31,
    liked: false,
    commentList: [
      { avatar: '🐻', name: 'James R.', text: 'Thank you for sharing this. You\'re not alone 💙', time: '7h ago' },
      { avatar: '🦊', name: 'Mia K.', text: 'Going outside for 10 minutes IS enough. Proud of you 🌸', time: '6h ago' },
    ],
  },
  {
    id: 5,
    avatar: '🦁',
    name: 'Carlos M.',
    handle: '@carlos_grows',
    time: '10h ago',
    gradient: 'gradient-green',
    tag: 'Milestone',
    tagColor: 'bg-green-100 text-green-700',
    text: "Therapy update: Had my 6-month check-in today and my therapist said she\'s noticed real growth in how I handle conflict. Six months ago I would\'ve laughed at that. Slow progress is still progress 🌱",
    likes: 54,
    comments: 17,
    liked: false,
    commentList: [
      { avatar: '🦋', name: 'Priya S.', text: 'This made me tear up. So proud of you 🌱', time: '9h ago' },
    ],
  },
  {
    id: 6,
    avatar: '🐝',
    name: 'Hana T.',
    handle: '@hana_sunshine',
    time: '12h ago',
    gradient: 'gradient-cream',
    tag: 'Advice',
    tagColor: 'bg-blue-100 text-blue-700',
    text: "Reminder that it\'s okay to not be productive every day. Your worth is not measured by your output. Some days rest IS the work 🫶",
    likes: 112,
    comments: 8,
    liked: false,
    commentList: [],
  },
  {
    id: 7,
    avatar: '🌻',
    name: 'Aiko W.',
    handle: '@aiko_wellness',
    time: '1d ago',
    gradient: 'gradient-lavender',
    tag: 'Sharing',
    tagColor: 'bg-pink-100 text-pink-700',
    text: "I finally told my family I've been struggling. I've been hiding it for months. They were more supportive than I expected and honestly I cried for an hour after. Vulnerability is terrifying but sometimes it opens doors you didn't know were there 🚪✨",
    likes: 78,
    comments: 25,
    liked: false,
    commentList: [
      { avatar: '🌺', name: 'Leila N.', text: 'This took so much courage. I\'m really happy for you 💜', time: '20h ago' },
    ],
  },
  {
    id: 8,
    avatar: '🐠',
    name: 'Remy D.',
    handle: '@remy_drift',
    time: '1d ago',
    gradient: 'gradient-blue',
    tag: 'Gratitude',
    tagColor: 'bg-yellow-100 text-yellow-700',
    text: "Hot take: the community section of this app has done more for my mental health than I expected. Reading everyone's posts reminds me I'm not alone in this. Thank you all for being so honest and kind 🙏",
    likes: 89,
    comments: 12,
    liked: false,
    commentList: [],
  },
];

export default function CommunityFeed() {
  const [posts, setPosts] = useState(initialPosts);
  const [expandedComments, setExpandedComments] = useState<number | null>(null);
  const [newPost, setNewPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [newComment, setNewComment] = useState<Record<number, string>>({});

  const toggleLike = (id: number) => {
    // Backend: POST /api/community-posts/:id/like
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const submitPost = () => {
    if (!newPost.trim()) return;
    setIsPosting(true);
    // Backend: POST /api/community-posts
    setTimeout(() => {
      const post = {
        id: Date.now(),
        avatar: '🌸',
        name: 'Aria M.',
        handle: '@aria_mindbloom',
        time: 'Just now',
        gradient: 'gradient-lavender',
        tag: 'Sharing',
        tagColor: 'bg-pink-100 text-pink-700',
        text: newPost,
        likes: 0,
        comments: 0,
        liked: false,
        commentList: [],
      };
      setPosts(prev => [post, ...prev]);
      setNewPost('');
      setIsPosting(false);
      setShowComposer(false);
      toast.success('Your post is live! 🌸');
    }, 800);
  };

  const submitComment = (postId: number) => {
    const text = newComment[postId];
    if (!text?.trim()) return;
    // Backend: POST /api/community-posts/:id/comments
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? {
          ...p,
          comments: p.comments + 1,
          commentList: [...p.commentList, {
            avatar: '🌸', name: 'Aria M.', text, time: 'Just now'
          }]
        }
        : p
    ));
    setNewComment(prev => ({ ...prev, [postId]: '' }));
    toast.success('Comment added! 💬');
  };

  return (
    <div className="space-y-4">
      {/* Post composer trigger */}
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowComposer(true)}
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 border border-white/60 shadow-sm cursor-pointer flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-2xl gradient-lavender flex items-center justify-center text-xl border border-white/60 flex-shrink-0">
          🌸
        </div>
        <p className="text-sm font-dm text-purple-400 flex-1">Share something with the community...</p>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
          <Send size={14} className="text-white" />
        </div>
      </motion.div>

      {/* Composer modal */}
      <AnimatePresence>
        {showComposer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowComposer(false); }}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white/95 backdrop-blur-xl rounded-4xl p-6 w-full max-w-lg border border-purple-100 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-nunito font-700 text-base text-purple-900">Share with Community 🌸</h3>
                <button
                  onClick={() => setShowComposer(false)}
                  className="w-8 h-8 rounded-xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-purple-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind? Share something kind, honest, or hopeful... 💜"
                rows={5}
                className="w-full bg-purple-50/50 rounded-2xl p-4 text-sm font-dm text-purple-900 placeholder-purple-300 border border-purple-100 outline-none resize-none focus:ring-2 focus:ring-purple-200 transition-all leading-relaxed"
                autoFocus
              />
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs font-dm text-purple-400">{newPost.length}/500</p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={submitPost}
                  disabled={isPosting || !newPost.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-nunito font-700 text-sm bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md disabled:opacity-50 transition-all"
                >
                  {isPosting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                      <Send size={14} />
                    </motion.div>
                  ) : <Send size={14} />}
                  {isPosting ? 'Posting...' : 'Post'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts */}
      <AnimatePresence>
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/60 shadow-sm overflow-hidden"
          >
            <div className="p-4">
              {/* Post header */}
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-11 h-11 rounded-2xl ${post.gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-sm border border-white/60`}>
                  {post.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-nunito font-700 text-sm text-purple-900">{post.name}</p>
                      <p className="text-[10px] font-dm text-purple-400">{post.handle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-dm px-2 py-0.5 rounded-full ${post.tagColor}`}>{post.tag}</span>
                      <p className="text-[10px] font-dm text-purple-400">{post.time}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post text */}
              <p className="text-sm font-dm text-purple-800 leading-relaxed whitespace-pre-line mb-3">{post.text}</p>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2 border-t border-purple-50">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 transition-colors ${post.liked ? 'text-pink-500' : 'text-purple-300 hover:text-pink-400'}`}
                >
                  <Heart size={16} fill={post.liked ? 'currentColor' : 'none'} />
                  <span className="text-xs font-dm text-tabular">{post.likes}</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setExpandedComments(expandedComments === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 text-purple-300 hover:text-purple-500 transition-colors"
                >
                  <MessageCircle size={16} />
                  <span className="text-xs font-dm text-tabular">{post.comments}</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => { navigator.clipboard?.writeText(post.text); toast.success('Copied to share 🔗'); }}
                  className="flex items-center gap-1.5 text-purple-300 hover:text-purple-500 transition-colors ml-auto"
                >
                  <Share2 size={16} />
                </motion.button>
              </div>
            </div>

            {/* Comments section */}
            <AnimatePresence>
              {expandedComments === post.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 bg-purple-50/40 border-t border-purple-50">
                    {/* Existing comments */}
                    {post.commentList.length > 0 && (
                      <div className="space-y-3 pt-3 mb-3">
                        {post.commentList.map((c, ci) => (
                          <div key={ci} className="flex items-start gap-2">
                            <div className="w-7 h-7 rounded-xl bg-white/80 flex items-center justify-center text-base flex-shrink-0 border border-purple-100">
                              {c.avatar}
                            </div>
                            <div className="flex-1 bg-white/60 rounded-2xl px-3 py-2 border border-purple-50">
                              <div className="flex items-center justify-between mb-0.5">
                                <p className="font-nunito font-700 text-xs text-purple-900">{c.name}</p>
                                <p className="text-[10px] font-dm text-purple-400">{c.time}</p>
                              </div>
                              <p className="text-xs font-dm text-purple-700 leading-relaxed">{c.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* New comment input */}
                    <div className="flex items-center gap-2 pt-2">
                      <div className="w-7 h-7 rounded-xl gradient-lavender flex items-center justify-center text-base flex-shrink-0 border border-white/60">
                        🌸
                      </div>
                      <div className="flex-1 flex items-center gap-2 bg-white/70 rounded-2xl px-3 py-2 border border-purple-100">
                        <input
                          value={newComment[post.id] || ''}
                          onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyDown={(e) => { if (e.key === 'Enter') submitComment(post.id); }}
                          placeholder="Add a kind comment..."
                          className="flex-1 text-xs font-dm text-purple-900 placeholder-purple-300 bg-transparent outline-none"
                        />
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => submitComment(post.id)}
                          className="w-6 h-6 rounded-lg bg-purple-400 flex items-center justify-center text-white flex-shrink-0"
                        >
                          <Send size={11} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Safety notice */}
      <div className="bg-blue-50 border border-blue-100 rounded-3xl p-4 flex items-start gap-3">
        <span className="text-xl flex-shrink-0">🛡️</span>
        <div>
          <p className="font-nunito font-700 text-sm text-blue-800 mb-1">Safe Space Guidelines</p>
          <p className="text-xs font-dm text-blue-700 leading-relaxed">
            Be kind, be honest, be supportive. No judgment here. If you're in crisis, please contact a professional helpline immediately.
          </p>
        </div>
      </div>
    </div>
  );
}