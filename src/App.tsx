import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Brain, Factory, FlaskConical, Lightbulb, Package, PenTool, ArrowRight, ChevronDown } from 'lucide-react';
import { useRef } from 'react';

// --- Data ---
const pillars = [
  {
    title: "Beauty from start to finish",
    desc: "연구부터 제품 콘셉트, 완성된 브랜드에 이르기까지 전체 뷰티 파이프라인에 걸쳐 파트너를 지원",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Beyond product development",
    desc: "제품 개발을 넘어 디자인과 상표 개발까지 아우르는 브랜드 구축 역량을 보유\n다양한 브랜딩 인벤토리를 지속적으로 확보",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "The future of beauty",
    desc: "연구와 혁신이 핵심\n제품의 90%가 자체 R&I 센터에서 개발되었고 항상 최적화, 개선, 창조를 위한 새로운 방법을 모색",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Your vision. Our technology.",
    desc: "코스맥스에서만 특정적으로 제공하는 업계 최고의 포뮬러, 지속적으로 확장되는 코스맥스의 상표 기술 컬렉션을 통해 경쟁에 우위",
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800"
  }
];

const processSteps = [
  { id: '01', name: 'Strategy', icon: Lightbulb },
  { id: '02', name: 'Brand concept', icon: Brain },
  { id: '03', name: 'Design', icon: PenTool },
  { id: '04', name: 'Formulation', icon: FlaskConical },
  { id: '05', name: 'Packaging', icon: Package },
  { id: '06', name: 'Manufacturing', icon: Factory }
];

const cases = [
  {
    name: "Emissary 73",
    desc: ["국내 최대 호텔 체인 어매니티 브랜드 및 상품 개발", "글로벌 NO.1 향료사와 공동 개발한 프리미엄 퍼퓸드 어매니티"],
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "florevida",
    desc: ["삼성물산 에버랜드의 뷰티 브랜드", "에버로즈의 향기와 생명력을 담은 라이프스타일 프래그런스 브랜드"],
    image: "https://images.unsplash.com/photo-1615397323223-999318859739?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "PURCELL",
    desc: ["코스맥스 소재랩과 함께 마이크로바이옴 독점 원료 개발", "고순도, 고기능, 심경증, 집념의 연구로 얻은 특별한 원료를 고순도로 처방"],
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "reii reii",
    desc: ["글로벌 인지도를 보유한 박막례 할머니 IP 기반 브랜드 인큐베이팅", "세대·국경을 초월한 글로벌 크리에이터 콘텐츠"],
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "WONDERMIS",
    desc: ["인니 최대 미디어 그룹 EMTEK과 JV 설립 성공", "해외 대형 IP 브랜드 인큐베이팅 역량 확보"],
    image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "단미르",
    desc: ["국가유산청 궁능유적본부, 국가유산진흥원의 공동 연구 개발", "한국 전통 향기를 복원하는 코스맥스 특허기술 Scenteritage® 적용"],
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=600"
  }
];

