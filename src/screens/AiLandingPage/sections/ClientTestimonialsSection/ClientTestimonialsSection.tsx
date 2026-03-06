import { StarIcon } from "lucide-react";

const testimonials = [
  { name: "Jan Novák", text: "Nový web od PK Digital nám konečně jasně říká, co děláme. Konverze vzrostly a zákazníci nás lépe chápou na první pohled." },
  { name: "Lucie Procházková", text: "Kombinace moderního webdesignu a AI agenta pro poptávky nám ušetřila hodiny práce. Web prodává a agent třídí leady." },
  { name: "Petr Svoboda", text: "Od návrhu webu po nasazení AI chatbotu – vše proběhlo srozumitelně a rychle. Doporučuji každému, kdo chce web, který opravdu funguje." },
  { name: "Eva Černá", text: "AI agent na webu nám automatizoval odpovědi na časté dotazy. Návštěvníci dostanou odpověď hned a my se věnujeme složitějším případům." },
  { name: "Tomáš Dvořák", text: "Webdesign na míru a následně AI nástroje pro kvalifikaci zákazníků. Přesně to, co jsme potřebovali pro růst." },
  { name: "Michaela Králová", text: "Nový web a AI agent pracují dohromady – design přitáhne, agent pomůže a uzavře. Vidíme to na konverzích." },
  { name: "Ondřej Konečný", text: "Profesionální web a integrace AI agenta do zákaznické podpory. Řešení je přehledné a měřitelné." },
  { name: "Barbora Veselá", text: "Potřebovali jsme web, který nejen vypadá dobře, ale také sám odpovídá na dotazy. PK Digital to zvládl – webdesign i AI agent." },
  { name: "Filip Hruška", text: "Od prvního návrhu webu po nasazení AI nástrojů – vše v jednom proudu. Web komunikuje naši hodnotu a agent šetří čas týmu." },
  { name: "Kristýna Malá", text: "Webdesign zaměřený na konverze a AI agent pro leady. Růst návštěvnosti i kvality poptávek je znát." },
  { name: "Martin Pokorný", text: "Moderní web a AI agent na objednávky. Jednoduchá spolupráce a výsledek, který pomáhá podnikání." },
  { name: "Zuzana Jelínková", text: "Nový web a automatizace díky AI. Návštěvníci mají přehled, my máme víc času na to, na čem záleží." },
  { name: "Daniel Beneš", text: "Web na míru a AI agent pro dotazy – přesně ta kombinace, která nám pomohla růst bez zbytečné zátěže." },
  { name: "Alena Růžičková", text: "Redesign webu a nasazení AI nástrojů změnily způsob, jak pracujeme s poptávkami. Vřele doporučuji." },
  { name: "Jakub Mareš", text: "Spolupráce na webdesignu i AI částech byla na jedničku. Web prodává a AI agenty dál rozvíjíme." },
];

const initials = (name: string) => name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
const colors = ["#00E5FF", "#0ABDC6", "#7B61FF", "#19B9A0", "#F59E0B", "#EC4899", "#3B82F6"];
const colorFor = (i: number) => colors[i % colors.length];

const TestimonialCard = ({ t, i }: { t: typeof testimonials[0]; i: number }) => (
  <div style={{
    flexShrink: 0,
    width: "340px",
    background: "linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  }}>
    {/* Stars */}
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, si) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static
        <StarIcon key={si} fill="#00E5FF" className="w-3.5 h-3.5 text-[#00E5FF]" />
      ))}
    </div>
    {/* Quote */}
    <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: 1.65, color: "rgba(255,255,255,0.82)", margin: 0, flex: 1 }}>
      "{t.text}"
    </p>
    {/* Author — name only, no role */}
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{
        width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
        background: `linear-gradient(135deg,${colorFor(i)},${colorFor(i + 3)})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "13px", color: "#fff",
      }}>
        {initials(t.name)}
      </div>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff" }}>{t.name}</div>
    </div>
  </div>
);

const row1 = [...testimonials, ...testimonials];

import { SectionDivider } from "../../components/SectionDivider";

export const ClientTestimonialsSection = (): JSX.Element => (
  <section style={{ width: "100%", backgroundColor: "#000", padding: "96px 0", marginTop: "-50px" }}>
    <SectionDivider />
    {/* Header — same style as other sections (centered, same font sizes) */}
    <div style={{ maxWidth: "1200px", margin: "0 auto 56px", padding: "0 24px", textAlign: "center" }}>
      <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4.5vw,52px)", color: "#fff", margin: "0 auto 20px", letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: "700px" }}>
        Co o spolupráci říkají{" "}
        <span style={{ background: "linear-gradient(135deg,#E040FB,#00E5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>klienti</span>
      </h2>
      <p className="section-sub" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: 1.6, color: "rgba(255,255,255,0.65)", margin: "0 auto", maxWidth: "560px" }}>
        Reference našich partnerů, kterým webdesign, automatizace a AI pomohly růst.
      </p>
    </div>

    {/* Marquee row */}
    <div style={{ position: "relative", overflow: "hidden" }}
      onMouseEnter={e => { const wrapper = e.currentTarget.querySelector(".marquee-inner") as HTMLElement; if (wrapper) wrapper.style.animationPlayState = "paused"; }}
      onMouseLeave={e => { const wrapper = e.currentTarget.querySelector(".marquee-inner") as HTMLElement; if (wrapper) wrapper.style.animationPlayState = "running"; }}
    >
      {/* Edge fades */}
      <div style={{ position: "absolute", insetBlock: 0, left: 0, width: "120px", background: "linear-gradient(90deg,#000,transparent)", zIndex: 10, pointerEvents: "none" }} />
      <div style={{ position: "absolute", insetBlock: 0, right: 0, width: "120px", background: "linear-gradient(270deg,#000,transparent)", zIndex: 10, pointerEvents: "none" }} />

      <div
        className="marquee-inner"
        style={{
          display: "flex", gap: "20px", width: "max-content",
          animation: "marquee 50s linear infinite",
        }}
      >
        {row1.map((t, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: duplicated marquee
          <TestimonialCard key={i} t={t} i={i} />
        ))}
      </div>
    </div>

    <style>{`
      @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      @keyframes marquee-reverse { from{transform:translateX(-50%)} to{transform:translateX(0)} }
      @media(max-width:768px){
        .testimonials-section { padding: 48px 0 !important; }
        .testimonials-heading { font-size: 22px !important; margin-bottom: 10px !important; }
        .testimonials-subtitle { font-size: 13px !important; }
        .testimonials-header { margin-bottom: 32px !important; }
        .testimonial-card { width: 280px !important; padding: 14px !important; gap: 12px !important; }
        .testimonial-avatar { width: 28px !important; height: 28px !important; font-size: 11px !important; }
        .testimonial-name { font-size: 13px !important; }
        .testimonial-role { font-size: 11px !important; }
      }
      @media(prefers-reduced-motion:reduce){ .marquee-inner{ animation:none !important; } }
    `}</style>
  </section>
);
