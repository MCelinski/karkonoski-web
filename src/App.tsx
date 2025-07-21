import React, { useState, useEffect } from 'react';
import './App.css';

// Icons
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const GlassIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 3L17 7C17 8.1 16.1 9 15 9L9 9C7.9 9 7 8.1 7 7L7 3"></path>
    <path d="M12 9L12 21"></path>
    <circle cx="12" cy="21" r="2"></circle>
  </svg>
);

const CoffeeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);

const SnowflakeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12,6 12,12 16,14"></polyline>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14"/>
    <path d="M12 5l7 7-7 7"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5"/>
    <path d="M12 19l-7-7 7-7"/>
  </svg>
);

const ArrowRightIconLarge = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14"/>
    <path d="M12 5l7 7-7 7"/>
  </svg>
);

// Types
interface ServiceData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  features: string[];
  packages: Array<{
    name: string;
    price: string;
    duration: string;
    features: string[];
  }>;
  gallery: string[];
}

// Service Overlay Component
const ServiceOverlay: React.FC<{
  service: ServiceData | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ service, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !service) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === service.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? service.gallery.length - 1 : prev - 1
    );
  };

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <button className="overlay-close" onClick={onClose}>
          <CloseIcon />
        </button>

        <div className="overlay-header">
          <h2 className="overlay-title">{service.title}</h2>
          <p className="overlay-subtitle">{service.subtitle}</p>
        </div>

        <div className="overlay-body">
          <div className="overlay-gallery">
            <div className="gallery-container">
              <div className="gallery-main">
                <button className="gallery-nav gallery-nav-prev" onClick={prevImage}>
                  <ArrowLeftIcon />
                </button>
                <div className="gallery-image-container">
                  <img
                    src={service.gallery[currentImageIndex]}
                    alt={`${service.title} - zdjęcie ${currentImageIndex + 1}`}
                    className="gallery-image"
                  />
                </div>
                <button className="gallery-nav gallery-nav-next" onClick={nextImage}>
                  <ArrowRightIconLarge />
                </button>
              </div>
            </div>
          </div>

          <div className="overlay-info">
            <div className="service-description">
              <h3>O usłudze</h3>
              <p>{service.detailedDescription}</p>
            </div>

            <div className="service-features-list">
              <h3>Co oferujemy</h3>
              <ul>
                {service.features.map((feature, index) => (
                  <li key={index}>
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="service-packages">
              <h3>Pakiety cenowe</h3>
              <div className="packages-list">
                {service.packages.map((pkg, index) => (
                  <div key={index} className="package-item">
                    <div className="package-header">
                      <h4>{pkg.name}</h4>
                      <span className="package-price">{pkg.price}</span>
                    </div>
                    <p className="package-duration">
                      <ClockIcon />
                      {pkg.duration}
                    </p>
                    <ul className="package-features">
                      {pkg.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="overlay-contact">
              <button className="btn btn-primary btn-full">
                Zapytaj o wycenę
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated Section Component
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [elementRef, setElementRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef) {
      observer.observe(elementRef);
    }

    return () => {
      if (elementRef) {
        observer.unobserve(elementRef);
      }
    };
  }, [elementRef]);

  return (
    <div 
      ref={setElementRef}
      className={`animated-section ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

// Navigation Component
const Navigation: React.FC<{ activeSection: string; onSectionChange: (section: string) => void }> = ({ 
  activeSection,  
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Strona Główna' },
    { id: 'services', label: 'Usługi' },
    { id: 'about', label: 'O Nas' },
    { id: 'contact', label: 'Kontakt' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="brand-text">Patryk Wojciechowski</span>
        </div>
        
        <div className="nav-desktop">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button 
          className="nav-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <div className={`nav-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-mobile-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection: React.FC<{ onNavigate: (section: string) => void }> = ({ onNavigate }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-split-container">
        {/* Sekcja Barman */}
        <div className="hero-split-section hero-split-barman">
          <video
            className="hero-split-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://res.cloudinary.com/dofhmymb0/video/upload/v1753137841/barman_svdc2x.mp4" type="video/mp4" />
          </video>
          <div className="hero-split-overlay"></div>
        </div>

        {/* Sekcja Fabryka Lodu */}
        <div className="hero-split-section hero-split-ice">
          <video
            className="hero-split-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://res.cloudinary.com/dofhmymb0/video/upload/v1753133845/lod_ac1ufv.mp4" type="video/mp4" />
          </video>
          <div className="hero-split-overlay"></div>
        </div>

        {/* Sekcja Barista */}
        <div className="hero-split-section hero-split-barista">
          <video
            className="hero-split-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://res.cloudinary.com/dofhmymb0/video/upload/v1753133845/barista_tbnxdx.mp4" type="video/mp4" />
          </video>
          <div className="hero-split-overlay"></div>
        </div>
      </div>
      
      {/* Główny tytuł i CTA */}
      <div className="hero-main-content">
        <AnimatedSection className="hero-main-text">
          <h1 className="hero-main-title">
            <span className="hero-title-main">PATRYK WOJCIECHOWSKI</span>
            <span className="hero-title-sub">Barman Karkonoski • Fabryka Lodu</span>
          </h1>
          
          {/* Loga usług */}
          <div className="hero-services-logos">
            <div className="hero-service-logo">
              <img src="barman-logo.png" alt="Barman Karkonoski" className="service-logo-img" />
            </div>
            <div className="hero-service-logo">
              <img src="logo-ice.png" alt="Fabryka Lodu" className="service-logo-img" />
            </div>
          </div>
          
          <div className="hero-ribbon">
            <span>Kompleksowe rozwiązania dla Twoich potrzeb</span>
          </div>
          <div className="hero-features">
            <div className="hero-feature">
              <StarIcon />
              <span>Wesela</span>
            </div>
            <div className="hero-feature">
              <StarIcon />
              <span>Eventy</span>
            </div>
            <div className="hero-feature">
              <StarIcon />
              <span>Imprezy Firmowe</span>
            </div>
            <div className="hero-feature">
              <StarIcon />
              <span>Dostawy</span>
            </div>
          </div>
          <div className="hero-actions">
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('services')}
            >
              Sprawdź Ofertę
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
            >
              Skontaktuj się
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const servicesData: ServiceData[] = [
    {
      id: 'barman',
      title: 'Barman Karkonoski',
      subtitle: 'Profesjonalne usługi barmanskie',
      description: 'Ekskluzywne koktajle i drinki przygotowane przez doświadczonego barmana. Idealne na wesela, imprezy firmowe i prywatne wydarzenia.',
      detailedDescription: 'Barman Karkonoski to gwarancja najwyższej jakości obsługi barmanskiej na Twoim wydarzeniu. Z wieloletnim doświadczeniem w branży eventowej, specjalizujemy się w tworzeniu niezapomnianych momentów poprzez sztukę mixologii. Każdy drink to połączenie tradycji, nowoczesności i pasji do doskonałości.',
      features: [
        'Klasyczne i autorskie koktajle',
        'Profesjonalny sprzęt barowy',
        'Elegancka prezencja',
        'Demonstracje przygotowania drinków',
        'Konsultacje menu koktajlowego',
        'Obsługa eventów do 300 osób',
        'Dekoracje strefy barowej',
        'Serwis alkoholi premium'
      ],
      packages: [
        {
          name: 'Pakiet Basic',
          price: '1500 zł',
          duration: '4 godziny',
          features: ['6 rodzajów koktajli', 'Podstawowy sprzęt', 'Obsługa do 50 osób', 'Elegancka prezencja']
        },
        {
          name: 'Pakiet Premium',
          price: '2500 zł',
          duration: '6 godzin',
          features: ['12 rodzajów koktajli', 'Profesjonalny sprzęt', 'Obsługa do 100 osób', 'Demonstracje']
        },
        {
          name: 'Pakiet VIP',
          price: '3500 zł',
          duration: '8 godzin',
          features: ['20+ koktajli', 'Pełna obsługa', 'Bez limitu osób', 'Autorskie drinki']
        }
      ], 
      gallery: [
        'src/assets/images/barman/barman1.webp',
        'src/assets/images/barman/barman2.webp',
        'src/assets/images/barman/barman3.webp',
        'src/assets/images/barman/barman4.webp'
      ]
    },
    {
      id: 'barista',
      title: 'Barista',
      subtitle: 'Sztuka przygotowania kawy',
      description: 'Profesjonalne usługi baristy z pasją do doskonałej kawy. Latte Art, specialty coffee i niezapomniane doznania kawowe.',
      detailedDescription: 'Nasz serwis baristy to połączenie pasji do kawy z artystycznym podejściem do jej przygotowania. Specjalizujemy się w Latte Art, specialty coffee oraz tworzeniu unikalnych doświadczeń kawowych. Każda filiżanka to dzieło sztuki, a każdy napój to podróż przez świat aromatów.',
      features: [
        'Latte Art na żywo',
        'Specialty coffee',
        'Profesjonalny sprzęt',
        'Warsztaty kawowe',
        'Degustacje kaw',
        'Coffee pairing',
        'Autorskie napoje kawowe',
        'Mobilna kawiarnia'
      ],
      packages: [
        {
          name: 'Coffee Bar',
          price: '1800 zł',
          duration: '6 godzin',
          features: ['Podstawowe kawy', 'Latte Art', 'Obsługa do 80 osób', 'Profesjonalny sprzęt']
        },
        {
          name: 'Latte Art Show',
          price: '2800 zł',
          duration: '8 godzin',
          features: ['Specialty coffee', 'Pokazy Latte Art', 'Bez limitu osób', 'Warsztaty']
        },
        {
          name: 'Coffee VIP',
          price: '4500 zł',
          duration: 'Cały dzień',
          features: ['Mobilna kawiarnia', '2 baristów', 'Degustacje', 'Coffee pairing']
        }
      ],
      gallery: [
        'src/assets/images/barista/barista1.jpg',
        'src/assets/images/barista/barista2.webp',
        'src/assets/images/barista/barista3.webp',
        'src/assets/images/barista/barista2.webp',
        'src/assets/images/barista/barista2.webp',
        'src/assets/images/barista/barista2.webp'
      ]
    },
    {
      id: 'fabryka-lodu',
      title: 'Fabryka Lodu',
      subtitle: 'Wysokiej jakości lód',
      description: 'Produkcja i dostawa różnych rodzajów lodu. Kostki, kule, kruszony lód i specjalne kształty na zamówienie.',
      detailedDescription: 'Fabryka Lodu to profesjonalna produkcja i dostawa najwyższej jakości lodu dla eventów każdej wielkości. Oferujemy pełen asortyment - od klasycznych kostek po ekskluzywne kule lodowe i specjalne kształty. Nasz lód produkowany jest z filtrowanej wody w sterylnych warunkach.',
      features: [
        'Różne rodzaje lodu',
        'Szybka dostawa',
        'Kontrola temperatury',
        'Kształty na zamówienie',
        'Lód przezroczysty',
        'Kostki różnych rozmiarów',
        'Kule lodowe premium',
        'Kruszony lód'
      ],
      packages: [
        {
          name: 'Pakiet Podstawowy',
          price: '300 zł',
          duration: 'Dostawa',
          features: ['50kg lodu', 'Kostki + kruszony', 'Termoizolacja', '8h świeżości']
        },
        {
          name: 'Pakiet Biznesowy',
          price: '600 zł',
          duration: 'Dostawa',
          features: ['100kg lodu', 'Kule premium', '12h świeżości', 'Wsparcie techniczne']
        },
        {
          name: 'Pakiet Premium',
          price: '1200 zł',
          duration: 'Obsługa',
          features: ['200kg lodu', 'Pełny asortyment', 'Lodówki profesjonalne', '24/7 wsparcie']
        }
      ],
      gallery: [
        'src/assets/images/ice/ice3.jpg',
        'src/assets/images/ice/ice2.jpg',
        'src/assets/images/ice/ice3.jpg',
        'src/assets/images/ice/ice1.jpg',
        'src/assets/images/ice/ice2.jpg',  
        '/gallery/ice6.jpg'
      ]
    }
  ];

  const services = [
    {
      id: 'barman',
      title: 'Barman Karkonoski',
      subtitle: 'Profesjonalne usługi barmanskie',
      description: 'Ekskluzywne koktajle i drinki przygotowane przez doświadczonego barmana. Idealne na wesela, imprezy firmowe i prywatne wydarzenia.',
      icon: <GlassIcon />,
      features: [
        'Klasyczne i autorskie koktajle',
        'Profesjonalny sprzęt barowy',
        'Elegancka prezencja',
        'Demonstracje przygotowania drinków'
      ],
      theme: 'barman'
    },
    {
      id: 'barista',
      title: 'Barista',
      subtitle: 'Sztuka przygotowania kawy',
      description: 'Profesjonalne usługi baristy z pasją do doskonałej kawy. Latte Art, specialty coffee i niezapomniane doznania kawowe.',
      icon: <CoffeeIcon />,
      features: [
        'Latte Art na żywo',
        'Specialty coffee',
        'Profesjonalny sprzęt',
        'Warsztaty kawowe'
      ],
      theme: 'barista'
    },
    {
      id: 'fabryka-lodu',
      title: 'Fabryka Lodu',
      subtitle: 'Wysokiej jakości lód',
      description: 'Produkcja i dostawa różnych rodzajów lodu. Kostki, kule, kruszony lód i specjalne kształty na zamówienie.',
      icon: <SnowflakeIcon />,
      features: [
        'Różne rodzaje lodu',
        'Szybka dostawa',
        'Kontrola temperatury',
        'Kształty na zamówienie'
      ],
      theme: 'ice'
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    const serviceData = servicesData.find(s => s.id === serviceId);
    if (serviceData) {
      setSelectedService(serviceData);
      setIsOverlayOpen(true);
    }
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  return (
    <>
      <section id="services" className="services">
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">Nasze Usługi</h2>
            <p className="section-subtitle">
              Kompleksowa obsługa Twoich wydarzeń
            </p>
          </AnimatedSection>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <AnimatedSection key={service.id} className={`service-card service-card--${service.theme} delay-${index + 1}`}>
                <div className="service-card-content">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  
                  <div className="service-header">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-subtitle">{service.subtitle}</p>
                  </div>

                  <p className="service-description">{service.description}</p>

                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="service-feature">
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className="service-button"
                    onClick={() => handleServiceClick(service.id)}
                  >
                    <span>Dowiedz się więcej</span>
                    <ArrowRightIcon />
                  </button>
                </div>
                

                            <div className="service-animation-area">
                                {service.id === 'barman' ? (
                                    <video
                                        className="service-video"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    >
                                        <source src="https://res.cloudinary.com/dofhmymb0/video/upload/v1753133844/drink_i3kg6y.mp4" type="video/mp4" />
                                        <source src="https://res.cloudinary.com/dofhmymb0/video/upload/v1753133844/drink_i3kg6y.mp4" type="video/quicktime" />
                                        Twoja przeglądarka nie obsługuje video.
                                    </video>
                                ) : (
                                    <video
                                        className="service-video"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    >
                                        {service.title === 'Barista' && (
                                            <source src="https://res.cloudinary.com/dofhmymb0/video/upload/v1753133845/barista_tbnxdx.mp4" type="video/mp4" />
                                        )}
                                        {service.title === 'Fabryka Lodu' && (
                                            <source src="https://res.cloudinary.com/dofhmymb0/video/upload/v1753133845/lod_ac1ufv.mp4" type="video/mp4" />
                                        )}
                                        Twoja przeglądarka nie obsługuje video.
                                    </video>
                                )}
                            </div>
                        </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ServiceOverlay
        service={selectedService}
        isOpen={isOverlayOpen}
        onClose={closeOverlay}
      />
    </>
  );
};

// About Section
const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <AnimatedSection className="about-text">
            <h2 className="section-title">O Nas</h2>
            <p className="about-description">
              Barman Karkonoski to wieloletnie doświadczenie w branży eventowej. 
              Specjalizujemy się w profesjonalnej obsłudze wesel, imprez firmowych 
              i prywatnych wydarzeń. Nasza pasja to tworzenie niezapomnianych 
              momentów poprzez doskonałe drinki i wyjątkową atmosferę.
            </p>
            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Obsłużonych eventów</div>
              </div>
              <div className="stat">
                <div className="stat-number">10+</div>
                <div className="stat-label">Lat doświadczenia</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Zadowolonych klientów</div>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="about-image">
            <img 
              src="barman.jpg" 
              alt="Barman Karkonoski w akcji" 
              className="about-image-photo"
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">Kontakt</h2>
          <p className="section-subtitle">
            Skontaktuj się z nami i zarezerwuj termin
          </p>
        </AnimatedSection>
        
        <div className="contact-content">
          <AnimatedSection className="contact-info">
            <div className="contact-item">
              <PhoneIcon />
              <div>
                <h4>Telefon</h4>
                <p>+48 123 456 789</p>
              </div>
            </div>
            <div className="contact-item">
              <EmailIcon />
              <div>
                <h4>Email</h4>
                <p>kontakt@barmankarkonoski.pl</p>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="contact-form">
            <div className="form">
              <div className="form-group">
                <input type="text" placeholder="Imię i nazwisko" className="form-input" />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email" className="form-input" />
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Telefon" className="form-input" />
              </div>
              <div className="form-group">
                <textarea placeholder="Wiadomość" className="form-textarea" rows={5}></textarea>
              </div>
              <button 
                onClick={() => alert('Formularz będzie działać po podłączeniu backendu')} 
                className="btn btn-primary btn-full"
              >
                Wyślij wiadomość
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Patryk Wojciechowski</h3>
            <p>Barman Karkonoski • Fabryka Lodu</p>
          </div>
          <div className="footer-text">
            <p>&copy; 2025 Patryk Wojciechowski. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="main">
        <HeroSection onNavigate={setActiveSection} />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;