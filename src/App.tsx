import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Users, TrendingUp, Mail, Menu, X,
  Sparkles, Target, Award, BarChart3, CheckCircle2
} from 'lucide-react'

type Page = 'home' | 'talents' | 'contact'

/* ─── Data ────────────────────────────────────────────────────────────────── */
const TALENTS = [
  { id: 1, name: 'Sophie Martin',    category: 'Lifestyle & Mode',   followers: '250K', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', platforms: ['Instagram', 'TikTok'] },
  { id: 2, name: 'Lucas Dubois',     category: 'Tech & Gaming',      followers: '180K', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', platforms: ['YouTube', 'Twitch'] },
  { id: 3, name: 'Emma Rousseau',    category: 'Beauté & Wellness',  followers: '320K', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop', platforms: ['Instagram', 'YouTube'] },
  { id: 4, name: 'Thomas Bernard',   category: 'Sport & Fitness',    followers: '195K', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', platforms: ['Instagram', 'YouTube'] },
  { id: 5, name: 'Léa Petit',        category: 'Food & Travel',      followers: '275K', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop', platforms: ['Instagram', 'TikTok'] },
  { id: 6, name: 'Alexandre Moreau', category: 'Business & Finance', followers: '150K', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', platforms: ['LinkedIn', 'YouTube'] },
]

const BRANDS = [
  { name: 'Lounge',               logo: '/assets/logo lounge.png' },
  { name: 'Garnier',              logo: '/assets/logo garnier.jpg' },
  { name: 'Uriage Eau Thermale',  logo: '/assets/logo uriage.svg' },
  { name: 'My Little Box',        logo: '/assets/logo My Little box.png' },
  { name: "La Bijouterie d'Emilie", logo: '/assets/bijouterie-emilie.png' },
  { name: 'Starbucks',            logo: '/assets/logo starbucks.png' },
]

const STATS = [
  { value: '500K+', label: 'Abonnés cumulés' },
  { value: '150+',  label: 'Campagnes réussies' },
  { value: '25+',   label: 'Marques partenaires' },
  { value: '98%',   label: 'Satisfaction client' },
]

const APPROCHE = [
  { icon: Target,     title: 'Accompagnement personnalisé', desc: 'Chaque influenceur est unique. Nous créons des stratégies sur mesure qui respectent votre identité et vos valeurs.' },
  { icon: Users,      title: 'Relations authentiques',      desc: 'Nous privilégions les collaborations qui ont du sens, entre marques et créateurs qui partagent les mêmes valeurs.' },
  { icon: TrendingUp, title: 'Croissance durable',          desc: 'Notre objectif : développer votre carrière sur le long terme avec des partenariats qui vous ressemblent.' },
]

const SERVICES = [
  { icon: BarChart3,    title: 'Gestion de carrière',      desc: 'Développement stratégique de votre personal branding et accompagnement dans toutes vos décisions professionnelles.' },
  { icon: Award,        title: 'Négociation de contrats',  desc: 'Nous défendons vos intérêts et négocions les meilleures conditions pour chaque collaboration avec les marques.' },
  { icon: Sparkles,     title: 'Création de partenariats', desc: 'Mise en relation avec des marques qui correspondent à vos valeurs et à votre audience pour des collaborations authentiques.' },
  { icon: CheckCircle2, title: 'Conseil & stratégie',      desc: 'Analyse de vos performances, conseils éditoriaux et stratégie de contenu pour optimiser votre croissance.' },
]

/* ─── Navigation ──────────────────────────────────────────────────────────── */
function Navigation({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false)
  const links: { key: Page; label: string }[] = [
    { key: 'home',    label: 'Accueil' },
    { key: 'talents', label: 'Nos Talents' },
    { key: 'contact', label: 'Contact' },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          <button
            onClick={() => setPage('home')}
            className="text-base font-semibold text-gray-900 cursor-pointer tracking-tight"
          >
            ASEG Influence
          </button>

          <div className="hidden md:flex space-x-6">
            {links.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setPage(key)}
                className={`text-sm transition-colors cursor-pointer ${
                  page === key ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} aria-label={open ? 'Fermer' : 'Menu'} className="p-2">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-3 space-y-1 border-t border-gray-100 pt-2">
            {links.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => { setPage(key); setOpen(false) }}
                className="block w-full text-left px-2 py-2.5 text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

/* ─── Home page ───────────────────────────────────────────────────────────── */
function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <main id="main-content">
      {/* HERO */}
      <section className="relative py-20 px-6 bg-white text-center overflow-hidden">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-gray-200 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-64 bg-gray-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-gray-300 px-4 py-1.5 rounded-full mb-8">
            <Sparkles className="h-3.5 w-3.5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600 tracking-wide">Agence d'influence nouvelle génération</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-5 leading-[1.1] tracking-tight">
            L'humain au cœur<br />de l'influence
          </h1>
          <p className="text-base text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
            Nous accompagnons les créateurs de contenu dans leurs collaborations
            avec les marques. Des partenariats <span className="font-semibold text-gray-800">authentiques</span> et{' '}
            <span className="font-semibold text-gray-800">durables</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => setPage('contact')}
              className="bg-gray-900 text-white hover:bg-gray-800 px-6 py-2.5 rounded-md text-sm font-medium cursor-pointer transition-transform hover:scale-105"
            >
              Rejoignez-nous
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage('talents')}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-md text-sm font-medium cursor-pointer transition-transform hover:scale-105"
            >
              Découvrir nos talents
            </Button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="text-center p-6 bg-white rounded-xl border border-gray-200 transition-transform duration-200 hover:scale-105 hover:shadow-md cursor-default"
            >
              <div className="text-4xl font-bold text-gray-900 mb-1">{s.value}</div>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* APPROCHE */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Notre approche humaine</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              Nous plaçons l'humain au centre de chaque collaboration pour créer des partenariats qui ont du sens et qui durent
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {APPROCHE.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="p-6 bg-gray-50 rounded-xl border border-gray-200 transition-transform duration-200 hover:scale-105 hover:shadow-md cursor-default"
                >
                  <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Nos services</h2>
            <p className="text-sm text-gray-500">Un accompagnement complet pour votre réussite</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {SERVICES.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 transition-transform duration-200 hover:scale-105 hover:shadow-md cursor-default"
                >
                  <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{s.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* MARQUES */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Ils nous font confiance</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Des marques prestigieuses qui partagent notre vision de l'influence authentique
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-200 transition-transform duration-200 hover:scale-105 hover:shadow-md cursor-default"
              >
                <img
                  src={brand.logo}
                  alt={`Logo ${brand.name}`}
                  className="max-w-[120px] max-h-[52px] w-full h-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

/* ─── Talents page ────────────────────────────────────────────────────────── */
function TalentCard({ t }: { t: (typeof TALENTS)[0] }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-md cursor-default">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-gray-200" />}
        <img
          src={t.image}
          alt={`Photo de ${t.name}`}
          className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900">{t.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{t.category}</p>
      </div>
    </div>
  )
}

function TalentsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Nos Talents</h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Découvrez les créateurs de contenu qui font partie de la famille ASEG Influence
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TALENTS.map((t) => <TalentCard key={t.id} t={t} />)}
        </div>
      </div>
    </main>
  )
}

/* ─── Contact page ────────────────────────────────────────────────────────── */
function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSent(true)
      setSubmitting(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 600)
  }

  return (
    <main id="main-content" className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Contactez-nous</h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Vous êtes influenceur ou une marque ? Parlons de votre projet ensemble
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-1">Envoyez-nous un message</h2>
            <p className="text-xs text-gray-500 mb-5">Nous vous répondrons dans les plus brefs délais</p>
            {sent ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="h-10 w-10 text-gray-900 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-900">Merci pour votre message !</p>
                <p className="text-xs text-gray-500 mt-1">Nous vous contacterons très bientôt.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs">Nom complet</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Votre nom" autoComplete="name" required className="text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="votre@email.com" autoComplete="email" required className="text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs">Téléphone</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+33 6 12 34 56 78" autoComplete="tel" className="text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs">Message</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Parlez-nous de votre projet…" rows={4} required className="text-sm" />
                </div>
                <Button type="submit" disabled={submitting} className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm cursor-pointer">
                  {submitting ? 'Envoi…' : 'Envoyer le message'}
                </Button>
              </form>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Informations de contact</h2>
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-gray-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-gray-900">Email</p>
                  <a href="mailto:contact.aseginfluence@gmail.com" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
                    contact.aseginfluence@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Horaires d'ouverture</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Lundi — Vendredi</span>
                  <span className="text-xs font-medium text-gray-900">9h00 — 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Samedi — Dimanche</span>
                  <span className="text-xs text-gray-400">Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

/* ─── Root ────────────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState<Page>('home')

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gray-900 focus:text-white focus:text-sm focus:font-medium"
      >
        Aller au contenu principal
      </a>
      <Navigation page={page} setPage={navigate} />
      {page === 'home'    && <HomePage    setPage={navigate} />}
      {page === 'talents' && <TalentsPage />}
      {page === 'contact' && <ContactPage />}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6 text-center">
        <p className="text-sm font-semibold text-gray-900 mb-1">ASEG Influence</p>
        <p className="text-xs text-gray-400">© 2025 ASEG Influence. Tous droits réservés.</p>
      </footer>
    </div>
  )
}
