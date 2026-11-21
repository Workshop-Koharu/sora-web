"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  MessageSquare,
  BookOpen,
  DollarSign,
  ArrowRight,
  LogIn,
  CheckCircle2,
  Lock,
  Smartphone,
  Mail,
  Sliders,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Server,
  Zap,
  HelpCircle,
  Clock,
  Layers,
  ChevronDown,
  Terminal,
  Coins,
  Check,
} from "lucide-react";

export default function Home() {
  // Simulator state (Atlas 04 체험 exact replicate)
  const [activeSimTab, setActiveSimTab] = useState<"phone" | "email" | "attendance" | "protect">("phone");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const inviteUrl =
    "https://discord.com/oauth2/authorize?client_id=1558397761861451806&permissions=8&integration_type=0&scope=bot%20applications.commands";

  return (
    <div className="flex min-h-screen flex-col bg-[#0c0d12] text-[#dbdee1] selection:bg-indigo-600 selection:text-white font-sans relative">
      {/* Background Subtle Grid (Atlas Style - Zero Neon) */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 opacity-30"
        style={{
          backgroundImage: "radial-gradient(#ffffff18 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* 1. Header (Atlas 01~08 Style + Yeonhong clean studio branding) */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0c0d12]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-8 w-8 rounded-xl bg-[#161824] border border-white/[0.08] p-1 flex items-center justify-center overflow-hidden">
              <img src="/assets/logo-sora.png" alt="Sora" className="h-full w-full object-contain" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white tracking-tight">Sora</span>
              <span className="rounded-md bg-[#191b26] border border-white/[0.06] px-1.5 py-0.5 text-[10px] font-semibold text-neutral-400">
                v2.0
              </span>
            </div>
          </Link>

          {/* Center Navigation (Atlas 01~08 style) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-neutral-400">
            <a href="#features" className="hover:text-white transition flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-neutral-500">01</span>
              기능 지도
            </a>
            <a href="#security" className="hover:text-white transition flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-neutral-500">02</span>
              지키기
            </a>
            <a href="#economy" className="hover:text-white transition flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-neutral-500">03</span>
              키우기
            </a>
            <a href="#experience" className="hover:text-white transition flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-neutral-500">04</span>
              체험
            </a>
            <Link href="/dashboard" className="hover:text-white transition flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-neutral-500">06</span>
              대시보드
            </Link>
            <a href="#faq" className="hover:text-white transition flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-neutral-500">08</span>
              질문
            </a>
          </nav>

          {/* Right Action: Language + Login Button (Atlas ->] 로그인 style) */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 hidden sm:inline">文A 한국어</span>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl bg-[#5865F2] px-4 py-2 text-xs font-bold text-white hover:bg-[#4752c4] transition shadow-sm"
            >
              <LogIn className="h-3.5 w-3.5" />
              대시보드 로그인
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (50:50 Atlas Bold Typography + Yeonhong Studio Character Card) */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Atlas Headline & CTA) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
              SORA · DISCORD
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6">
              지키는 든든함에,<br />
              키우는 재미까지.
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-neutral-400 font-medium leading-relaxed mb-8">
              디스코드 서버를 지키고, 키우는 올인원 봇.<br />
              Sendwich SMS 휴대폰 점유 확인, Resend 이메일 인증, 고도화된 위키 지식 엔진과 포인트 경제까지 한 번에.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <a
                href="/api/auth/login"
                className="flex items-center gap-2 rounded-xl bg-[#5865F2] px-6 py-3 text-sm font-bold text-white hover:bg-[#4752c4] transition shadow-sm"
              >
                디스코드로 시작하기
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#experience"
                className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-[#141620] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1c1f2e] transition"
              >
                직접 해 보기
              </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-500 pt-2 border-t border-white/[0.04]">
              <div>
                로그인하면{" "}
                <Link href="/policy" className="text-neutral-300 underline hover:text-white">
                  이용약관
                </Link>
                과{" "}
                <Link href="/policy" className="text-neutral-300 underline hover:text-white">
                  개인정보처리방침
                </Link>
                에 동의한 것으로 봐요.
              </div>
              <div className="text-neutral-400 font-medium">
                설치 없이 · 디스코드 계정 하나로 · 한국 법령 완벽 준수
              </div>
            </div>
          </div>

          {/* Right Column (Yeonhong-style Featured Visual Studio Card) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/[0.08] bg-[#12141e] p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#1c1f2e] border border-white/[0.08] p-1.5 flex items-center justify-center">
                    <img src="/assets/logo-sora.png" alt="Sora" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      Sora (소라)
                      <span className="rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] px-1.5 py-0.2 font-semibold">
                        온라인
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400">Koharu Coding Server 플래그십</div>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-neutral-500">Ping: 14ms</div>
              </div>

              {/* Bot Mascot / Illustration Area (Yeonhong Style) */}
              <div className="rounded-2xl bg-[#171926] border border-white/[0.06] p-6 flex flex-col items-center text-center mb-5">
                <div className="h-28 w-28 rounded-3xl overflow-hidden bg-[#202334] p-2 mb-3 shadow-inner">
                  <img src="/assets/sora-icon.png" alt="Sora Mascot" className="h-full w-full object-contain" />
                </div>
                <div className="font-bold text-white text-base">코드로 편리함을, 소라로 든든함을.</div>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  300만 유저 규모의 안정적인 인프라와 단방향 암호화 인증으로 서버 보안을 지켜요.
                </p>
              </div>

              {/* Quick Stat Chips (Yeonhong Style) */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-[#171926] border border-white/[0.04]">
                  <div className="text-[10px] text-neutral-500">인증 성공률</div>
                  <div className="font-bold text-emerald-400 mt-0.5">99.8%</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#171926] border border-white/[0.04]">
                  <div className="text-[10px] text-neutral-500">슬래시 명령어</div>
                  <div className="font-bold text-white mt-0.5">71개</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#171926] border border-white/[0.04]">
                  <div className="text-[10px] text-neutral-500">UI 규격</div>
                  <div className="font-bold text-indigo-400 mt-0.5">Discord V2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Experience Simulator (Atlas "04 체험 - 디스코드에서는 이렇게 보여요") */}
      <section id="experience" className="py-20 bg-[#0a0b0e] border-b border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-10">
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest">04 체험</span>
            <h2 className="text-3xl font-black text-white tracking-tight mt-1">
              디스코드에서는 이렇게 보여요.
            </h2>
            <p className="text-xs text-neutral-400 mt-2">
              Sora가 직접 명령어를 입력받고 대답하는 Discord Components V2 카드의 모습을 확인해 보세요.
            </p>
          </div>

          {/* Simulator Box */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0f1017] shadow-xl overflow-hidden">
            {/* Simulator Tabs */}
            <div className="flex border-b border-white/[0.06] bg-[#12141c] overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => setActiveSimTab("phone")}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 transition whitespace-nowrap ${
                  activeSimTab === "phone"
                    ? "border-emerald-400 text-white bg-[#171926]"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                <Smartphone className="h-4 w-4 text-emerald-400" />
                휴대폰 점유 확인 (Sendwich)
              </button>
              <button
                onClick={() => setActiveSimTab("email")}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 transition whitespace-nowrap ${
                  activeSimTab === "email"
                    ? "border-sky-400 text-white bg-[#171926]"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                <Mail className="h-4 w-4 text-sky-400" />
                이메일 6자리 코드 (Resend)
              </button>
              <button
                onClick={() => setActiveSimTab("attendance")}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 transition whitespace-nowrap ${
                  activeSimTab === "attendance"
                    ? "border-amber-400 text-white bg-[#171926]"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                <DollarSign className="h-4 w-4 text-amber-400" />
                출석체크 & 포인트 경제
              </button>
              <button
                onClick={() => setActiveSimTab("protect")}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 transition whitespace-nowrap ${
                  activeSimTab === "protect"
                    ? "border-purple-400 text-white bg-[#171926]"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                <Shield className="h-4 w-4 text-purple-400" />
                자동 보호 & 안티레이드
              </button>
            </div>

            {/* Simulated Discord Message Window */}
            <div className="p-8 bg-[#101119]">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-[#1e2030] overflow-hidden flex-shrink-0">
                  <img src="/assets/logo-sora.png" alt="Sora" className="h-full w-full object-contain p-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-sm text-white">Sora</span>
                    <span className="rounded bg-[#5865F2] text-white text-[10px] font-bold px-1.5 py-0.2">
                      BOT
                    </span>
                    <span className="text-[11px] text-neutral-500">오늘 오후 9:28</span>
                  </div>

                  {/* Simulated Component V2 Container Card */}
                  {activeSimTab === "phone" && (
                    <div className="rounded-xl border border-white/[0.08] bg-[#151724] border-l-4 border-l-emerald-500 p-5 space-y-3 max-w-xl">
                      <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <Smartphone className="h-4 w-4 text-emerald-400" />
                        <span>휴대전화번호 수집 및 이용 동의서 (Sendwich SMS)</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        디스코드 서버 내 1인 1계정 본인 확인 및 중복 가입 방지를 위해 전화번호를 수집합니다.
                        <br />
                        <strong>[즉시 파기 원칙]:</strong> 인증 성공 즉시 원본 전화번호는 영구 파기되며 단방향 SHA-256 해시값만 보관됩니다.
                      </p>
                      <div className="p-2.5 rounded-lg bg-[#1b1e2e] text-[11px] text-neutral-400">
                        ※ 아래 버튼을 누르시면 개인정보 처리방침 및 이용약관에 동의하시는 것으로 간주합니다.
                      </div>
                      <div className="pt-1 flex gap-2">
                        <button className="rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 transition shadow-sm">
                          동의하고 휴대폰 인증 진행하기
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSimTab === "email" && (
                    <div className="rounded-xl border border-white/[0.08] bg-[#151724] border-l-4 border-l-sky-500 p-5 space-y-3 max-w-xl">
                      <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <Mail className="h-4 w-4 text-sky-400" />
                        <span>이메일 주소 수집 및 이용 동의서 (Resend)</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        KCS 공식 발송처(admin@koharu.live)를 통해 6자리 일회용 인증 코드를 발송합니다.
                        인증 완료 또는 10분 만료 즉시 원본 이메일 주소는 영구 삭제됩니다.
                      </p>
                      <div className="p-2.5 rounded-lg bg-[#1b1e2e] text-[11px] text-neutral-400">
                        ※ 아래 버튼을 누르시면 개인정보 처리방침 및 이용약관에 동의하시는 것으로 간주합니다.
                      </div>
                      <div className="pt-1 flex gap-2">
                        <button className="rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-4 py-2 transition shadow-sm">
                          동의하고 이메일 인증 진행하기
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSimTab === "attendance" && (
                    <div className="rounded-xl border border-white/[0.08] bg-[#151724] border-l-4 border-l-amber-500 p-5 space-y-3 max-w-xl">
                      <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <DollarSign className="h-4 w-4 text-amber-400" />
                        <span>출석체크가 완료되었습니다! (+100 P)</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        연속 출석 7일차 스트릭 보너스: <strong>+50 P 추가 지급</strong>
                        <br />
                        현재 보유 잔액: <strong>1,850 P</strong> (서버 랭킹 14위)
                      </p>
                      <div className="pt-1 flex gap-2">
                        <button className="rounded-lg bg-[#272a3d] border border-white/[0.08] text-neutral-200 text-xs px-3.5 py-1.5 font-semibold flex items-center gap-1.5">
                          <Coins className="h-3.5 w-3.5 text-amber-400" />
                          <span>잔액 확인</span>
                        </button>
                        <button className="rounded-lg bg-[#272a3d] border border-white/[0.08] text-neutral-200 text-xs px-3.5 py-1.5 font-semibold flex items-center gap-1.5">
                          <Coins className="h-3.5 w-3.5 text-indigo-400" />
                          <span>포인트 상점</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSimTab === "protect" && (
                    <div className="rounded-xl border border-white/[0.08] bg-[#151724] border-l-4 border-l-purple-500 p-5 space-y-3 max-w-xl">
                      <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <Shield className="h-4 w-4 text-purple-400" />
                        <span>비상 안티레이드 락다운(Lockdown) 발동됨</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        10초 내 5명 이상의 대량 유입이 감지되어 모든 초대 링크를 임시 비활성화하고 신규 계정을 격리 조치했습니다.
                      </p>
                      <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5" />
                        <span>서버 보안 등급: 안전 (정상 복구 대기 중)</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 3 Pillars Section (Atlas 3 Cards: 웹 대시보드 / 실시간 보안 / 슬래시 명령어) */}
      <section id="features" className="py-20 bg-[#0c0d12] border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#12141c] p-6 flex flex-col justify-between">
              <div>
                <div className="rounded-xl border border-white/[0.06] bg-[#161824] p-4 mb-6 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300">자동 보호 (안티레이드)</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300">휴대폰 / 이메일 사전 동의</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300">출석체크 포인트 보상</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  </div>
                </div>
                <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1">
                  웹 대시보드
                </div>
                <h3 className="text-xl font-bold text-white mb-2">모든 설정을 한곳에서.</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  디스코드 명령어 입력 없이, 웹 대시보드에서 마우스 클릭 몇 번으로 인증 역할, 티켓 카테고리, 위키 지식 베이스를 즉시 튜닝합니다.
                </p>
              </div>
              <div className="pt-6">
                <Link href="/dashboard" className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-indigo-400 transition">
                  자세히 보기 <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#12141c] p-6 flex flex-col justify-between">
              <div>
                <div className="rounded-xl border border-white/[0.06] bg-[#161824] p-4 mb-6 space-y-2">
                  <div className="p-2 rounded-lg bg-[#1d1f30] text-[11px] text-neutral-300 flex items-center gap-2">
                    <Shield className="h-3.5 w-3.5 text-emerald-400" />
                    <span>레이드를 막았어요 (초대장 무효화)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#1d1f30] text-[11px] text-neutral-300 flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-sky-400" />
                    <span>새 티켓이 열렸어요 (#ticket-014)</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1">
                  보안 및 법률 준수
                </div>
                <h3 className="text-xl font-bold text-white mb-2">사전 동의와 철저한 파기.</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  한국 개인정보보호법에 의거하여 번호와 이메일은 인증 완료 즉시 원본을 영구 파기하며, 사전 동의를 거친 유저만 통과시킵니다.
                </p>
              </div>
              <div className="pt-6">
                <Link href="/policy" className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-indigo-400 transition">
                  정책 전문 확인 <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#12141c] p-6 flex flex-col justify-between">
              <div>
                <div className="rounded-xl border border-white/[0.06] bg-[#161824] p-4 mb-6 space-y-2 text-xs font-mono">
                  <div className="text-indigo-300">/출석</div>
                  <div className="text-neutral-400">/위키 검색 keyword:규칙</div>
                  <div className="text-neutral-400">/티켓생성 카테고리:일반문의</div>
                  <div className="text-neutral-400">/인증구성</div>
                </div>
                <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1">
                  슬래시 명령어
                </div>
                <h3 className="text-xl font-bold text-white mb-2">디스코드 안에서 바로.</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Discord Components V2 규격이 전면 적용된 71개 슬래시 커맨드로 편리하고 미려한 반응형 인터랙션을 누릴 수 있습니다.
                </p>
              </div>
              <div className="pt-6">
                <a href={inviteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-indigo-400 transition">
                  서버에 봇 초대하기 <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Accordion (Atlas "08 질문" Style) */}
      <section id="faq" className="py-20 bg-[#0a0b0e]">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest">08 질문</span>
            <h2 className="text-3xl font-black text-white tracking-tight mt-1">자주 묻는 질문</h2>
            <p className="text-xs text-neutral-400 mt-2">Sora 봇의 보안, 인증 및 대시보드 이용에 대해 안내해 드립니다.</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "휴대폰 번호나 이메일은 어떻게 보관되고 파기되나요?",
                a: "Sendwich SMS 점유 확인과 Resend 이메일 인증 코드는 검증 완료 즉시 원본 평문이 메모리 및 디스크에서 영구 삭제됩니다. 중복 가입 방지용 단방향 SHA-256 해시값만 저장되므로 원본 복원이 절대 불가능합니다.",
              },
              {
                q: "웹 대시보드에서 로그인하면 어떤 권한이 필요한가요?",
                a: "관리자(Administrator) 또는 서버 관리(Manage Guild) 권한을 보유한 디스코드 서버만 관리 대시보드에 나타납니다. 일반 멤버는 접근할 수 없습니다.",
              },
              {
                q: "대시보드에서 설정을 변경하면 봇에 언제 반영되나요?",
                a: "상단 '적용하기' 버튼을 누르는 즉시 길드별 JSON 저장소에 동기화되며, 봇 프로세스 재부팅 없이 실시간으로 즉시 적용됩니다.",
              },
              {
                q: "Discord Components V2는 일반 임베드와 무엇이 다른가요?",
                a: "구형 Embed 레이아웃의 단조로움을 넘어 Discord 공식 최신 규격인 Container(17), Separator(14), Section(9), TextDisplay(10)를 복합 구성하여 디스코드 앱 내에서 모바일/PC 모두 완벽한 정렬을 제공합니다.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.06] bg-[#111218] overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 text-left text-xs font-bold text-white flex items-center justify-between"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-neutral-400 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-xs text-neutral-400 leading-relaxed border-t border-white/[0.04] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="border-t border-white/[0.06] bg-[#07080b] py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/assets/logo-sora.png" alt="Sora" className="h-5 w-5 object-contain" />
            <span className="text-xs text-neutral-500">
              © 2026 Sora Bot & Koharu Coding Server (KCS). All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-neutral-400">
            <Link href="/policy" className="hover:text-white transition">
              개인정보처리방침 & 이용약관
            </Link>
            <a
              href="https://kcs.koharu.live/support-server/kcs"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              공식 디스코드 지원 서버
            </a>
            <a
              href="https://kcs.koharu.live"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              KCS 공식 포털
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