// --- Components ---

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width - 0.5) * 40;
    const y = (clientY / height - 0.5) * 40;
    mouseX.set(x);
    mouseY.set(y);
  };

  const letters = ["C", "O", "S", "M", "A", "X"];

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#FDFDFD]"
      onMouseMove={handleMouseMove}
    >
      {/* Parallax Background Scene (Recreating the uploaded image) */}
      <motion.div 
        style={{ x: smoothX, y: smoothY }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {/* Left Window (Trees) */}
        <div className="absolute left-0 top-0 bottom-0 w-[8%] min-w-[60px] border-r border-gray-200 overflow-hidden shadow-inner">
          <img src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=400" alt="trees" className="w-full h-full object-cover opacity-90" />
          <div className="absolute top-1/3 w-full h-1 bg-black/20"></div>
          <div className="absolute top-2/3 w-full h-1 bg-black/20"></div>
        </div>

        {/* Right Dark Panel */}
        <div className="absolute right-[5%] top-[30%] bottom-[15%] w-[6%] min-w-[50px] bg-[#1a1a1a] shadow-2xl border border-gray-800 flex flex-col">
           <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
           <div className="absolute top-1/2 w-full h-px bg-white/20"></div>
           <div className="absolute top-1/4 w-full h-px bg-white/20"></div>
           <div className="absolute top-3/4 w-full h-px bg-white/20"></div>
        </div>

        {/* Diagonal Light Rays (Sunlight) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30"
             style={{
               background: 'linear-gradient(115deg, transparent 20%, rgba(0,0,0,0.05) 20%, rgba(0,0,0,0.05) 40%, transparent 40%, transparent 60%, rgba(0,0,0,0.03) 60%, rgba(0,0,0,0.03) 80%, transparent 80%)',
               filter: 'blur(10px)'
             }}
        ></div>
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50"
             style={{
               background: 'linear-gradient(115deg, transparent 10%, rgba(255,255,255,0.9) 10%, rgba(255,255,255,0.9) 30%, transparent 30%, transparent 50%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.6) 70%, transparent 70%)',
               filter: 'blur(20px)'
             }}
        ></div>

        {/* Marble Blocks at the bottom */}
        <div className="absolute bottom-0 left-[10%] w-[18%] h-[12%] bg-gradient-to-t from-gray-200 to-white shadow-[-10px_-10px_30px_rgba(0,0,0,0.05)] border-t border-r border-gray-100"></div>
        <div className="absolute bottom-0 left-[35%] w-[25%] h-[8%] bg-gradient-to-t from-gray-200 to-white shadow-[0_-10px_30px_rgba(0,0,0,0.05)] border-t border-x border-gray-100"></div>
        <div className="absolute bottom-[5%] right-[20%] w-[12%] h-[18%] bg-gradient-to-t from-gray-200 to-white shadow-[10px_10px_30px_rgba(0,0,0,0.05)] border border-gray-100"></div>
      </motion.div>

      {/* Center Text and Logo */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center gap-4 mt-12"
      >
        <div className="flex flex-col items-center gap-4 text-4xl md:text-5xl font-bold text-[#111] tracking-widest">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.3, color: "#C1A68D", x: i % 2 === 0 ? 15 : -15, rotate: i % 2 === 0 ? 5 : -5 }}
              className="cursor-default transition-all duration-300 inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </div>
        
        {/* Red Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + letters.length * 0.1 + 0.2, duration: 0.8, type: "spring" }}
          whileHover={{ rotate: 180, scale: 1.2 }}
          className="mt-2 cursor-pointer"
        >
          <svg width="30" height="50" viewBox="0 0 30 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="10" stroke="#E31837" strokeWidth="2.5" fill="none"/>
            <circle cx="15" cy="25" r="10" stroke="#E31837" strokeWidth="2.5" fill="none"/>
            <circle cx="15" cy="35" r="10" stroke="#E31837" strokeWidth="2.5" fill="none"/>
          </svg>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-400 z-10 pointer-events-none"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}

function WhatIsOBM() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-bold text-[#0A2540] mb-8 leading-tight">
            What is<br />OBM?
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
            연구 개발부터 생산, 브랜드 기획, 패키징까지<br />
            모든 과정을 고객과 함께하며<br />
            쉽고 빠르게 시장에 진입하도록 지원
          </p>
        </FadeIn>
        
        <div className="relative h-[600px]">
          <FadeIn delay={0.2} className="absolute top-0 right-0 w-4/5 h-2/3 z-10">
            <div className="w-full h-full border-8 border-[#F8F9FA] shadow-2xl overflow-hidden bg-white p-2">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800" 
                alt="Team meeting" 
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.4} className="absolute bottom-0 left-0 w-4/5 h-2/3 z-20">
            <div className="w-full h-full border-8 border-[#C1A68D] shadow-2xl overflow-hidden bg-white p-2">
              <img 
                src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800" 
                alt="Lab research" 
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function BuildingBrands() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold text-[#0A2540] mb-8 leading-tight">
              Building Brands,<br />Expanding Markets
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12">
              브랜드 마케팅과 디자인 개발을 시작으로 상품 개발과<br />
              글로벌 시장 진출까지 지원하는 브랜드 성장 파트너십
            </p>
            <div className="relative h-[400px] w-full border-l-8 border-b-8 border-[#C1A68D] p-4">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" 
                alt="Global Market Presentation" 
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
          
          <FadeIn delay={0.3} className="flex flex-col items-center justify-center space-y-8">
            <div className="flex gap-8 items-center">
              <div className="w-40 h-40 rounded-full border-4 border-[#0A2540] flex items-center justify-center text-xl font-bold text-[#0A2540] bg-white shadow-lg">
                Branding
              </div>
              <div className="text-4xl font-light text-gray-400">+</div>
              <div className="w-40 h-40 rounded-full border-4 border-[#C1A68D] flex items-center justify-center text-xl font-bold text-[#0A2540] bg-white shadow-lg">
                R&I
              </div>
            </div>
            
            <div className="flex gap-8 items-center">
              <div className="w-40 h-40 rounded-full border-4 border-[#0A2540] flex items-center justify-center text-xl font-bold text-[#0A2540] bg-white shadow-lg">
                Design
              </div>
              <div className="text-4xl font-light text-gray-400">+</div>
              <div className="w-40 h-40 rounded-full border-4 border-[#C1A68D] flex items-center justify-center text-xl font-bold text-[#0A2540] bg-white shadow-lg">
                Manufacturing
              </div>
            </div>
            
            <div className="flex gap-16 text-[#0A2540]">
              <ArrowRight size={48} className="rotate-90" />
              <ArrowRight size={48} className="rotate-90" />
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-56 h-56 rounded-full bg-[#0A2540] border-8 border-[#C1A68D] flex items-center justify-center text-3xl font-bold text-white shadow-2xl text-center leading-tight"
            >
              OBM<br/>Service
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function WhatWeDo() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <FadeIn>
        <h2 className="text-5xl md:text-7xl font-bold text-[#0A2540] mb-16">What We Do</h2>
      </FadeIn>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pillars.map((pillar, idx) => (
          <FadeIn key={idx} delay={idx * 0.15} className="group h-full">
            <div className="bg-white border-2 border-[#C1A68D] h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C1A68D] m-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C1A68D] m-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C1A68D] m-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C1A68D] m-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="h-48 overflow-hidden">
                <img 
                  src={pillar.image} 
                  alt={pillar.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-[#0A2540] mb-4 leading-tight">
                  {pillar.title}
                </h3>
                <div className="w-12 h-1 bg-[#C1A68D] mb-4"></div>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {pillar.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section className="py-32 bg-[#FFFDF9] overflow-hidden border-y border-[#C1A68D]/30" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-bold text-[#0A2540] mb-4">Beauty from start to finish</h2>
          <p className="text-xl text-gray-500">COSMAX OBM Service Overview</p>
        </FadeIn>
      </div>
      
      <div className="relative py-12">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C1A68D] to-transparent -translate-y-1/2 opacity-50"></div>
        
        <motion.div 
          style={{ x }}
          className="flex justify-center gap-4 md:gap-8 px-6 min-w-max"
        >
          {processSteps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center group">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-[#C1A68D]/40 bg-[#FFFDF9] flex flex-col items-center justify-center z-10 transition-all duration-300 group-hover:border-[#0A2540] group-hover:scale-105 group-hover:shadow-xl">
                <step.icon size={40} className="text-[#0A2540] mb-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="text-sm md:text-lg font-bold text-[#0A2540] text-center px-2">{step.name}</span>
              </div>
              {/* Overlapping circles effect */}
              {idx < processSteps.length - 1 && (
                <div className="absolute top-1/2 -right-16 w-32 h-32 rounded-full border-2 border-[#C1A68D]/20 -translate-y-1/2 -z-10 hidden md:block"></div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 mt-16 text-center">
        <FadeIn delay={0.2}>
          <p className="text-gray-700 leading-relaxed font-medium">
            코스맥스는 고객의 브랜드명과 제품명, 비주얼 아이덴티티, 제형 개발, 생산은 물론 마케팅 전략과 프로모션을 포함한 전체 프로세스를 체계적이고 정밀하게 설계해 드립니다. 고객이 원하는 시장에서 제품과 브랜드를 빠르게 론칭하고 성공적으로 안착할 수 있도록 최선을 다해 지원합니다.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function SuccessCases() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=')]">
      <FadeIn>
        <h2 className="text-5xl md:text-7xl font-bold text-[#0A2540] mb-16 bg-white inline-block pr-8">OBM Success Case</h2>
      </FadeIn>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cases.map((item, idx) => (
          <FadeIn key={idx} delay={idx * 0.1} className="group">
            <div className="bg-white p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
              <div className="relative h-64 overflow-hidden mb-6 bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold tracking-widest uppercase border border-white px-4 py-2 backdrop-blur-sm">View Case</span>
                </div>
              </div>
              <div className="flex-grow">
                <div className="inline-block bg-gray-100 px-4 py-2 rounded-sm mb-4">
                  <h3 className="text-xl font-bold text-[#0A2540]">{item.name}</h3>
                </div>
                <ul className="space-y-3">
                  {item.desc.map((line, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600 leading-relaxed">
                      <span className="mr-2 mt-1.5 w-1 h-1 bg-[#C1A68D] rounded-full flex-shrink-0"></span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0A2540] text-white py-12 border-t-4 border-[#C1A68D]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-light tracking-[0.3em] mb-2">COSMAX</h2>
          <p className="text-gray-400 text-sm">The science of beauty.</p>
        </div>
        <div className="text-sm text-gray-400 text-center md:text-right">
          <p>CONFIDENTIAL DOCUMENT</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} COSMAX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans selection:bg-[#C1A68D] selection:text-white">
      <Hero />
      <WhatIsOBM />
      <BuildingBrands />
      <WhatWeDo />
      <Process />
      <SuccessCases />
      <Footer />
    </div>
  );
}
