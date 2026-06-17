import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/bb82c710-a8ca-41ca-92b5-3f47fca5e422/files/dd39f56a-ded8-434d-8829-0082eb57e5b8.jpg';

const services = [
  { icon: 'Heart', title: 'Кардиология', desc: 'ЭКГ, ЭхоКГ, суточный мониторинг сердца' },
  { icon: 'Activity', title: 'Чек-апы организма', desc: 'Комплексные обследования за один визит' },
  { icon: 'Microscope', title: 'Лабораторная диагностика', desc: 'Более 1000 анализов, результат за сутки' },
  { icon: 'Brain', title: 'МРТ и КТ', desc: 'Высокоточная диагностика на новом оборудовании' },
  { icon: 'Stethoscope', title: 'Терапия', desc: 'Приём врача и составление плана лечения' },
  { icon: 'Baby', title: 'Педиатрия', desc: 'Наблюдение и обследование детей' },
];

const doctors = [
  { name: 'Анна Сергеева', spec: 'Кардиолог', exp: '15 лет опыта', initials: 'АС' },
  { name: 'Игорь Петров', spec: 'Терапевт', exp: '12 лет опыта', initials: 'ИП' },
  { name: 'Мария Волкова', spec: 'Невролог', exp: '18 лет опыта', initials: 'МВ' },
];

const slots = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'];

const BOOKING_URL = 'https://functions.poehali.dev/ee1df850-114f-464e-8fbe-9324bfdae561';

const reviews = [
  {
    name: 'Елена К.',
    story: 'Полный чек-ап выявил проблему на ранней стадии',
    text: 'Прошла комплексное обследование. Врачи внимательные, всё объяснили простым языком. Благодаря раннему выявлению удалось избежать серьёзных последствий.',
    rating: 5,
  },
  {
    name: 'Дмитрий М.',
    story: 'Диагностика сердца за один день',
    text: 'Записался онлайн, приняли точно вовремя. Сделали ЭКГ и УЗИ сердца, результаты получил сразу. Очень удобный и человечный сервис.',
    rating: 5,
  },
  {
    name: 'Ольга В.',
    story: 'Наконец нашли причину головных болей',
    text: 'Долго не могла понять, в чём дело. Здесь грамотно подобрали обследования, невролог поставил диагноз. Сейчас чувствую себя отлично.',
    rating: 5,
  },
];

const Index = () => {
  const { toast } = useToast();
  const [doctor, setDoctor] = useState(doctors[0].name);
  const [slot, setSlot] = useState(slots[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(BOOKING_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, doctor, time: slot }),
      });
      if (!res.ok) throw new Error();
      toast({
        title: 'Заявка отправлена!',
        description: `${doctor}, время ${slot}. Мы свяжемся с вами для подтверждения.`,
      });
      setName('');
      setPhone('');
    } catch {
      toast({
        title: 'Не удалось отправить',
        description: 'Попробуйте ещё раз или позвоните нам по телефону.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Icon name="Plus" size={20} />
            </div>
            <span className="font-heading text-xl font-extrabold tracking-tight">МедПрофи</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#services" className="transition-colors hover:text-foreground">Услуги</a>
            <a href="#reviews" className="transition-colors hover:text-foreground">Отзывы</a>
            <a href="#booking" className="transition-colors hover:text-foreground">Запись</a>
          </nav>
          <Button asChild className="rounded-full">
            <a href="#booking">Записаться</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden hero-grid">
        <div className="container grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <div className="animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
              <span className="flex h-2 w-2 rounded-full bg-primary" />
              Приём сегодня · Запись онлайн
            </div>
            <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
              Организация медицинских обследований <span className="text-primary">без очередей</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Выберите врача и удобное время — мы организуем полную диагностику и свяжемся для подтверждения записи.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <a href="#booking">Записаться на приём</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8">
                <a href="#services">Наши услуги</a>
              </Button>
            </div>
            <div className="mt-10 flex gap-8">
              {[
                { v: '50 000+', l: 'пациентов' },
                { v: '24 ч', l: 'результат анализов' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-heading text-2xl font-extrabold text-foreground">{s.v}</div>
                  <div className="text-sm text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
            <img
              src={HERO_IMG}
              alt="Современная медицинская клиника"
              className="relative aspect-square w-full rounded-[2rem] object-cover shadow-2xl"
            />

          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight md:text-4xl">Что мы обследуем</h2>
          <p className="mt-4 text-muted-foreground">
            Полный спектр диагностики на современном оборудовании в одном месте.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon name={s.icon} size={24} />
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-secondary/40 py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
              Истории наших пациентов
            </h2>
            <p className="mt-4 text-muted-foreground">
              Реальные отзывы людей, которым мы помогли позаботиться о здоровье.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.name} className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={18} className="fill-primary" />
                  ))}
                </div>
                <h3 className="mt-4 font-heading text-base font-bold leading-snug">{r.story}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{r.text}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary">
                    {r.name[0]}
                  </div>
                  <span className="text-sm font-medium">{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="container py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-xl md:grid-cols-2">
          <div className="bg-primary p-10 text-primary-foreground md:p-12">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight">Онлайн-запись</h2>
            <p className="mt-3 text-primary-foreground/80">
              Выберите врача и удобное время. Мы перезвоним для подтверждения визита.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Подтверждение в течение 15 минут',
                'Напоминание о визите по SMS',
                'Бесплатная отмена в любой момент',
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <Icon name="Check" size={18} className="shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-10 md:p-12">
            <div className="space-y-2">
              <Label>Выберите врача</Label>
              <div className="grid gap-2">
                {doctors.map((d) => (
                  <button
                    type="button"
                    key={d.name}
                    onClick={() => setDoctor(d.name)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                      doctor === d.name ? 'border-primary bg-accent' : 'border-border hover:border-primary/40'
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary">
                      {d.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{d.name}</div>
                      <div className="text-xs text-muted-foreground">{d.spec} · {d.exp}</div>
                    </div>
                    {doctor === d.name && <Icon name="CheckCircle2" size={20} className="ml-auto text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Удобное время</Label>
              <div className="grid grid-cols-3 gap-2">
                {slots.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSlot(t)}
                    className={`rounded-lg border py-2 text-sm font-medium transition-all ${
                      slot === t ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" placeholder="Ваше имя" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" required value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full rounded-full" disabled={loading}>
              {loading ? 'Отправляем…' : 'Записаться на приём'}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Icon name="Plus" size={16} />
            </div>
            <span className="font-heading font-bold text-foreground">МедПрофи</span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-2"><Icon name="Phone" size={16} /> +7 (800) 555-35-35</span>
            <span className="flex items-center gap-2"><Icon name="MapPin" size={16} /> Москва, ул. Здоровья, 1</span>
          </div>
          <span>© 2026 МедПрофи</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;