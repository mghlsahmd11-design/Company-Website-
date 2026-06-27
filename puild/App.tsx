import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import {
  Rocket, Shield, Search, Monitor, Code, Headset,
  CheckCircle, Users, Briefcase, Smile, ChevronDown,
  Star, Menu, X, ArrowLeft, MessageCircle, Mail, MapPin, Phone
} from 'lucide-react';

// --- البيانات ---

const FEATURES = [
  { icon: Rocket, title: "سرعة فائقة", desc: "نضمن لك أداء استثنائي وتجربة مستخدم سلسة خالية من التقطيع لتصفح ممتع." },
  { icon: Shield, title: "أمان متقدم", desc: "نوفر حماية كاملة لبياناتك وبيانات عملائك بأحدث بروتوكولات التشفير العالمية." },
  { icon: Search, title: "صديق لمحركات البحث", desc: "كود مهيأ بالكامل ليتصدر موقعك نتائج البحث في جوجل وجلب المزيد من الزيارات." },
  { icon: Monitor, title: "متجاوب بالكامل", desc: "تصميم مرن يعمل بكفاءة وشكل جذاب على جميع الأجهزة (جوال، تابلت، كمبيوتر)." },
  { icon: Code, title: "كود نظيف", desc: "برمجة بأحدث التقنيات وأفضل المعايير لضمان قابلية التطوير المستقبلي." },
  { icon: Headset, title: "دعم مستمر", desc: "فريق دعم فني متخصص متواجد على مدار الساعة لحل أي مشكلة فوراً." }
];

