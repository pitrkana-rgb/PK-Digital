import { useRef, useEffect, useState } from "react";

const milestones = [
  {
    year: "2025",
    title: "Vytvoření studia",
    description: "PK-Digital stojí na více než 10 letech zkušeností s analýzou dat a jejich vizualizací. Dnes se zaměřujeme na tvorbu moderních webových stránek a AI řešení, kde propojujeme data, design a technologie tak, aby weby nejen dobře vypadaly, ale také skutečně fungovaly a přinášely výsledky.",
    image: "/Studio.png",
    stats: "Start",
  },
  {
    year: "30+",
    title: "Realizované weby",
    description: "Navrhli a spustili jsme desítky moderních webových projektů – od prezentačních stránek až po komplexnější digitální řešení. Každý web stavíme s důrazerem na rychlost, přehlednost, konverze a dlouhodobou škálovatelnost. Design vždy propojujeme s reálným cílem projektu, aby web nebyl jen vizuální prezentací, ale funkčním nástrojem pro růst podnikání.",
    image: "/Web_designs.png",
    stats: "Design",
  },
  {
    year: "50+",
    title: "Implementace AI nástrojů",
    description: "Součástí našich řešení je také implementace AI nástrojů, které posouvají weby na vyšší úroveň. Nejčastěji nasazujeme AI chatboty, lead-generation systémy, chytré cenové kalkulátory nebo inteligentní vyhledávání. Cílem těchto nástrojů je zvyšovat návštěvnost, zlepšovat uživatelský zážitek a především maximalizovat konverze.",
    image: "/Automation.png",
    stats: "AI & Automatizace",
  },
  {
    year: "PK",
    title: "Kdo stojí za PK-Digital",
    description: "Jmenuji se Petr Kaňa a více než 10 let se věnuji práci s daty, analytikou a návrhu digitálních řešení. Pomáhám lidem a projektům lépe pochopit jejich data a jak je správně vizualizovat. Dnes tyto zkušenosti propojuji s AI, abych vytvářel jedinečné moderní webové stránky.",
    image: "/Team_members.png",
    stats: "Core Tým",
  },
];

const MilestoneCard = ({ milestone, index }: { milestone: typeof milestones[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        position: "relative",
        marginBottom: "80px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : `translateX(${isEven ? "-40px" : "40px"})`,
        transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className="milestone-row"
    >
      {/* Content wrapper */}
      <div className="milestone-content" style={{
        display: "flex",
        width: "100%",
        maxWidth: "1100px",
        gap: "48px",
        alignItems: "center",
        flexDirection: isEven ? "row" : "row-reverse" as any,
      }}>
        {/* Image side */}
        <div style={{ flex: 1, position: "relative" }}>
          <div style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}>
            <img
              src={milestone.image}
              alt={milestone.title}
              style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }}
            />
            {/* Overlay gradient */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
            }} />
          </div>
        </div>

        {/* Text side */}
        <div style={{ flex: 1, textAlign: isEven ? "left" : "right" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: "80px", height: "80px", borderRadius: "50%",
            background: "linear-gradient(135deg, #0ABDC6, #00E5FF)",
            boxShadow: "0 0 22px rgba(0,229,255,0.28)",
            marginBottom: "24px",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "24px", color: "#000",
          }}>
            {milestone.year}
          </div>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "32px",
            color: "#fff", marginBottom: "16px",
          }}>
            {milestone.title}
          </h3>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "17px",
            lineHeight: 1.6, color: "rgba(255,255,255,0.7)", margin: 0,
          }}>
            {milestone.description}
          </p>
        </div>
      </div>
    </div>
  );
};

import { SectionDivider } from "../../components/SectionDivider";

export const CompanyMilestonesSection = (): JSX.Element => (
  <section id="timeline" style={{ width: "100%", backgroundColor: "#000", padding: "100px 0", marginTop: "-50px", marginBottom: "0px" }}>
    <SectionDivider />
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }} className="milestones-container">

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "80px" }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(32px,5vw,56px)", lineHeight: 1.1, color: "#fff", margin: "0 auto 32px", letterSpacing: "-0.02em", maxWidth: "800px" }}>
          Kdo <span style={{ background: "linear-gradient(135deg,#0ABDC6,#00E5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>jsme</span>
        </h2>
      </div>

      {/* Timeline items */}
      <div style={{ position: "relative", marginTop: "120px" }}>
        {/* Vertical line through center */}
        <div style={{
          position: "absolute", top: "0", bottom: "0", left: "50%", transform: "translateX(-50%)",
          width: "4px", background: "linear-gradient(180deg, #00E5FF 0%, rgba(0,229,255,0.12) 100%)",
          zIndex: 0,
        }} className="timeline-line" />

        {milestones.map((m, i) => (
          <MilestoneCard key={m.year} milestone={m} index={i} />
        ))}
      </div>
    </div>

    <style>{`
      @media(max-width:992px){
        .milestones-container { padding: 0 16px !important; }
        .timeline-line { left: 0px !important; transform: none !important; }
        .milestone-content { 
          flex-direction: column-reverse !important; 
          align-items: flex-start !important;
          text-align: left !important;
          padding-left: 20px;
        }
        .milestone-content > div { width: 100% !important; text-align: left !important; }
        .milestone-row { align-items: flex-start !important; }
      }
      @media(max-width:480px) {
        .milestones-container { padding: 0 12px !important; }
        .milestone-content { padding-left: 16px; }
        .timeline-line { left: 0px !important; }
      }
    `}</style>
  </section>
);
