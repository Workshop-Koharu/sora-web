import Link from "next/link";
import { Shield, Sparkles, MessageSquare, Terminal, Award, BookOpen, ExternalLink, ArrowRight, LogIn, CheckCircle2, Lock, Flame } from "lucide-react";

export default function Home() {
  const CLIENT_ID = process.env.DISCORD_CLIENT_ID || "1558397761861451806";
  const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&permissions=8&integration_type=0&scope=bot%20applications.commands`;

  return (
    <div className="flex min-h-screen flex-col bg-[#090a0f] text-[#dbdee1] selection:bg-indigo-600 selection:text-white relative overflow-hidden">
      {/* Ambient background glows (jxayx & yeonhong style) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#5865F2]/20 via-purple-600/10 to-transparent blur-[140px] rounded-full"></div>
        <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-sky-500/10 blur-[150px] rounded-full"></div>
        <div className="absolute top-2/3 -left-40 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0b0d13]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-2xl bg-gradient-to-tr from-[#5865F2] to-[#805ad5] p-[2px] shadow-lg shadow-indigo-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0e1017] font-black text-white text-lg">
                S
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">Sora</span>
                <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400">
                  v2.0 CV2
                </span>
              </div>
              <span className="text-[11px] text-neutral-400">Koharu Coding Server</span>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-neutral-400 hover:text-white transition">
              기능 소개
            </Link>
            <Link href="/policy" className="text-sm font-medium text-neutral-400 hover:text-white transition flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-indigo-400" />
              정책 & 약관
            </Link>
            <a
              href="https://kcs.koharu.live"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-neutral-400 hover:text-white transition flex items-center gap-1"
            >
              KCS 포털
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="/api/auth/login"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5865F2] to-[#4752c4] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#5865F2]/25 hover:opacity-95 transition"
            >
              <LogIn className="h-4 w-4" />
              대시보드 로그인
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-neutral-300 mb-8 backdrop-blur-xl shadow-inner">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Discord Components V2 공식 사양 전면 적용
          </div>
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl leading-tight">
            서버를 완성하는 궁극의 지능,<br />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
              Sora (소라)
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-neutral-400">
            Koharu Coding Server (KCS)를 위해 특화 설계된 차세대 올인원 디스코드 봇입니다.
            <br />
            Sendwich SMS 휴대폰 인증, Resend 이메일 인증, 고도화된 위키 지식 엔진과
            실시간 포인트 경제까지 웹 대시보드에서 원클릭으로 통제하세요.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={inviteUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#5865F2] to-[#6366f1] px-7 py-3.5 text-base font-bold text-white shadow-xl shadow-[#5865F2]/30 hover:scale-[1.02] active:scale-[0.98] transition"
            >
              서버에 봇 초대하기
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#13151f]/80 backdrop-blur-xl px-7 py-3.5 text-base font-bold text-white hover:bg-white/[0.07] transition"
            >
              웹 대시보드 바로가기
            </Link>
          </div>

          <p className="mt-6 text-xs text-neutral-500">
            * 봇의 모든 기능을 이용하시면{" "}
            <Link href="/policy" className="text-indigo-400 underline">개인정보처리방침</Link> 및{" "}
            <Link href="/terms" className="text-indigo-400 underline">서비스 이용약관</Link>에 동의하시는 것으로 간주합니다.
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="border-t border-white/[0.06] bg-[#0b0d13]/60 py-24 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Core Architecture</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              타협 없는 안정성과 최고 수준의 사용자 경험
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 1. Verification */}
            <div className="rounded-3xl border border-white/[0.07] bg-[#13151f]/70 p-8 backdrop-blur-xl hover:border-indigo-500/40 hover:-translate-y-1 transition duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 mb-6">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">4단계 다중 보안 인증</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Sendwich SMS 번호 점유 확인, Resend 공식 6자리 이메일 코드, SVG 왜곡 캡챠, 원클릭 간편 인증을 모두 지원합니다. 개인정보는 인증 완료 즉시 원본 파기됩니다.
              </p>
            </div>

            {/* 2. Components V2 */}
            <div className="rounded-3xl border border-white/[0.07] bg-[#13151f]/70 p-8 backdrop-blur-xl hover:border-sky-500/40 hover:-translate-y-1 transition duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 mb-6">
                <Terminal className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Discord Components V2 UI</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                구형 임베드를 넘어 최신 Container, Separator, Text Display, Media Gallery, Section 구조를 구현하여 압도적인 시각적 완성도를 제공합니다.
              </p>
            </div>

            {/* 3. Tickets */}
            <div className="rounded-3xl border border-white/[0.07] bg-[#13151f]/70 p-8 backdrop-blur-xl hover:border-emerald-500/40 hover:-translate-y-1 transition duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mb-6">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">초고도화 커스텀 문의(티켓)</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                카테고리별 맞춤 담당자 지정, 전용 비공개 채널 자동 잠금, 접수(Claim), 트랜스크립트 백업 및 원클릭 채널 정리 시스템을 지원합니다.
              </p>
            </div>

            {/* 4. Wiki */}
            <div className="rounded-3xl border border-white/[0.07] bg-[#13151f]/70 p-8 backdrop-blur-xl hover:border-purple-500/40 hover:-translate-y-1 transition duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 mb-6">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">서버 지식 위키 엔진</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                문서 버전 관리, 순환 참조 방지 상호 링크, 역참조(Backlinks) 추적, 태그 색인 및 웹 영구 열람 링크를 완벽히 지원합니다.
              </p>
            </div>

            {/* 5. Points */}
            <div className="rounded-3xl border border-white/[0.07] bg-[#13151f]/70 p-8 backdrop-blur-xl hover:border-amber-500/40 hover:-translate-y-1 transition duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 mb-6">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">포인트 경제 & 상점</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                연속 출석 스트릭 보너스, 송금, 동전 뒤집기/주사위 베팅, 즉석 복권, 커스텀 역할/아이템 상점과 인벤토리 선물 시스템을 운영할 수 있습니다.
              </p>
            </div>

            {/* 6. Mini Games & Tools */}
            <div className="rounded-3xl border border-white/[0.07] bg-[#13151f]/70 p-8 backdrop-blur-xl hover:border-rose-500/40 hover:-translate-y-1 transition duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 mb-6">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">실시간 인터랙티브 유틸 & 게임</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                실시간 회전 룰렛 GIF 추첨, 수식 계산기, 단위/시간대/진법 변환, QR 코드 생성/판독, 한글 타자 연습 및 업다운 게임을 탑재했습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/[0.06] bg-[#090a0f] py-12 text-center text-xs text-neutral-500 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-400 font-medium">
          <Link href="/policy" className="hover:text-white transition underline">
            개인정보처리방침 (전화번호/이메일 인증)
          </Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-white transition underline">
            서비스 이용약관
          </Link>
          <span>•</span>
          <a href="https://kcs.koharu.live" target="_blank" rel="noreferrer" className="hover:text-white transition underline">
            KCS 공식 포털 (kcs.koharu.live)
          </a>
        </div>
        <p>© 2026 Koharu Coding Server (KCS). All rights reserved.</p>
        <p className="text-[11px] text-neutral-600">
          Sora의 모든 기능 이용 시 개인정보 처리방침 및 서비스 이용약관에 동의하시는 것으로 간주합니다.
        </p>
      </footer>
    </div>
  );
}
