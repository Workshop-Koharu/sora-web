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
} from "lucide-react";

export default function Home() {
  const [activeMockTab, setActiveMockTab] = useState<"attendance" | "streak" | "quest" | "verify" | "protection">("attendance");
  const inviteUrl =
    "https://discord.com/oauth2/authorize?client_id=1558397761861451806&permissions=8&integration_type=0&scope=bot%20applications.commands";

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0b0e] text-[#dbdee1] selection:bg-indigo-600 selection:text-white font-sans relative">
      {/* Background Subtle Grid (Atlas Style - NO NEON) */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#ffffff18 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top Header (Atlas Exact Layout) */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0b0e]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          {/* Logo & Name */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-[#141622] border border-white/[0.08] p-1 flex items-center justify-center overflow-hidden">
              <img src="/assets/logo-sora.png" alt="Sora" className="h-full w-full object-contain" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white tracking-tight">Sora</span>
              <span className="rounded-md bg-[#191b26] border border-white/[0.06] px-1.5 py-0.5 text-[10px] font-semibold text-neutral-400">
                v2.0
              </span>
            </div>
          </Link>

          {/* Center Nav: 01 기능 지도, 02 서버 보안, 03 위키 지식, 04 체험, 05 포인트, 06 대시보드, 08 정책 */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-neutral-400">
            <a href="#features" className="hover:text-white transition flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-neutral-500">01</span>
              기능 지도
            </a>
            <a href="#security" className="hover:text-white transition flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-neutral-500">02</span>
              서버 보안
            </a>
            <a href="#demo" className="hover:text-white transition flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-neutral-500">04</span>
              체험
            </a>
            <Link href="/dashboard" className="hover:text-white transition flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-neutral-500">06</span>
              대시보드
            </Link>
            <Link href="/policy" className="hover:text-white transition flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-neutral-500">08</span>
              정책 & 약관
            </Link>
          </nav>

          {/* Right Action: Language + Login */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 hidden sm:inline">文A 한국어</span>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl bg-[#5865F2] px-4 py-2 text-xs font-bold text-white hover:bg-[#4752c4] transition shadow-sm"
            >
              <LogIn className="h-3.5 w-3.5" />
              로그인
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section (Atlas Exact Typography & Copy) */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6">
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
            Sendwich SMS 휴대폰 점유 확인, Resend 이메일 인증, 고도화된 위키 지식 엔진과 포인트 경제까지.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <a
              href="/api/auth/login"
              className="flex items-center gap-2 rounded-xl bg-[#5865F2] px-6 py-3 text-sm font-bold text-white hover:bg-[#4752c4] transition shadow-sm"
            >
              디스코드로 시작하기
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#demo"
              className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-[#141620] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1c1f2e] transition"
            >
              직접 해 보기
            </a>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-500 pt-2">
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
      </section>

      {/* Interactive Mockup Dashboard (Atlas Frame Showcase) */}
      <section id="demo" className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0e1017] shadow-2xl overflow-hidden">
            {/* Mockup Browser Top Bar */}
            <div className="h-10 border-b border-white/[0.06] bg-[#12141c] px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-neutral-700"></span>
                <span className="h-3 w-3 rounded-full bg-neutral-700"></span>
                <span className="h-3 w-3 rounded-full bg-neutral-700"></span>
              </div>
              <div className="rounded-md bg-[#0a0b0e] border border-white/[0.06] px-4 py-1 text-[11px] font-mono text-neutral-400">
                sora.koharu.live/dashboard/guilds/...
              </div>
              <div className="w-12"></div>
            </div>

            {/* Mockup Body: Left sub-nav + Right live area */}
            <div className="grid grid-cols-1 md:grid-cols-4 min-h-[460px]">
              {/* Left Sub-Nav */}
              <div className="border-r border-white/[0.06] bg-[#0c0d13] p-4 flex flex-col justify-between">
                <div>
                  {/* Guild Card */}
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-[#141622] border border-white/[0.06] mb-4">
                    <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                      하
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">하늘 라운지</div>
                      <div className="text-[10px] text-neutral-400">멤버 12,480명</div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-1 text-xs">
                    <button
                      onClick={() => setActiveMockTab("attendance")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition ${
                        activeMockTab === "attendance"
                          ? "bg-[#181a28] text-white border border-white/[0.08]"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <span>개요</span>
                      <span className="rounded bg-indigo-500/20 text-indigo-400 px-1 text-[10px]">01</span>
                    </button>
                    <button
                      onClick={() => setActiveMockTab("verify")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition ${
                        activeMockTab === "verify"
                          ? "bg-[#181a28] text-white border border-white/[0.08]"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <span>인증 시스템</span>
                      <span className="rounded bg-emerald-500/20 text-emerald-400 px-1 text-[10px]">보안</span>
                    </button>
                    <button
                      onClick={() => setActiveMockTab("protection")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition ${
                        activeMockTab === "protection"
                          ? "bg-[#181a28] text-white border border-white/[0.08]"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <span>자동 보호 (안티레이드)</span>
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-500 font-mono">
                  Sora Engine v2.0
                </div>
              </div>

              {/* Right Live Area */}
              <div className="md:col-span-3 p-6 bg-[#0e1017] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white">하늘 라운지</h3>
                      <p className="text-xs text-neutral-400">멤버 12,480명 · 오늘 메시지 3,912개</p>
                    </div>
                    <span className="rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs px-2.5 py-0.5 font-bold">
                      02 지키기
                    </span>
                  </div>

                  {/* 4 Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="rounded-xl border border-white/[0.06] bg-[#12141d] p-3.5">
                      <div className="text-[11px] text-neutral-400">멤버</div>
                      <div className="text-lg font-black text-white mt-1">12,480</div>
                    </div>
                    <div className="rounded-xl border border-white/[0.06] bg-[#12141d] p-3.5">
                      <div className="text-[11px] text-neutral-400">오늘 메시지</div>
                      <div className="text-lg font-black text-white mt-1">3,912</div>
                    </div>
                    <div className="rounded-xl border border-white/[0.06] bg-[#12141d] p-3.5">
                      <div className="text-[11px] text-neutral-400">막은 위협</div>
                      <div className="text-lg font-black text-emerald-400 mt-1">27</div>
                    </div>
                    <div className="rounded-xl border border-white/[0.06] bg-[#12141d] p-3.5">
                      <div className="text-[11px] text-neutral-400">서버 점수</div>
                      <div className="text-lg font-black text-indigo-400 mt-1">96</div>
                    </div>
                  </div>

                  {/* Live Simulation of Discord V2 Card */}
                  <div className="rounded-xl border border-white/[0.08] bg-[#141622] p-5">
                    <div className="flex items-center justify-between mb-3 border-b border-white/[0.06] pb-2">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <Shield className="h-4 w-4 text-emerald-400" />
                        Discord Components V2 인증 패널 미리보기
                      </div>
                      <span className="text-[10px] text-neutral-500">실제 채널에 출력되는 형태</span>
                    </div>

                    <div className="rounded-lg bg-[#1e202e] border-l-4 border-indigo-500 p-4 text-xs space-y-3">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>🛡️</span>
                        하늘 라운지 공식 멤버 인증
                      </div>
                      <p className="text-[11px] text-neutral-300 leading-relaxed">
                        원활한 이용과 보안을 위해 인증을 완료해 주세요.
                        버튼 클릭 시 전화번호 또는 이메일 전용 개인정보 처리방침이 먼저 표시됩니다.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <button className="rounded-md bg-[#2b2d3d] border border-white/[0.1] px-3 py-1.5 text-[11px] font-semibold text-neutral-200 flex items-center gap-1.5">
                          📱 휴대폰 인증 (Sendwich)
                        </button>
                        <button className="rounded-md bg-[#2b2d3d] border border-white/[0.1] px-3 py-1.5 text-[11px] font-semibold text-neutral-200 flex items-center gap-1.5">
                          ✉️ 이메일 인증 (Resend)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-neutral-500 pt-4 flex items-center justify-between border-t border-white/[0.04]">
                  <span>* 변경 사항은 저장 즉시 디스코드 봇에 실시간 반영됩니다.</span>
                  <Link href="/dashboard" className="text-indigo-400 hover:underline flex items-center gap-1 font-semibold">
                    대시보드로 관리하기
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars Section (Atlas Exact 3 Cards: 웹 대시보드 / 안드로이드 & 모바일 / 슬래시 명령어) */}
      <section id="features" className="py-20 border-t border-white/[0.06] bg-[#0c0d12]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#12141c] p-6 flex flex-col justify-between">
              <div>
                <div className="rounded-xl border border-white/[0.06] bg-[#161824] p-4 mb-6">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-neutral-300">자동 보호 (안티레이드)</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-neutral-300">휴대폰 / 이메일 사전 동의</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
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
                  <div className="text-neutral-400">/인증설정</div>
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

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#08090c] py-10">
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
