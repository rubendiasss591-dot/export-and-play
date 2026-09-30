import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Gift,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import gifCopy from "@/assets/gif-copy.mp4.asset.json";
import brancoHotelImage from "@/assets/paleta-branco-hotel.webp.asset.json";
import eleganceImage from "@/assets/paleta-elegance.webp.asset.json";
import familiaImage from "@/assets/paleta-familia.webp.asset.json";
import urbanImage from "@/assets/paleta-urban.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kit Serena | 20 Toalhas de Algodão Turco Premium" },
      {
        name: "description",
        content:
          "Kit Serena: compre 10 toalhas de banho gigantes e ganhe 10 toalhas de rosto por R$ 59,97.",
      },
      { property: "og:title", content: "Kit Serena | Compre 10, Ganhe 10" },
      {
        property: "og:description",
        content: "Maciez e absorção de hotel cinco estrelas em um kit com 20 peças.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const gallery = [9, 1, 2, 3, 4, 5, 6, 7, 8, 10].map((number) => ({
  src: `/images/toalhas-${number}.webp`,
  alt:
    number === 9
      ? "Kit Serena com 20 toalhas de algodão turco premium"
      : `Detalhe do kit de toalhas Serena ${number}`,
}));

const palettes = {
  Elegance: {
    image: eleganceImage.url,
    checkout: "https://checkout.serenapagamentoseguro.store/pay/175b5b7e-a2ec-444e-a173-0db2f1af2805",
  },
  Família: {
    image: familiaImage.url,
    checkout: "https://checkout.serenapagamentoseguro.store/pay/3a8aa197-f7c7-4575-9eed-0d94cf2bc970",
  },
  "Branco Hotel": {
    image: brancoHotelImage.url,
    checkout: "https://checkout.serenapagamentoseguro.store/pay/afa00454-5ed1-4590-8a0a-a6b8b95ed42b",
  },
  Urban: {
    image: urbanImage.url,
    checkout: "https://checkout.serenapagamentoseguro.store/pay/1fb307e8-06c1-42df-a76a-7c09dc1d79a3",
  },
} as const;

type PaletteName = keyof typeof palettes;

const benefits = [
  {
    icon: Sparkles,
    title: "Algodão turco",
    text: "Fibras premium para mais maciez e durabilidade.",
  },
  {
    icon: BadgeCheck,
    title: "Ultra absorção",
    text: "Retém mais água sem deixar o tecido encharcado.",
  },
  {
    icon: Clock3,
    title: "Secagem rápida",
    text: "Prontas para usar novamente em menos tempo.",
  },
  {
    icon: ShieldCheck,
    title: "Hipoalergênicas",
    text: "Mais cuidado, conforto e suavidade para a pele.",
  },
];

const faqs = [
  ["O kit vem com quantas toalhas?", "São 20 peças: 10 toalhas de banho gigantes e 10 toalhas de rosto de brinde."],
  ["As toalhas são de algodão turco?", "Sim. O kit é produzido com fibras de algodão turco, conhecidas pela maciez, absorção e durabilidade."],
  ["Qual é o tamanho das toalhas de banho?", "As toalhas de banho têm tamanho gigante, ideal para envolver o corpo com mais conforto."],
  ["Quais cores posso escolher?", "Você pode escolher entre as paletas Elegance, Família, Branco Hotel e Urban."],
  ["As toalhas secam rápido?", "Sim. A trama foi desenvolvida para absorver bem e secar com mais rapidez, mesmo em dias úmidos."],
];

