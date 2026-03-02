import { useRef, useEffect, useState } from "react";

const milestones = [
  {
    year: "2025",
    title: "Vytvoření studia",
    description: "Začali jsme jako malé studio zaměřené na moderní weby a chytrá digitální řešení. Od prvního dne jsme stavěli na kvalitním designu, technické preciznosti a důrazu na reálný přínos pro klienta. Pevné základy nám umožnily růst rychle, ale systematicky.",
    image: "/Studio.png",
    stats: "Start",
  },
  {
    year: "30+",
    title: "Realizované weby",
    description: "Navrhli a spustili jsme desítky moderních webových projektů – od prezentačních stránek po komplexní firemní platformy. Každý web stavíme na výkonu, konverzích a škálovatelnosti. Design propojujeme s byznysovým cílem, ne pouze s estetikou.",
    image: "/Web_designs.png",
    stats: "Design",
  },
  {
    year: "50+",
    title: "Realizované automatizace",
    description: "Implementujeme AI řešení, která šetří čas a zvyšují efektivitu. Od chatbotů pro zákaznickou podporu, přes generování obsahu, až po inteligentní vyhledávání a procesní automatizace. Technologie nasazujeme prakticky – s měřitelným dopadem na provoz i tržby.",
    image: "/Automation.png",
    stats: "AI & Automatizace",
  },
  {
    year: "4",
    title: "Lidé v core týmu",
    description: "Náš tým tvoří specialisté na UX, vývoj a AI integrace. Kombinujeme technickou odbornost s byznysovým přesahem. Jsme kompaktní, rychlí v rozhodování a schopní dodat řešení bez zbytečné složitosti.",
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
          {/* Floating stat inside image */}
          <div style={{
            position: "absolute", bottom: "20px", left: "20px",
            padding: "8px 16px", background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)", borderRadius: "12px",
            border: "1px solid rgba(255,90,31,0.3)",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "12px", color: "#FF5A1F",
            textTransform: "uppercase", letterSpacing: "0.1em",
          }}>
            {milestone.stats}
          </div>
        </div>

        {/* Text side */}
        <div style={{ flex: 1, textAlign: isEven ? "left" : "right" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: "80px", height: "80px", borderRadius: "50%",
            background: "linear-gradient(135deg, #FF6A2A, #FF3C00)",
            boxShadow: "0 0 30px rgba(255,90,31,0.4)",
            marginBottom: "24px",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "24px", color: "#fff",
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
  <section id="timeline" style={{ width: "100%", backgroundColor: "#000", padding: "100px 0", marginTop: "-50px", marginBottom: "-100px" }}>
    <SectionDivider />
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }} className="milestones-container">

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "80px" }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(32px,5vw,56px)", lineHeight: 1.1, color: "#fff", margin: "0 auto 32px", letterSpacing: "-0.02em", maxWidth: "800px" }}>
          Kdo <span style={{ background: "linear-gradient(135deg,#FF6A2A,#FFB347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>jsme</span>
        </h2>

        {/* Intro text glass card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          borderLeft: "4px solid #FF5A1F",
          borderRadius: "12px",
          padding: "32px",
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "left",
          marginBottom: "-50px",
        }}>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "19px", lineHeight: 1.6, color: "rgba(255,255,255,0.85)", margin: 0 }}>
            Jsme tým, který dlouhodobě pracuje s AI nástroji a dnes je systematicky využívá při návrhu moderních webů a pokročilých AI řešení.
          </p>
        </div>
      </div>

      {/* Timeline items */}
      <div style={{ position: "relative", marginTop: "120px" }}>
        {/* Vertical line through center */}
        <div style={{
          position: "absolute", top: "0", bottom: "0", left: "50%", transform: "translateX(-50%)",
          width: "4px", background: "linear-gradient(180deg, #FF5A1F 0%, rgba(255,90,31,0.1) 100%)",
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
