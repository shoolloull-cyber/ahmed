"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Globe,
  Menu,
  X,
  Building2,
  Users,
  Award,
  Target,
  Utensils,
  MapPin,
  ChefHat,
  Calendar,
  Eye,
  Heart,
  Handshake,
  Shield,
  HeadphonesIcon,
  Phone,
  Mail,
  ArrowUp,
  Instagram,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay, EffectFlip, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"
import "swiper/css/effect-flip"

export default function HomePage() {
  const [language, setLanguage] = useState<"en" | "ar">("ar")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<Array<{ src: string; alt: string }>>([])
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0)

  const observerRef = useRef<IntersectionObserver | null>(null)

  const openLightbox = (images: Array<{ src: string; alt: string }>, index: number) => {
    setLightboxImages(images)
    setCurrentLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "unset"
  }

  const nextLightboxImage = () => {
    setCurrentLightboxIndex((prev) => (prev + 1) % lightboxImages.length)
  }

  const prevLightboxImage = () => {
    setCurrentLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return

      if (e.key === "Escape") {
        closeLightbox()
      } else if (e.key === "ArrowRight") {
        nextLightboxImage()
      } else if (e.key === "ArrowLeft") {
        prevLightboxImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const text = language === "ar" ? "اكتشف خدماتنا" : "Discover Our Services"
    let currentIndex = 0

    const typeInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypedText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)
      }
    }, 150)

    return () => clearInterval(typeInterval)
  }, [language])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80 // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll(
      ".animate-scroll-in, .animate-scroll-left, .animate-scroll-right, .animate-scale-in",
    )
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      elements.forEach((el) => observerRef.current?.unobserve(el))
    }
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const content = {
    en: {
      nav: {
        about: "About Us",
        services: "Services",
        vision: "Vision",
        mission: "Mission",
        values: "Values",
        clients: "Clients",
        gallery: "Gallery",
        documents: "Documents",
        contact: "Contact",
      },
      hero: {
        title: "ARCADIA",
        subtitle: "Tourism Catering Contracting",
        description: "Professional Hajj and Umrah services with excellence and hospitality",
      },
      about: {
        title: "About Us",
        content:
          "Arcadia is a Saudi company with an international outlook, established in 2019 and headquartered in Makkah. We specialize in tourism and catering services for Hajj and Umrah pilgrims. Our goal is to provide a comprehensive experience that combines the comfort of accommodation with the excellence of hospitality. We are committed to meeting our clients' needs with the highest standards of professionalism.",
      },
      services: {
        title: "Our Services",
        items: [
          { text: "Hotel bookings in Makkah and Madinah", icon: Building2 },
          { text: "Catering services in Makkah and the Holy Sites", icon: Utensils },
          { text: "Custom meals tailored to different nationalities", icon: ChefHat },
          { text: "Planning and executing religious tourism programs", icon: Calendar },
        ],
      },
      vision: {
        title: "Our Vision",
        content:
          "To become the leading choice in tourism and catering services for the Guests of Allah from all around the world, by delivering comprehensive, world-class solutions.",
      },
      mission: {
        title: "Our Mission",
        content:
          "We are committed to delivering high-quality tourism and hospitality services that meet our clients' expectations, while upholding the highest standards of safety, cleanliness, and authentic Arab hospitality.",
      },
      values: {
        title: "Our Values",
        items: [
          { text: "Professionalism", icon: Award },
          { text: "Quality", icon: Shield },
          { text: "Integrity", icon: Handshake },
          { text: "Respect", icon: Heart },
          { text: "Teamwork", icon: Users },
          { text: "Customer Service", icon: HeadphonesIcon },
        ],
      },
      clients: {
        title: "Our Clients",
        content:
          "Arcadia has had the honor of serving numerous delegations and organizations from various countries, including:",
        items: [
          { text: "Groups from Libya", icon: MapPin },
          { text: "Companies from Mauritania", icon: Building2 },
          { text: "Companies from Senegal", icon: Building2 },
          { text: "Collaboration with Sukanak Company", icon: Handshake },
          { text: "Collaboration with Aspire Tourism Company", icon: Handshake },
        ],
      },
      gallery: {
        title: "Our Gallery",
        subtitle: "Projects and Services Showcase",
      },
      documents: {
        title: "Official Documents",
        subtitle: "Certifications and Legal Authorizations",
      },
      contact: {
        title: "Contact Information",
        address: "Al-Safa Administrative Tower - Northern Aziziyah - Makkah Al-Mukarramah",
        phone: "+966 568 777 826",
        email: "eslam@arcadia-sa.com",
      },
    },
    ar: {
      nav: {
        about: "من نحن",
        services: "خدماتنا",
        vision: "رؤيتنا",
        mission: "رسالتنا",
        values: "قيمنا",
        clients: "عملاؤنا",
        gallery: "معرض الصور",
        documents: "الأوراق الرسمية",
        contact: "اتصل بنا",
      },
      hero: {
        title: "أركاديا",
        subtitle: "مقاولات سياحة إعاشة",
        description: "خدمات الحج والعمرة المهنية بالتميز والضيافة",
      },
      about: {
        title: "من نحن",
        content:
          "شركة أركاديا هي شركة سعودية ذات طابع دولي تأسست عام 2019، تتخذ من مكة المكرمة مقرًا لها، وتعمل في مجال الفنادق وتقديم خدمات الإعاشة لحجاج ومعتمري بيت الله الحرام. نسعى لتقديم تجربة متكاملة تدمج بين راحة الإقامة وجودة الضيافة، ونعمل على تلبية احتياجات عملائنا بأعلى معايير الاحترافية.",
      },
      services: {
        title: "خدماتنا",
        items: [
          { text: "حجز الفنادق في مكة والمدينة", icon: Building2 },
          { text: "تقديم خدمات الإعاشة في مكة المكرمة والمشاعر المقدسة", icon: Utensils },
          { text: "توفير وجبات مخصصة حسب الجنسيات", icon: ChefHat },
          { text: "تنسيق وتنفيذ البرامج السياحية الدينية", icon: Calendar },
        ],
      },
      vision: {
        title: "رؤيتنا",
        content:
          "أن نكون الخيار الأول في مجال السياحة وخدمات الإعاشة لضيوف الرحمن من مختلف أنحاء العالم، من خلال تقديم خدمات متكاملة بمستوى عالمي.",
      },
      mission: {
        title: "رسالتنا",
        content:
          "نلتزم بتقديم خدمات سياحية وضيافة عالية الجودة تلبي تطلعات عملائنا، مع الالتزام بأعلى معايير السلامة والنظافة والكرم العربي الأصيل.",
      },
      values: {
        title: "قيمنا",
        items: [
          { text: "الاحترافية", icon: Award },
          { text: "الجودة", icon: Shield },
          { text: "المصداقية", icon: Handshake },
          { text: "الاحترام", icon: Heart },
          { text: "العمل الجماعي", icon: Users },
          { text: "خدمة العميل", icon: HeadphonesIcon },
        ],
      },
      clients: {
        title: "عملاؤنا",
        content: "تشرفت شركة أركاديا بخدمة العديد من الوفود والجهات من مختلف الدول، من بينها:",
        items: [
          { text: "مجموعات من دولة ليبيا", icon: MapPin },
          { text: "شركات من دولة موريتانيا", icon: Building2 },
          { text: "شركات من دولة السنغال", icon: Building2 },
          { text: "التعاون مع شركة سكناك", icon: Handshake },
          { text: "التعاون مع شركة أسباير للسياحة", icon: Handshake },
        ],
      },
      gallery: {
        title: "معرض الصور",
        subtitle: "عرض المشاريع والخدمات",
      },
      documents: {
        title: "الأوراق الرسمية",
        subtitle: "الشهادات والتراخيص القانونية",
      },
      contact: {
        title: "بيانات الاتصال",
        address: "برج الصفا الإداري - العزيزية الشمالية - مكة المكرمة",
        phone: "+966568777826",
        email: "eslam@arcadia-sa.com",
      },
    },
  }

  const galleryImages = [
    { src: "/images/gallery/chefs-shawarma.png", alt: "Chefs preparing shawarma in professional kitchen" },
    { src: "/images/gallery/team-meeting.png", alt: "Team meeting with management and chefs" },
    { src: "/images/gallery/buffet-spread.png", alt: "Elaborate buffet spread with Middle Eastern cuisine" },
    { src: "/images/gallery/event-crowd.png", alt: "Large gathering at catering event" },
    { src: "/images/gallery/staff-group.png", alt: "Staff team photo at event" },
    { src: "/images/gallery/s1.jpg", alt: "Luxurious buffet with golden serving dishes and Arabic calligraphy" },
    { src: "/images/gallery/s2.jpg", alt: "Buffet setup with chocolate fountain and fresh fruits" },
    { src: "/images/gallery/s3.jpg", alt: "Team photo with staff in uniforms at catering display" },
    {
      src: "/images/gallery/s4.jpg",
      alt: "Elegant buffet setup with golden serving dishes and traditional Arabic food",
    },
    { src: "/images/gallery/s5.jpg", alt: "Another team photo with Arcadia staff at catering setup" },
    { src: "/images/gallery/s6.jpg", alt: "Man in white ihram clothing at Hajj with Arcadia banner" },
    { src: "/images/gallery/s7.jpg", alt: "Person in ihram at Hajj with Arcadia banner" },
    { src: "/images/gallery/s8.jpg", alt: "Decorative cake with Libyan and Saudi flags and Arcadia branding" },
    { src: "/images/gallery/s9.jpg", alt: "Person in ihram at Hajj with Arcadia banner" },
  ]

  const officialDocuments = [
    {
      src: "/images/certificates/services-certificate.png",
      alt: language === "ar" ? "شهادة مقدم خدمات" : "Services Certificate",
    },
    {
      src: "/images/certificates/sca-certificate.png",
      alt: language === "ar" ? "شهادة هيئة المقاولين السعودية" : "Saudi Contractors Authority Certificate",
    },
    {
      src: "/images/certificates/commercial-registration.png",
      alt: language === "ar" ? "شهادة السجل التجاري" : "Commercial Registration Certificate",
    },
    {
      src: "/images/certificates/investment-certificate.png",
      alt: language === "ar" ? "شهادة تسجيل الاستثمار" : "Investment Registration Certificate",
    },
    {
      src: "/images/certificates/makkah-chamber.png",
      alt: language === "ar" ? "شهادة غرفة مكة المكرمة" : "Makkah Chamber Certificate",
    },
    {
      src: "/images/certificates/hajj-registration.png",
      alt: language === "ar" ? "شهادة تسجيل الحج" : "Hajj Registration Certificate",
    },
    {
      src: "/images/certificates/m1.png",
      alt:
        language === "ar"
          ? "شهادة تسجيل الاستثمار - وزارة الاستثمار"
          : "Investment Registration Certificate - Ministry of Investment",
    },
    {
      src: "/images/certificates/m2.png",
      alt: language === "ar" ? "شهادة تسجيل البوابة الإلكترونية" : "Electronic Portal Registration Certificate",
    },
  ]

  const currentContent = content[language]
  const isRTL = language === "ar"

  return (
    <div
      className={`min-h-screen bg-background overflow-x-hidden ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <header className="fixed top-0 w-full z-50 glass-card">
        <div className="container mx-auto px-4 py-4 max-w-full overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden bg-transparent">
                <img src="/images/logo.png" alt="ARCADIA Logo" className="w-full h-full object-contain" />
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {Object.entries(currentContent.nav).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className="text-foreground hover:text-primary transition-all duration-300 hover:scale-110 relative group bg-transparent border-none cursor-pointer text-sm lg:text-base xl:text-lg"
                >
                  {value}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="language-toggle border-0 hover:scale-105 bg-transparent"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === "en" ? "العربية" : "English"}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-primary hover:bg-primary/20"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav
              className={`md:hidden mt-4 pb-4 border-t border-primary/20 pt-4 animate-fade-in-up ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              <div className={`flex flex-col space-y-3 ${isRTL ? "items-end text-right" : "items-start text-left"}`}>
                {Object.entries(currentContent.nav).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`text-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10 bg-transparent border-none cursor-pointer w-full ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      <section
        className="min-h-screen pt-20 pb-20 relative overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: "#0F3737" }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h1
              className="hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 animate-fade-in animate-pulse-slow leading-tight py-4 px-2"
              style={{ lineHeight: "1.2", color: "#EBC36C" }}
            >
              {currentContent.hero.title}
            </h1>
            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-8 animate-fade-in-up font-light leading-relaxed px-2"
              style={{ color: "white" }}
            >
              {currentContent.hero.subtitle}
            </h2>
            <p
              className="text-lg sm:text-xl max-w-3xl mx-auto animate-fade-in-up leading-relaxed px-4"
              style={{ color: "#e5e7eb" }}
            >
              {currentContent.hero.description}
            </p>
            <div className="mt-12 animate-fade-in-up">
              <div
                className="relative inline-block group cursor-pointer px-4"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                <div className="relative bg-gradient-to-r from-primary/90 via-[#EBC36C]/90 to-primary/90 rounded-full px-4 sm:px-6 md:px-12 py-2 sm:py-3 md:py-4 border-2 border-white/20 group-hover:border-white/40 transition-all duration-500 group-hover:scale-105 mx-auto">
                  <span
                    className="text-base sm:text-lg md:text-xl font-bold drop-shadow-lg tracking-wide group-hover:tracking-wider transition-all duration-300 min-w-[180px] sm:min-w-[200px] md:min-w-[280px] inline-block text-center"
                    style={{ color: "white" }}
                  >
                    {typedText}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <div
                  className="cursor-pointer hover:scale-110 transition-transform duration-300"
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <div className="flex flex-col items-center space-y-1 animate-chevron-draw">
                    <svg className="w-6 h-4" fill="none" stroke="#EBC36C" viewBox="0 0 24 16" strokeWidth={3}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 4l6 6 6-6"
                        className="animate-draw-down"
                      />
                    </svg>
                    <svg className="w-6 h-4" fill="none" stroke="#EBC36C" viewBox="0 0 24 16" strokeWidth={3}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 4l6 6 6-6"
                        className="animate-draw-down"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </svg>
                    <svg className="w-6 h-4" fill="none" stroke="#EBC36C" viewBox="0 0 24 16" strokeWidth={3}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 4l6 6 6-6"
                        className="animate-draw-down"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-4 section-separator-alt"></div>

      <section id="about" className="py-20 relative" style={{ backgroundColor: "#155E4C" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-scroll-in">
              <h2 className="text-5xl md:text-6xl font-bold text-primary mb-4">{currentContent.about.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#EBC36C] mx-auto mb-8"></div>
            </div>
            <Card className="glass-card p-8 md:p-12 card-hover animate-scale-in shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 hover:border-[#EBC36C]/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#EBC36C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-start space-x-6 mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary via-[#EBC36C] to-primary rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse-slow shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border-2 border-white/30">
                    <Building2 className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4 group-hover:text-[#EBC36C] transition-colors duration-300 leading-tight">
                      {language === "ar" ? "تأسست عام 2019" : "Established 2019"}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary to-[#EBC36C] mb-4 group-hover:w-24 transition-all duration-300"></div>
                  </div>
                </div>
                <p className="text-base sm:text-lg text-foreground leading-relaxed text-balance font-medium group-hover:text-foreground/90 transition-colors duration-300">
                  {currentContent.about.content}
                </p>
                <div className="mt-8 flex items-center justify-center">
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#EBC36C] to-transparent group-hover:w-20 transition-all duration-500"></div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <div className="h-4 section-separator"></div>

      <section id="services" className="py-20" style={{ backgroundColor: "#0F3737" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-scroll-in">
              <h2 className="text-5xl md:text-6xl font-bold text-primary mb-4">{currentContent.services.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#EBC36C] mx-auto mb-8"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {currentContent.services.items.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <Card
                    key={index}
                    className="glass-card p-8 md:p-12 card-hover group animate-scroll-left shadow-lg hover:shadow-xl transition-all duration-500"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-[#EBC36C] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-foreground text-lg leading-relaxed font-medium">{service.text}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="h-4 section-separator-alt"></div>

      <section id="vision" className="py-20" style={{ backgroundColor: "#155E4C" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-16 animate-scroll-in">
              <h2 className="text-5xl md:text-6xl font-bold text-primary mb-4">{currentContent.vision.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#EBC36C] mx-auto mb-8"></div>
            </div>
            <Card className="glass-card p-8 md:p-12 card-hover animate-scale-in shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 hover:border-[#EBC36C]/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#EBC36C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary via-[#EBC36C] to-primary rounded-full flex items-center justify-center animate-pulse-slow shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border-2 border-white/30">
                    <Eye className="w-12 h-12 text-white drop-shadow-lg" />
                  </div>
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-[#EBC36C] mx-auto mb-6 group-hover:w-24 transition-all duration-300"></div>
                <p className="text-xl text-foreground leading-relaxed text-balance font-medium group-hover:text-foreground/90 transition-colors duration-300">
                  {currentContent.vision.content}
                </p>
                <div className="mt-8 flex items-center justify-center">
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#EBC36C] to-transparent group-hover:w-20 transition-all duration-500"></div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <div className="h-4 section-separator"></div>

      <section id="mission" className="py-20" style={{ backgroundColor: "#0F3737" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-16 animate-scroll-in">
              <h2 className="text-5xl md:text-6xl font-bold text-primary mb-4">{currentContent.mission.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#EBC36C] mx-auto mb-8"></div>
            </div>
            <Card className="glass-card p-8 md:p-12 card-hover animate-scale-in shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-[#EBC36C] rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse-slow">
                  <Target className="w-10 h-10 text-primary-foreground" />
                </div>
              </div>
              <p className="text-xl text-foreground leading-relaxed text-balance">{currentContent.mission.content}</p>
            </Card>
          </div>
        </div>
      </section>

      <div className="h-4 section-separator-alt"></div>

      <section id="values" className="py-20" style={{ backgroundColor: "#155E4C" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-scroll-in">
              <h2 className="text-5xl md:text-6xl font-bold text-primary mb-4">{currentContent.values.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#EBC36C] mx-auto mb-8"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentContent.values.items.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <Card
                    key={index}
                    className="glass-card p-8 card-hover text-center group animate-scroll-right shadow-lg hover:shadow-xl transition-all duration-500"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-[#EBC36C] rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <p className="text-foreground text-xl font-semibold">{value.text}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="h-4 section-separator"></div>

      <section id="clients" className="py-20" style={{ backgroundColor: "#0F3737" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-scroll-in">
              <h2 className="text-5xl md:text-6xl font-bold text-primary mb-4">{currentContent.clients.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#EBC36C] mx-auto mb-8"></div>
              <p className="text-xl text-foreground leading-relaxed max-w-3xl mx-auto">
                {currentContent.clients.content}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {currentContent.clients.items.map((client, index) => {
                const IconComponent = client.icon
                return (
                  <Card
                    key={index}
                    className="glass-card p-8 md:p-12 card-hover group animate-scroll-left shadow-lg hover:shadow-xl transition-all duration-500"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-[#EBC36C] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-foreground text-lg leading-relaxed font-medium">{client.text}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="h-4 section-separator"></div>

      <section id="gallery" className="py-20 overflow-x-hidden" style={{ backgroundColor: "#155E4C" }}>
        <div className="container mx-auto px-4 max-w-full">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-scroll-in">
              <h2 className="text-5xl md:text-6xl font-bold text-primary mb-4">{currentContent.gallery.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#EBC36C] mx-auto mb-8"></div>
              <p className="text-xl text-foreground leading-relaxed">{currentContent.gallery.subtitle}</p>
            </div>

            <div className="animate-scale-in">
              <Swiper
                key={`gallery-${language}`}
                modules={[Pagination, Autoplay, EffectFlip, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                  nextEl: ".gallery-swiper-button-next",
                  prevEl: ".gallery-swiper-button-prev",
                  enabled: galleryImages.length > 1,
                }}
                pagination={{
                  clickable: true,
                  el: ".gallery-swiper-pagination",
                  bulletClass: "swiper-pagination-bullet-custom",
                  bulletActiveClass: "swiper-pagination-bullet-active-custom",
                  enabled: galleryImages.length > 1,
                }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                effect="flip"
                flipEffect={{
                  slideShadows: true,
                  limitRotation: true,
                }}
                className="gallery-swiper w-full max-w-md mx-auto relative"
                style={{ paddingBottom: "60px" }}
              >
                {galleryImages.map((image, index) => (
                  <SwiperSlide key={`${language}-gallery-${index}`}>
                    <Card className="glass-card p-3 sm:p-6 overflow-hidden shadow-xl">
                      <div className="relative">
                        <div className="w-full aspect-[3/2] bg-white rounded-lg border-2 border-[#155E4C] p-3 sm:p-6 flex items-center justify-center shadow-inner">
                          <img
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            className="max-w-full max-h-full object-contain cursor-pointer hover:opacity-90 transition-opacity duration-300"
                            loading="lazy"
                            onClick={() => openLightbox(galleryImages, index)}
                          />
                        </div>
                      </div>
                    </Card>
                  </SwiperSlide>
                ))}
                {galleryImages.length > 1 && (
                  <>
                    <div
                      className="gallery-swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                      style={{ backgroundColor: "#EBC36C" }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                    <div
                      className="gallery-swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                      style={{ backgroundColor: "#EBC36C" }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </>
                )}
                <div className="gallery-swiper-pagination flex justify-center space-x-2 mt-4"></div>
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <div className="h-4 section-separator"></div>

      <section id="documents" className="py-20 overflow-x-hidden" style={{ backgroundColor: "#0F3737" }}>
        <div className="container mx-auto px-4 max-w-full">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-scroll-in">
              <h2 className="text-5xl md:text-6xl font-bold text-primary mb-4">{currentContent.documents.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#EBC36C] mx-auto mb-8"></div>
              <p className="text-xl text-foreground leading-relaxed">{currentContent.documents.subtitle}</p>
            </div>

            <div className="animate-scale-in">
              <Swiper
                key={`documents-${language}`}
                modules={[Pagination, Autoplay, EffectFlip, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                  nextEl: ".documents-swiper-button-next",
                  prevEl: ".documents-swiper-button-prev",
                  enabled: officialDocuments.length > 1,
                }}
                pagination={{
                  clickable: true,
                  el: ".documents-swiper-pagination",
                  bulletClass: "swiper-pagination-bullet-custom",
                  bulletActiveClass: "swiper-pagination-bullet-active-custom",
                  enabled: officialDocuments.length > 1,
                }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                effect="flip"
                flipEffect={{
                  slideShadows: true,
                  limitRotation: true,
                }}
                className="documents-swiper w-full max-w-md mx-auto relative"
                style={{ paddingBottom: "60px" }}
              >
                {officialDocuments.map((document, index) => (
                  <SwiperSlide key={`${language}-document-${index}`}>
                    <Card className="glass-card p-3 sm:p-6 overflow-hidden shadow-xl">
                      <div className="relative">
                        <div className="w-full aspect-[3/2] bg-white rounded-lg border-2 border-[#EBC36C] p-3 sm:p-6 flex items-center justify-center shadow-inner">
                          <img
                            src={document.src || "/placeholder.svg"}
                            alt={document.alt}
                            className="max-w-full max-h-full object-contain cursor-pointer hover:opacity-90 transition-opacity duration-300"
                            loading="lazy"
                            onClick={() => openLightbox(officialDocuments, index)}
                          />
                        </div>
                      </div>
                    </Card>
                  </SwiperSlide>
                ))}
                {officialDocuments.length > 1 && (
                  <>
                    <div
                      className="documents-swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                      style={{ backgroundColor: "#EBC36C" }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                    <div
                      className="documents-swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                      style={{ backgroundColor: "#EBC36C" }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </>
                )}
                <div className="documents-swiper-pagination flex justify-center space-x-2 mt-4"></div>
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <div className="h-4 section-separator-alt"></div>

      <section id="contact" className="py-20" style={{ backgroundColor: "#155E4C" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-scroll-in">
              <h2 className="text-5xl md:text-6xl font-bold text-primary mb-4">{currentContent.contact.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#EBC36C] mx-auto mb-8"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="glass-card p-8 md:p-12 card-hover animate-scale-in text-center group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative z-10">
                  <div className="w-18 h-18 bg-gradient-to-br from-primary via-[#EBC36C] to-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border-2 border-white/20">
                    <MapPin className="w-9 h-9 text-white drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-[#EBC36C] transition-colors duration-300">
                    {language === "ar" ? "العنوان" : "Address"}
                  </h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-[#EBC36C] mx-auto mb-4 group-hover:w-20 transition-all duration-300"></div>
                  <p className="text-foreground leading-relaxed font-medium" dir={language === "ar" ? "rtl" : "ltr"}>
                    {currentContent.contact.address}
                  </p>
                </div>
              </Card>

              <Card className="glass-card p-8 md:p-12 card-hover animate-scale-in text-center group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative z-10">
                  <div className="w-18 h-18 bg-gradient-to-br from-primary via-[#EBC36C] to-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border-2 border-white/20">
                    <Phone className="w-9 h-9 text-white drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-[#EBC36C] transition-colors duration-300">
                    {language === "ar" ? "رقم الهاتف" : "Phone"}
                  </h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-[#EBC36C] mx-auto mb-4 group-hover:w-20 transition-all duration-300"></div>
                  <p className="text-foreground text-lg font-semibold tracking-wide" dir="ltr">
                    {currentContent.contact.phone}
                  </p>
                </div>
              </Card>

              <Card className="glass-card p-8 md:p-12 card-hover animate-scale-in text-center group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative z-10">
                  <div className="w-18 h-18 bg-gradient-to-br from-primary via-[#EBC36C] to-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border-2 border-white/20">
                    <Mail className="w-9 h-9 text-white drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-[#EBC36C] transition-colors duration-300">
                    {language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-[#EBC36C] mx-auto mb-4 group-hover:w-20 transition-all duration-300"></div>
                  <a
                    className="text-foreground text-lg font-semibold hover:text-[#EBC36C] transition-all duration-300 underline-offset-4 hover:underline decoration-2 decoration-[#EBC36C]/50 hover:decoration-[#EBC36C] inline-block hover:scale-105"
                    dir="ltr"
                    href={`mailto:${currentContent.contact.email}`}
                  >
                    {currentContent.contact.email}
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-primary/30" style={{ backgroundColor: "#0F3737" }}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center overflow-hidden bg-transparent">
              <img src="/images/logo.png" alt="ARCADIA Logo" className="w-full h-full object-contain" />
            </div>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-[#EBC36C]"></div>
            <div className="flex items-center space-x-4 sm:space-x-6 mb-2 sm:mb-4">
              <a
                href="https://www.instagram.com/arcadia.mak?igsh=dGo3cDcwMWdyeDRm&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-[#EBC36C] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-primary/50"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
              <a
                href="https://www.tiktok.com/@arcadia.mak?_t=ZS-8zZBXlxtkpT&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-[#EBC36C] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-primary/50"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium px-4">
              {language === "ar"
                ? "جميع الحقوق محفوظة لشركة أركاديا © 2025-2026"
                : "All Rights Reserved to Arcadia © 2025-2026"}
            </p>
            <p className="text-muted-foreground/70 text-xs sm:text-sm px-4">
              {language === "ar" ? "خدمات السياحة والضيافة المتميزة" : "Excellence in Tourism & Hospitality Services"}
            </p>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-[#EBC36C] hover:scale-110 transition-all duration-300 shadow-lg"
          size="icon"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
        </Button>
      )}

      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-7xl max-h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation buttons */}
            {lightboxImages.length > 1 && (
              <>
                <button
                  onClick={prevLightboxImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: "#EBC36C" }}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextLightboxImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: "#EBC36C" }}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Image container */}
            <div className="w-full h-full flex items-center justify-center p-16">
              <img
                src={lightboxImages[currentLightboxIndex]?.src || "/placeholder.svg"}
                alt={lightboxImages[currentLightboxIndex]?.alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Image counter */}
            {lightboxImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentLightboxIndex + 1} / {lightboxImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