function useCountdown() {
  const [seconds, setSeconds] = useState(1 * 3600);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => (value > 0 ? value - 1 : 0)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return {
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

function Countdown({ compact = false }: { compact?: boolean }) {
  const time = useCountdown();
  const values = [
    [time.hours, "HORAS"],
    [time.minutes, "MIN"],
    [time.seconds, "SEG"],
  ] as const;

  return (
    <div className={compact ? "flex items-center gap-2" : "flex items-start gap-3"}>
      {values.map(([value, label]) => (
        <div key={label} className="text-center">
          <span className={compact ? "count-chip-small" : "count-chip"}>
            {String(value).padStart(2, "0")}
          </span>
          {!compact && <span className="mt-1 block text-[9px] font-semibold text-muted-foreground">{label}</span>}
        </div>
      ))}
    </div>
  );
}

function BuyButton({ checkout, className = "" }: { checkout: string; className?: string }) {
  return (
    <Button
      size="lg"
      className={`buy-pulse h-14 w-full rounded-md bg-buy text-base font-extrabold text-buy-foreground shadow-buy hover:bg-buy-hover ${className}`}
      onClick={() => window.location.assign(checkout)}
    >
      COMPRAR AGORA <ChevronRight className="size-5" />
    </Button>
  );
}

function Gallery({ palette }: { palette: PaletteName }) {
  const [active, setActive] = useState(0);
  const paletteImage = palettes[palette].image;

  useEffect(() => setActive(0), [palette]);
  const previous = () => setActive((active - 1 + gallery.length) % gallery.length);
  const next = () => setActive((active + 1) % gallery.length);
  const activeImage = active === 0
    ? { src: paletteImage, alt: `Kit Serena na paleta ${palette}` }
    : gallery[active] ?? gallery[0];

  if (!activeImage) return null;

  return (
    <div className="min-w-0">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted shadow-product">
        <span className="absolute left-3 top-3 z-10 rounded-md bg-offer px-3 py-1 text-[10px] font-extrabold uppercase text-offer-foreground">20 peças!</span>
        <img src={activeImage.src} alt={activeImage.alt} className="h-full w-full object-cover" />
        <Button variant="ghost" size="icon" className="gallery-arrow left-3" onClick={previous} aria-label="Imagem anterior">
          <ChevronLeft />
        </Button>
        <Button variant="ghost" size="icon" className="gallery-arrow right-3" onClick={next} aria-label="Próxima imagem">
          <ChevronRight />
        </Button>
      </div>
      <div className="mt-3 grid grid-cols-6 gap-2 sm:grid-cols-7 lg:grid-cols-6">
        {[{ src: paletteImage, alt: `Paleta ${palette}` }, ...gallery.slice(1, 6)].map((image, index) => (
          <button
            key={image.src}
            onClick={() => setActive(index)}
            aria-label={`Ver imagem ${index + 1}`}
            className={`aspect-square overflow-hidden rounded-md border-2 bg-muted transition ${active === index ? "border-primary" : "border-transparent opacity-85 hover:opacity-100"}`}
          >
            <img src={image.src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductDetails({ palette, setPalette }: { palette: PaletteName; setPalette: (palette: PaletteName) => void }) {
  return (
    <section id="comprar" className="min-w-0">
      <div className="flex items-center gap-2 text-sm">
        <div className="flex gap-0.5 text-rating" aria-label="5 estrelas">
          {[0, 1, 2, 3, 4].map((star) => <Star key={star} className="size-4 fill-current" />)}
        </div>
        <strong>4,9</strong><span className="text-muted-foreground">(327 avaliações)</span>
      </div>
      <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary">Oferta exclusiva por tempo limitado</p>
      <h1 className="mt-4 max-w-xl text-[30px] font-extrabold leading-[1.17] text-foreground sm:text-[38px] lg:text-[40px]">
        Toalhas Algodão Turco Premium compre 10, ganhe 10 toalhas de rosto [COMPRE 10 GANHE 10]
      </h1>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">10 toalhas de banho gigantes + 10 toalhas de rosto de brinde. Maciez e absorção de hotel cinco estrelas.</p>

      <div className="mt-5 border-y border-border py-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="line-through">R$ 324,00</span>
          <span className="rounded bg-discount px-2 py-1 text-[10px] font-bold text-primary">63% OFF</span>
        </div>
        <div className="mt-1 flex items-end gap-2"><span className="pb-1 text-sm text-muted-foreground">por</span><strong className="font-serif text-[34px] leading-none text-price">R$ 59,97</strong></div>
      </div>

      <div className="offer-pulse mt-4 rounded-md bg-offer px-4 py-3 text-offer-foreground">
        <p className="flex items-center gap-2 text-xs font-extrabold"><Gift className="size-4" /> OFERTA COMPRE 10, GANHE 10 — HOJE!</p>
        <p className="ml-6 mt-1 text-[11px]">Você ganha 10 toalhas de rosto de brinde.</p>
      </div>
      <div className="urgency-pulse mt-2 rounded-md bg-urgency px-3 py-2 text-center text-[10px] font-extrabold text-urgency-foreground">ÚLTIMAS UNIDADES DISPONÍVEIS — GARANTA SEU KIT HOJE!</div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-xs font-bold">Escolha sua paleta</legend>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(palettes) as PaletteName[]).map((name) => (
            <Button key={name} variant="outline" onClick={() => setPalette(name)} className={palette === name ? "h-10 border-primary bg-selected text-xs shadow-none hover:bg-selected" : "h-10 text-xs shadow-none"}>
              {palette === name && <Check className="size-4" />} {name}
            </Button>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 grid grid-cols-[76px_minmax(0,1fr)] items-center gap-3 rounded-lg border border-border p-3">
        <img src="/images/correios-logo.png" alt="Correios" className="h-12 w-16 object-contain" />
        <div className="min-w-0"><span className="text-[10px] uppercase text-muted-foreground">Oferta adicional</span><p className="text-xs font-extrabold text-primary">FRETE GRÁTIS SOMENTE HOJE</p></div>
      </div>
      <BuyButton checkout={palettes[palette].checkout} className="mt-3" />
      <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground"><LockKeyhole className="size-3.5" /> Compra segura e protegida</p>
    </section>
  );
}

function Index() {
  const [palette, setPalette] = useState<PaletteName>("Elegance");
  const checkout = palettes[palette].checkout;
  const assuranceItems: Array<[LucideIcon, string, string]> = [
    [Truck, "Envio rápido", "para todo Brasil"],
    [ShieldCheck, "Compra segura", "dados protegidos"],
    [PackageCheck, "7 dias", "para experimentar"],
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="bg-banner text-banner-foreground">
        <div className="page-shell flex min-h-8 items-center justify-center gap-4 px-4 py-1 text-center text-[10px] font-extrabold uppercase">
          <span>Promoção especial Serena • Compre 10 e ganhe 10</span><Countdown compact />
        </div>
      </div>
      <header className="border-b border-border bg-nav">
        <div className="page-shell flex h-[62px] items-center justify-center px-5">
          <a href="#top" className="font-serif text-xl tracking-[0.35em] text-primary">SERENA</a>
        </div>
      </header>

      <div id="top" className="page-shell grid gap-10 px-5 py-10 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:py-12">
        <Gallery palette={palette} /><ProductDetails palette={palette} setPalette={setPalette} />
      </div>

      <section className="border-y border-border bg-soft py-2">
        <div className="page-shell grid grid-cols-3 gap-1 px-3">
          {assuranceItems.map(([Icon, title, text]) => (
            <div key={title} className="flex min-w-0 items-center justify-center gap-1.5 py-1"><Icon className="size-4 shrink-0 text-primary" /><p className="text-[9px] leading-tight sm:text-[11px]"><strong className="block">{title}</strong><span className="text-muted-foreground">{text}</span></p></div>
          ))}
        </div>
      </section>

      <section className="page-shell px-5 py-16 text-center">
        <p className="section-kicker">Direto do Instagram</p>
        <h2 className="section-title">Toalhas Serena na vida real</h2>
        <div className="mx-auto mt-8 max-w-[420px] overflow-hidden rounded-lg border border-border bg-card shadow-product">
          <iframe title="Instagram Serena Home Shop" src="https://www.instagram.com/reel/Dd68mCpOuUg/embed" className="h-[660px] w-full border-0" loading="lazy" />
        </div>
      </section>

      <section id="kit" className="bg-soft py-16">
        <div className="page-shell px-5">
          <p className="section-kicker text-center">Qualidade em cada detalhe</p>
          <h2 className="section-title text-center">Feitas para transformar seu banho</h2>
           <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
             <img src="/images/toalha-copy-1.webp" alt="Destaque das toalhas Serena 1" className="aspect-[2/3] w-full rounded-lg object-cover shadow-product" />
             <video src={gifCopy.url} className="aspect-[16/9] w-full rounded-lg object-cover shadow-product sm:col-span-2 lg:col-span-4" autoPlay muted loop playsInline aria-label="Demonstração das toalhas Serena" />
             {[2, 3, 4].map((number) => <img key={number} src={`/images/toalha-copy-${number}.webp`} alt={`Destaque das toalhas Serena ${number}`} className="aspect-[2/3] w-full rounded-lg object-cover shadow-product" />)}
          </div>
        </div>
      </section>

      <section className="page-shell px-5 py-16">
        <div className="mx-auto aspect-[9/16] w-full max-w-[607px] overflow-hidden rounded-xl bg-foreground shadow-product">
          <iframe className="h-full w-full border-0" src="https://www.youtube.com/embed/b7q9S2iTV-I?rel=0" title="Sinta o toque de um hotel 5 estrelas em casa" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
      </section>

      <section className="bg-soft py-16">
        <div className="page-shell px-5 text-center">
          <p className="section-kicker">Quem compra, recomenda</p><h2 className="section-title">O conforto que conquista</h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-3">
            {[5, 6, 7].map((number) => <img key={number} src={`/images/toalha-copy-${number}.webp`} alt={`Avaliação de cliente Serena ${number - 4}`} className="mx-auto aspect-[9/16] max-h-[600px] w-full rounded-lg object-cover shadow-product" />)}
          </div>
        </div>
      </section>

      <section id="beneficios" className="page-shell px-5 py-16 text-center">
        <p className="section-kicker">Padrão hotelaria cinco estrelas</p><h2 className="section-title">Maciez premium que você sente no primeiro toque</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => <article key={title}><div className="mx-auto grid size-12 place-items-center rounded-full bg-selected text-primary"><Icon className="size-6" /></div><h3 className="mt-4 text-base font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}
        </div>
      </section>

      <section id="duvidas" className="bg-soft py-16">
        <div className="mx-auto max-w-2xl px-5"><p className="section-kicker text-center">Tire suas dúvidas</p><h2 className="section-title text-center">Perguntas frequentes</h2>
          <Accordion type="single" collapsible className="mt-8 rounded-lg border border-border bg-card px-5">
            {faqs.map(([question, answer], index) => <AccordionItem value={`faq-${index}`} key={question}><AccordionTrigger className="py-5 text-left text-sm font-bold hover:no-underline">{question}</AccordionTrigger><AccordionContent className="text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}
          </Accordion>
        </div>
      </section>

      <section className="bg-final py-16 text-final-foreground">
        <div className="mx-auto max-w-2xl px-5 text-center"><p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-final-muted">Oferta especial</p><h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Renove seus banhos com conforto cinco estrelas</h2><p className="mt-4 text-sm text-final-muted">Aproveite a condição Compre 10, Ganhe 10 por apenas R$ 59,97.</p><div className="mx-auto mt-7 max-w-md"><BuyButton checkout={checkout} /></div></div>
      </section>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-3 backdrop-blur sm:hidden">
        <BuyButton checkout={checkout} />
      </div>
    </main>
  );
}