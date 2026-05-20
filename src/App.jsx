import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Brain,
  FileSpreadsheet,
  NotebookTabs,
  TrendingUp,
  Sparkles,
  Rocket,
  BarChart3,
  SlidersHorizontal,
  Coins,
  Activity,
  Zap,
} from "lucide-react";

const projectionData = [
  { month: "Start", etf: 30000, optimistic: 30000, conservative: 30000 },
  { month: "M1", etf: 30900, optimistic: 31800, conservative: 30300 },
  { month: "M2", etf: 31800, optimistic: 33300, conservative: 30900 },
  { month: "M3", etf: 32700, optimistic: 34800, conservative: 31500 },
  { month: "M6", etf: 36000, optimistic: 40500, conservative: 33600 },
  { month: "M9", etf: 37800, optimistic: 43500, conservative: 34800 },
  { month: "M12", etf: 40200, optimistic: 47400, conservative: 36300 },
];

const cards = [
  {
    icon: FileSpreadsheet,
    title: "Excel",
    text: "Početni podaci, struktura ETF-a i benchmark.",
  },
  {
    icon: NotebookTabs,
    title: "Jupyter",
    text: "Obrada podataka i ML predikcija.",
  },
  {
    icon: Brain,
    title: "Predikcija",
    text: "Simulacija razvoja plana od 30.000 €.",
  },
];

const timeline = [
  { phase: "01", title: "Excel", desc: "Početni podaci i struktura ETF-a." },
  { phase: "02", title: "ML model", desc: "Treniranje modela u Jupyter Notebooku." },
  { phase: "03", title: "30.000 €", desc: "Simulacija planiranog ulaganja." },
  { phase: "04", title: "Dashboard", desc: "Vizualna prezentacija rezultata." },
];

