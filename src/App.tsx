import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Brain, Factory, FlaskConical, Lightbulb, Package, PenTool, ArrowRight, ChevronDown } from 'lucide-react';
import React, { useRef, useState } from 'react';

// --- Data ---
export type Lang = 'ko' | 'en' | 'zh' | 'ja';

const processSteps = [
  { id: '01', name: 'Strategy', icon: Lightbulb },
  { id: '02', name: 'Brand concept', icon: Brain },
  { id: '03', name: 'Design', icon: PenTool },
  { id: '04', name: 'Formulation', icon: FlaskConical },
  { id: '05', name: 'Packaging', icon: Package },
  { id: '06', name: 'Manufacturing', icon: Factory }
];

const t = {
  ko: {
    whatIsObmDesc: "연구 개발부터 생산, 브랜드 기획, 패키징까지\n모든 과정을 고객과 함께하며\n쉽고 빠르게 시장에 진입하도록 지원",
    buildingBrandsDesc: "브랜드 마케팅과 디자인 개발을 시작으로 상품 개발과\n글로벌 시장 진출까지 지원하는 브랜드 성장 파트너십",
    processDesc: "COSMAX OBM 서비스는 브랜드명과 제품명, 비주얼 아이덴티티, 제형개발, 생산은 물론 마케팅 전략과 프로모션을 포함한 전체 프로세스를 체계적이고 정밀하게 설계해 드립니다",
    viewCase: "View Case",
    pillars: [
      { title: "Beauty from start to finish", desc: "연구부터 제품 컨셉, 완성된 브랜드에 이르기까지 전체 뷰티 파이프라인에 걸친 파트너십", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800" },
      { title: "Beyond product development", desc: "제품 기획부터 패키지 디자인까지 아우를 수 있는 디자인 역량 보유.\n디자인 인벤토리 지속적 확보", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" },
      { title: "The future of Beauty", desc: "상표권 포트폴리오를 확대하는 한편, 관련 서비스 고도화를 지속적으로 추진", image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800" },
      { title: "Your vision. Our technology.", desc: "전 세계 1,100여 명의 연구 개발 인력으로 구성된 R&I 팀이 최적의 성분 조합에 대한 전문 지식을 바탕으로 포뮬러 개발", image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800" }
    ],
    cases: [
      { name: "LOTTE HOTELS", subName: "Emissary.73 / Depaysmo", desc: ["국내 최대 호텔 체인 어매니티 브랜드 및 상품 개발", "글로벌 NO.1 향료사와 공동 개발한 프리미엄 퍼퓸드 어매니티"], image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600" },
      { name: "Danmir (단미르)", subName: "", desc: ["국가유산청 궁능유적본부, 국가유산진흥원과 공동 연구 개발", "한국 전통 향기를 복원하는 코스맥스 특허기술 Scenteritage® 적용"], image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=600" },
      { name: "reii reii", subName: "", desc: ["글로벌 인지도를 보유한 박막례 할머니 IP 기반 브랜드 인큐베이팅", "세대·국경을 초월한 글로벌 크리에이터 콘텐츠로 디지털 플랫폼 기반 한국 전통 뷰티 레시피 확산"], image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600" },
      { name: "florevida", subName: "", desc: ["삼성물산 에버랜드의 뷰티 브랜드", "에버로즈의 향기와 생명력을 담은 라이프스타일 프래그런스 브랜드로, 바디&핸드&헤어 등 24SKU 출시"], image: "https://images.unsplash.com/photo-1615397323223-999318859739?auto=format&fit=crop&q=80&w=600" },
      { name: "WONDERMIS", subName: "", desc: ["세계 4위 인구의 인니시장 내 파급력있는 메가 인플루언서 브랜드 런칭으로 코스맥스 기술기반 프리미엄 브랜드 기획", "Nagita Slavina (가수/배우) - 인스타 7610만, 유튜브 2620만, 틱톡 1530만 팔로워"], image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=600" },
      { name: "PURCELL", subName: "", desc: ["코스맥스 소재랩과 함께 마이크로바이옴 독점 원료 개발하여, mL당 20억 마리 프로바이오틱스가 선사하는 장벽 초월 PIXCELL BIOM™ 원료 메인 소구"], image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  en: {
    whatIsObmDesc: "Supporting quick and easy market entry by partnering with customers\nthrough all processes from R&D to production, brand planning, and packaging.",
    buildingBrandsDesc: "A brand growth partnership that supports everything from brand marketing\nand design development to product development and global market expansion.",
    processDesc: "COSMAX OBM service systematically and precisely designs the entire process, including brand and product names, visual identity, formulation development, production, as well as marketing strategies and promotions.",
    viewCase: "View Case",
    pillars: [
      { title: "Beauty from start to finish", desc: "A partnership spanning the entire beauty pipeline, from research to product concept and finished brand.", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800" },
      { title: "Beyond product development", desc: "Possessing design capabilities that encompass everything from product planning to package design.\nContinuously securing design inventory.", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" },
      { title: "The future of Beauty", desc: "Continuously promoting the advancement of related services while expanding the trademark portfolio.", image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800" },
      { title: "Your vision. Our technology.", desc: "The R&I team, consisting of over 1,100 R&D personnel worldwide, develops formulas based on expertise in optimal ingredient combinations.", image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800" }
    ],
    cases: [
      { name: "LOTTE HOTELS", subName: "Emissary.73 / Depaysmo", desc: ["Development of amenity brands and products for Korea's largest hotel chain", "Premium perfumed amenities co-developed with the global No.1 fragrance company"], image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600" },
      { name: "Danmir", subName: "", desc: ["Joint R&D with the Royal Palaces and Tombs Center and the Korea Heritage Agency", "Applied COSMAX's patented Scenteritage® technology to restore traditional Korean scents"], image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=600" },
      { name: "reii reii", subName: "", desc: ["Brand incubating based on the globally recognized Grandma Park Makrye IP", "Spreading traditional Korean beauty recipes based on digital platforms with global creator content transcending generations and borders"], image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600" },
      { name: "florevida", subName: "", desc: ["Samsung C&T Everland's beauty brand", "A lifestyle fragrance brand capturing the scent and vitality of Ever Rose, launching 24 SKUs including body, hand, and hair products"], image: "https://images.unsplash.com/photo-1615397323223-999318859739?auto=format&fit=crop&q=80&w=600" },
      { name: "WONDERMIS", subName: "", desc: ["Planning a premium brand based on COSMAX technology by launching a mega-influencer brand with massive impact in the Indonesian market, the 4th most populous country", "Nagita Slavina (Singer/Actress) - 76.1M Instagram, 26.2M YouTube, 15.3M TikTok followers"], image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=600" },
      { name: "PURCELL", subName: "", desc: ["Co-developed an exclusive microbiome ingredient with COSMAX Material Lab, featuring PIXCELL BIOM™ ingredient that delivers 2 billion probiotics per mL to transcend skin barriers"], image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  zh: {
    whatIsObmDesc: "从研发到生产、品牌策划、包装，\n与客户携手共进，助力快速轻松进入市场。",
    buildingBrandsDesc: "从品牌营销和设计开发开始，\n支持产品开发和进军全球市场的品牌成长合作伙伴关系。",
    processDesc: "COSMAX OBM服务系统而精确地设计整个流程，包括品牌和产品名称、视觉识别、配方开发、生产，以及营销战略和促销活动。",
    viewCase: "查看案例",
    pillars: [
      { title: "Beauty from start to finish", desc: "涵盖从研究到产品概念再到成品品牌的整个美容管道的合作伙伴关系。", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800" },
      { title: "Beyond product development", desc: "具备从产品策划到包装设计的全方位设计能力。\n持续确保设计库存。", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" },
      { title: "The future of Beauty", desc: "在扩大商标组合的同时，持续推进相关服务的高度化。", image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800" },
      { title: "Your vision. Our technology.", desc: "由全球1,100多名研发人员组成的R&I团队，基于对最佳成分组合的专业知识开发配方。", image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800" }
    ],
    cases: [
      { name: "LOTTE HOTELS", subName: "Emissary.73 / Depaysmo", desc: ["韩国最大连锁酒店的洗浴用品品牌及产品开发", "与全球第一香精公司共同开发的高级香水洗浴用品"], image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600" },
      { name: "Danmir", subName: "", desc: ["与国家遗产厅宫能遗迹本部、国家遗产振兴院共同研发", "应用COSMAX恢复韩国传统香气的专利技术Scenteritage®"], image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=600" },
      { name: "reii reii", subName: "", desc: ["基于具有全球知名度的朴末礼奶奶IP的品牌孵化", "通过超越世代和国界的全球创作者内容，在数字平台上推广韩国传统美容配方"], image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600" },
      { name: "florevida", subName: "", desc: ["三星物产爱宝乐园的美容品牌", "蕴含Ever Rose香气和生命力的生活方式香氛品牌，推出身体、手部、头发等24个SKU"], image: "https://images.unsplash.com/photo-1615397323223-999318859739?auto=format&fit=crop&q=80&w=600" },
      { name: "WONDERMIS", subName: "", desc: ["通过在世界人口第四大国印尼市场推出具有影响力的超级网红品牌，策划基于COSMAX技术的高端品牌", "Nagita Slavina (歌手/演员) - Instagram 7610万，YouTube 2620万，TikTok 1530万粉丝"], image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=600" },
      { name: "PURCELL", subName: "", desc: ["与COSMAX材料实验室共同开发独家微生物组原料，主打每毫升含20亿益生菌、超越屏障的PIXCELL BIOM™原料"], image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  ja: {
    whatIsObmDesc: "研究開発から生産、ブランド企画、パッケージングまで\nすべての過程をお客様と共にし、\n簡単かつ迅速な市場参入を支援します。",
    buildingBrandsDesc: "ブランドマーケティングとデザイン開発をはじめ、\n商品開発からグローバル市場進出まで支援するブランド成長パートナーシップ。",
    processDesc: "COSMAX OBMサービスは、ブランド名と製品名、ビジュアルアイデンティティ、剤形開発、生産はもちろん、マーケティング戦略とプロモーションを含むプロセス全体を体系的かつ精密に設計します。",
    viewCase: "ケースを見る",
    pillars: [
      { title: "Beauty from start to finish", desc: "研究から製品コンセプト、完成したブランドに至るまで、ビューティーパイプライン全体にわたるパートナーシップ。", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800" },
      { title: "Beyond product development", desc: "製品企画からパッケージデザインまで網羅できるデザイン能力を保有。\nデザインインベントリを継続的に確保。", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" },
      { title: "The future of Beauty", desc: "商標権ポートフォリオを拡大する一方、関連サービスの高度化を持続的に推進。", image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800" },
      { title: "Your vision. Our technology.", desc: "全世界1,100人以上の研究開発陣で構成されたR&Iチームが、最適な成分の組み合わせに関する専門知識を基にフォーミュラを開発。", image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800" }
    ],
    cases: [
      { name: "LOTTE HOTELS", subName: "Emissary.73 / Depaysmo", desc: ["国内最大のホテルチェーンのアメニティブランドおよび商品開発", "グローバルNO.1の香料会社と共同開発したプレミアムパフュームアメニティ"], image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600" },
      { name: "Danmir", subName: "", desc: ["国家遺産庁宮陵遺跡本部、国家遺産振興院との共同研究開発", "韓国の伝統的な香りを復元するコスマックスの特許技術Scenteritage®を適用"], image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=600" },
      { name: "reii reii", subName: "", desc: ["グローバルな認知度を持つパク・マンレおばあちゃんのIPベースのブランドインキュベーティング", "世代・国境を越えたグローバルクリエイターコンテンツにより、デジタルプラットフォームベースで韓国の伝統的なビューティーレシピを拡散"], image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600" },
      { name: "florevida", subName: "", desc: ["サムスン物産エバーランドのビューティーブランド", "エバーローズの香りと生命力を込めたライフスタイルフレグランスブランドとして、ボディ＆ハンド＆ヘアなど24SKUを発売"], image: "https://images.unsplash.com/photo-1615397323223-999318859739?auto=format&fit=crop&q=80&w=600" },
      { name: "WONDERMIS", subName: "", desc: ["世界第4位の人口を抱えるインドネシア市場で影響力のあるメガインフルエンサーブランドの立ち上げにより、コスマックスの技術に基づくプレミアムブランドを企画", "Nagita Slavina (歌手/俳優) - Instagram 7610万、YouTube 2620万、TikTok 1530万フォロワー"], image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=600" },
      { name: "PURCELL", subName: "", desc: ["コスマックス素材ラボと共にマイクロバイオーム独占原料を開発し、1mLあたり20億個のプロバイオティクスがもたらす障壁超越PIXCELL BIOM™原料をメインに訴求"], image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600" }
    ]
  }
};

// --- Components ---

function LanguageSwitcher({ lang, setLang }: { lang: Lang, setLang: (l: Lang) => void }) {
  const langs: { code: Lang, label: string }[] = [
    { code: 'ko', label: 'Korean' },
    { code: 'en', label: 'English' },
    { code: 'zh', label: 'Chinese' },
    { code: 'ja', label: 'Japanese' }
  ];
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-sm border border-gray-100">
      {langs.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${lang === l.code ? 'bg-[#0A2540] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string, key?: string | number }) => (
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

function WhatIsOBM({ currentT }: { currentT: any }) {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-bold text-[#0A2540] mb-8 leading-tight">
            What is<br />OBM?
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium whitespace-pre-line">
            {currentT.whatIsObmDesc}
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

function BuildingBrands({ currentT }: { currentT: any }) {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold text-[#0A2540] mb-8 leading-tight">
              Building Brands,<br />Expanding Markets
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12 whitespace-pre-line">
              {currentT.buildingBrandsDesc}
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

function WhatWeDo({ currentT }: { currentT: any }) {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <FadeIn>
        <h2 className="text-5xl md:text-7xl font-bold text-[#0A2540] mb-16">What We Do</h2>
      </FadeIn>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentT.pillars.map((pillar: any, idx: number) => (
          <FadeIn key={pillar.title} delay={idx * 0.15} className="group h-full">
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

function Process({ currentT }: { currentT: any }) {
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
          <p className="text-gray-700 leading-relaxed font-medium whitespace-pre-line">
            {currentT.processDesc}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function SuccessCases({ currentT }: { currentT: any }) {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=')]">
      <FadeIn>
        <h2 className="text-5xl md:text-7xl font-bold text-[#0A2540] mb-16 bg-white inline-block pr-8">OBM Success Case</h2>
      </FadeIn>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentT.cases.map((item: any, idx: number) => (
          <FadeIn key={item.name} delay={idx * 0.1} className="group">
            <div className="bg-white p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
              <div className="relative h-64 overflow-hidden mb-6 bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold tracking-widest uppercase border border-white px-4 py-2 backdrop-blur-sm">{currentT.viewCase}</span>
                </div>
              </div>
              <div className="flex-grow">
                <div className="inline-block bg-gray-100 px-4 py-2 rounded-sm mb-4">
                  <h3 className="text-xl font-bold text-[#0A2540]">{item.name}</h3>
                  {item.subName && <p className="text-sm text-gray-500 mt-1">{item.subName}</p>}
                </div>
                <ul className="space-y-3">
                  {item.desc.map((line: string, i: number) => (
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
  const [lang, setLang] = useState<Lang>('ko');
  const currentT = t[lang];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans selection:bg-[#C1A68D] selection:text-white">
      <LanguageSwitcher lang={lang} setLang={setLang} />
      <Hero />
      <WhatIsOBM currentT={currentT} />
      <BuildingBrands currentT={currentT} />
      <WhatWeDo currentT={currentT} />
      <Process currentT={currentT} />
      <SuccessCases currentT={currentT} />
      <Footer />
    </div>
  );
}
