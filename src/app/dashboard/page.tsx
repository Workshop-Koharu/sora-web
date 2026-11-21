"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  MessageSquare,
  BookOpen,
  Award,
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
  Bot,
  LayoutDashboard,
  LogOut,
  HelpCircle,
  AlertTriangle,
  Sliders,
  DollarSign,
  Ticket,
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "verify" | "greet" | "tickets" | "wiki" | "points" | "policy">("overview");
  const [user, setUser] = useState<any>(null);
  const [guilds, setGuilds] = useState<any[]>([]);
  const [selectedGuildId, setSelectedGuildId] = useState<string>("");
  const [guildConfig, setGuildConfig] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<string>("");

  // Wiki new doc form state
  const [newWikiSlug, setNewWikiSlug] = useState("");
  const [newWikiTitle, setNewWikiTitle] = useState("");
  const [newWikiContent, setNewWikiContent] = useState("");
  const [newWikiCategory, setNewWikiCategory] = useState("일반");

  // Shop new item state
  const [newShopName, setNewShopName] = useState("");
  const [newShopPrice, setNewShopPrice] = useState(1000);
  const [newShopDesc, setNewShopDesc] = useState("");

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

  return (
    <div className="flex h-screen bg-[#07080c] text-[#dbdee1] selection:bg-indigo-600 selection:text-white overflow-hidden font-sans">
      {/* 1. Left Icon Rail (72px - Discord & Yeonhong Studio Style) */}
      <aside className="w-[74px] bg-[#0b0c11] border-r border-white/[0.06] flex flex-col items-center py-3.5 gap-2.5 z-20 flex-shrink-0">
        {/* Sora Home Icon */}
        <Link
          href="/"
          className="group relative flex h-12 w-12 items-center justify-center rounded-[24px] hover:rounded-[16px] bg-gradient-to-tr from-[#5865F2] to-[#7950f2] text-white transition-all duration-200 shadow-lg shadow-indigo-500/20"
        >
          <span className="font-black text-lg">S</span>
          <span className="absolute left-[82px] z-50 hidden whitespace-nowrap rounded-lg bg-[#18191f] px-3 py-1.5 text-xs font-semibold text-white shadow-xl group-hover:block border border-white/[0.08]">
            Sora 홈으로 이동
          </span>
        </Link>

        <div className="h-[2px] w-8 rounded-full bg-white/[0.08]" />

        {/* Server List */}
        <div className="flex-1 w-full overflow-y-auto space-y-2.5 flex flex-col items-center px-1.5 scrollbar-none">
          {guilds.map((g) => {
            const isSelected = g.id === selectedGuildId;
            const initials = g.name.substring(0, 2);
            return (
              <div key={g.id} className="relative group flex items-center">
                {/* Active Indicator Pill */}
                <div
                  className={`absolute -left-2 w-1 rounded-r-full bg-white transition-all duration-200 ${
                    isSelected ? "h-10 opacity-100" : "h-2 opacity-0 group-hover:h-5 group-hover:opacity-70"
                  }`}
                />

                <button
                  onClick={() => setSelectedGuildId(g.id)}
                  className={`relative flex h-12 w-12 items-center justify-center overflow-hidden transition-all duration-200 text-sm font-bold shadow-md ${
                    isSelected
                      ? "rounded-[16px] bg-[#5865F2] text-white ring-2 ring-indigo-400/40"
                      : "rounded-[24px] hover:rounded-[16px] bg-[#1a1b24] text-neutral-300 hover:bg-[#5865F2] hover:text-white"
                  }`}
                >
                  {g.icon ? (
                    <img
                      src={`https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=128`}
                      alt={g.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>{initials}</span>
                  )}
                </button>

                {/* Tooltip */}
                <span className="absolute left-[78px] z-50 hidden whitespace-nowrap rounded-lg bg-[#18191f] px-3 py-1.5 text-xs font-semibold text-white shadow-xl group-hover:block border border-white/[0.08]">
                  {g.name}
                </span>
              </div>
            );
          })}

          {/* Add / Invite Button */}
          <a
            href="https://discord.com/oauth2/authorize?client_id=1558397761861451806&permissions=8&integration_type=0&scope=bot%20applications.commands"
            target="_blank"
            rel="noreferrer"
            className="group relative flex h-12 w-12 items-center justify-center rounded-[24px] hover:rounded-[16px] bg-[#161720] text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-200 shadow-md border border-white/[0.04]"
          >
            <Plus className="h-5 w-5" />
            <span className="absolute left-[78px] z-50 hidden whitespace-nowrap rounded-lg bg-[#18191f] px-3 py-1.5 text-xs font-semibold text-white shadow-xl group-hover:block border border-white/[0.08]">
              서버에 Sora 초대하기
            </span>
          </a>
        </div>

        {/* User Avatar & Logout */}
        {user ? (
          <div className="relative group flex items-center">
            <div className="h-11 w-11 rounded-[20px] overflow-hidden bg-neutral-800 border border-white/[0.1] shadow-md">
              {user.avatar ? (
                <img
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=96`}
                  alt={user.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-bold text-white text-xs bg-indigo-600">
                  {user.username?.substring(0, 2)}
                </div>
              )}
            </div>
            <span className="absolute left-[78px] z-50 hidden whitespace-nowrap rounded-lg bg-[#18191f] px-3 py-1.5 text-xs font-semibold text-white shadow-xl group-hover:block border border-white/[0.08]">
              {user.global_name || user.username}
            </span>
          </div>
        ) : (
          <a
            href="/api/auth/login"
            className="flex h-11 w-11 items-center justify-center rounded-[20px] bg-[#5865F2] text-white hover:opacity-90 transition shadow-md"
            title="Discord 로그인"
          >
            <LogIn className="h-5 w-5" />
          </a>
        )}
      </aside>

      {/* 2. Secondary Sidebar / Tab Navigation */}
      <aside className="w-60 bg-[#0e1017] border-r border-white/[0.06] flex flex-col flex-shrink-0">
        {/* Guild Header */}
        <div className="h-16 border-b border-white/[0.06] px-5 flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <div className="font-bold text-sm text-white truncate">
              {selectedGuild ? selectedGuild.name : "서버 선택"}
            </div>
            <div className="text-[11px] text-neutral-400 font-mono truncate">
              ID: {selectedGuildId || "미선택"}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="p-3 space-y-1 overflow-y-auto flex-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === "overview"
                ? "bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/25 font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            서버 개요
          </button>

          <button
            onClick={() => setActiveTab("verify")}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === "verify"
                ? "bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/25 font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Shield className="h-4 w-4" />
            인증 시스템
          </button>

          <button
            onClick={() => setActiveTab("greet")}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === "greet"
                ? "bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/25 font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Users className="h-4 w-4" />
            입장 / 퇴장 안내
          </button>

          <button
            onClick={() => setActiveTab("tickets")}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === "tickets"
                ? "bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/25 font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Ticket className="h-4 w-4" />
            고객지원 & 티켓
          </button>

          <button
            onClick={() => setActiveTab("wiki")}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === "wiki"
                ? "bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/25 font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            서버 위키 문서고
          </button>

          <button
            onClick={() => setActiveTab("points")}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === "points"
                ? "bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/25 font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <DollarSign className="h-4 w-4" />
            포인트 & 경제
          </button>

          <button
            onClick={() => setActiveTab("policy")}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === "policy"
                ? "bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/25 font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <FileText className="h-4 w-4" />
            정책 및 약관 뷰어
          </button>
        </nav>

        {/* Footer info */}
        <div className="p-3 border-t border-white/[0.06] text-[11px] text-neutral-500 flex items-center justify-between">
          <span>Sora v2.0 CV2</span>
          <Link href="/policy" className="hover:text-neutral-300">
            약관 동의 완료
          </Link>
        </div>
      </aside>

      {/* 3. Main Workspace Area */}
      <main className="flex-1 flex flex-col bg-[#07080c] min-w-0 overflow-hidden relative">
        {/* Top Action Bar */}
        <header className="h-16 border-b border-white/[0.06] bg-[#0b0c11]/80 backdrop-blur-xl px-8 flex items-center justify-between flex-shrink-0 z-10">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold text-white tracking-tight">
              {activeTab === "overview" && "서버 대시보드 개요"}
              {activeTab === "verify" && "4단계 보안 인증 설정"}
              {activeTab === "greet" && "환영 및 작별 메시지 설정"}
              {activeTab === "tickets" && "고객지원 티켓 시스템"}
              {activeTab === "wiki" && "지식 베이스 & 위키 관리"}
              {activeTab === "points" && "포인트 및 가상 경제 설정"}
              {activeTab === "policy" && "개인정보 처리방침 및 약관"}
            </h1>
            {saveStatus && (
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-medium text-emerald-400 animate-fade-in">
                {saveStatus}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {selectedGuild && (
              <button
                onClick={() => saveConfig(guildConfig)}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5865F2] to-[#4752c4] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-[#5865F2]/20 hover:opacity-95 transition"
              >
                <Save className="h-3.5 w-3.5" />
                설정 저장
              </button>
            )}
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-white/[0.08]">
          {!user ? (
            /* Login Required Empty State (Yeonhong Studio Style) */
            <div className="flex h-full flex-col items-center justify-center text-center max-w-md mx-auto py-12">
              <div className="h-16 w-16 rounded-3xl bg-gradient-to-tr from-[#5865F2] to-[#805ad5] flex items-center justify-center text-white mb-6 shadow-xl shadow-indigo-500/25">
                <Bot className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">디스코드 로그인이 필요합니다</h2>
              <p className="text-sm text-neutral-400 mb-8 leading-relaxed">
                관리자 권한을 가진 디스코드 계정으로 로그인하여 서버의 모든 Sora 봇 기능을 직접 웹에서 제어하세요.
              </p>
              <a
                href="/api/auth/login"
                className="flex items-center gap-2.5 rounded-2xl bg-[#5865F2] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#5865F2]/30 hover:opacity-95 transition"
              >
                <LogIn className="h-4 w-4" />
                디스코드로 로그인하기
              </a>
            </div>
          ) : !selectedGuild ? (
            <div className="flex h-full flex-col items-center justify-center text-center max-w-md mx-auto py-12">
              <Shield className="h-12 w-12 text-neutral-600 mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">관리 중인 서버를 선택하세요</h2>
              <p className="text-xs text-neutral-400 mb-6">
                왼쪽 서버 아이콘 레일에서 관리할 서버를 클릭하여 설정을 진행할 수 있습니다.
              </p>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto space-y-6">
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Metric Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="rounded-2xl border border-white/[0.06] bg-[#0e1017]/90 p-5">
                      <div className="text-xs font-semibold text-neutral-400 mb-1">인증 시스템 상태</div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                        <span className="text-lg font-bold text-white">
                          {guildConfig?.verification?.enabled ? "정상 작동 중" : "비활성화"}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-2">
                        타입: {guildConfig?.verification?.type || "전화번호/이메일"}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/[0.06] bg-[#0e1017]/90 p-5">
                      <div className="text-xs font-semibold text-neutral-400 mb-1">티켓 시스템</div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                        <span className="text-lg font-bold text-white">
                          {guildConfig?.tickets?.enabled ? "활성화" : "비활성화"}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-2">
                        누적 접수: {guildConfig?.tickets?.totalCount || 0}건
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/[0.06] bg-[#0e1017]/90 p-5">
                      <div className="text-xs font-semibold text-neutral-400 mb-1">위키 문서 수</div>
                      <div className="text-lg font-bold text-white">
                        {guildConfig?.wiki?.documents ? Object.keys(guildConfig.wiki.documents).length : 0}개
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-2">
                        카테고리: {guildConfig?.wiki?.categories?.length || 1}개
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/[0.06] bg-[#0e1017]/90 p-5">
                      <div className="text-xs font-semibold text-neutral-400 mb-1">복권 누적 당첨금</div>
                      <div className="text-lg font-bold text-amber-400">
                        {(guildConfig?.points?.lotteryPool || 50000).toLocaleString()} P
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-2">
                        출석 보상: {guildConfig?.points?.attendanceReward || 100} P
                      </div>
                    </div>
                  </div>

                  {/* Server Details Card */}
                  <div className="rounded-2xl border border-white/[0.06] bg-[#0e1017]/90 p-6">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <Settings className="h-4 w-4 text-indigo-400" />
                      서버 기본 정보
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-neutral-500">서버 이름</span>
                        <div className="font-semibold text-white mt-1">{selectedGuild.name}</div>
                      </div>
                      <div>
                        <span className="text-neutral-500">길드 고유 ID</span>
                        <div className="font-mono text-neutral-300 mt-1">{selectedGuild.id}</div>
                      </div>
                      <div>
                        <span className="text-neutral-500">UI 규격</span>
                        <div className="text-emerald-400 font-semibold mt-1">Discord Components V2 (Flag 32768)</div>
                      </div>
                      <div>
                        <span className="text-neutral-500">개인정보 보호</span>
                        <div className="text-indigo-400 font-semibold mt-1">단방향 SHA-256 해시 즉시 파기</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: VERIFICATION */}
              {activeTab === "verify" && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-white/[0.06] bg-[#0e1017]/90 p-6 space-y-5">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                      <div>
                        <h3 className="text-sm font-bold text-white">보안 인증 시스템 사용</h3>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          새로운 멤버가 서버에 입장했을 때 채널 이용 전 본인 확인을 요구합니다.
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                          인증 완료 시 지급할 역할 ID
                        </label>
                        <input
                          type="text"
                          value={guildConfig?.verification?.roleId || ""}
                          placeholder="예: 1339604814631534667 (@유저)"
                          onChange={(e) =>
                            setGuildConfig({
                              ...guildConfig,
                              verification: { ...guildConfig?.verification, roleId: e.target.value },
                            })
                          }
                          className="w-full bg-[#13151f] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                          인증 패널 채널 ID
                        </label>
                        <input
                          type="text"
                          value={guildConfig?.verification?.channelId || ""}
                          placeholder="예: 1339604814631534667 (#인증)"
                          onChange={(e) =>
                            setGuildConfig({
                              ...guildConfig,
                              verification: { ...guildConfig?.verification, channelId: e.target.value },
                            })
                          }
                          className="w-full bg-[#13151f] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="border-t border-white/[0.06] pt-4 space-y-3">
                      <div className="text-xs font-bold text-neutral-300">사전 약관 동의 및 법률 준수 정책</div>
                      <div className="rounded-xl bg-[#141620] border border-white/[0.06] p-4 text-xs text-neutral-300 space-y-2">
                        <div className="flex items-center gap-2 text-indigo-400 font-semibold">
                          <CheckCircle2 className="h-4 w-4" />
                          휴대폰 / 이메일 분리형 동의 컨테이너 자동 적용됨
                        </div>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                          버튼 클릭 시 전화번호/이메일을 즉시 요구하지 않으며, 각 수단 전용 개인정보 처리방침과
                          이용약관 카드를 먼저 띄우고 "동의하고 계속하기"를 눌러야만 입력 모달이 열립니다.
                          (안내 문구: "동의하시면 개인정보 처리방침 및 이용약관에 동의하시는 것으로 간주합니다")
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: TICKETS */}
              {activeTab === "tickets" && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-white/[0.06] bg-[#0e1017]/90 p-6 space-y-5">
                    <h3 className="text-sm font-bold text-white border-b border-white/[0.06] pb-4">
                      고객지원 티켓 설정
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                          티켓 채널 생성 카테고리 ID
                        </label>
                        <input
                          type="text"
                          value={guildConfig?.tickets?.categoryId || ""}
                          placeholder="디스코드 카테고리 ID"
                          onChange={(e) =>
                            setGuildConfig({
                              ...guildConfig,
                              tickets: { ...guildConfig?.tickets, categoryId: e.target.value },
                            })
                          }
                          className="w-full bg-[#13151f] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                          상담 관리자(스태프) 역할 ID
                        </label>
                        <input
                          type="text"
                          value={guildConfig?.tickets?.staffRoleId || ""}
                          placeholder="스태프 역할 ID"
                          onChange={(e) =>
                            setGuildConfig({
                              ...guildConfig,
                              tickets: { ...guildConfig?.tickets, staffRoleId: e.target.value },
                            })
                          }
                          className="w-full bg-[#13151f] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: WIKI */}
              {activeTab === "wiki" && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-white/[0.06] bg-[#0e1017]/90 p-6">
                    <h3 className="text-sm font-bold text-white mb-4">새 위키 문서 등록</h3>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="문서 슬러그 (예: server-rules)"
                        value={newWikiSlug}
                        onChange={(e) => setNewWikiSlug(e.target.value)}
                        className="bg-[#13151f] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="문서 제목 (예: 서버 공식 이용규칙)"
                        value={newWikiTitle}
                        onChange={(e) => setNewWikiTitle(e.target.value)}
                        className="bg-[#13151f] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white"
                      />
                    </div>
                    <textarea
                      rows={4}
                      placeholder="마크다운 문서 내용을 입력하세요."
                      value={newWikiContent}
                      onChange={(e) => setNewWikiContent(e.target.value)}
                      className="w-full bg-[#13151f] border border-white/[0.08] rounded-xl p-3.5 text-xs text-white mb-3"
                    />
                    <button
                      onClick={() => {
                        if (!newWikiSlug || !newWikiTitle) return;
                        const docs = guildConfig?.wiki?.documents || {};
                        docs[newWikiSlug] = {
                          slug: newWikiSlug,
                          title: newWikiTitle,
                          content: newWikiContent,
                          category: newWikiCategory,
                          authorId: user?.id || "admin",
                          updatedAt: new Date().toISOString(),
                          version: 1,
                        };
                        setGuildConfig({
                          ...guildConfig,
                          wiki: { ...guildConfig?.wiki, documents: docs },
                        });
                        setNewWikiSlug("");
                        setNewWikiTitle("");
                        setNewWikiContent("");
                      }}
                      className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition"
                    >
                      위키 문서 저장
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 5: POINTS */}
              {activeTab === "points" && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-white/[0.06] bg-[#0e1017]/90 p-6 space-y-4">
                    <h3 className="text-sm font-bold text-white border-b border-white/[0.06] pb-3">
                      포인트 및 경제 밸런스 설정
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-neutral-300 block mb-1">
                          일일 출석 보상 (P)
                        </label>
                        <input
                          type="number"
                          value={guildConfig?.points?.attendanceReward || 100}
                          onChange={(e) =>
                            setGuildConfig({
                              ...guildConfig,
                              points: { ...guildConfig?.points, attendanceReward: parseInt(e.target.value) || 0 },
                            })
                          }
                          className="w-full bg-[#13151f] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-neutral-300 block mb-1">
                          복권 1장 가격 (P)
                        </label>
                        <input
                          type="number"
                          value={guildConfig?.points?.lotteryPrice || 500}
                          onChange={(e) =>
                            setGuildConfig({
                              ...guildConfig,
                              points: { ...guildConfig?.points, lotteryPrice: parseInt(e.target.value) || 0 },
                            })
                          }
                          className="w-full bg-[#13151f] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-neutral-300 block mb-1">
                          도박 최대 베팅금액 (P)
                        </label>
                        <input
                          type="number"
                          value={guildConfig?.points?.maxGambleBet || 50000}
                          onChange={(e) =>
                            setGuildConfig({
                              ...guildConfig,
                              points: { ...guildConfig?.points, maxGambleBet: parseInt(e.target.value) || 0 },
                            })
                          }
                          className="w-full bg-[#13151f] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: POLICY VIEWER */}
              {activeTab === "policy" && (
                <div className="rounded-2xl border border-white/[0.06] bg-[#0e1017]/90 p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <h3 className="text-sm font-bold text-white">공식 정책 & 법적 고지 전문</h3>
                    <Link
                      href="/policy"
                      target="_blank"
                      className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      전용 탭에서 크게 보기
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="text-xs text-neutral-300 leading-relaxed space-y-3">
                    <div className="p-4 rounded-xl bg-[#141620] border border-white/[0.04]">
                      <div className="font-bold text-white mb-1">1. 개인정보 처리방침 (휴대폰 인증)</div>
                      <p className="text-[11px] text-neutral-400">
                        수집 항목: 휴대전화 번호 (SMS 발송용). 목적: 중복 계정 방지 및 본인 확인. 보관: 확인 즉시
                        단방향 SHA-256 해시값만 저장 후 원본 즉시 파기. 제3자 제공: Sendwich API.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#141620] border border-white/[0.04]">
                      <div className="font-bold text-white mb-1">2. 개인정보 처리방침 (이메일 인증)</div>
                      <p className="text-[11px] text-neutral-400">
                        수집 항목: 이메일 주소. 목적: 공식 6자리 일회용 인증 코드 발송. 보관: 인증 성공 즉시 원본
                        폐기. 제3자 제공: Resend API (발송 도메인: admin@koharu.live).
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#141620] border border-white/[0.04]">
                      <div className="font-bold text-white mb-1">3. 서비스 이용약관 및 동의 규정</div>
                      <p className="text-[11px] text-neutral-400">
                        본 봇의 모든 기능을 이용하거나 인증 버튼을 클릭하여 진행할 경우, 상기 명시된 개인정보
                        처리방침 및 서비스 이용약관에 정식 동의하신 것으로 간주합니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