function Button({ children, href }) {
  if (href) {
    return (
      <a className="btn" href={href}>
        {children}
      </a>
    );
  }
  return <button className="btn">{children}</button>;
}

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export default function App() {
  const [scenario, setScenario] = useState("base");
  const [investment, setInvestment] = useState(30000);
  const [risk, setRisk] = useState(55);
  const [aiExposure, setAiExposure] = useState(70);

  const scenarioConfig = {
    conservative: { label: "Konzervativni", growth: 0.21, volatility: 0.08 },
    base: { label: "Osnovni", growth: 0.34, volatility: 0.15 },
    aggressive: { label: "Optimistični", growth: 0.58, volatility: 0.24 },
  };

  const result = useMemo(() => {
    const selected = scenarioConfig[scenario];
    const riskFactor = 1 + (risk - 50) / 300;
    const aiFactor = 1 + (aiExposure - 50) / 250;
    const expectedGrowth = selected.growth * riskFactor * aiFactor;
    const finalValue = investment * (1 + expectedGrowth);
    const possibleDownside = investment * (1 - selected.volatility * (risk / 70));
    const confidence = Math.max(52, Math.min(91, 92 - risk * 0.35 + aiExposure * 0.08));

    return {
      selected,
      expectedGrowth,
      finalValue,
      possibleDownside,
      confidence,
      data: [
        { month: "Start", value: investment },
        { month: "M3", value: investment * (1 + expectedGrowth * 0.22) },
        { month: "M6", value: investment * (1 + expectedGrowth * 0.48) },
        { month: "M9", value: investment * (1 + expectedGrowth * 0.74) },
        { month: "M12", value: finalValue },
      ],
    };
  }, [scenario, investment, risk, aiExposure]);

  return (
    <main>
      <section className="hero">
        <div className="glow glow-one" />
        <div className="glow glow-two" />

        <nav className="nav">
          <div className="brand">
            <div className="brand-icon">
              <BarChart3 size={22} />
            </div>
            <div>
              <p>TechFocus</p>
              <span>AI ETF concept</span>
            </div>
          </div>
          <Button href="#demo">30.000 € demo</Button>
        </nav>

        <div className="hero-grid">
          <div>
            <motion.div
              className="badge"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Sparkles size={16} />
              Plan ulaganja: 30.000 €
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Naš <span>AI ETF</span> plan: 30.000 €
            </motion.h1>

            <motion.p
              className="lead"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Excel je baza portfelja, Jupyter pokreće ML predikciju, a stranica prikazuje scenarije razvoja ulaganja.
            </motion.p>

            <motion.div
              className="actions"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button href="#demo">Pokreni simulaciju</Button>
              <a className="ghost-btn" href="#roadmap">Roadmap</a>
            </motion.div>
          </div>

          <motion.div
            className="chart-card"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="chart-head">
              <div>
                <p>Osnovni scenarij</p>
                <h2>€40.200</h2>
              </div>
              <div className="trend-icon">
                <TrendingUp />
              </div>
            </div>

            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,.55)" />
                  <YAxis stroke="rgba(255,255,255,.55)" />
                  <Tooltip
                    formatter={(value) => [`€${Number(value).toFixed(0)}`, "Vrijednost"]}
                    contentStyle={{
                      background: "#020617",
                      border: "1px solid rgba(255,255,255,.15)",
                      borderRadius: 16,
                      color: "white",
                    }}
                  />
                  <Area type="monotone" dataKey="etf" stroke="#67e8f9" fill="#67e8f9" fillOpacity={0.18} strokeWidth={3} />
                  <Line type="monotone" dataKey="optimistic" stroke="#f0abfc" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="conservative" stroke="#6ee7b7" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p>Što prezentiramo</p>
          <h2>Od Excela do ML predikcije</h2>
        </div>

        <div className="cards">
          {cards.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                whileHover={{ y: -8 }}
              >
                <Card>
                  <div className="card-icon">
                    <Icon />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="roadmap" className="section split">
        <div>
          <p className="eyebrow">Roadmap</p>
          <h2>Kako smo zamislili razvoj</h2>
          <p className="lead small">
            Projekt prikazuje kako iz Excel portfelja dolazimo do ML predikcije i prezentacijskog dashboarda.
          </p>
        </div>

        <div className="timeline">
          {timeline.map((step, index) => (
            <motion.div
              className="timeline-item"
              key={step.phase}
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <strong>{step.phase}</strong>
              <div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="demo" className="section demo">
        <div className="demo-head">
          <div>
            <div className="badge">
              <Zap size={16} />
              Demo vizija
            </div>
            <h2>Simulacija plana od 30.000 €</h2>
            <p>Odabiremo scenarij i vidimo mogući razvoj ulaganja kroz 12 mjeseci.</p>
          </div>

          <div className="result-box">
            <p>Procjena nakon 12 mj.</p>
            <h3>€{result.finalValue.toFixed(0)}</h3>
            <span>+{(result.expectedGrowth * 100).toFixed(1)}%</span>
          </div>
        </div>

        <div className="demo-grid">
          <Card>
            <div className="control-title">
              <SlidersHorizontal />
              <div>
                <h3>Ulazni parametri</h3>
                <p>Promijeni pretpostavke.</p>
              </div>
            </div>

            <label>Scenarij tržišta</label>
            <div className="scenario-buttons">
              {Object.entries(scenarioConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setScenario(key)}
                  className={scenario === key ? "active" : ""}
                >
                  {config.label}
                </button>
              ))}
            </div>

            <Slider
              label="Početno ulaganje"
              value={investment}
              suffix="€"
              min={5000}
              max={100000}
              step={1000}
              onChange={setInvestment}
            />

            <Slider
              label="Razina rizika"
              value={risk}
              suffix="/100"
              min={10}
              max={95}
              step={1}
              onChange={setRisk}
            />

            <Slider
              label="AI izloženost"
              value={aiExposure}
              suffix="%"
              min={20}
              max={95}
              step={1}
              onChange={setAiExposure}
            />
          </Card>

          <div>
            <div className="stats">
              <Stat icon={Coins} label="Očekivana vrijednost" value={`€${result.finalValue.toFixed(0)}`} />
              <Stat icon={Activity} label="Mogući downside" value={`€${result.possibleDownside.toFixed(0)}`} />
              <Stat icon={Brain} label="Pouzdanost modela" value={`${result.confidence.toFixed(0)}%`} />
            </div>

            <Card className="demo-chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,.55)" />
                  <YAxis stroke="rgba(255,255,255,.55)" />
                  <Tooltip
                    formatter={(value) => [`€${Number(value).toFixed(0)}`, "Vrijednost"]}
                    contentStyle={{
                      background: "#020617",
                      border: "1px solid rgba(255,255,255,.15)",
                      borderRadius: 16,
                      color: "white",
                    }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#67e8f9" fill="#67e8f9" fillOpacity={0.18} strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </section>

      <footer>
        <Rocket size={18} />
        <span>TechFocus AI ETF — prezentacijski demo, nije financijski savjet.</span>
      </footer>
    </main>
  );
}

function Slider({ label, value, suffix, min, max, step, onChange }) {
  return (
    <div className="slider">
      <div>
        <span>{label}</span>
        <strong>{suffix === "€" ? `€${value}` : `${value}${suffix}`}</strong>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="stat">
      <Icon />
      <p>{label}</p>
      <h3>{value}</h3>
    </div>
  );
}