const SERVICES = [
  { title: "تطوير مواقع الويب", desc: "نصمم ونبرمج مواقع إلكترونية متكاملة تعكس هوية علامتك التجارية وتزيد مبيعاتك.", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600" },
  { title: "تطبيقات الجوال", desc: "تطبيقات أندرويد و iOS مبتكرة وسهلة الاستخدام لربط عملائك بخدماتك في كل وقت.", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600" },
  { title: "التسويق الرقمي", desc: "حملات تسويقية ذكية ومدروسة تضمن لك الوصول لجمهورك المستهدف وتحقيق أعلى عائد.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600" }
];

const STATS = [
  { icon: Users, to: 500, suffix: "+", title: "عميل سعيد" },
  { icon: Briefcase, to: 1200, suffix: "+", title: "مشروع منجز" },
  { icon: Smile, to: 99, suffix: "%", title: "نسبة الرضا" },
  { icon: Star, to: 15, suffix: "+", title: "سنوات الخبرة" }
];

const PORTFOLIO = [
  { title: "منصة تعليمية", category: "تطوير ويب", img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800" },
  { title: "تطبيق توصيل", category: "تطبيقات جوال", img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800" },
  { title: "متجر إلكتروني", category: "تجارة إلكترونية", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800" },
  { title: "نظام إدارة مستشفيات", category: "أنظمة سحابية", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" }
];

const TESTIMONIALS = [
  { name: "أحمد عبدالله", role: "مدير شركة أفق", text: "تجربة رائعة وعمل احترافي يفوق التوقعات. تم تسليم المشروع في الوقت المحدد وبجودة عالية جداً، أنصح بالتعامل معهم بشدة." },
  { name: "سارة محمد", role: "مؤسسة متجر لاميرا", text: "فريق متعاون جداً، قدموا لي استشارات ساعدتني في تحسين فكرة المتجر قبل برمجته. التصميم عصري وسريع." },
  { name: "خالد سعيد", role: "المدير التنفيذي لـ رواد", text: "ما يميزهم هو خدمة ما بعد البيع والدعم الفني السريع. الموقع يعمل بكفاءة عالية ولم نواجه أي مشاكل تقنية." }
];

const FAQS = [
  { q: "كم يستغرق بناء موقع إلكتروني؟", a: "تعتمد المدة على حجم المشروع ومتطلباته، لكن في المتوسط تتراوح المدة للشركات الصغيرة والمتوسطة بين أسبوعين إلى 4 أسابيع." },
  { q: "هل تقدمون خدمات استضافة الموقع؟", a: "نعم، نقدم خطط استضافة سحابية آمنة وسريعة مع نسخ احتياطي يومي وشهادات SSL مجانية لجميع عملائنا." },
  { q: "هل يمكنني تعديل محتوى موقعي بنفسي؟", a: "بالتأكيد! نقوم بربط موقعك بلوحة تحكم سهلة الاستخدام وتدعم اللغة العربية لتمكينك من تعديل النصوص والصور في أي وقت." },
  { q: "كيف يتم الدفع؟", a: "يتم الدفع على دفعات مرنة ميسرة، عادة تبدأ بدفعة مقدمة بسيطة لبدء العمل، ودفعات أخرى مرتبطة بمراحل الإنجاز المتفق عليها." }
];

// --- المكونات المساعدة ---

function AnimatedCounter({ to, duration = 2.5, suffix = "" }: { to: number, duration?: number, suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [rounded]);

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration });
    }
  }, [inView, count, to, duration]);

  return (
    <span ref={ref} className="font-bold">
      {displayValue}{suffix}
    </span>
  );
}

// --- المكون الرئيسي (الصفحة) ---

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      
      {/* النافبار */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-md shadow-xl border-b border-slate-800 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-600/30">إ</div>
            <span className="text-2xl font-black tracking-tight text-white">إنجاز</span>
          </div>

          {/* روابط الديسكتوب */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-slate-400">
            <a href="#home" className="hover:text-blue-400 transition-colors">الرئيسية</a>
            <a href="#features" className="hover:text-blue-400 transition-colors">المميزات</a>
            <a href="#services" className="hover:text-blue-400 transition-colors">خدماتنا</a>
            <a href="#portfolio" className="hover:text-blue-400 transition-colors">أعمالنا</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">اتصل بنا</a>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href="#contact" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5">
              اطلب خدمتك
            </a>
          </div>

          {/* زر الموبايل */}
          <button 
            className="lg:hidden text-white bg-slate-800/80 p-2 rounded-lg backdrop-blur"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* قائمة الموبايل */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-slate-900 shadow-xl py-4 flex flex-col gap-4 px-6 border-t border-slate-800">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="font-medium text-slate-300 hover:text-blue-400">الرئيسية</a>
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="font-medium text-slate-300 hover:text-blue-400">المميزات</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="font-medium text-slate-300 hover:text-blue-400">خدماتنا</a>
            <a href="#portfolio" onClick={() => setIsMenuOpen(false)} className="font-medium text-slate-300 hover:text-blue-400">أعمالنا</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="px-6 py-3 bg-blue-600 text-white text-center font-medium rounded-xl">اطلب خدمتك الآن</a>
          </div>
        )}
      </nav>

      {/* قسم الهيرو */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900 z-0">
        <div className="absolute inset-0 z-[-1] opacity-20">
          <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2850" alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
        </div>
        
        {/* دائرة تأثير جمالية */}
        <div className="absolute top-1/4 -start-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl z-[-1]"></div>

        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 font-medium text-sm mb-6 border border-blue-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                الوكالة الرقمية الرائدة في الشرق الأوسط
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight mb-6">
                نبني <span className="text-transparent bg-clip-text bg-gradient-to-l from-white to-slate-400">المستقبل الرقمي</span> لأعمالك
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light">
                نقدم حلولاً برمجية متكاملة وتصاميم عصرية مبتكرة تضع علامتك التجارية في الصدارة وتزيد من مبيعاتك بشكل ملحوظ بخبرة تفوق التوقعات.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1">
                  اطلب الخدمة الآن
                  <ArrowLeft className="w-5 h-5" />
                </a>
                <a href="https://wa.me/967772425089" target="_blank" rel="noreferrer" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-1">
                  تواصل عبر واتساب
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-700">
                <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1200" alt="Technology Dashboard" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              </div>
              
              {/* بطاقة عائمة */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-10 -start-10 bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium">مشاريع ناجحة</p>
                  <p className="text-2xl font-black text-white">+1200</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* قسم المميزات */}
      <section id="features" className="py-24 bg-slate-950 relative">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">لماذا تختار <span className="text-blue-500">إنجاز</span>؟</h2>
            <p className="text-slate-400 text-lg">نجمع بين الابتكار، الجودة، والسرعة لنقدم لك منتجاً يفوق توقعاتك ويحقق أهدافك.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {FEATURES.map((feat, i) => (
              <motion.div 
                key={i} 
                variants={fadeIn}
                className="group bg-slate-900/40 border border-slate-800 p-8 rounded-2xl hover:bg-slate-800/60 hover:border-slate-700 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* قسم الخدمات */}
      <section id="services" className="py-24 bg-slate-900/20 border-y border-slate-800">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="max-w-2xl"
            >
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">خدماتنا الاحترافية</h2>
              <p className="text-slate-400 text-lg">باقة متكاملة من الخدمات الرقمية المصممة لنمو أعمالك ومضاعفة أرباحك.</p>
            </motion.div>
            <motion.a 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              href="#contact" 
              className="text-blue-500 font-bold hover:text-blue-400 flex items-center gap-2 group"
            >
              عرض جميع الخدمات
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </motion.a>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {SERVICES.map((srv, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-blue-900/20 transition-all group"
              >
                <div className="h-60 overflow-hidden relative">
                  <img src={srv.img} alt={srv.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">{srv.title}</h3>
                  <p className="text-slate-400 mb-6">{srv.desc}</p>
                  <a href="#contact" className="inline-flex items-center text-blue-500 font-bold group/link hover:text-blue-400">
                    تفاصيل الخدمة
                    <ArrowLeft className="w-4 h-4 ms-2 group-hover/link:-translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم الإحصائيات (العدادات) */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        {/* خلفية جمالية */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -start-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 -end-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center divide-x divide-x-reverse divide-blue-500/50">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2 flex items-center justify-center" dir="ltr">
                  <AnimatedCounter to={stat.to} suffix={stat.suffix} />
                </div>
                <p className="text-blue-100 font-medium text-lg">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم معرض الأعمال */}
      <section id="portfolio" className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">أعمالنا الأخيرة</h2>
            <p className="text-slate-400 text-lg">تصفح بعضاً من مشاريعنا التي قمنا بتنفيذها لعملائنا في مختلف المجالات.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {PORTFOLIO.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer border border-slate-800"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-900">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-blue-400 font-medium text-sm mb-2 block">{item.category}</span>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <div className="w-10 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity delay-100"></div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-blue-600 text-blue-500 font-bold rounded-full hover:bg-blue-600 hover:text-white transition-colors">
              شاهد المزيد من الأعمال
            </a>
          </div>
        </div>
      </section>

      {/* قسم آراء العملاء */}
      <section className="py-24 bg-slate-900/20 border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">ماذا يقول عملاؤنا؟</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-slate-900/40 rounded-3xl p-8 md:p-12 shadow-lg border border-slate-800">
              {/* أيقونة الاقتباس */}
              <div className="absolute top-8 start-8 text-blue-500/20">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="relative z-10 text-center">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-center gap-1 text-amber-400 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium mb-10">
                    "{TESTIMONIALS[currentTestimonial].text}"
                  </p>
                  <div>
                    <h4 className="text-lg font-bold text-white">{TESTIMONIALS[currentTestimonial].name}</h4>
                    <p className="text-blue-400 font-medium">{TESTIMONIALS[currentTestimonial].role}</p>
                  </div>
                </motion.div>
              </div>

              {/* أزرار التحكم */}
              <div className="flex justify-center gap-2 mt-10">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    aria-label={`الذهاب للرأي ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الأسئلة الشائعة */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">الأسئلة الشائعة</h2>
            <p className="text-slate-400 text-lg">إجابات وافية لأكثر الأسئلة التي تدور في ذهنك.</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/40"
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-start hover:bg-slate-800/50 transition-colors focus:outline-none"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span className="font-bold text-lg text-white">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${activeFaq === i ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-800 text-slate-400'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-slate-800/50">
                    {faq.a}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم التواصل */}
      <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* أشكال خلفية */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-black mb-6">هل أنت مستعد للبدء؟</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                املأ النموذج وسيقوم فريقنا بالتواصل معك في أقرب وقت لمناقشة مشروعك وتقديم عرض سعر مجاني ومخصص.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">البريد الإلكتروني</h4>
                    <p className="text-slate-400 mt-1">hello@enjaz-tech.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">رقم الهاتف</h4>
                    <p className="text-slate-400 mt-1" dir="ltr">+967 772425089</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">المقر الرئيسي</h4>
                    <p className="text-slate-400 mt-1">الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 shadow-2xl text-slate-100"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">أرسل رسالة</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">الاسم الكامل</label>
                  <input 
                    type="text" 
                    placeholder="أحمد محمد"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-slate-800 text-white placeholder-slate-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">رقم الهاتف</label>
                  <input 
                    type="tel" 
                    placeholder="05X XXX XXXX"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-slate-800 text-white placeholder-slate-500 transition-all text-end"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">تفاصيل المشروع</label>
                  <textarea 
                    rows={4}
                    placeholder="حدثنا عن فكرتك..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-slate-800 text-white placeholder-slate-500 transition-all resize-none"
                  ></textarea>
                </div>
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors mt-2">
                  إرسال الطلب
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* التذييل Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">إ</div>
                <span className="text-xl font-black text-white">إنجاز</span>
              </div>
              <p className="max-w-md leading-relaxed mb-6">
                نحن وكالة رقمية متخصصة في تقديم حلول برمجية متكاملة وتصميمات عصرية تلبي احتياجات الشركات وتواكب تطورات السوق.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">X</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">in</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">fb</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-blue-400 transition-colors">الرئيسية</a></li>
                <li><a href="#services" className="hover:text-blue-400 transition-colors">خدماتنا</a></li>
                <li><a href="#portfolio" className="hover:text-blue-400 transition-colors">أعمالنا</a></li>
                <li><a href="#contact" className="hover:text-blue-400 transition-colors">اتصل بنا</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">الخدمات</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">تطوير المواقع</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">تطبيقات الجوال</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">التسويق الرقمي</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">تحسين محركات البحث</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; {new Date().getFullYear()} إنجاز. جميع الحقوق محفوظة.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">سياسة الخصوصية</a>
              <a href="#" className="hover:text-white">الشروط والأحكام</a>
            </div>
          </div>
        </div>
      </footer>

      {/* زر الواتساب العائم */}
      <a 
        href="https://wa.me/967772425089" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 start-6 z-50 w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-110 transition-transform"
        aria-label="تواصل معنا عبر واتساب"
      >
        <MessageCircle className="w-7 h-7" />
        {/* دائرة تنبيه */}
        <span className="absolute top-0 right-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white"></span>
        </span>
      </a>

    </div>
  );
}
