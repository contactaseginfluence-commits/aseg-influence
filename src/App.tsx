import { useState, useEffect, useRef, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, Menu, X, Target, Users, TrendingUp, BarChart3, Award, Sparkles, CheckCircle2 } from 'lucide-react'

type Page = 'home' | 'talents' | 'contact'

/* ─── Reveal animation component ──────────────────────────────────────── */
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => el.classList.add('is-visible'), delay) },
      { threshold: 0.06 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

/* ─── Hero art (editorial abstract background) ─────────────────────────── */
function HeroArt() {
  return (
    <div className="hero-art z-[1]">
      <div className="hero-art-grid" />
      {/* orbs */}
      <div className="absolute rounded-full" style={{ width:'72%', height:'72%', top:'-18%', left:'-12%', background:'radial-gradient(circle,rgba(255,252,245,0.55) 0%,transparent 68%)' }} />
      <div className="absolute rounded-full" style={{ width:'90%', height:'65%', bottom:'-20%', right:'-22%', background:'radial-gradient(ellipse,rgba(200,195,186,0.45) 0%,transparent 65%)' }} />
      <div className="absolute rounded-full" style={{ width:'38%', height:'38%', top:'28%', left:'32%', background:'radial-gradient(circle,rgba(220,216,208,0.6) 0%,transparent 70%)' }} />
      {/* rings */}
      {[
        { w:110, h:110, top:'12%', left:'10%', op:0.2 },
        { w:68,  h:68,  top:'22%', left:'18%', op:0.35 },
        { w:52,  h:52,  top:'55%', left:'48%', op:0.2 },
        { w:90,  h:90,  top:'62%', left:'62%', op:0.3 },
        { w:36,  h:36,  top:'10%', left:'68%', op:0.2 },
        { w:140, h:140, top:'30%', left:'55%', op:0.15 },
      ].map((r, i) => (
        <div key={i} className="absolute rounded-full" style={{ width:r.w, height:r.h, top:r.top, left:r.left, border:`1px solid rgba(150,144,135,${r.op})` }} />
      ))}
      {/* SVG lines */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden focusable="false">
        <line x1="18%" y1="18%" x2="73%" y2="14%" stroke="rgba(150,144,134,0.15)" strokeWidth="1"/>
        <line x1="73%" y1="14%" x2="82%" y2="37%" stroke="rgba(150,144,134,0.12)" strokeWidth="1"/>
        <line x1="18%" y1="18%" x2="52%" y2="57%" stroke="rgba(150,144,134,0.1)"  strokeWidth="1"/>
        <line x1="52%" y1="57%" x2="82%" y2="65%" stroke="rgba(150,144,134,0.13)" strokeWidth="1"/>
        <line x1="73%" y1="14%" x2="52%" y2="57%" stroke="rgba(150,144,134,0.09)" strokeWidth="1"/>
      </svg>
      {/* tags */}
      <span className="hero-art-tag" style={{ top:'16%', right:'12%' }}><span className="block w-4 h-px bg-current opacity-60" />Créateurs</span>
      <span className="hero-art-tag" style={{ top:'42%', left:'8%'  }}><span className="block w-4 h-px bg-current opacity-60" />Stratégie</span>
      <span className="hero-art-tag" style={{ bottom:'22%', right:'8%' }}><span className="block w-4 h-px bg-current opacity-60" />Marques</span>
      {/* watermark */}
      <span className="hero-art-word" aria-hidden>Influence</span>
    </div>
  )
}

/* ─── Navigation ───────────────────────────────────────────────────────── */
function Navigation({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false)

  const links: { key: Page; label: string }[] = [
    { key: 'home',    label: 'Accueil' },
    { key: 'talents', label: 'Talents' },
    { key: 'contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-[76px] grid grid-cols-[1fr_auto_1fr] items-center px-12 bg-background border-b border-border">
      <button
        onClick={() => setPage('home')}
        className="font-[family-name:var(--font-display)] text-[12px] tracking-[0.3em] uppercase text-left cursor-pointer"
      >
        ASEG Influence
      </button>

      {/* desktop */}
      <div className="hidden md:flex gap-14">
        {links.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setPage(key)}
            className={[
              'font-serif italic text-[19px] tracking-[0.01em] relative cursor-pointer transition-colors duration-[250ms]',
              'after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:h-px after:bg-foreground after:origin-left after:transition-transform after:duration-[350ms]',
              page === key
                ? 'text-foreground after:scale-x-100'
                : 'text-muted-foreground hover:text-foreground after:scale-x-0 hover:after:scale-x-100',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>

      {/* mobile menu button */}
      <div className="md:hidden col-start-3 flex justify-end">
        <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      <div />

      {/* mobile dropdown */}
      {open && (
        <div className="md:hidden absolute top-[76px] inset-x-0 bg-background border-b border-border px-12 pb-6 flex flex-col gap-4">
          {links.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setPage(key); setOpen(false) }}
              className={`font-serif italic text-xl text-left cursor-pointer transition-colors ${page === key ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ─── Footer ───────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="px-16 py-10 flex justify-between items-center border-t border-border mt-30">
      <div className="font-[family-name:var(--font-display)] text-[11px] tracking-[0.3em] uppercase">ASEG Influence</div>
      <div className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.2em] uppercase text-muted-foreground">© 2025 — Tous droits réservés</div>
    </footer>
  )
}

/* ─── Home page ─────────────────────────────────────────────────────────── */
const BRANDS = [
  { name: 'Lounge',                  logo: '/assets/logo lounge.png' },
  { name: 'Garnier',                 logo: '/assets/logo garnier.jpg' },
  { name: 'Uriage Eau Thermale',     logo: '/assets/logo uriage.svg' },
  { name: 'My Little Box',           logo: '/assets/logo My Little box.png' },
  { name: "La Bijouterie d'Emilie",  logo: '/assets/bijouterie-emilie.png' },
  { name: 'Starbucks',               logo: '/assets/logo starbucks.png' },
]

const STATS = [
  { value: '500K+', label: 'Abonnés cumulés' },
  { value: '150+',  label: 'Campagnes réussies' },
  { value: '25+',   label: 'Marques partenaires' },
  { value: '98%',   label: 'Satisfaction client' },
]

const EXPERTISE = [
  {
    num: '01',
    title: 'Gestion de carrière',
    desc: 'Nous prenons en charge la stratégie, les négociations et le développement à long terme de chaque talent.',
    icon: BarChart3,
  },
  {
    num: '02',
    title: 'Partenariats de marque',
    desc: 'Accès à un réseau de marques premium. Nous sélectionnons les collaborations qui correspondent à votre image.',
    icon: Award,
  },
  {
    num: '03',
    title: 'Accompagnement créatif',
    desc: 'Brief, production, direction artistique — nous sommes là à chaque étape pour que le contenu soit à la hauteur.',
    icon: Sparkles,
  },
]

const SERVICES = [
  { icon: Target,        title: 'Accompagnement personnalisé', desc: 'Chaque influenceur est unique. Nous créons des stratégies sur mesure qui respectent votre identité et vos valeurs.' },
  { icon: Users,         title: 'Relations authentiques',      desc: 'Nous privilégions les collaborations qui ont du sens, entre marques et créateurs qui partagent les mêmes valeurs.' },
  { icon: TrendingUp,    title: 'Croissance durable',          desc: 'Notre objectif : développer votre carrière sur le long terme avec des partenariats qui vous ressemblent.' },
  { icon: CheckCircle2,  title: 'Conseil & stratégie',         desc: 'Analyse de vos performances, conseils éditoriaux et stratégie de contenu pour optimiser votre croissance.' },
]

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <main>
      {/* HERO */}
      <div className="mt-[76px] h-[calc(100vh-76px)] grid grid-cols-[55%_45%]
                      max-lg:grid-cols-1 max-lg:grid-rows-[50vh_auto]">
        {/* left — art / image */}
        <div className="relative overflow-hidden">
          <img
            src="/assets/hero.jpg"
            alt="ASEG Influence — agence de talents"
            className="absolute inset-0 w-full h-full object-cover z-[2] transition-transform duration-[8000ms] ease-linear hover:scale-[1.03]"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <HeroArt />
        </div>
        {/* right — text */}
        <div className="flex flex-col justify-end px-16 py-[72px] border-l border-border max-lg:border-l-0 max-lg:border-t">
          <Reveal>
            <div className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-7">
              Paris — Agence d'influence
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-serif font-light italic leading-[0.95] tracking-[-0.01em] mb-9"
                style={{ fontSize: 'clamp(52px, 6vw, 96px)' }}>
              <em className="not-italic font-[family-name:var(--font-display)] text-[0.55em] tracking-[0.08em] uppercase block mb-1.5 text-muted-foreground">
                ASEG
              </em>
              Influence.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="font-serif text-[18px] text-muted-foreground leading-[1.75] max-w-[320px] mb-13 border-l-2 border-border pl-5">
              Nous accompagnons les créateurs qui ont quelque chose à dire.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <button className="cta-link" onClick={() => setPage('talents')}>
              Voir nos talents <span aria-hidden>→</span>
            </button>
          </Reveal>
        </div>
      </div>

      {/* STATS */}
      <section className="py-20 px-16 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="text-center py-8 border border-border">
                <div className="font-serif italic font-light text-[52px] leading-none tracking-[-0.03em] mb-2">{s.value}</div>
                <p className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.3em] uppercase text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="py-[140px] px-16 border-t border-border">
        <Reveal>
          <div className="grid grid-cols-2 gap-20 items-end mb-24 max-md:grid-cols-1 max-md:gap-8">
            <h2 className="font-serif italic font-light leading-[1.1] tracking-[-0.01em]"
                style={{ fontSize: 'clamp(36px, 4.5vw, 68px)' }}>
              Ce que nous<br />apportons.
            </h2>
            <p className="font-serif text-[17px] text-muted-foreground leading-[1.75] max-w-[340px] self-end">
              Une approche singulière du métier — stratégie, créativité et réseau au service de chaque talent.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-3 border-t border-border max-md:grid-cols-1">
          {EXPERTISE.map((item, i) => (
            <Reveal key={i} delay={i * 100}
              className={[
                'pt-12 pb-12',
                i < EXPERTISE.length - 1 ? 'pr-10 border-r border-border max-md:border-r-0 max-md:border-b max-md:pr-0' : '',
                i > 0 ? 'pl-10 max-md:pl-0' : '',
              ].join(' ')}>
              <span className="expertise-num">{item.num}</span>
              <div className="font-[family-name:var(--font-display)] text-[13px] tracking-[0.14em] uppercase mt-5 mb-4">
                {item.title}
              </div>
              <p className="font-serif italic text-base text-[#777] leading-[1.7]">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-16 border-t border-border">
        <Reveal>
          <div className="mb-16">
            <div className="section-label">Notre approche</div>
            <h2 className="font-serif italic font-light leading-[1.05]"
                style={{ fontSize: 'clamp(40px, 4.5vw, 68px)' }}>
              L'humain au cœur<br />de l'influence.
            </h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-0 border-t border-l border-border">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={i} delay={i * 80}
                className="border-b border-r border-border p-10">
                <div className="flex items-start gap-6">
                  <Icon className="w-5 h-5 mt-1 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="font-[family-name:var(--font-display)] text-[12px] tracking-[0.14em] uppercase mb-3">{s.title}</div>
                    <p className="font-serif italic text-[16px] text-[#777] leading-[1.7]">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* COLLABORATIONS */}
      <section className="py-30 px-16 border-t border-border">
        <Reveal>
          <div className="flex justify-between items-end mb-18 max-md:flex-col max-md:items-start max-md:gap-4">
            <h2 className="font-serif italic font-light leading-[1.05]"
                style={{ fontSize: 'clamp(40px, 4.5vw, 68px)' }}>
              Ils nous<br />font confiance.
            </h2>
            <p className="font-serif italic text-[16px] text-muted-foreground max-w-[220px] text-right max-md:text-left leading-[1.6]">
              Des marques qui comprennent la valeur d'une influence authentique.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-3 max-sm:grid-cols-2 border-t border-l border-border">
            {BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="brand-cell border-r border-b border-border flex items-center justify-center min-h-[120px] px-6 py-10 transition-colors duration-250 hover:bg-black/[0.018] cursor-default"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="brand-logo-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  )
}

/* ─── Talents page ──────────────────────────────────────────────────────── */
const TALENTS = [
  { id: 1, name: 'Sophie Martin',    category: 'Lifestyle & Mode',     followers: '250K', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', platforms: ['Instagram', 'TikTok'] },
  { id: 2, name: 'Lucas Dubois',     category: 'Tech & Gaming',        followers: '180K', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', platforms: ['YouTube', 'Twitch'] },
  { id: 3, name: 'Emma Rousseau',    category: 'Beauté & Wellness',    followers: '320K', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop', platforms: ['Instagram', 'YouTube'] },
  { id: 4, name: 'Thomas Bernard',   category: 'Sport & Fitness',      followers: '195K', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', platforms: ['Instagram', 'YouTube'] },
  { id: 5, name: 'Léa Petit',        category: 'Food & Travel',        followers: '275K', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop', platforms: ['Instagram', 'TikTok'] },
  { id: 6, name: 'Alexandre Moreau', category: 'Business & Finance',   followers: '150K', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', platforms: ['LinkedIn', 'YouTube'] },
]

function TalentsPage() {
  return (
    <main className="mt-[76px] px-16 py-24 max-md:px-8">
      <Reveal>
        <div className="mb-20">
          <div className="section-label">Notre roster</div>
          <h1 className="font-serif italic font-light leading-[0.95] tracking-[-0.01em]"
              style={{ fontSize: 'clamp(48px, 6vw, 96px)' }}>
            Nos Talents.
          </h1>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
        {TALENTS.map((t, i) => (
          <Reveal key={t.id} delay={i * 80}
            className="border-r border-b border-border overflow-hidden group">
            <div className="aspect-square overflow-hidden bg-muted">
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="px-8 py-7">
              <div className="font-[family-name:var(--font-mono)] text-[8px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{t.category}</div>
              <div className="font-serif italic font-light text-[26px] leading-[1.1] mb-1">{t.name}</div>
              <div className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.25em] text-muted-foreground mt-3">{t.platforms.join(' · ')}</div>
              <div className="font-serif italic text-[28px] font-light text-border mt-1">{t.followers}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </main>
  )
}

/* ─── Contact page ──────────────────────────────────────────────────────── */
function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <main className="mt-[76px] grid grid-cols-[1fr_1fr] min-h-[calc(100vh-76px)] max-md:grid-cols-1">
      {/* left */}
      <div className="flex flex-col justify-center px-16 py-24 border-r border-border max-md:border-r-0 max-md:border-b max-md:px-8 max-md:py-16">
        <Reveal>
          <div className="section-label">Rejoignez-nous</div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="font-serif italic font-light leading-[0.92] tracking-[-0.02em] mb-10"
              style={{ fontSize: 'clamp(52px, 6.5vw, 104px)' }}>
            On<br />parle ?
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="font-serif text-[18px] text-muted-foreground leading-[1.75] mb-12 max-w-[300px]">
            Vous êtes créateur et vous voulez en savoir plus ? Écrivez-nous.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <a
            href="mailto:contact.aseginfluence@gmail.com"
            className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-foreground border-b border-foreground pb-1.5 w-fit transition-opacity hover:opacity-40"
          >
            <Mail className="inline w-3.5 h-3.5 mr-2 mb-0.5" />
            contact.aseginfluence@gmail.com
          </a>
        </Reveal>
      </div>

      {/* right — form */}
      <div className="flex flex-col justify-center px-16 py-24 max-md:px-8 max-md:py-16">
        {sent ? (
          <Reveal>
            <div className="font-serif italic text-[28px] font-light leading-[1.3]">
              Merci pour votre message.<br />
              <span className="text-muted-foreground">Nous reviendrons vers vous très vite.</span>
            </div>
          </Reveal>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-11">
            <Reveal>
              <div className="space-y-3">
                <Label htmlFor="name">Votre nom</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Prénom Nom" required />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="space-y-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="vous@exemple.com" required />
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="space-y-3">
                <Label htmlFor="message">Votre message</Label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Présentez-vous, partagez vos réseaux…" required />
              </div>
            </Reveal>
            <Reveal delay={240}>
              <Button type="submit" className="font-[family-name:var(--font-display)] text-[11px] tracking-[0.35em] uppercase px-14 h-12">
                Envoyer
              </Button>
            </Reveal>
          </form>
        )}
      </div>
    </main>
  )
}

/* ─── Root ──────────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState<Page>('home')

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [page])

  return (
    <div className="min-h-screen bg-background">
      <Navigation page={page} setPage={setPage} />
      {page === 'home'    && <HomePage    setPage={setPage} />}
      {page === 'talents' && <TalentsPage />}
      {page === 'contact' && <ContactPage />}
      <Footer />
    </div>
  )
}
