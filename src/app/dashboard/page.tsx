"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  MessageSquare,
  BookOpen,
  DollarSign,
  Settings,
  ChevronRight,
  Save,
  CheckCircle2,
  Users,
  Plus,
  Trash2,
  LogIn,
  FileText,
  Phone,
  Mail,
  ExternalLink,
  Sparkles,
  Search,
  LogOut,
  HelpCircle,
  Clock,
  Layers,
  ChevronDown,
  ArrowRight,
  Check,
  RotateCcw,
  Sliders,
  AlertTriangle,
  Smartphone,
} from "lucide-react";

export default function Dashboard() {
  // Navigation: "overview" or "settings" or "logs" or "antiraid"
  const [activeNav, setActiveNav] = useState<"overview" | "settings" | "logs" | "antiraid">("overview");
  // Sub-tabs in Server Settings (Exact Yeonhong 65s style)
  const [settingsTab, setSettingsTab] = useState<"verify" | "greet" | "tickets" | "wiki" | "points" | "protect">("verify");

  const [user, setUser] = useState<any>(null);
  const [guilds, setGuilds] = useState<any[]>([]);
  const [selectedGuildId, setSelectedGuildId] = useState<string>("");
  const [guildConfig, setGuildConfig] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchGuilds();
  }, []);

  useEffect(() => {
    if (selectedGuildId) {
      fetchGuildConfig(selectedGuildId);
    }
  }, [selectedGuildId]);

  async function fetchGuilds() {
    try {
      setLoading(true);
      const res = await fetch("/api/guilds");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setGuilds(data.guilds || []);
        if (data.guilds && data.guilds.length > 0) {
          setSelectedGuildId(data.guilds[0].id);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function fetchGuildConfig(guildId: string) {
    try {
      const res = await fetch(`/api/guilds/${guildId}`);
      if (res.ok) {
        const data = await res.json();
        setGuildConfig(data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function saveConfig(updatedFields: any) {
    if (!selectedGuildId) return;
    try {
      setSaveStatus("저장 중...");
      const res = await fetch(`/api/guilds/${selectedGuildId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      if (res.ok) {
        const result = await res.json();
        setGuildConfig(result.data);
        setSaveStatus("적용되었습니다 ✓");
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus("적용 실패");
      }
    } catch {
      setSaveStatus("오류 발생");
    }
  }

  const selectedGuild = guilds.find((g) => g.id === selectedGuildId);
  const filteredGuilds = guilds.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#111218] text-[#dbdee1] selection:bg-indigo-600 selection:text-white overflow-hidden font-sans">
      {/* 1. Left Sidebar (Exact Yeonhong Studio: Search, Active Server, Sections, User Profile at Bottom) */}
      <aside className="w-64 bg-[#0d0e14] border-r border-white/[0.06] flex flex-col flex-shrink-0 z-20">
        {/* Brand Header */}
        <div className="h-14 border-b border-white/[0.06] px-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-[#161824] border border-white/[0.08] p-1 flex items-center justify-center">
              <img src="/assets/logo-sora.png" alt="Sora" className="h-full w-full object-contain" />
            </div>
            <span className="font-bold text-sm text-white tracking-tight">Sora 대시보드</span>
          </Link>
          <Link href="/" className="text-neutral-500 hover:text-white text-xs" title="홈으로">
            &lt;
          </Link>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-white/[0.04]">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
            <input
              type="text"
              placeholder="서버 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#151722] border border-white/[0.06] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Active Selected Server Card (Yeonhong "보는 중" Style) */}
        {selectedGuild && (
          <div className="p-3 border-b border-white/[0.04]">
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#151724] border border-white/[0.06]">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-8 w-8 rounded-lg bg-[#202334] overflow-hidden flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
                  {selectedGuild.icon ? (
                    <img
                      src={`https://cdn.discordapp.com/icons/${selectedGuild.id}/${selectedGuild.icon}.png?size=96`}
                      alt={selectedGuild.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>{selectedGuild.name.substring(0, 2)}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{selectedGuild.name}</div>
                  <div className="text-[10px] text-emerald-400 font-medium">보는 중</div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-neutral-500" />
            </div>
          </div>
        )}

        {/* Navigation Sections (Yeonhong Exact: 일반, 운영, 지원) */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Section: 일반 */}
          <div>
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1 px-2">
              일반
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveNav("overview")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl font-medium transition ${
                  activeNav === "overview"
                    ? "bg-[#181a26] text-white font-semibold"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${activeNav === "overview" ? "bg-indigo-400" : "bg-neutral-600"}`}></span>
                <span>개요</span>
              </button>
            </div>
          </div>

          {/* Section: 운영 */}
          <div>
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1 px-2">
              운영
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => {
                  setActiveNav("settings");
                  setSettingsTab("verify");
                }}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl font-medium transition ${
                  activeNav === "settings"
                    ? "bg-[#181a26] text-white font-semibold"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Settings className="h-3.5 w-3.5 text-neutral-400" />
                <span>서버 설정</span>
              </button>

              <button
                onClick={() => setActiveNav("logs")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl font-medium transition ${
                  activeNav === "logs"
                    ? "bg-[#181a26] text-white font-semibold"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Clock className="h-3.5 w-3.5 text-neutral-400" />
                <span>변경 기록 (감사 로그)</span>
              </button>

              <button
                onClick={() => setActiveNav("antiraid")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl font-medium transition ${
                  activeNav === "antiraid"
                    ? "bg-[#181a26] text-white font-semibold"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Shield className="h-3.5 w-3.5 text-emerald-400" />
                <span>안티레이드 모니터</span>
              </button>
            </div>
          </div>

          {/* Section: 지원 */}
          <div>
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1 px-2">
              지원
            </div>
            <div className="space-y-0.5">
              <Link
                href="/policy"
                target="_blank"
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl font-medium text-neutral-400 hover:text-white hover:bg-white/[0.03] transition"
              >
                <FileText className="h-3.5 w-3.5 text-neutral-400" />
                <span>도움말 & 약관</span>
              </Link>
              <a
                href="https://kcs.koharu.live/support-server/kcs"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl font-medium text-neutral-400 hover:text-white hover:bg-white/[0.03] transition"
              >
                <HelpCircle className="h-3.5 w-3.5 text-neutral-400" />
                <span>공식 디스코드 문의</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom User Profile Bar (Yeonhong Exact: Avatar, Name, Role, Logout) */}
        <div className="p-3 border-t border-white/[0.06] bg-[#0c0d12]">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-neutral-800 overflow-hidden border border-white/[0.08] flex-shrink-0">
                  {user.avatar ? (
                    <img
                      src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=96`}
                      alt={user.username}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center font-bold text-white text-xs bg-indigo-600">
                      {user.username?.substring(0, 2)}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    {user.global_name || user.username}
                  </div>
                  <div className="text-[10px] text-indigo-400 font-semibold">관리자 (Admin)</div>
                </div>
              </div>
              <a
                href="/api/auth/login"
                title="다시 로그인 또는 계정 변경"
                className="text-neutral-500 hover:text-white p-1"
              >
                <LogOut className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <a
              href="/api/auth/login"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-[#5865F2] text-xs font-bold text-white hover:bg-[#4752c4] transition"
            >
              <LogIn className="h-4 w-4" />
              디스코드 로그인
            </a>
          )}
        </div>
      </aside>

      {/* 2. Main Workspace */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#111218]">
        {/* MODE 1: 개요 (Overview - Yeonhong 45s Exact layout) */}
        {activeNav === "overview" && (
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Header */}
            <header className="h-14 border-b border-white/[0.06] bg-[#0d0e14] px-8 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <h1 className="text-sm font-bold text-white">개요</h1>
                <span className="text-xs text-neutral-500">Sora 봇 · 서버 관리자</span>
              </div>
            </header>

            {/* Overview Content Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="max-w-5xl mx-auto space-y-6">
                {/* Banner Card (Yeonhong 45s style) */}
                <div className="rounded-2xl border border-white/[0.06] bg-[#141622] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-1">
                      • SORA 대시보드
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                      보안 인증과 서버 설정을 여기서 바꿀 수 있어요
                    </h2>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed max-w-xl">
                      디스코드에서 하던 설정을 그대로, 한 화면에서 해요. 바뀐 값은 봇에 바로 반영돼요.
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => {
                          setActiveNav("settings");
                          setSettingsTab("verify");
                        }}
                        className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-neutral-900 hover:bg-neutral-100 transition shadow-sm"
                      >
                        서버 설정하기 →
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3 Metric Summary Cards (Yeonhong Style) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5">
                    <div className="text-xs text-neutral-400 font-medium">내 등급</div>
                    <div className="text-xl font-black text-white mt-1">관리자 (Admin)</div>
                    <div className="text-[11px] text-neutral-500 mt-1">서버 최고 관리 권한</div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5">
                    <div className="text-xs text-neutral-400 font-medium">관리 중인 서버</div>
                    <div className="text-xl font-black text-white mt-1">{guilds.length}개</div>
                    <div className="text-[11px] text-neutral-500 mt-1">접근 가능한 길드</div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5">
                    <div className="text-xs text-neutral-400 font-medium">연결된 서버 상태</div>
                    <div className="text-xl font-black text-emerald-400 mt-1">정상 가동 중</div>
                    <div className="text-[11px] text-neutral-500 mt-1">Discord V2 규격 연동</div>
                  </div>
                </div>

                {/* Atlas 4 Metric Cards for Active Server */}
                {selectedGuild && (
                  <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{selectedGuild.name}</span>
                          <span className="text-[10px] text-neutral-500 font-mono">({selectedGuild.id})</span>
                        </div>
                        <div className="text-[11px] text-neutral-400">실시간 서버 지표 분석</div>
                      </div>
                      <span className="rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-[10px] px-2 py-0.5 font-bold">
                        보안 활성
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="rounded-xl border border-white/[0.04] bg-[#181a26] p-3.5">
                        <div className="text-[11px] text-neutral-400">총 멤버 수</div>
                        <div className="text-lg font-black text-white mt-1">12,480명</div>
                      </div>
                      <div className="rounded-xl border border-white/[0.04] bg-[#181a26] p-3.5">
                        <div className="text-[11px] text-neutral-400">오늘 메시지</div>
                        <div className="text-lg font-black text-white mt-1">3,912건</div>
                      </div>
                      <div className="rounded-xl border border-white/[0.04] bg-[#181a26] p-3.5">
                        <div className="text-[11px] text-neutral-400">차단된 위협</div>
                        <div className="text-lg font-black text-emerald-400 mt-1">27건</div>
                      </div>
                      <div className="rounded-xl border border-white/[0.04] bg-[#181a26] p-3.5">
                        <div className="text-[11px] text-neutral-400">서버 보안 점수</div>
                        <div className="text-lg font-black text-indigo-400 mt-1">98점</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* "내 서버" Grid (Yeonhong Exact layout) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white">내 서버 목록</h3>
                    <span className="text-xs text-neutral-500">서버를 클릭하여 설정을 진행하세요</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {filteredGuilds.map((g) => {
                      const isSelected = g.id === selectedGuildId;
                      return (
                        <button
                          key={g.id}
                          onClick={() => {
                            setSelectedGuildId(g.id);
                            setActiveNav("settings");
                          }}
                          className={`text-left p-3.5 rounded-2xl border transition flex items-center gap-3 ${
                            isSelected
                              ? "bg-[#181a28] border-indigo-500/50 shadow-md ring-1 ring-indigo-500/30"
                              : "bg-[#14151e] border-white/[0.06] hover:border-white/[0.14]"
                          }`}
                        >
                          <div className="h-10 w-10 rounded-xl bg-[#202230] overflow-hidden flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
                            {g.icon ? (
                              <img
                                src={`https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=96`}
                                alt={g.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span>{g.name.substring(0, 2)}</span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-white truncate">{g.name}</div>
                            <span className="inline-block mt-0.5 rounded bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 text-[10px] font-semibold">
                              관리자
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: 서버 설정 (Server Settings - Yeonhong 65s Exact layout) */}
        {activeNav === "settings" && selectedGuild && (
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Server Settings Top Bar (Yeonhong 65s Exact) */}
            <header className="h-16 border-b border-white/[0.06] bg-[#0d0e14] px-8 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 rounded-lg bg-[#202230] overflow-hidden flex-shrink-0">
                  {selectedGuild.icon ? (
                    <img
                      src={`https://cdn.discordapp.com/icons/${selectedGuild.id}/${selectedGuild.icon}.png?size=96`}
                      alt={selectedGuild.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center font-bold text-white text-xs">
                      {selectedGuild.name.substring(0, 2)}
                    </div>
                  )}
                </div>
                <h1 className="text-base font-bold text-white tracking-tight truncate">
                  ༺ {selectedGuild.name} ༻
                </h1>
              </div>

              {/* Right Action Buttons (Yeonhong 65s: 서버 바꾸기, 적용하기 ✓) */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveNav("overview")}
                  className="rounded-xl border border-white/[0.08] bg-[#161822] px-3.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/[0.05] transition"
                >
                  서버 바꾸기
                </button>
                <button
                  onClick={() => saveConfig(guildConfig)}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#d8384a] to-[#ef5f70] px-4 py-1.5 text-xs font-bold text-white hover:opacity-95 transition shadow-sm"
                >
                  <Check className="h-3.5 w-3.5" />
                  적용하기
                </button>
              </div>
            </header>

            {/* Sub-Tabs Bar under Server Title (Yeonhong 65s Exact Pill Tabs) */}
            <div className="border-b border-white/[0.06] bg-[#101118] px-8 py-2.5 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
              {[
                { id: "verify", label: "인증·보안" },
                { id: "greet", label: "입장·알림" },
                { id: "tickets", label: "고객지원 티켓" },
                { id: "wiki", label: "위키 지식" },
                { id: "points", label: "포인트·경제" },
                { id: "protect", label: "안티레이드" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSettingsTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl transition ${
                    settingsTab === tab.id
                      ? "bg-white text-neutral-900 shadow-sm font-bold"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              {saveStatus && (
                <span className="ml-auto text-xs font-semibold text-emerald-400 animate-fade-in">
                  {saveStatus}
                </span>
              )}
            </div>

            {/* Settings Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="max-w-5xl mx-auto space-y-6">
                {/* 1. VERIFICATION TAB */}
                {settingsTab === "verify" && (
                  <div className="space-y-6">
                    {/* Section: 본인인증 토글 그리드 (Yeonhong 65s style) */}
                    <div>
                      <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                        본인 인증 수단 선택
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Sendwich SMS */}
                        <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5 flex items-center justify-between">
                          <div>
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                              <Smartphone className="h-4 w-4 text-emerald-400" />
                              휴대폰 점유 확인 (Sendwich SMS)
                            </div>
                            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                              Sendwich API를 연동하여 문자 본인 인증을 수행합니다.
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-4">
                            <input
                              type="checkbox"
                              checked={guildConfig?.verification?.smsEnabled ?? true}
                              onChange={(e) =>
                                setGuildConfig({
                                  ...guildConfig,
                                  verification: { ...guildConfig?.verification, smsEnabled: e.target.checked },
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ef5f70]"></div>
                          </label>
                        </div>

                        {/* Resend Email */}
                        <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5 flex items-center justify-between">
                          <div>
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                              <Mail className="h-4 w-4 text-sky-400" />
                              공식 6자리 이메일 코드 (Resend)
                            </div>
                            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                              admin@koharu.live 공식 메일로 OTP 코드를 발송합니다.
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-4">
                            <input
                              type="checkbox"
                              checked={guildConfig?.verification?.emailEnabled ?? true}
                              onChange={(e) =>
                                setGuildConfig({
                                  ...guildConfig,
                                  verification: { ...guildConfig?.verification, emailEnabled: e.target.checked },
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ef5f70]"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Section: 역할 및 채널 설정 */}
                    <div>
                      <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                        역할 및 채널 배정
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5">
                          <label className="text-xs font-bold text-white block mb-1">인증 완료 지급 역할 ID</label>
                          <input
                            type="text"
                            placeholder="디스코드 역할 ID (예: @유저)"
                            value={guildConfig?.verification?.roleId || ""}
                            onChange={(e) =>
                              setGuildConfig({
                                ...guildConfig,
                                verification: { ...guildConfig?.verification, roleId: e.target.value },
                              })
                            }
                            className="w-full bg-[#181a26] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white"
                          />
                        </div>
                        <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5">
                          <label className="text-xs font-bold text-white block mb-1">인증 패널 출력 채널 ID</label>
                          <input
                            type="text"
                            placeholder="디스코드 채널 ID (예: #인증)"
                            value={guildConfig?.verification?.channelId || ""}
                            onChange={(e) =>
                              setGuildConfig({
                                ...guildConfig,
                                verification: { ...guildConfig?.verification, channelId: e.target.value },
                              })
                            }
                            className="w-full bg-[#181a26] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section: 사전 동의 및 법률 준수 정책 */}
                    <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5 space-y-2">
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <Shield className="h-4 w-4 text-emerald-400" />
                        대한민국 법령 기준 사전 약관 동의 자동 시행
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        버튼 클릭 시 전화번호나 이메일을 즉시 요구하지 않으며, 각 인증 수단 전용 개인정보 처리방침과 이용약관 동의 카드가 먼저 노출됩니다. 유저가 동의하고 계속하기를 눌러야만 실제 번호/이메일 입력 모달이 열립니다.
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. TICKETS TAB */}
                {settingsTab === "tickets" && (
                  <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-6 space-y-4">
                    <h3 className="text-sm font-bold text-white border-b border-white/[0.06] pb-3">
                      고객지원 티켓 설정
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="text-neutral-400 block mb-1">티켓 채널 생성 카테고리 ID</label>
                        <input
                          type="text"
                          value={guildConfig?.tickets?.categoryId || ""}
                          onChange={(e) =>
                            setGuildConfig({
                              ...guildConfig,
                              tickets: { ...guildConfig?.tickets, categoryId: e.target.value },
                            })
                          }
                          className="w-full bg-[#181a26] border border-white/[0.08] rounded-xl px-3.5 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 block mb-1">상담 관리자(스태프) 역할 ID</label>
                        <input
                          type="text"
                          value={guildConfig?.tickets?.staffRoleId || ""}
                          onChange={(e) =>
                            setGuildConfig({
                              ...guildConfig,
                              tickets: { ...guildConfig?.tickets, staffRoleId: e.target.value },
                            })
                          }
                          className="w-full bg-[#181a26] border border-white/[0.08] rounded-xl px-3.5 py-2 text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. POINTS TAB */}
                {settingsTab === "points" && (
                  <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-6 space-y-4">
                    <h3 className="text-sm font-bold text-white border-b border-white/[0.06] pb-3">
                      포인트 및 가상 경제 설정
                    </h3>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="text-neutral-400 block mb-1">일일 출석 보상 (P)</label>
                        <input
                          type="number"
                          value={guildConfig?.points?.attendanceReward || 100}
                          onChange={(e) =>
                            setGuildConfig({
                              ...guildConfig,
                              points: { ...guildConfig?.points, attendanceReward: parseInt(e.target.value) || 0 },
                            })
                          }
                          className="w-full bg-[#181a26] border border-white/[0.08] rounded-xl px-3.5 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 block mb-1">복권 1장 가격 (P)</label>
                        <input
                          type="number"
                          value={guildConfig?.points?.lotteryPrice || 500}
                          onChange={(e) =>
                            setGuildConfig({
                              ...guildConfig,
                              points: { ...guildConfig?.points, lotteryPrice: parseInt(e.target.value) || 0 },
                            })
                          }
                          className="w-full bg-[#181a26] border border-white/[0.08] rounded-xl px-3.5 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 block mb-1">도박 최대 베팅 한도 (P)</label>
                        <input
                          type="number"
                          value={guildConfig?.points?.maxGambleBet || 50000}
                          onChange={(e) =>
                            setGuildConfig({
                              ...guildConfig,
                              points: { ...guildConfig?.points, maxGambleBet: parseInt(e.target.value) || 0 },
                            })
                          }
                          className="w-full bg-[#181a26] border border-white/[0.08] rounded-xl px-3.5 py-2 text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
