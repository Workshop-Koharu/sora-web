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

  return (
    <div className="flex min-h-screen bg-[#090a0f] text-[#dbdee1] selection:bg-indigo-600 selection:text-white relative">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/3 w-[600px] h-[350px] bg-gradient-to-b from-indigo-600/10 via-purple-600/5 to-transparent blur-[140px] rounded-full"></div>
        <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] bg-sky-500/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/[0.06] bg-[#0b0d13]/80 backdrop-blur-xl flex flex-col">
        <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-[#5865F2] to-[#805ad5] flex items-center justify-center font-black text-white text-base shadow-md shadow-indigo-500/20">
              S
            </div>
            <div>
              <div className="font-bold text-white text-base tracking-tight">Sora Dashboard</div>
              <div className="text-[11px] text-neutral-400">Koharu Coding Server</div>
            </div>
          </div>
        </div>

        {/* Server Selector */}
        <div className="p-4 border-b border-white/[0.06]">
          <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
            관리 서버 선택
          </label>
          {guilds.length > 0 ? (
            <select
              value={selectedGuildId}
              onChange={(e) => setSelectedGuildId(e.target.value)}
              className="w-full bg-[#13151f] border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-indigo-500 transition"
            >
              {guilds.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          ) : (
            <div className="text-xs text-neutral-500">
              {user ? "관리자 권한의 서버가 없습니다." : "Discord 로그인이 필요합니다."}
            </div>
          )}
        </div>

        <nav className="p-4 space-y-1.5 flex-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
              activeTab === "overview" ? "bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/25" : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Settings className="h-4 w-4" />
            서버 개요 & 상태
          </button>
          <button
            onClick={() => setActiveTab("verify")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
              activeTab === "verify" ? "bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/25" : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Shield className="h-4 w-4" />
            인증 시스템 관리
          </button>
          <button
            onClick={() => setActiveTab("greet")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
              activeTab === "greet" ? "bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/25" : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Users className="h-4 w-4" />
            가입 및 퇴장 안내
          </button>
          <button
            onClick={() => setActiveTab("tickets")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
              activeTab === "tickets" ? "bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/25" : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            고객지원 & 티켓
          </button>
          <button
            onClick={() => setActiveTab("wiki")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
              activeTab === "wiki" ? "bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/25" : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            서버 위키 문서고
          </button>
          <button
            onClick={() => setActiveTab("points")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
              activeTab === "points" ? "bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/25" : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Award className="h-4 w-4" />
            포인트 상점 관리
          </button>
          <button
            onClick={() => setActiveTab("policy")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
              activeTab === "policy" ? "bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/25" : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <FileText className="h-4 w-4" />
            정책 및 이용약관
          </button>
        </nav>

        <div className="p-4 border-t border-white/[0.06] space-y-2 text-xs text-neutral-500">
          <Link href="/policy" className="block hover:text-neutral-300 transition">
            개인정보처리방침 (전번/이메일)
          </Link>
          <Link href="/terms" className="block hover:text-neutral-300 transition">
            서비스 이용약관
          </Link>
          <Link href="/" className="block hover:text-neutral-300 transition pt-1 text-neutral-400">
            ← 공식 홈페이지로 이동
          </Link>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 border-b border-white/[0.06] px-8 flex items-center justify-between bg-[#0b0d13]/50 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>대시보드</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white font-medium capitalize">{activeTab}</span>
            {saveStatus && (
              <span className="ml-4 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                {saveStatus}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-white">{user.username}</span>
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  관리자 연결됨
                </span>
              </div>
            ) : (
              <a
                href="/api/auth/login"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5865F2] to-[#4752c4] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-[#5865F2]/20 hover:opacity-95 transition"
              >
                <LogIn className="h-3.5 w-3.5" />
                Discord 계정 로그인
              </a>
            )}
          </div>
        </header>

        {/* Content Tabs */}
        <div className="p-8 max-w-5xl space-y-8">
          {/* 1. OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">서버 운영 종합 현황</h2>
                <p className="text-xs text-neutral-400 mt-1">
                  선택된 서버: <strong className="text-white">{guilds.find((g) => g.id === selectedGuildId)?.name || selectedGuildId}</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-5">
                  <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">인증 상태</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-2 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    {guildConfig?.verification?.enabled ? "활성화" : "비활성화"}
                  </div>
                  <div className="text-xs text-neutral-500 mt-2">
                    {guildConfig?.verification?.methods?.join(", ") || "설정 없음"}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-5">
                  <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">입/퇴장 알림</div>
                  <div className="text-2xl font-bold text-white mt-2">
                    {guildConfig?.welcome?.enabled ? "ON" : "OFF"} / {guildConfig?.goodbye?.enabled ? "ON" : "OFF"}
                  </div>
                  <div className="text-xs text-neutral-500 mt-2">자동 환영 메시지</div>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-5">
                  <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">위키 문서</div>
                  <div className="text-2xl font-bold text-sky-400 mt-2">
                    {guildConfig?.wikiDocuments?.length || 0}건
                  </div>
                  <div className="text-xs text-neutral-500 mt-2">버전 및 상호 링크</div>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-5">
                  <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">상점 품목 수</div>
                  <div className="text-2xl font-bold text-amber-400 mt-2">
                    {guildConfig?.shopItems?.length || 0}개
                  </div>
                  <div className="text-xs text-neutral-500 mt-2">포인트 상점</div>
                </div>
              </div>

              {/* Bot Consent Notice Banner */}
              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4 text-xs text-neutral-300 flex items-center justify-between">
                <span>
                  💡 <strong>포괄적 약관 동의 안내:</strong> Sora 봇의 모든 기능을 이용하시면{" "}
                  <Link href="/policy" className="text-indigo-400 underline font-semibold">개인정보처리방침</Link> 및{" "}
                  <Link href="/terms" className="text-indigo-400 underline font-semibold">서비스 이용약관</Link>에 동의하시는 것으로 간주합니다.
                </span>
                <Link href="/policy" className="text-indigo-400 text-xs font-semibold underline shrink-0 ml-4">
                  정책 전문 보기 →
                </Link>
              </div>
            </div>
          )}

          {/* 2. VERIFY SETTINGS */}
          {activeTab === "verify" && guildConfig && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">인증 시스템 상세 설정</h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Sendwich 휴대폰 인증, Resend 이메일 인증, 버튼, 캡챠 설정을 웹에서 즉시 변경합니다.
                  </p>
                </div>
                <button
                  onClick={() => saveConfig({ verification: guildConfig.verification })}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#5865F2] to-[#4752c4] hover:opacity-95 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg shadow-[#5865F2]/25 transition"
                >
                  <Save className="h-4 w-4" />
                  설정 저장
                </button>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-base">인증 시스템 활성화</div>
                    <div className="text-xs text-neutral-400">서버 입장 멤버에게 인증 패널 노출</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={guildConfig.verification?.enabled ?? false}
                    onChange={(e) =>
                      setGuildConfig({
                        ...guildConfig,
                        verification: { ...guildConfig.verification, enabled: e.target.checked },
                      })
                    }
                    className="h-5 w-5 accent-indigo-500 rounded cursor-pointer"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">적용할 인증 수단</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {["phone", "email", "button", "captcha"].map((method) => {
                      const labels: any = {
                        phone: "📱 Sendwich 휴대폰 SMS 점유 인증 (동의 화면 필수)",
                        email: "✉️ Resend 6자리 이메일 코드 인증 (동의 화면 필수)",
                        button: "✅ 버튼 간편 즉시 인증",
                        captcha: "🤖 캡챠 왜곡 이미지 인증",
                      };
                      const isChecked = guildConfig.verification?.methods?.includes(method) ?? false;
                      return (
                        <label key={method} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] cursor-pointer hover:bg-white/[0.06] transition">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const cur = guildConfig.verification?.methods || [];
                              const updated = e.target.checked ? [...cur, method] : cur.filter((m: string) => m !== method);
                              setGuildConfig({
                                ...guildConfig,
                                verification: { ...guildConfig.verification, methods: updated },
                              });
                            }}
                            className="h-4 w-4 accent-indigo-500 rounded"
                          />
                          <span className="text-xs font-medium">{labels[method]}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-white block mb-1">인증 임베드 전송 채널 ID</label>
                    <input
                      type="text"
                      placeholder="채널 ID (Snowflake)"
                      value={guildConfig.verification?.channelId || ""}
                      onChange={(e) =>
                        setGuildConfig({
                          ...guildConfig,
                          verification: { ...guildConfig.verification, channelId: e.target.value },
                        })
                      }
                      className="w-full bg-[#0e1017] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white block mb-1">인증 성공 시 지급할 역할 ID</label>
                    <input
                      type="text"
                      placeholder="역할 ID (Snowflake)"
                      value={guildConfig.verification?.roleMappings?.phone || guildConfig.verification?.roleMappings?.email || guildConfig.verification?.roleMappings?.button || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        const roleMappings: any = {};
                        (guildConfig.verification?.methods || []).forEach((m: string) => {
                          roleMappings[m] = val;
                        });
                        setGuildConfig({
                          ...guildConfig,
                          verification: { ...guildConfig.verification, roleMappings },
                        });
                      }}
                      className="w-full bg-[#0e1017] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. GREETINGS */}
          {activeTab === "greet" && guildConfig && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">가입 및 퇴장 안내 설정</h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    신규 멤버 입장 및 퇴장 시 안내 문구와 대상 채널을 설정합니다.
                  </p>
                </div>
                <button
                  onClick={() => saveConfig({ welcome: guildConfig.welcome, goodbye: guildConfig.goodbye })}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#5865F2] to-[#4752c4] hover:opacity-95 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg shadow-[#5865F2]/25 transition"
                >
                  <Save className="h-4 w-4" />
                  설정 저장
                </button>
              </div>

              {/* Welcome Config */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white">가입 환영 안내 (Welcome)</div>
                  <input
                    type="checkbox"
                    checked={guildConfig.welcome?.enabled ?? false}
                    onChange={(e) =>
                      setGuildConfig({
                        ...guildConfig,
                        welcome: { ...guildConfig.welcome, enabled: e.target.checked },
                      })
                    }
                    className="h-5 w-5 accent-indigo-500 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white block mb-1">환영 메시지 전송 채널 ID</label>
                  <input
                    type="text"
                    value={guildConfig.welcome?.channelId || ""}
                    onChange={(e) =>
                      setGuildConfig({
                        ...guildConfig,
                        welcome: { ...guildConfig.welcome, channelId: e.target.value },
                      })
                    }
                    placeholder="채널 ID"
                    className="w-full bg-[#0e1017] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white block mb-1">환영 문구 템플릿 ({'{user}'}, {'{server}'}, {'{count}'})</label>
                  <textarea
                    rows={3}
                    value={guildConfig.welcome?.messageTemplate || ""}
                    onChange={(e) =>
                      setGuildConfig({
                        ...guildConfig,
                        welcome: { ...guildConfig.welcome, messageTemplate: e.target.value },
                      })
                    }
                    className="w-full bg-[#0e1017] border border-white/[0.08] rounded-xl p-3 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Goodbye Config */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white">퇴장 안내 (Goodbye)</div>
                  <input
                    type="checkbox"
                    checked={guildConfig.goodbye?.enabled ?? false}
                    onChange={(e) =>
                      setGuildConfig({
                        ...guildConfig,
                        goodbye: { ...guildConfig.goodbye, enabled: e.target.checked },
                      })
                    }
                    className="h-5 w-5 accent-indigo-500 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white block mb-1">퇴장 메시지 전송 채널 ID</label>
                  <input
                    type="text"
                    value={guildConfig.goodbye?.channelId || ""}
                    onChange={(e) =>
                      setGuildConfig({
                        ...guildConfig,
                        goodbye: { ...guildConfig.goodbye, channelId: e.target.value },
                      })
                    }
                    placeholder="채널 ID"
                    className="w-full bg-[#0e1017] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white block mb-1">퇴장 문구 템플릿</label>
                  <textarea
                    rows={2}
                    value={guildConfig.goodbye?.messageTemplate || ""}
                    onChange={(e) =>
                      setGuildConfig({
                        ...guildConfig,
                        goodbye: { ...guildConfig.goodbye, messageTemplate: e.target.value },
                      })
                    }
                    className="w-full bg-[#0e1017] border border-white/[0.08] rounded-xl p-3 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 4. TICKETS */}
          {activeTab === "tickets" && guildConfig && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">문의(티켓) 시스템 구성</h2>
                  <p className="text-xs text-neutral-400 mt-1">티켓 패널 채널, 상위 카테고리, 담당 역할을 지정합니다.</p>
                </div>
                <button
                  onClick={() => saveConfig({ tickets: guildConfig.tickets })}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#5865F2] to-[#4752c4] hover:opacity-95 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg shadow-[#5865F2]/25 transition"
                >
                  <Save className="h-4 w-4" />
                  설정 저장
                </button>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-white block mb-1">패널 전송 채널 ID</label>
                    <input
                      type="text"
                      value={guildConfig.tickets?.channelId || ""}
                      onChange={(e) =>
                        setGuildConfig({
                          ...guildConfig,
                          tickets: { ...guildConfig.tickets, channelId: e.target.value },
                        })
                      }
                      placeholder="채널 ID"
                      className="w-full bg-[#0e1017] border border-white/[0.08] rounded-xl p-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-white block mb-1">티켓 생성 카테고리 ID</label>
                    <input
                      type="text"
                      value={guildConfig.tickets?.categoryId || ""}
                      onChange={(e) =>
                        setGuildConfig({
                          ...guildConfig,
                          tickets: { ...guildConfig.tickets, categoryId: e.target.value },
                        })
                      }
                      placeholder="카테고리 ID"
                      className="w-full bg-[#0e1017] border border-white/[0.08] rounded-xl p-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-white block mb-1">고객지원 담당자 역할 ID</label>
                    <input
                      type="text"
                      value={guildConfig.tickets?.supportRoleId || ""}
                      onChange={(e) =>
                        setGuildConfig({
                          ...guildConfig,
                          tickets: { ...guildConfig.tickets, supportRoleId: e.target.value },
                        })
                      }
                      placeholder="역할 ID"
                      className="w-full bg-[#0e1017] border border-white/[0.08] rounded-xl p-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. WIKI */}
          {activeTab === "wiki" && guildConfig && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">서버 위키 문서고</h2>
                <p className="text-xs text-neutral-400 mt-1">웹에서 직접 위키 문서를 작성하고 열람할 수 있습니다.</p>
              </div>

              {/* Add New Document */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-6 space-y-4">
                <h3 className="font-bold text-white text-sm">새 위키 문서 작성</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="슬러그 (영문/하이픈, 예: bot-guide)"
                    value={newWikiSlug}
                    onChange={(e) => setNewWikiSlug(e.target.value)}
                    className="bg-[#0e1017] border border-white/[0.08] rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="문서 제목"
                    value={newWikiTitle}
                    onChange={(e) => setNewWikiTitle(e.target.value)}
                    className="bg-[#0e1017] border border-white/[0.08] rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="분류 (예: 운영규칙, 개발)"
                    value={newWikiCategory}
                    onChange={(e) => setNewWikiCategory(e.target.value)}
                    className="bg-[#0e1017] border border-white/[0.08] rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="문서 본문 내용 (Markdown 지원)..."
                  value={newWikiContent}
                  onChange={(e) => setNewWikiContent(e.target.value)}
                  className="w-full bg-[#0e1017] border border-white/[0.08] rounded-xl p-3 text-xs text-white focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (!newWikiSlug || !newWikiTitle || !newWikiContent) return;
                    const doc = {
                      id: `wiki_${Date.now()}`,
                      guildId: selectedGuildId,
                      slug: newWikiSlug.trim().toLowerCase(),
                      title: newWikiTitle.trim(),
                      content: newWikiContent.trim(),
                      category: newWikiCategory.trim() || "일반",
                      tags: ["웹작성"],
                      version: 1,
                      authorId: user?.id || "web_admin",
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      links: [],
                      backlinks: [],
                      history: [],
                    };
                    const updatedDocs = [...(guildConfig.wikiDocuments || []), doc];
                    saveConfig({ wikiDocuments: updatedDocs });
                    setNewWikiSlug("");
                    setNewWikiTitle("");
                    setNewWikiContent("");
                  }}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-xs font-bold text-white transition"
                >
                  <Plus className="h-4 w-4" />
                  문서 발행
                </button>
              </div>

              {/* Document List */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-6 space-y-3">
                <h3 className="font-bold text-white text-sm">보관된 위키 문서 목록 ({guildConfig.wikiDocuments?.length || 0}건)</h3>
                <div className="divide-y divide-white/[0.06] text-xs">
                  {(guildConfig.wikiDocuments || []).map((doc: any) => (
                    <div key={doc.slug} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{doc.title} (<code className="text-indigo-400">{doc.slug}</code>)</div>
                        <div className="text-neutral-400">분류: {doc.category} • 버전: v{doc.version}</div>
                      </div>
                      <button
                        onClick={() => {
                          const filtered = guildConfig.wikiDocuments.filter((d: any) => d.slug !== doc.slug);
                          saveConfig({ wikiDocuments: filtered });
                        }}
                        className="text-neutral-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 6. POINTS SHOP */}
          {activeTab === "points" && guildConfig && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">포인트 상점 상품 관리</h2>
                <p className="text-xs text-neutral-400 mt-1">유저가 포인트로 구매할 수 있는 역할 및 혜택 상품을 등록합니다.</p>
              </div>

              {/* Add Shop Item */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-6 space-y-4">
                <h3 className="font-bold text-white text-sm">새 상점 상품 등록</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="상품명 (예: VIP 역할)"
                    value={newShopName}
                    onChange={(e) => setNewShopName(e.target.value)}
                    className="bg-[#0e1017] border border-white/[0.08] rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="가격 (P)"
                    value={newShopPrice}
                    onChange={(e) => setNewShopPrice(Number(e.target.value))}
                    className="bg-[#0e1017] border border-white/[0.08] rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="상품 설명"
                    value={newShopDesc}
                    onChange={(e) => setNewShopDesc(e.target.value)}
                    className="bg-[#0e1017] border border-white/[0.08] rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => {
                    if (!newShopName) return;
                    const item = {
                      id: `item_${Date.now()}`,
                      guildId: selectedGuildId,
                      name: newShopName.trim(),
                      price: newShopPrice,
                      description: newShopDesc.trim() || "상점 상품",
                    };
                    const updated = [...(guildConfig.shopItems || []), item];
                    saveConfig({ shopItems: updated });
                    setNewShopName("");
                    setNewShopDesc("");
                  }}
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-xl text-xs font-bold text-white transition"
                >
                  <Plus className="h-4 w-4" />
                  상품 추가
                </button>
              </div>

              {/* Shop Item List */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-6 space-y-3">
                <h3 className="font-bold text-white text-sm">등록된 상점 품목 ({guildConfig.shopItems?.length || 0}개)</h3>
                <div className="divide-y divide-white/[0.06] text-xs">
                  {(guildConfig.shopItems || []).map((it: any) => (
                    <div key={it.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{it.name} — <span className="text-amber-400 font-bold">{it.price.toLocaleString()} P</span></div>
                        <div className="text-neutral-400">{it.description}</div>
                      </div>
                      <button
                        onClick={() => {
                          const filtered = guildConfig.shopItems.filter((i: any) => i.id !== it.id);
                          saveConfig({ shopItems: filtered });
                        }}
                        className="text-neutral-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 7. POLICY TAB IN DASHBOARD */}
          {activeTab === "policy" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">개인정보 처리방침 및 이용약관</h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Sora 서비스 이용 시 적용되는 데이터 수집 규정 및 법적 고지사항입니다.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <Shield className="h-4 w-4" />
                  포괄적 서비스 이용 동의 고지
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  이용자가 Sora 봇의 모든 기능(슬래시 명령어, 인증 버튼, 모달 입력, 티켓 및 웹 대시보드)을 사용하는 경우,
                  본 개인정보 처리방침 및 서비스 이용약관에 동의하시는 것으로 간주합니다.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                      <Phone className="h-4 w-4" />
                      휴대폰 번호 인증 정책 (Sendwich)
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      SMS 발신 번호 점유 확인을 수행하며, <strong>인증 성공 즉시 원본 번호는 영구 파기</strong>됩니다. 중복 가입 방지용 단방향 해시(SHA-256)만 보관됩니다.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] space-y-2">
                    <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
                      <Mail className="h-4 w-4" />
                      이메일 인증 정책 (Resend)
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      1회용 6자리 인증번호(OTP)를 발송하여 본인 여부를 확인합니다. <strong>인증 완료 즉시 영구 파기</strong>되며 5분 후 자동 소멸합니다.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/policy"
                    className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition"
                  >
                    정책 전문 전체 열람하기 →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
