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
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "verify" | "greet" | "tickets" | "wiki" | "points">("overview");
  const [user, setUser] = useState<any>(null);
  const [guilds, setGuilds] = useState<any[]>([]);
  const [selectedGuildId, setSelectedGuildId] = useState<string>("");
  const [guildConfig, setGuildConfig] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Wiki new doc form state
  const [newWikiSlug, setNewWikiSlug] = useState("");
  const [newWikiTitle, setNewWikiTitle] = useState("");
  const [newWikiContent, setNewWikiContent] = useState("");

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
        setSaveStatus("성공적으로 저장되었습니다!");
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus("저장 실패");
      }
    } catch {
      setSaveStatus("저장 오류");
    }
  }

  const selectedGuild = guilds.find((g) => g.id === selectedGuildId);
  const filteredGuilds = guilds.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#111218] text-[#dbdee1] selection:bg-indigo-600 selection:text-white overflow-hidden font-sans">
      {/* 1. Left Sidebar (Yeonhong Studio Exact Style: Search, Recents, Sections, User Profile at Bottom) */}
      <aside className="w-64 bg-[#0d0e14] border-r border-white/[0.06] flex flex-col flex-shrink-0 z-20">
        {/* Brand Header */}
        <div className="h-14 border-b border-white/[0.06] px-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-[#161824] border border-white/[0.08] p-1 flex items-center justify-center">
              <img src="/assets/logo-sora.png" alt="Sora" className="h-full w-full object-contain" />
            </div>
            <span className="font-bold text-sm text-white tracking-tight">Sora 대시보드</span>
          </Link>
          <Link href="/" className="text-neutral-500 hover:text-white text-xs">
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

        {/* Active Selected Server Widget (Yeonhong Style) */}
        {selectedGuild && (
          <div className="p-3 border-b border-white/[0.04]">
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5 px-1">
              최근 선택된 서버
            </div>
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
                  <div className="text-[10px] text-neutral-400">관리자 권한 보유</div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-neutral-500" />
            </div>
          </div>
        )}

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Section 1: 일반 */}
          <div>
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1 px-2">
              일반
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl font-medium transition ${
                  activeTab === "overview"
                    ? "bg-[#181a26] text-white font-semibold"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
                <span>개요</span>
              </button>
            </div>
          </div>

          {/* Section 2: 운영 */}
          <div>
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1 px-2">
              운영
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab("verify")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl font-medium transition ${
                  activeTab === "verify"
                    ? "bg-[#181a26] text-white font-semibold"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Shield className="h-3.5 w-3.5 text-emerald-400" />
                <span>보안 인증 설정</span>
              </button>

              <button
                onClick={() => setActiveTab("greet")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl font-medium transition ${
                  activeTab === "greet"
                    ? "bg-[#181a26] text-white font-semibold"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Users className="h-3.5 w-3.5 text-sky-400" />
                <span>가입 / 퇴장 안내</span>
              </button>

              <button
                onClick={() => setActiveTab("tickets")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl font-medium transition ${
                  activeTab === "tickets"
                    ? "bg-[#181a26] text-white font-semibold"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5 text-purple-400" />
                <span>고객지원 티켓</span>
              </button>

              <button
                onClick={() => setActiveTab("wiki")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl font-medium transition ${
                  activeTab === "wiki"
                    ? "bg-[#181a26] text-white font-semibold"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5 text-amber-400" />
                <span>서버 위키 지식</span>
              </button>

              <button
                onClick={() => setActiveTab("points")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl font-medium transition ${
                  activeTab === "points"
                    ? "bg-[#181a26] text-white font-semibold"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                <span>포인트 & 경제</span>
              </button>
            </div>
          </div>

          {/* Section 3: 지원 */}
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
                <span>정책 및 이용약관</span>
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

        {/* Bottom User Bar (Yeonhong Exact: Avatar, Name, Role badge, Logout) */}
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

      {/* 2. Main Content Workspace */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#111218]">
        {/* Top Header */}
        <header className="h-14 border-b border-white/[0.06] bg-[#0d0e14] px-8 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-bold text-white">
              {activeTab === "overview" && "개요"}
              {activeTab === "verify" && "보안 인증 시스템"}
              {activeTab === "greet" && "가입 / 퇴장 안내"}
              {activeTab === "tickets" && "고객지원 티켓"}
              {activeTab === "wiki" && "서버 위키 지식"}
              {activeTab === "points" && "포인트 & 경제"}
            </h1>
            <span className="text-xs text-neutral-500">Sora 봇 · 서버 관리자</span>

            {saveStatus && (
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                {saveStatus}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {selectedGuild && (
              <button
                onClick={() => saveConfig(guildConfig)}
                className="flex items-center gap-1.5 rounded-xl bg-[#5865F2] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#4752c4] transition shadow-sm"
              >
                <Save className="h-3.5 w-3.5" />
                설정 저장
              </button>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Banner (Yeonhong Style) */}
            <div className="rounded-2xl border border-white/[0.06] bg-[#141622] p-6">
              <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-1">
                • SORA 대시보드
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                보안 인증과 서버 설정을 여기서 바꿀 수 있어요
              </h2>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                디스코드에서 복잡하게 명령어를 치지 않고, 한 화면에서 바로 제어해요. 바뀐 값은 봇에 즉시 실시간 반영돼요.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => setActiveTab("verify")}
                  className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-neutral-900 hover:bg-neutral-100 transition shadow-sm"
                >
                  보안 인증 설정하기 →
                </button>
                <button
                  onClick={() => setActiveTab("tickets")}
                  className="rounded-xl border border-white/[0.1] bg-[#1a1c2a] px-4 py-2 text-xs font-semibold text-white hover:bg-[#202334] transition"
                >
                  티켓 시스템 둘러보기 →
                </button>
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

            {/* "내 서버" Grid (Yeonhong Style) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white">내 서버 목록</h3>
                <span className="text-xs text-neutral-500">클릭하여 활성 서버를 변경하세요</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredGuilds.map((g) => {
                  const isSelected = g.id === selectedGuildId;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGuildId(g.id)}
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

            {/* Detailed Setting Forms when Tab is selected */}
            {activeTab === "verify" && (
              <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <div>
                    <h4 className="text-sm font-bold text-white">보안 인증 시스템 사용</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Sendwich SMS 휴대폰 점유 확인 및 Resend 이메일 인증을 활성화합니다.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={guildConfig?.verification?.enabled ?? true}
                      onChange={(e) =>
                        setGuildConfig({
                          ...guildConfig,
                          verification: { ...guildConfig?.verification, enabled: e.target.checked },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865F2]"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-neutral-300 block mb-1.5">
                      인증 완료 지급 역할 ID
                    </label>
                    <input
                      type="text"
                      value={guildConfig?.verification?.roleId || ""}
                      placeholder="디스코드 역할 ID"
                      onChange={(e) =>
                        setGuildConfig({
                          ...guildConfig,
                          verification: { ...guildConfig?.verification, roleId: e.target.value },
                        })
                      }
                      className="w-full bg-[#181a26] border border-white/[0.08] rounded-xl px-3.5 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-300 block mb-1.5">
                      인증 패널 출력 채널 ID
                    </label>
                    <input
                      type="text"
                      value={guildConfig?.verification?.channelId || ""}
                      placeholder="디스코드 채널 ID"
                      onChange={(e) =>
                        setGuildConfig({
                          ...guildConfig,
                          verification: { ...guildConfig?.verification, channelId: e.target.value },
                        })
                      }
                      className="w-full bg-[#181a26] border border-white/[0.08] rounded-xl px-3.5 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#181a28] border border-white/[0.06] text-xs space-y-2">
                  <div className="font-bold text-indigo-400">사전 동의 규정 준수</div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    인증 버튼 클릭 시 전화번호나 이메일 입력창이 바로 뜨지 않으며, 수단별 개인정보 처리방침 카드가 먼저 노출됩니다.
                    유저가 "동의하고 계속하기"를 누를 때 개인정보 처리방침 및 이용약관에 동의한 것으로 간주하여 안전하게 검증합니다.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "tickets" && (
              <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-6 space-y-4">
                <h4 className="text-sm font-bold text-white border-b border-white/[0.06] pb-3">고객지원 티켓 카테고리</h4>
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
                    <label className="text-neutral-400 block mb-1">상담 관리자 역할 ID</label>
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

            {activeTab === "points" && (
              <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-6 space-y-4">
                <h4 className="text-sm font-bold text-white border-b border-white/[0.06] pb-3">가상 포인트 및 출석 보상</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-neutral-400 block mb-1">일일 출석 기본 보상 (P)</label>
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
      </main>
    </div>
  );
}
