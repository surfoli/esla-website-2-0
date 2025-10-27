'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Trophy } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import confetti from 'canvas-confetti';

interface NextMatch {
  date: string;
  time: string;
  opponent: string;
  location: string;
  competition: string;
}

export default function HeroCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Einfache Teilnahme-Zählung (clientseitig, localStorage)
  const [participants, setParticipants] = useState(0);
  const [hasJoined, setHasJoined] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  // Beispiel: Nächstes Spiel (später aus CMS)
  const nextMatch: NextMatch = {
    date: '2025-12-15',
    time: '14:00',
    opponent: 'FC Luzern U15',
    location: 'Sportplatz RUAG, Luzern',
    competition: 'Kantonsmeisterschaft',
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const matchDate = new Date(`${nextMatch.date}T${nextMatch.time}`);
      const now = new Date();
      const difference = matchDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mark as mounted and compute locale date on client to avoid SSR/client mismatch
  useEffect(() => {
    setMounted(true);
    try {
      const d = new Date(nextMatch.date).toLocaleDateString('de-CH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setFormattedDate(d);
    } catch {
      setFormattedDate(nextMatch.date);
    }
  }, []);

  // Init Teilnehmerzahl aus localStorage
  useEffect(() => {
    try {
      const storedCount = localStorage.getItem('esla_participants_count');
      const storedJoined = localStorage.getItem('esla_has_joined');
      if (storedCount) setParticipants(parseInt(storedCount, 10) || 0);
      if (storedJoined === '1') setHasJoined(true);
    } catch {}
  }, []);

  const handleJoin = () => {
    if (hasJoined) {
      // Bereits registriert
      setAlreadyRegistered(true);
      setTimeout(() => setAlreadyRegistered(false), 3000);
      return;
    }
    
    // Konfetti-Effekt
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c52958', '#000000', '#e03766', '#FFD700'],
    });
    
    const newCount = participants + 1;
    setParticipants(newCount);
    setHasJoined(true);
    setShowMessage(true);
    
    // Nachricht nach 4 Sekunden ausblenden
    setTimeout(() => setShowMessage(false), 4000);
    
    try {
      localStorage.setItem('esla_participants_count', String(newCount));
      localStorage.setItem('esla_has_joined', '1');
    } catch {}
  };

  return (
    <Section noContainer className="relative min-h-screen flex items-center justify-center overflow-hidden pb-0 pt-20">
      {/* Background Image mit Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/Fussballfeld_Headerbild.jpg"
            alt="Fussballfeld Hintergrund"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <Container>
        <div className="relative z-10 max-w-6xl mx-auto py-24 text-center">
        {/* Title */}
        <div className="mb-12 md:mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Anstehende Spiele
          </h1>
          <div className="flex items-center justify-center gap-x-2 text-[#e7cb34]">
            <Trophy size={20} />
            <span className="text-lg font-semibold">{nextMatch.competition}</span>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex justify-center gap-4 md:gap-6 mb-12 md:mb-16 animate-scale-in">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="bg-black/70 backdrop-blur-sm rounded-xl p-5 md:p-6 min-w-[70px] md:min-w-[100px] border border-white/10"
            >
              <div className="text-2xl md:text-4xl font-black text-esla-primary mb-2" suppressHydrationWarning>
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-wider text-white/80 font-semibold">
                {unit === 'days' ? 'Tage' : unit === 'hours' ? 'Stunden' : unit === 'minutes' ? 'Min' : 'Sek'}
              </div>
            </div>
          ))}
        </div>
        {/* Match Info */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 max-w-4xl mx-auto mb-12 md:mb-16 border border-white/15 shadow-2xl shadow-black/30 animate-slide-up">
          <div className="text-3xl md:text-4xl font-black text-white mb-10">
            ESLA <span className="text-esla-primary">vs.</span> {nextMatch.opponent}
          </div>
          <div className="grid gap-6 md:grid-cols-3 text-left">
            <div className="bg-white/8 backdrop-blur-lg border border-white/15 rounded-2xl px-6 py-5 shadow-lg shadow-black/20">
              <div className="flex items-center gap-x-3 mb-3">
                <Calendar className="text-esla-primary" size={24} />
                <span className="text-xs uppercase tracking-[0.2em] text-white/70">Datum</span>
              </div>
              <div className="text-lg font-semibold text-white leading-snug" suppressHydrationWarning>
                {mounted ? formattedDate : ''}
              </div>
            </div>
            <div className="bg-white/8 backdrop-blur-lg border border-white/15 rounded-2xl px-6 py-5 shadow-lg shadow-black/20">
              <div className="flex items-center gap-x-3 mb-3">
                <Clock className="text-esla-primary" size={24} />
                <span className="text-xs uppercase tracking-[0.2em] text-white/70">Zeit</span>
              </div>
              <div className="text-lg font-semibold text-white leading-snug">
                {nextMatch.time} Uhr
              </div>
            </div>
            <div className="bg-white/8 backdrop-blur-lg border border-white/15 rounded-2xl px-6 py-5 shadow-lg shadow-black/20">
              <div className="flex items-center gap-x-3 mb-3">
                <MapPin className="text-esla-primary" size={24} />
                <span className="text-xs uppercase tracking-[0.2em] text-white/70">Standort</span>
              </div>
              <div className="text-lg font-semibold text-white leading-snug">
                {nextMatch.location}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 justify-center items-center animate-slide-up">
          {/* Success Message */}
          {showMessage && (
            <div className="bg-green-600 text-white px-8 py-4 rounded-3xl font-semibold text-lg shadow-lg animate-scale-in">
              Wir freuen uns auf dich! 🎉
            </div>
          )}
          
          {/* Already Registered Message */}
          {alreadyRegistered && (
            <div className="bg-green-600 text-white px-8 py-4 rounded-3xl font-semibold text-lg shadow-lg animate-scale-in">
              Danke, wir haben dich bereits registriert! ✓
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Main Button with Badge */}
            <div className="relative">
              <button
                onClick={handleJoin}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-3xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {hasJoined ? 'Danke! Du nimmst teil' : 'Ich nehme teil'}
              </button>
              {participants > 0 && (
                <div className="absolute -top-2 -right-2 bg-esla-primary text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg border-2 border-white">
                  {participants}
                </div>
              )}
            </div>
            
            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=ESLA vs ${nextMatch.opponent}&details=${nextMatch.competition}&location=${nextMatch.location}&dates=${nextMatch.date.replace(/-/g, '')}T${nextMatch.time.replace(':', '')}00/${nextMatch.date.replace(/-/g, '')}T160000`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 backdrop-blur text-white px-8 py-4 rounded-3xl font-semibold text-base transition-all duration-200 border border-white/30"
            >
              <Calendar className="inline mr-2" size={20} />
              Im Google Kalender speichern
            </a>
          </div>
        </div>
        </div>
      </Container>
    </Section>
  );
}

