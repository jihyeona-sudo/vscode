import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  Search,
  X,
  ChevronRight,
  Play,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Check,
  Share2,
  Bookmark,
  Heart,
  ExternalLink,
  Volume2,
  VolumeX,
  BatteryCharging,
  Video,
  ExternalLink as LinkIcon
} from 'lucide-react';
import { articles, storeItems, Article, StoreItem } from './data';

export default function App() {
  // Navigation & UI States
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<StoreItem | null>(null);
  const [activeTab, setActiveTab] = useState<'ALL' | 'FEATURED' | 'TRAVELER' | 'KIDS'>('ALL');
  
  // Custom interactive trailer state (Disney+)
  const [playingTrailer, setPlayingTrailer] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [progress, setProgress] = useState(0);

  // Shopping Cart States
  const [cart, setCart] = useState<{ product: StoreItem; color: string; quantity: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search Results filtering
  const filteredArticles = articles.filter(art => {
    const matchesQuery = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'ALL' || art.category === activeTab;
    return matchesQuery && matchesTab;
  });

  const filteredProducts = storeItems.filter(prod => {
    return prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           prod.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
           prod.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Simple progress bar timer for Disney Plus simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (playingTrailer) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setPlayingTrailer(false);
            setProgress(0);
            return 0;
          }
          return prev + 0.8;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [playingTrailer]);

  // Handle color preset selection when product changes
  useEffect(() => {
    if (selectedProduct && selectedProduct.colors && selectedProduct.colors.length > 0) {
      setSelectedColor(selectedProduct.colors[0]);
    } else {
      setSelectedColor('');
    }
    setQuantity(1);
  }, [selectedProduct]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const addToCartSubmit = () => {
    if (!selectedProduct) return;
    
    // Check if matching item is in cart
    const existingIndex = cart.findIndex(
      item => item.product.id === selectedProduct.id && item.color === selectedColor
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      setCart([...cart, { product: selectedProduct, color: selectedColor, quantity }]);
    }

    triggerToast(`💳 ${selectedProduct.title} (${selectedColor || '기본구성'})이 장바구니에 추가되었습니다.`);
    setSelectedProduct(null);
    setCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const backup = [...cart];
    backup.splice(index, 1);
    setCart(backup);
    triggerToast('🗑️ 장바구니에서 상품이 삭제되었습니다.');
  };

  const checkoutSimulation = () => {
    setCart([]);
    setCartOpen(false);
    triggerToast('⚡ 결제가 가상으로 요청되었습니다! 탐험의 동반자가 되어 주셔서 감사합니다.');
  };

  const handleShare = (title?: string) => {
    const shareTitle = title || "내셔널지오그래픽 코리아";
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      triggerToast('🔗 클립보드에 포털 주소가 복사되었습니다.');
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-[#1d1d1f] antialiased selection:bg-[#FFCC00] selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] max-w-sm animate-bounce-short bg-neutral-900 border-l-4 border-[#FFCC00] text-white px-5 py-4 rounded-lg shadow-2xl flex items-center justify-between gap-3 text-sm">
          <span className="font-medium leading-relaxed">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-white/60 hover:text-white">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Global Header */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#000000] h-[44px] flex justify-between items-center px-4 shadow-md transition-all duration-300">
        <button
          onClick={() => setMenuOpen(true)}
          className="text-white/80 hover:text-white transition-colors flex items-center justify-center p-2"
          aria-label="Menu"
          id="btn-menu"
        >
          <Menu size={20} />
        </button>

        {/* National Geographic Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-[14px] h-[22px] bg-[#FFCC00] transition-transform hover:scale-105" />
          <h1 className="font-display text-[13px] md:text-[14px] font-extrabold tracking-widest text-white uppercase selection:bg-transparent">
            NATIONAL GEOGRAPHIC
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {cart.length > 0 && (
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-white/80 hover:text-[#FFCC00] transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={18} />
              <span className="absolute top-0 right-0 bg-[#FFCC00] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cart.reduce((acc, c) => acc + c.quantity, 0)}
              </span>
            </button>
          )}
          <button
            onClick={() => setSearchOpen(true)}
            className="text-white/80 hover:text-white transition-colors flex items-center justify-center p-2"
            aria-label="Search"
            id="btn-search"
          >
            <Search size={20} />
          </button>
        </div>
      </header>

      {/* Navigation Drawer */}
      <div 
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 left-0 w-80 h-full bg-[#131313] text-white p-6 shadow-2xl transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-[12px] h-[18px] bg-[#FFCC00]" />
              <span className="font-display font-extrabold text-[15px] tracking-wider">PORTAL MENU</span>
            </div>
            <button onClick={() => setMenuOpen(false)} className="text-white/60 hover:text-white p-1">
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            <a 
              href="#section-magazine" 
              onClick={() => { setMenuOpen(false); setActiveTab('ALL'); }}
              className="group py-3 px-2 rounded-lg hover:bg-white/5 transition-all text-neutral-300 hover:text-white flex justify-between items-center"
            >
              <span className="font-display text-[16px]">Magazine</span>
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href="#section-magazine" 
              onClick={() => { setMenuOpen(false); setActiveTab('FEATURED'); }}
              className="group py-3 px-2 rounded-lg hover:bg-white/5 transition-all text-neutral-400 hover:text-[#FFCC00] flex justify-between items-center pl-6 text-sm"
            >
              <span>Featured Stories</span>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href="#section-magazine" 
              onClick={() => { setMenuOpen(false); setActiveTab('TRAVELER'); }}
              className="group py-3 px-2 rounded-lg hover:bg-white/5 transition-all text-neutral-400 hover:text-[#FFCC00] flex justify-between items-center pl-6 text-sm"
            >
              <span>Traveler Edition</span>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href="#section-magazine" 
              onClick={() => { setMenuOpen(false); setActiveTab('KIDS'); }}
              className="group py-3 px-2 rounded-lg hover:bg-white/5 transition-all text-neutral-400 hover:text-[#FFCC00] flex justify-between items-center pl-6 text-sm"
            >
              <span>Kids Universe</span>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <hr className="my-4 border-white/10" />

            <a 
              href="#section-store" 
              onClick={() => setMenuOpen(false)}
              className="group py-3 px-2 rounded-lg hover:bg-white/5 transition-all text-neutral-300 hover:text-white flex justify-between items-center"
            >
              <span className="font-display text-[16px]">Premium Store</span>
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <div className="absolute bottom-6 left-6 right-6 text-xs text-neutral-500 flex flex-col gap-2">
              <div className="flex gap-4">
                <span className="hover:text-neutral-300 cursor-pointer">KR / EN</span>
                <span className="hover:text-neutral-300 cursor-pointer" onClick={() => handleShare()}>공유하기</span>
              </div>
              <p>© 2026 National Geographic Partners</p>
            </div>
          </nav>
        </div>
      </div>

      <main className="w-full pt-[44px]">
        
        {/* Hero Section */}
        <section className="relative w-full h-[85vh] min-h-[580px] bg-black overflow-hidden flex flex-col justify-end items-center pb-20 text-center px-4">
          <div className="absolute inset-0 w-full h-full">
            <img 
              alt="Global Canyon Exploration" 
              className="w-full h-full object-cover z-0 opacity-80 scale-100 transition-transform duration-[10s] hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida/AP1WRLtC_VdJIu10E3o_ImVTZ1il_kWg9ikSebdDRium5nUS9F2IXBHNuVfKRS6ajA-7CZ2EdQ62hNaJXhNHw67DdA6Vsm5xt-LVDGKWqzJVe_o03-0_ydD6wB5OKt_QvGS7nqnxfYFYoQvnK8qsxGS0K884vuyleRsWoeA8Vqa3wPV-zymQ-IbdUTSPf2XeyWVqDU3pS_CSTHLrxE_Mi3KqCkRmL6h71knQh0XO2roCrkA22RsmNvt7pj3FUA8"
              referrerPolicy="no-referrer"
            />
            {/* Dark Linear Gradient Overlay corresponding exactly to the high-contrast aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/30" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span className="font-display text-[11px] md:text-[12px] font-bold text-white/90 uppercase tracking-[0.2em] mb-3 bg-white/10 px-3 py-1 rounded-sm backdrop-blur-md">
              DISNEY PLUS
            </span>
            <h1 className="font-display text-[32px] md:text-[46px] font-extrabold leading-[1.15] tracking-tight text-white mb-2 max-w-2xl px-2">
              지구, 경이로운 행성
            </h1>
            <h2 className="font-sans text-[20px] md:text-[24px] font-semibold text-white mb-4">
              월 스미스가 알려주는 지구의 비밀
            </h2>
            <p className="font-sans text-[14px] md:text-[16px] text-white/70 mb-8 max-w-xl leading-relaxed">
              자연의 웅장함과 생명의 신비를 탐구하는 위대한 여정.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => { setPlayingTrailer(true); setSoundOn(true); }}
                className="bg-[#0066cc] text-white font-sans text-[14px] font-medium px-6 py-3 rounded-md hover:bg-[#0077ED] transition-all flex items-center gap-2 hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <Play size={16} fill="white" />
                Watch Now
              </button>
              <button 
                onClick={() => {
                  const target = articles.find(a => a.id === 'inca-empire');
                  if (target) setSelectedArticle(target);
                }}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-sans text-[14px] font-medium px-6 py-3 rounded-md hover:bg-white/20 transition-all active:scale-95 cursor-pointer"
              >
                Learn more
              </button>
            </div>
          </div>
        </section>

        {/* Magazine Section */}
        <section id="section-magazine" className="w-full bg-[#f5f5f7] py-16 px-4 md:px-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-[28px] md:text-[34px] font-extrabold text-[#1d1d1f] mb-1">
                Magazine
              </h2>
              <p className="font-sans text-[14px] md:text-[15px] text-[#86868b]">
                Discover the latest stories from around the globe.
              </p>
            </div>

            {/* Category Filter Pills (Sleek Micro-Interaction) */}
            <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2 hide-scrollbar">
              {['ALL', 'FEATURED', 'TRAVELER', 'KIDS'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-black text-[#FFCC00]' 
                      : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1: Featured Inka Empire (Large width matching layout image) */}
              <article className="col-span-1 md:col-span-2 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="w-full aspect-[16/10] md:aspect-[1.95/1] relative bg-neutral-100 overflow-hidden">
                  <img 
                    alt="Inca ruins excavation" 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[4s]" 
                    src="https://lh3.googleusercontent.com/aida/AP1WRLu45AQBvxAaPY5E6ImcNyP8TL_snVEcKDBpGMIPV2pzTIqFvUn98NJJo-xWnRv13He_gTyITdaT-pU8zHux-gvXLZXdCBJylqCzm13MjzQZReF22E2BvyTfqknByIgM3N44e4MiJE08Jow2OcvfYQba3FykVRIPPWkmmJrbTOnXBjltMgYC37VQIJVhOgB-ka34vANuR5mKRUbem1J8__82y8Kv7PTovG9_N9JopphkaLW8s2xUdIoW_RoO"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-black text-[#FFCC00] text-[10px] font-bold tracking-widest px-2 py-1 rounded-sm">
                    COVER FEATURED
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[#86868b] font-display text-[11px] font-bold tracking-widest uppercase mb-2 block">
                      FEATURED
                    </span>
                    <h3 className="font-sans text-[22px] md:text-[26px] font-extrabold leading-snug text-[#1d1d1f] mb-3">
                      내셔널지오그래픽 매거진 6월 호
                    </h3>
                    <h4 className="font-sans text-[18px] md:text-[20px] font-semibold text-[#1d1d1f] mb-4">
                      사라진 잉카 제국의 성채를 찾아서
                    </h4>
                    <p className="text-neutral-600 text-[14px] leading-relaxed mb-6">
                      안데스 산맥 해발 3,400미터 밀림 속에 숨겨진 잃어버린 고대 제국의 요새와, 새로 복원된 입체 레이더 기술(LiDAR)이 발견해낸 수 세기 동안 베일에 안긴 문명의 실체.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      const item = articles.find(a => a.id === 'inca-empire');
                      if (item) setSelectedArticle(item);
                    }}
                    className="text-[#0066cc] font-semibold text-[15px] hover:underline flex items-center gap-1 group/btn text-left self-start cursor-pointer"
                  >
                    Read story 
                    <ChevronRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>

              <div className="flex flex-col gap-6">
                
                {/* Card 2: Traveler (Portrait form inside phone background style) */}
                <article 
                  onClick={() => {
                    const item = articles.find(a => a.id === 'still-living');
                    if (item) setSelectedArticle(item);
                  }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer"
                >
                  <div className="w-full aspect-[4/3] relative bg-[#090909] overflow-hidden p-3 flex justify-center items-center">
                    <img 
                      alt="Traveler STILL LIVING" 
                      className="w-full h-full object-cover rounded-md group-hover:scale-[1.03] transition-transform duration-[4s]" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4-dLxXY_0UBdrCKMUIMgSNSMzg4iKGuW5nXvvKmY4FtuBhmTyBgacSOCDd4L_3QmOz5YjJjYqGFKa9qr5BZzcXcZ6_x4Z8PKg0r_IyaQHe9rHQiZpGbQiASBboejWhGEbbrZfAUMDwFKLVBOBLGG-eEQHUPP6BRwkObWzwqwoaCnjbL4yS_2MXk5YyupQqWYjYYtVVO6TLsLGuseNgokb__dhrJNYXuVEyiJjJqgyRafb-efJu6O_xmO-HkoQ7d6Vdb4P9O-t01px"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center">
                    <span className="text-[#86868b] font-display text-[11px] font-bold tracking-widest uppercase mb-1">
                      TRAVELER
                    </span>
                    <h3 className="font-sans text-[17px] md:text-[18px] font-extrabold leading-snug text-[#1d1d1f]">
                      내셔널지오그래픽 트래블러 5월호
                    </h3>
                    <h4 className="font-display font-black text-[#1d1d1f] text-[15px]">
                      STILL LIVING
                    </h4>
                  </div>
                </article>

                {/* Card 3: Tiger (Kids book style) */}
                <article 
                  onClick={() => {
                    const item = articles.find(a => a.id === 'tiger-stripes');
                    if (item) setSelectedArticle(item);
                  }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer"
                >
                  <div className="w-full aspect-[4/3] bg-neutral-100 overflow-hidden relative">
                    <img 
                      alt="Royal Bengal Tiger close-up" 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[4s]" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV3vWK-vxBv8cGIYmWd-69-aX3Y-jDHkjcgHUo1y4X87482hcF3Ht99jdFbBaS8vWpsgb1r2Kz1SWKRXnUjBTC5e_l3MWYvDOSq4xCFgMzZ5QALIGgl8wGNzQ5koPjmjNoqjMg0FYwlRmIWCDDq9LzqTstyA99CB98PQlLeTKb_W1Jxbd65HNNqsYPINlN7bnr1UAJ3O2q7iNotpk1n1kKl20DKHAtBgNqYKMfxXgWb456bE065VNC05RrAoHEVYx5CJxEy5__kAGi"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center">
                    <span className="text-[#86868b] font-display text-[11px] font-bold tracking-widest uppercase mb-1">
                      KIDS
                    </span>
                    <h3 className="font-sans text-[17px] md:text-[18px] font-extrabold leading-snug text-[#1d1d1f]">
                      키즈 매거진 6/7월호 │ 줄무늬가 바뀐 호랑이들
                    </h3>
                  </div>
                </article>
              </div>

            </div>
          </div>
        </section>

        {/* Store Section */}
        <section id="section-store" className="w-full bg-white py-16 px-4 md:px-8 border-t border-neutral-100">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col items-center mb-10 text-center">
              <h2 className="font-display text-[28px] md:text-[34px] font-bold text-[#1d1d1f] mb-1">
                Store
              </h2>
              <button 
                onClick={() => triggerToast('🛒 스토어 기획전 페이지로 들어갑니다.')}
                className="text-[#0066cc] font-sans text-[15px] font-medium hover:underline flex items-center gap-1 group/all cursor-pointer"
              >
                Shop all 
                <ChevronRight size={16} className="transform group-hover/all:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Product 1: Apparel (Large folded t-shirt card spanning 2 columns) */}
              <div 
                onClick={() => setSelectedProduct(storeItems[0])}
                className="col-span-1 md:col-span-2 bg-[#f5f5f7] rounded-xl p-8 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-lg group cursor-pointer"
              >
                <div className="mb-4">
                  <h3 className="font-sans text-[22px] font-extrabold text-[#1d1d1f] tracking-tight">
                    내셔널지오그래픽 어패럴
                  </h3>
                  <p className="font-sans text-[14px] text-[#86868b] mt-1 font-semibold">
                    26 Summer NRN
                  </p>
                </div>
                <div className="w-full max-w-[280px] aspect-square flex items-center justify-center p-2">
                  <img 
                    alt="National Geographic Signature T-Shirt" 
                    className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl74CN6X6MKCj-2N-wWo61Yw2VLMhjNDYZkt3mGLWLY87i444LZ3HsfmMUdRaqQekCvNMG5vIftYL5cl7wFXIdHQB4NqMS9Isegk9JKZfJhHKzLvRA4cV6-Juv-Bx1-xHChbow0NEZXo_gwNS65KGGQQjUhLfWkJvwEEcFbGxF0dVnnkbbCMUUwhT2O7J348zvuE4mICHylyFDbq60XwuFCsxaBX8aMl19si7nuWjiBpM2BuGB3SbxnbU69a4BlxOiJPHOk_072B7Y"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-4">
                  <span className="text-[#0066cc] font-bold text-xs bg-white py-1 px-3 rounded-full border border-neutral-200">
                    49,000 KRW
                  </span>
                </div>
              </div>

              {/* Product 2: Battery (Charging indicator) */}
              <div 
                onClick={() => setSelectedProduct(storeItems[1])}
                className="col-span-1 bg-[#f5f5f7] rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-lg group cursor-pointer"
              >
                <div className="w-16 h-16 bg-[#000000] rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#FFCC00] group-hover:text-black text-white transition-all">
                  <BatteryCharging size={30} />
                </div>
                <h4 className="font-sans text-[18px] font-extrabold text-[#1d1d1f]">
                  마그네틱 보조배터리
                </h4>
                <p className="font-sans text-[14px] text-[#86868b] mt-1 font-semibold">
                  무선충전 지원
                </p>
                <span className="text-xs text-[#0066cc] font-bold mt-4">
                  39,000 KRW
                </span>
              </div>

              {/* Product 3: Action Cam (Video Camera) */}
              <div 
                onClick={() => setSelectedProduct(storeItems[2])}
                className="col-span-1 bg-[#f5f5f7] rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-lg group cursor-pointer"
              >
                <div className="w-16 h-16 bg-[#000000] rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#FFCC00] group-hover:text-black text-white transition-all">
                  <Video size={30} />
                </div>
                <h4 className="font-sans text-[18px] font-extrabold text-[#1d1d1f]">
                  액션 캠
                </h4>
                <p className="font-sans text-[14px] text-[#86868b] mt-1 font-semibold">
                  작지만 위대한 기록
                </p>
                <span className="text-xs text-[#0066cc] font-bold mt-4">
                  389,000 KRW
                </span>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Global Brand Footer */}
      <footer className="w-full bg-[#f5f5f7] py-12 px-4 md:px-8 border-t border-neutral-200">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-6">
          
          <div className="flex items-center justify-center gap-2 mb-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-[14px] h-[22px] bg-[#FFCC00]" />
            <div className="font-display text-[15px] font-extrabold tracking-widest text-black uppercase">
              National Geographic
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[12px] font-sans text-[#86868b] font-medium">
            <a className="hover:text-[#1d1d1f] transition-colors" href="#!">About Us</a>
            <span>|</span>
            <a className="hover:text-[#1d1d1f] transition-colors" href="#!">Terms of Service</a>
            <span>|</span>
            <a className="hover:text-[#1d1d1f] transition-colors" href="#!">Privacy Policy</a>
            <span>|</span>
            <a className="hover:text-[#1d1d1f] transition-colors" href="#!">Contact</a>
          </div>

          <div className="flex gap-6 mt-2">
            <button 
              onClick={() => triggerToast('🎥 채널 홈에서 최신 다큐멘터리 클립을 시청하세요.')}
              className="w-10 h-10 bg-white rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black hover:border-black transition-all cursor-pointer"
              aria-label="YouTube Channel"
            >
              <Play size={16} fill="currentColor" />
            </button>
            <button 
              onClick={() => triggerToast('📸 포토 아카이브 큐레이션으로 들어갑니다.')}
              className="w-10 h-10 bg-white rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black hover:border-black transition-all cursor-pointer"
              aria-label="Camera Highlights"
            >
              <Video size={16} />
            </button>
            <button 
              onClick={() => triggerToast('👍 소통 채널과 멤버십 혜택을 확인해 보세요.')}
              className="w-10 h-10 bg-white rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black hover:border-black transition-all cursor-pointer"
              aria-label="Appreciate"
            >
              <Heart size={16} fill="currentColor" className="text-red-500 scale-95" />
            </button>
          </div>

          <p className="font-sans text-[11px] text-[#86868b] mt-4">
            Copyright © 2026 National Geographic Partners, LLC. All rights reserved.
          </p>
        </div>
      </footer>

      {/* --- MODALS & DRAWERS --- */}

      {/* 1. Article Immersive Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-center items-end md:items-center p-0 md:p-6" onClick={() => setSelectedArticle(null)}>
          <div 
            className="w-full md:max-w-3xl h-[92vh] md:h-[85vh] bg-white rounded-t-2xl md:rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            {/* Parallax Hero Image Cover */}
            <div className="relative h-64 md:h-80 bg-neutral-900 flex-shrink-0">
              <img 
                alt="Story banner cover" 
                className="w-full h-full object-cover" 
                src={selectedArticle.image}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black transition-colors"
                aria-label="Close reader"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] bg-[#FFCC00] text-black px-2 py-0.5 rounded-sm">
                  {selectedArticle.category}
                </span>
                <h2 className="font-sans text-[20px] md:text-[26px] font-black mt-2 leading-tight">
                  {selectedArticle.subtitle || selectedArticle.title}
                </h2>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b pb-4 text-xs text-[#86868b]">
                <div>
                  <p className="font-semibold text-neutral-800">탐사 작성자: {selectedArticle.author}</p>
                  <p>{selectedArticle.date} • {selectedArticle.readTime}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => triggerToast('📑 기사가 북마크 리스트에 저장되었습니다.')} className="p-2 bg-neutral-100 hover:bg-[#FFCC00]/20 rounded-full transition-colors">
                    <Bookmark size={16} />
                  </button>
                  <button onClick={() => handleShare(selectedArticle.title)} className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* Styled article text paragraphs */}
              <div className="space-y-4 text-[#1d1d1f] text-[15px] leading-relaxed font-normal">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx} className={idx === 0 ? "first-letter:text-5xl first-letter:font-extrabold first-letter:float-left first-letter:mr-3 first-letter:text-[#FFCC00] first-letter:h-12" : ""}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Educational Highlight Panel */}
              <div className="bg-[#FFCC00]/10 border border-[#FFCC00]/30 rounded-xl p-5 mt-8">
                <h4 className="font-display font-semibold text-[#1d1d1f] text-sm tracking-wider flex items-center gap-2 mb-2">
                  <div className="w-2 h-4 bg-[#FFCC00]" />
                  GEOGRAPHIC MISSION DEBRIEF
                </h4>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  내셔널지오그래픽 협회는 지구를 구성하는 장엄한 생명과 탐사 기지들의 환경 연구, 생태 보존을 위한 리서치 마이크로 미션을 꾸준히 후원해 왔습니다. 이 기사로 전해진 탐구 지식 또한 지구 보호 기금의 일환으로 기록됩니다.
                </p>
              </div>
            </div>
            
            <div className="bg-neutral-50 p-4 border-t flex justify-end">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="bg-black text-[#FFCC00] text-sm px-6 py-2.5 rounded-md font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Interactive Store Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-center items-end md:items-center p-0 md:p-6" onClick={() => setSelectedProduct(null)}>
          <div 
            className="w-full md:max-w-xl bg-white rounded-t-2xl md:rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center bg-[#f5f5f7]">
              <div>
                <span className="text-[10px] font-bold text-[#0066cc] border border-[#0066cc] uppercase px-2 py-0.5 rounded-full">
                  GEOGRAPHIC EQUIPS
                </span>
                <h2 className="font-sans text-[20px] font-black text-[#1d1d1f] mt-1">
                  {selectedProduct.title}
                </h2>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="text-neutral-500 hover:text-black p-2 bg-neutral-200/60 rounded-full">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 max-h-[70vh]">
              {selectedProduct.image ? (
                <div className="bg-[#f5f5f7] rounded-xl p-8 flex items-center justify-center relative">
                  <img 
                    alt={selectedProduct.title} 
                    className="max-h-56 object-contain" 
                    src={selectedProduct.image}
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="bg-[#1A1A1A] text-white rounded-xl p-8 flex flex-col items-center justify-center">
                  {selectedProduct.icon === 'battery_charging_full' && <BatteryCharging size={60} className="text-[#FFCC00] mb-3" />}
                  {selectedProduct.icon === 'videocam' && <Video size={60} className="text-[#FFCC00] mb-3" />}
                  <span className="font-semibold text-lg">{selectedProduct.title}</span>
                </div>
              )}

              <div>
                <span className="text-[13px] font-extrabold text-[#86868b]">{selectedProduct.subtitle}</span>
                <p className="text-neutral-700 text-[14px] leading-relaxed mt-2 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Color Preset Selector */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div>
                  <label className="text-xs font-bold text-neutral-500 block uppercase mb-2">
                    색상 (COLORS)
                  </label>
                  <div className="flex gap-2">
                    {selectedProduct.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                          selectedColor === color 
                            ? 'bg-black text-[#FFCC00] border-black scale-105' 
                            : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Preset Adjuster */}
              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <span className="text-xs font-bold text-neutral-500 uppercase block">수량 (QUANTITY)</span>
                  <div className="flex items-center gap-1 mt-2">
                    <button 
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-full border flex items-center justify-center text-neutral-600 hover:text-black cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="w-8 h-8 rounded-full border flex items-center justify-center text-neutral-600 hover:text-black cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="text-xs text-neutral-500 font-bold block">가격 (PREMIUM PRICE)</span>
                  <span className="text-xl font-extrabold text-[#0066cc]">
                    {(selectedProduct.price * quantity).toLocaleString()} KRW
                  </span>
                </div>
              </div>

              {/* Quality Standards Panel */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-[11px] text-neutral-500">
                <p className="font-semibold text-neutral-700 mb-1">✓ 내셔널지오그래픽 공식 보증 기여</p>
                <ul className="list-disc list-inside space-y-0.5">
                  {selectedProduct.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 border-t bg-[#f5f5f7] flex justify-end gap-3">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="bg-white border text-neutral-700 px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                취소
              </button>
              <button 
                onClick={addToCartSubmit}
                className="bg-black text-[#FFCC00] hover:bg-neutral-900 transition-colors px-6 py-2.5 rounded-md text-sm font-bold flex items-center gap-2 cursor-pointer"
              >
                <ShoppingCart size={16} />
                장바구니 담기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Global Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-[#131313]/95 backdrop-blur-md flex flex-col p-6 text-white animate-fade-in" onClick={() => setSearchOpen(false)}>
          <div className="max-w-2xl w-full mx-auto" onClick={e => e.stopPropagation()}>
            
            {/* Search Input Bar */}
            <div className="flex justify-between items-center mb-8 border-b-2 border-white/20 pb-4">
              <div className="flex items-center gap-3 flex-1">
                <Search size={24} className="text-[#FFCC00]" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="지구, 우주, 호랑이, 어패럴 검색..."
                  className="bg-transparent border-none text-white text-xl md:text-2xl placeholder-white/30 outline-none w-full font-sans"
                  autoFocus
                />
              </div>
              <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="text-white/60 hover:text-white p-2">
                <X size={24} />
              </button>
            </div>

            {/* Quick search tags */}
            <div className="mb-8">
              <h4 className="text-xs text-neutral-500 font-bold tracking-widest uppercase mb-3">RECOMMENDED KEYWORDS</h4>
              <div className="flex flex-wrap gap-2">
                {['잉카', '호랑이', '어패럴', '보조배터리', '액션 캠', '디즈니 플러스'].map(kw => (
                  <button
                    key={kw}
                    onClick={() => setSearchQuery(kw)}
                    className="bg-white/10 hover:bg-[#FFCC00]/20 hover:text-[#FFCC00] text-sm px-4 py-1.5 rounded-full transition-all cursor-pointer"
                  >
                    #{kw}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Results Stream */}
            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-1">
              
              {/* Articles matching */}
              {filteredArticles.length > 0 && (
                <div>
                  <h4 className="text-xs text-[#FFCC00] font-bold tracking-widest uppercase mb-3">STORIES & MAGAZINE ({filteredArticles.length})</h4>
                  <div className="space-y-3">
                    {filteredArticles.map(art => (
                      <div 
                        key={art.id}
                        onClick={() => { setSelectedArticle(art); setSearchOpen(false); }}
                        className="bg-white/5 hover:bg-white/10 p-3 rounded-lg flex gap-4 cursor-pointer transition-all border border-white/5"
                      >
                        <img alt={art.title} className="w-16 h-16 object-cover rounded" src={art.image} referrerPolicy="no-referrer" />
                        <div>
                          <span className="text-[9px] text-white/50 font-bold block">{art.category}</span>
                          <h5 className="font-sans font-bold text-sm leading-snug text-neutral-100">{art.title}</h5>
                          <p className="text-xs text-[#86868b] mt-1">{art.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products matching */}
              {filteredProducts.length > 0 && (
                <div>
                  <h4 className="text-xs text-[#FFCC00] font-bold tracking-widest uppercase mb-3 mt-6">PREMIUM GOODS ({filteredProducts.length})</h4>
                  <div className="space-y-3">
                    {filteredProducts.map(prod => (
                      <div 
                        key={prod.id}
                        onClick={() => { setSelectedProduct(prod); setSearchOpen(false); }}
                        className="bg-white/5 hover:bg-white/10 p-3 rounded-lg flex justify-between items-center cursor-pointer transition-all border border-white/5"
                      >
                        <div>
                          <h5 className="font-sans font-bold text-sm text-neutral-100">{prod.title}</h5>
                          <span className="text-xs text-[#86868b]">{prod.subtitle}</span>
                        </div>
                        <span className="text-xs text-[#FFCC00] font-semibold">{prod.price.toLocaleString()} KRW</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredArticles.length === 0 && filteredProducts.length === 0 && (
                <div className="text-center py-12 text-neutral-500">
                  <p>일치하는 탐사 자료 또는 상점 물품이 없습니다.</p>
                  <p className="text-xs mt-1">다른 키워드를 시청하시거나 새로운 탐색어를 검색해 보세요.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 4. Interactive Shopping Cart Drawer */}
      <div 
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setCartOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 w-full max-w-md h-full bg-white text-black p-6 shadow-2xl transition-transform duration-300 flex flex-col justify-between ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div>
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <div className="flex items-center gap-2">
                <ShoppingCart className="text-black" />
                <span className="font-sans font-black text-lg">장바구니 (CAMP CART)</span>
              </div>
              <button onClick={() => setCartOpen(false)} className="text-neutral-400 hover:text-black p-1">
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-20 text-neutral-400 font-sans">
                <ShoppingCart size={48} className="mx-auto mb-4 text-neutral-300" />
                <p className="font-semibold text-neutral-600">장바구니가 비어 있습니다.</p>
                <p className="text-xs mt-1">국립 및 탐사 기어 리스트에서 마음에 드는 상품을 담아 보세요.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="bg-neutral-50 rounded-lg p-4 flex gap-4 border border-neutral-100 relative group">
                    {item.product.image ? (
                      <img alt={item.product.title} className="w-16 h-16 object-contain" src={item.product.image} referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-16 h-16 bg-neutral-900 text-[#FFCC00] rounded flex items-center justify-center">
                        {item.product.icon === 'battery_charging_full' ? <BatteryCharging size={24} /> : <Video size={24} />}
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-sans font-bold text-sm text-[#1d1d1f]">{item.product.title}</h4>
                      {item.color && (
                        <span className="text-[11px] font-bold text-[#86868b] bg-neutral-200 px-2 py-0.5 rounded-full block w-max mt-1">
                          색상: {item.color}
                        </span>
                      )}
                      
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-neutral-500 font-semibold">수량: {item.quantity}개</span>
                        <span className="text-sm font-extrabold text-[#0066cc]">
                          {(item.product.price * item.quantity).toLocaleString()} KRW
                        </span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(idx)}
                      className="text-neutral-400 hover:text-red-500 absolute top-2 right-2 p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t pt-4 space-y-4 bg-white">
              <div className="flex justify-between items-center">
                <span className="font-bold text-neutral-500 text-sm">합계 금액</span>
                <span className="text-2xl font-black text-black">
                  {cart.reduce((total, cur) => total + (cur.product.price * cur.quantity), 0).toLocaleString()} KRW
                </span>
              </div>
              
              <div className="bg-neutral-50 px-4 py-3 rounded-lg border text-[11px] text-neutral-500">
                <p>💡 **지식 탐사 기부 동행**: 구매 금액의 3%가 환경 단체에 자동 기부되며, 탐사에 소요되는 기자재 보존에 후원됩니다.</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCart([])}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                >
                  비우기
                </button>
                <button 
                  onClick={checkoutSimulation}
                  className="flex-1 bg-[#FFCC00] text-black font-sans font-black tracking-wider py-3 rounded-lg text-center hover:bg-[#ffda33] hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  주문 요청하기 (가상 결제)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Disney Plus Video Immersive Playback Simulation Overlay */}
      {playingTrailer && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col justify-between p-6">
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#FFCC00]" />
              <span className="text-xs tracking-widest font-black uppercase text-neutral-400">DISNEY PLUS THEATER</span>
            </div>
            <button 
              onClick={() => { setPlayingTrailer(false); setProgress(0); }} 
              className="p-2 border border-white/20 rounded-full text-white/60 hover:text-white hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>

          <div className="my-auto max-w-xl mx-auto text-center space-y-6">
            <div className="relative inline-block px-12 py-10 rounded-full border border-[#FFCC00]/40 animate-pulse">
              <Play className="text-[#FFCC00]" size={48} fill="#FFCC00" />
            </div>
            <div className="space-y-2">
              <h3 className="text-white text-2xl font-black md:text-3xl">지구, 경이로운 행성</h3>
              <p className="text-neutral-400 text-xs max-w-sm mx-auto">
                "우리가 살고 있는 하나뿐인 요새, 안데스의 산줄기부터 미지의 우주까지 심연의 카메라가 포착한 위대한 신비를 감상 중입니다."
              </p>
            </div>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto w-full">
            <div className="flex justify-between items-center text-white/50 text-xs">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSoundOn(!soundOn)}
                  className="p-1 hover:text-white"
                >
                  {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <span>{soundOn ? "음향 재생 중" : "음소거"}</span>
              </div>
              <span>시행 시간: 104분 (다큐멘터리 클립)</span>
            </div>
            {/* Simulation Timeline Progress bar */}
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#FFCC00] h-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
