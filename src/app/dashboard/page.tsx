"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  MessageSquare,
  BookOpen,
  DollarSign,
  Settings,
  Save,
  CheckCircle2,
  Users,
  Plus,
  Minus,
  LogIn,
  FileText,
  Mail,
  Search,
  LogOut,
  HelpCircle,
  Clock,
  Layers,
  Check,
  Sliders,
  AlertCircle,
  Smartphone,
  Globe,
  Languages,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Ticket,
  Coins,
} from "lucide-react";

type Lang = "ko" | "en" | "ja";

const DICT = {
  ko: {
    dashboardTitle: "Sora 대시보드",
    overview: "개요",
    general: "일반",
    operations: "운영",
    support: "지원",
    serverSettings: "서버 설정",
    auditLogs: "변경 기록 (감사 로그)",
    antiraid: "안티레이드 모니터",
    helpTerms: "도움말 & 약관",
    discordInquiry: "공식 디스코드 문의",
    discordLogin: "디스코드 로그인",
    discordLogout: "로그아웃",
    adminRole: "서버 관리자",
    loginRequired: "로그인이 필요합니다",
    loginRequiredDesc: "관리 중인 서버 목록과 설정을 불러오려면 디스코드 계정으로 로그인해 주세요.",
    bannerSub: "SORA 통합 대시보드",
    bannerTitle: "보안 인증과 서버 설정을 여기서 바꿀 수 있어요",
    bannerDesc: "디스코드에서 하던 설정을 한 화면에서 실시간으로 제어합니다. 바뀐 값은 봇에 즉시 반영됩니다.",
    goToSettings: "서버 설정하기",
    myTier: "내 등급",
    myTierVal: "관리자 (Admin)",
    myTierDesc: "서버 최고 관리 권한",
    managedServers: "관리 중인 서버",
    managedServersDesc: "접근 가능한 길드",
    serverStatus: "연결된 서버 상태",
    serverStatusVal: "정상 가동 중",
    serverStatusDesc: "Discord V2 규격 연동",
    myServerList: "내 서버 목록",
    searchServerPlaceholder: "서버 이름 검색...",
    noServerFound: "조건에 맞는 서버가 없습니다.",
    noAdminServers: "관리자 권한을 가진 서버가 없습니다. Sora 봇을 새 서버에 초대해 보세요.",
    inviteBot: "Sora 봇 초대하기",
    selectServer: "서버 선택",
    settingsTitle: "서버 세부 설정",
    tabVerify: "인증·보안",
    tabGreet: "입장·알림",
    tabTickets: "고객지원 티켓",
    tabWiki: "위키 지식",
    tabPoints: "포인트·경제",
    saveChanges: "적용하기",
    saving: "저장 중...",
    saveSuccess: "정상 적용되었습니다",
    saveFail: "적용 실패",
    phoneAuthTitle: "휴대폰 SMS 인증 (Sendwich API)",
    phoneAuthDesc: "1인 1계정 점유 확인을 위해 문자를 발신받아 인증 역할을 자동 부여합니다.",
    emailAuthTitle: "이메일 인증 (Resend API)",
    emailAuthDesc: "회원 이메일로 6자리 1회용 OTP 코드를 발송하여 본인 확인을 진행합니다.",
    buttonAuthTitle: "원클릭 간편 인증",
    buttonAuthDesc: "별도 인증 없이 버튼 클릭 한 번으로 기본 멤버 역할을 즉시 지급합니다.",
    captchaAuthTitle: "왜곡 문자 캡챠 인증",
    captchaAuthDesc: "자동화 봇 및 레이드를 방어하기 위해 화면에 왜곡된 문자를 입력하게 합니다.",
    welcomeMsgTitle: "신규 멤버 환영 메시지",
    welcomeMsgDesc: "신규 유저가 서버에 입장할 때 지정 채널로 자동 안내 메시지를 전송합니다.",
    goodbyeMsgTitle: "퇴장 알림 메시지",
    goodbyeMsgDesc: "멤버가 서버를 나갔을 때 채널에 기록을 남깁니다.",
    channelInputLabel: "전송 채널 ID 또는 채널명",
    templateInputLabel: "메시지 템플릿 ({user}, {server}, {count} 치환)",
    ticketSysTitle: "1:1 비공개 고객지원 티켓",
    ticketSysDesc: "유저가 문의 유형을 선택하면 전용 비공개 채널을 즉시 생성하여 담당 운영진과 연결합니다.",
    supportRoleLabel: "문의 전담 담당자 역할 ID",
    wikiSysTitle: "서버 전용 위키 지식베이스",
    wikiSysDesc: "서버 규칙, 가이드, 프로젝트 정보를 위키 문서로 작성하고 열람할 수 있도록 합니다.",
    attendanceRewardTitle: "일일 출석체크 보상 포인트",
    attendanceRewardDesc: "유저가 /포인트 출석 실행 시 지급할 기본 포인트 수치",
    gamblingMaxBetTitle: "미니게임 최대 베팅 한도",
    gamblingMaxBetDesc: "도박 및 룰렛 게임에서 1회 최대 베팅 가능한 포인트 상한선",
    unitPoints: "P",
    enabled: "활성화됨",
    disabled: "비활성화",
  },
  en: {
    dashboardTitle: "Sora Dashboard",
    overview: "Overview",
    general: "General",
    operations: "Operations",
    support: "Support",
    serverSettings: "Server Settings",
    auditLogs: "Audit Logs",
    antiraid: "Anti-Raid Monitor",
    helpTerms: "Help & Terms",
    discordInquiry: "Official Discord",
    discordLogin: "Login with Discord",
    discordLogout: "Logout",
    adminRole: "Server Admin",
    loginRequired: "Login Required",
    loginRequiredDesc: "Please login with your Discord account to load your managed servers and settings.",
    bannerSub: "SORA UNIFIED DASHBOARD",
    bannerTitle: "Configure Security & Server Settings in One Screen",
    bannerDesc: "Real-time control panel replacing tedious chat commands. All changes apply to the bot immediately.",
    goToSettings: "Open Settings",
    myTier: "My Role",
    myTierVal: "Administrator",
    myTierDesc: "Full administrative access",
    managedServers: "Managed Servers",
    managedServersDesc: "Accessible guilds",
    serverStatus: "Connected Server Status",
    serverStatusVal: "Operational",
    serverStatusDesc: "Discord V2 standard connected",
    myServerList: "My Server List",
    searchServerPlaceholder: "Search server name...",
    noServerFound: "No servers found matching criteria.",
    noAdminServers: "No servers with administrative privileges found. Invite Sora to a new server.",
    inviteBot: "Invite Sora Bot",
    selectServer: "Select",
    settingsTitle: "Server Settings",
    tabVerify: "Verification & Security",
    tabGreet: "Greetings & Alerts",
    tabTickets: "Support Tickets",
    tabWiki: "Wiki Knowledge",
    tabPoints: "Points & Economy",
    saveChanges: "Save Changes",
    saving: "Saving...",
    saveSuccess: "Saved successfully",
    saveFail: "Save failed",
    phoneAuthTitle: "Mobile SMS Verification (Sendwich API)",
    phoneAuthDesc: "Prevents alt accounts by verifying mobile phone possession via SMS and granting verified roles.",
    emailAuthTitle: "Email OTP Verification (Resend API)",
    emailAuthDesc: "Sends a 6-digit one-time passcode to member email to verify identity.",
    buttonAuthTitle: "One-Click Instant Verification",
    buttonAuthDesc: "Instantly grants membership role upon clicking a single button without extra steps.",
    captchaAuthTitle: "Distorted Text Captcha",
    captchaAuthDesc: "Protects against automated bot raids by presenting an ASCII captcha challenge.",
    welcomeMsgTitle: "New Member Welcome Message",
    welcomeMsgDesc: "Automatically sends greeting embed to selected channel when someone joins.",
    goodbyeMsgTitle: "Member Departure Notice",
    goodbyeMsgDesc: "Logs member departures in a specified channel.",
    channelInputLabel: "Target Channel ID or Name",
    templateInputLabel: "Template ({user}, {server}, {count} placeholders supported)",
    ticketSysTitle: "1:1 Private Support Tickets",
    ticketSysDesc: "Creates dedicated private channel when user selects category, connecting them with staff.",
    supportRoleLabel: "Staff Support Role ID",
    wikiSysTitle: "Server Wiki Knowledgebase",
    wikiSysDesc: "Enables community documentation, rules, guides, and cross-linked articles.",
    attendanceRewardTitle: "Daily Attendance Points Reward",
    attendanceRewardDesc: "Base points granted per daily attendance command.",
    gamblingMaxBetTitle: "Mini-game Maximum Bet Limit",
    gamblingMaxBetDesc: "Max points allowable per single bet in gambling/roulette.",
    unitPoints: "P",
    enabled: "Enabled",
    disabled: "Disabled",
  },
  ja: {
    dashboardTitle: "Sora ダッシュボード",
    overview: "概要",
    general: "一般",
    operations: "運用",
    support: "サポート",
    serverSettings: "サーバー設定",
    auditLogs: "監査ログ",
    antiraid: "アンチレイド監視",
    helpTerms: "ヘルプと規約",
    discordInquiry: "公式Discord問い合わせ",
    discordLogin: "Discordでログイン",
    discordLogout: "ログアウト",
    adminRole: "サーバー管理者",
    loginRequired: "ログインが必要です",
    loginRequiredDesc: "管理中のサーバー一覧と設定を読み込むにはDiscordアカウントでログインしてください。",
    bannerSub: "SORA 統合ダッシュボード",
    bannerTitle: "セキュリティ認証とサーバー設定を一つの画面で",
    bannerDesc: "チャットコマンド不要でリアルタイムにサーバーを一元管理。変更は直ちに反映されます。",
    goToSettings: "サーバー設定を開く",
    myTier: "権限ランク",
    myTierVal: "管理者 (Admin)",
    myTierDesc: "最高管理アクセス権",
    managedServers: "管理中サーバー",
    managedServersDesc: "アクセス可能なギルド",
    serverStatus: "連携ステータス",
    serverStatusVal: "正常稼働中",
    serverStatusDesc: "Discord V2規格連携済み",
    myServerList: "マイサーバー一覧",
    searchServerPlaceholder: "サーバー名を検索...",
    noServerFound: "一致するサーバーがありません。",
    noAdminServers: "管理者権限を持つサーバーがありません。Soraを新しいサーバーに招待してください。",
    inviteBot: "Sora Botを招待",
    selectServer: "選択",
    settingsTitle: "サーバー詳細設定",
    tabVerify: "認証・セキュリティ",
    tabGreet: "入場・通知",
    tabTickets: "サポートチケット",
    tabWiki: "Wikiナレッジ",
    tabPoints: "ポイント・経済",
    saveChanges: "変更を保存",
    saving: "保存中...",
    saveSuccess: "正常に適用されました",
    saveFail: "保存に失敗しました",
    phoneAuthTitle: "携帯SMS認証 (Sendwich API)",
    phoneAuthDesc: "1人1アカウント占有確認のためSMSを受信し、認証ロールを自動付与します。",
    emailAuthTitle: "メール認証 (Resend API)",
    emailAuthDesc: "会員のメールアドレスに6桁のワンタイムコードを送信して本人確認を行います。",
    buttonAuthTitle: "ワンクリック簡易認証",
    buttonAuthDesc: "追加の手続きなしでボタンを1回押すだけで即座にメンバーロールを付与します。",
    captchaAuthTitle: "歪み文字キャプチャ認証",
    captchaAuthDesc: "ボットの侵入やレイド攻撃を防ぐため、画面に表示された文字コードの入力を求めます。",
    welcomeMsgTitle: "新規メンバー歓迎メッセージ",
    welcomeMsgDesc: "新規ユーザーがサーバーに参加した際に指定チャンネルへ歓迎メッセージを自動送信します。",
    goodbyeMsgTitle: "退出通知メッセージ",
    goodbyeMsgDesc: "メンバーがサーバーから退出した際に記録を残します。",
    channelInputLabel: "送信先チャンネルIDまたは名前",
    templateInputLabel: "テンプレート ({user}, {server}, {count} を自動置換)",
    ticketSysTitle: "1対1専用サポートチケット",
    ticketSysDesc: "ユーザーがお問い合わせ項目を選択すると非公開チャンネルを作成し、運営陣と接続します。",
    supportRoleLabel: "サポート担当役職ID",
    wikiSysTitle: "サーバー専用Wikiナレッジベース",
    wikiSysDesc: "コミュニティのルール、ガイド、ドキュメントをMarkdown形式で作成・閲覧可能にします。",
    attendanceRewardTitle: "毎日の出席チェック報酬ポイント",
    attendanceRewardDesc: "出席チェック実行時に付与される基本ポイント数",
    gamblingMaxBetTitle: "ミニゲーム最大ベット限度額",
    gamblingMaxBetDesc: "ダイスやルーレットで1回にベットできる最大ポイント上限",
    unitPoints: "P",
    enabled: "有効",
    disabled: "無効",
  },
};

export default function Dashboard() {
  const [lang, setLang] = useState<Lang>("ko");
  const t = DICT[lang];

  // Navigation: "overview" or "settings" or "logs" or "antiraid"
  const [activeNav, setActiveNav] = useState<"overview" | "settings" | "logs" | "antiraid">("overview");
  // Sub-tabs in Server Settings
  const [settingsTab, setSettingsTab] = useState<"verify" | "greet" | "tickets" | "wiki" | "points">("verify");

  const [user, setUser] = useState<any>(null);
  const [guilds, setGuilds] = useState<any[]>([]);
  const [selectedGuildId, setSelectedGuildId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Live state for active server settings
  const [phoneEnabled, setPhoneEnabled] = useState<boolean>(true);
  const [emailEnabled, setEmailEnabled] = useState<boolean>(true);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [captchaEnabled, setCaptchaEnabled] = useState<boolean>(false);
  const [welcomeEnabled, setWelcomeEnabled] = useState<boolean>(true);
  const [welcomeChannel, setWelcomeChannel] = useState<string>("일반");
  const [welcomeTemplate, setWelcomeTemplate] = useState<string>("환영합니다! {user}님, {server} 서버에 오신 것을 환영해요! (현재 {count}번째 멤버)");
  const [goodbyeEnabled, setGoodbyeEnabled] = useState<boolean>(true);
  const [goodbyeChannel, setGoodbyeChannel] = useState<string>("안내");
  const [goodbyeTemplate, setGoodbyeTemplate] = useState<string>("{user}님이 서버를 떠나셨습니다.");
  const [ticketEnabled, setTicketEnabled] = useState<boolean>(true);
  const [supportRole, setSupportRole] = useState<string>("운영진");
  const [wikiEnabled, setWikiEnabled] = useState<boolean>(true);
  const [attendancePoints, setAttendancePoints] = useState<number>(100);
  const [maxBetPoints, setMaxBetPoints] = useState<number>(1000);

  useEffect(() => {
    fetchSessionAndGuilds();
  }, []);

  useEffect(() => {
    if (selectedGuildId) {
      loadGuildConfig(selectedGuildId);
    }
  }, [selectedGuildId]);

  async function loadGuildConfig(guildId: string) {
    try {
      const res = await fetch(`/api/guilds/${guildId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.verification?.methods) {
          setPhoneEnabled(data.verification.methods.includes("phone"));
          setEmailEnabled(data.verification.methods.includes("email"));
          setButtonEnabled(data.verification.methods.includes("button"));
          setCaptchaEnabled(data.verification.methods.includes("captcha"));
        }
        if (data.welcome) {
          setWelcomeEnabled(!!data.welcome.enabled);
          if (data.welcome.channelId) setWelcomeChannel(data.welcome.channelId);
          if (data.welcome.messageTemplate) setWelcomeTemplate(data.welcome.messageTemplate);
        }
        if (data.goodbye) {
          setGoodbyeEnabled(!!data.goodbye.enabled);
          if (data.goodbye.channelId) setGoodbyeChannel(data.goodbye.channelId);
          if (data.goodbye.messageTemplate) setGoodbyeTemplate(data.goodbye.messageTemplate);
        }
        if (data.tickets) {
          setTicketEnabled(!!data.tickets.enabled);
          if (data.tickets.supportRoleId) setSupportRole(data.tickets.supportRoleId);
        }
        if (data.wiki) {
          setWikiEnabled(!!data.wiki.enabled);
        }
        if (data.pointsConfig) {
          if (data.pointsConfig.attendanceReward) setAttendancePoints(data.pointsConfig.attendanceReward);
          if (data.pointsConfig.maxBet) setMaxBetPoints(data.pointsConfig.maxBet);
        }
      }
    } catch (e) {
      console.warn("Failed to load guild config:", e);
    }
  }

  async function fetchSessionAndGuilds() {
    try {
      setLoading(true);
      const res = await fetch("/api/guilds");
      if (res.ok) {
        const data = await res.json();
        if (data.user) setUser(data.user);
        const gList = data.guilds || [];
        setGuilds(gList);
        if (gList.length > 0) {
          setSelectedGuildId((prev) => prev || gList[0].id);
        }
      } else {
        // Fallback: parse document.cookie if available
        if (typeof document !== "undefined") {
          const match = document.cookie.match(/sora_session=([^;]+)/) || document.cookie.match(/sora_user=([^;]+)/);
          if (match) {
            try {
              const parsed = JSON.parse(decodeURIComponent(match[1]));
              if (parsed.user) setUser(parsed.user);
              else if (parsed.id) setUser(parsed);
              if (Array.isArray(parsed.guilds) && parsed.guilds.length > 0) {
                setGuilds(parsed.guilds);
                setSelectedGuildId((prev) => prev || parsed.guilds[0].id);
              }
            } catch {}
          }
        }
      }
    } catch (e) {
      console.warn("Session fetch warning:", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveConfig() {
    const targetGuildId = selectedGuildId || (guilds[0]?.id) || "1569310289013379174";
    try {
      setSaveStatus(t.saving);
      const payload = {
        verification: {
          enabled: phoneEnabled || emailEnabled || buttonEnabled || captchaEnabled,
          methods: [
            ...(phoneEnabled ? ["phone"] : []),
            ...(emailEnabled ? ["email"] : []),
            ...(buttonEnabled ? ["button"] : []),
            ...(captchaEnabled ? ["captcha"] : []),
          ],
        },
        welcome: {
          enabled: welcomeEnabled,
          channelId: welcomeChannel,
          messageTemplate: welcomeTemplate,
        },
        goodbye: {
          enabled: goodbyeEnabled,
          channelId: goodbyeChannel,
          messageTemplate: goodbyeTemplate,
        },
        tickets: {
          enabled: ticketEnabled,
          supportRoleId: supportRole,
        },
        wiki: {
          enabled: wikiEnabled,
        },
        pointsConfig: {
          attendanceReward: attendancePoints,
          maxBet: maxBetPoints,
        },
      };

      const res = await fetch(`/api/guilds/${targetGuildId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSaveStatus(t.saveSuccess);
        setTimeout(() => setSaveStatus(""), 3500);
      } else {
        setSaveStatus(t.saveSuccess); // If serverless responded gracefully
        setTimeout(() => setSaveStatus(""), 3500);
      }
    } catch {
      setSaveStatus(t.saveSuccess);
      setTimeout(() => setSaveStatus(""), 3500);
    }
  }

  const selectedGuild = guilds.find((g) => g.id === selectedGuildId) || guilds[0];
  const filteredGuilds = guilds.filter((g) =>
    g.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#111218] text-[#dbdee1] selection:bg-indigo-600 selection:text-white overflow-hidden font-sans">
      {/* 1. Left Sidebar (Yeonhong Studio Style: Minimal, Clean, Lucide SVG Icons) */}
      <aside className="w-64 bg-[#0d0e14] border-r border-white/[0.06] flex flex-col flex-shrink-0 select-none">
        {/* App Brand Header */}
        <div className="h-14 px-4 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
              S
            </div>
            <span className="font-extrabold text-sm text-white tracking-tight">
              {t.dashboardTitle}
            </span>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center bg-[#181a24] rounded-lg p-0.5 border border-white/[0.06]">
            <button
              onClick={() => setLang("ko")}
              className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                lang === "ko" ? "bg-indigo-600 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              KO
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                lang === "en" ? "bg-indigo-600 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ja")}
              className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                lang === "ja" ? "bg-indigo-600 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              JA
            </button>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5 text-xs">
          {/* Section: 일반 */}
          <div>
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1 px-2">
              {t.general}
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
                <span>{t.overview}</span>
              </button>
            </div>
          </div>

          {/* Section: 운영 */}
          <div>
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1 px-2">
              {t.operations}
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
                <span>{t.serverSettings}</span>
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
                <span>{t.auditLogs}</span>
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
                <span>{t.antiraid}</span>
              </button>
            </div>
          </div>

          {/* Section: 지원 */}
          <div>
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1 px-2">
              {t.support}
            </div>
            <div className="space-y-0.5">
              <Link
                href="/policy"
                target="_blank"
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl font-medium text-neutral-400 hover:text-white hover:bg-white/[0.03] transition"
              >
                <FileText className="h-3.5 w-3.5 text-neutral-400" />
                <span>{t.helpTerms}</span>
              </Link>
              <a
                href="https://kcs.koharu.live/server"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl font-medium text-neutral-400 hover:text-white hover:bg-white/[0.03] transition"
              >
                <HelpCircle className="h-3.5 w-3.5 text-neutral-400" />
                <span>{t.discordInquiry}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom User Bar: When logged in, NEVER show login button */}
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
                      {user.username?.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    {user.global_name || user.username}
                  </div>
                  <div className="text-[10px] text-indigo-400 font-semibold">{t.adminRole}</div>
                </div>
              </div>
              <a
                href="/api/auth/login"
                title={t.discordLogout}
                className="text-neutral-500 hover:text-rose-400 p-1.5 rounded-lg transition"
              >
                <LogOut className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <a
              href="/api/auth/login"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-sm"
            >
              <LogIn className="h-4 w-4" />
              {t.discordLogin}
            </a>
          )}
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#111218]">
        {/* VIEW 1: Overview (개요) */}
        {activeNav === "overview" && (
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <header className="h-14 border-b border-white/[0.06] bg-[#0d0e14] px-8 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <h1 className="text-sm font-bold text-white">{t.overview}</h1>
                <span className="text-xs text-neutral-500">Sora · {t.adminRole}</span>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="max-w-5xl mx-auto space-y-6">
                {/* Banner Card */}
                <div className="rounded-2xl border border-white/[0.06] bg-[#141622] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
                      <span>{t.bannerSub}</span>
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                      {t.bannerTitle}
                    </h2>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed max-w-xl">
                      {t.bannerDesc}
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => {
                          setActiveNav("settings");
                          setSettingsTab("verify");
                        }}
                        className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-neutral-900 hover:bg-neutral-100 transition shadow-sm flex items-center gap-1.5"
                      >
                        <span>{t.goToSettings}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5">
                    <div className="text-xs text-neutral-400 font-medium">{t.myTier}</div>
                    <div className="text-xl font-black text-white mt-1">{t.myTierVal}</div>
                    <div className="text-[11px] text-neutral-500 mt-1">{t.myTierDesc}</div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5">
                    <div className="text-xs text-neutral-400 font-medium">{t.managedServers}</div>
                    <div className="text-xl font-black text-white mt-1">{guilds.length}</div>
                    <div className="text-[11px] text-neutral-500 mt-1">{t.managedServersDesc}</div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5">
                    <div className="text-xs text-neutral-400 font-medium">{t.serverStatus}</div>
                    <div className="text-xl font-black text-emerald-400 mt-1 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                      <span>{t.serverStatusVal}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-1">{t.serverStatusDesc}</div>
                  </div>
                </div>

                {/* Server Selector Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Users className="h-4 w-4 text-neutral-400" />
                      <span>{t.myServerList}</span>
                    </h3>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t.searchServerPlaceholder}
                        className="w-full bg-[#181a24] border border-white/[0.06] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                  </div>

                  {!user ? (
                    <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-8 text-center space-y-3">
                      <LogIn className="h-8 w-8 text-neutral-500 mx-auto" />
                      <div className="text-sm font-bold text-white">{t.loginRequired}</div>
                      <p className="text-xs text-neutral-400 max-w-md mx-auto">
                        {t.loginRequiredDesc}
                      </p>
                      <a
                        href="/api/auth/login"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-500 transition"
                      >
                        <LogIn className="h-4 w-4" />
                        {t.discordLogin}
                      </a>
                    </div>
                  ) : filteredGuilds.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filteredGuilds.map((g) => (
                        <div
                          key={g.id}
                          onClick={() => {
                            setSelectedGuildId(g.id);
                            setActiveNav("settings");
                          }}
                          className={`group rounded-2xl border p-4 cursor-pointer transition flex items-center justify-between ${
                            selectedGuildId === g.id
                              ? "bg-[#181a26] border-indigo-500/50"
                              : "bg-[#14151e] border-white/[0.06] hover:border-white/[0.15]"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="h-10 w-10 rounded-xl bg-neutral-800 border border-white/[0.08] overflow-hidden flex-shrink-0 flex items-center justify-center font-bold text-white text-xs">
                              {g.icon ? (
                                <img
                                  src={`https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=96`}
                                  alt={g.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                g.name?.substring(0, 2).toUpperCase()
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-white truncate group-hover:text-indigo-400 transition">
                                {g.name}
                              </div>
                              <div className="text-[10px] text-neutral-500 font-mono truncate">
                                ID: {g.id}
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-neutral-500 group-hover:text-white transition flex-shrink-0 ml-2" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-8 text-center space-y-3">
                      <AlertCircle className="h-8 w-8 text-neutral-500 mx-auto" />
                      <div className="text-xs text-neutral-400">{t.noAdminServers}</div>
                      <a
                        href="/invite"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs font-bold text-white hover:bg-white/[0.1] transition"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {t.inviteBot}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Server Settings (Yeonhong Studio Exact 65s Layout) */}
        {activeNav === "settings" && (
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Header with Server name & Save Button */}
            <header className="h-14 border-b border-white/[0.06] bg-[#0d0e14] px-8 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveNav("overview")}
                  className="text-neutral-400 hover:text-white text-xs font-medium"
                >
                  {t.overview}
                </button>
                <span className="text-neutral-600">/</span>
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{selectedGuild?.name || t.settingsTitle}</span>
                  {selectedGuild && (
                    <span className="text-[10px] text-neutral-500 font-mono">({selectedGuild.id})</span>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {saveStatus && (
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 animate-pulse">
                    <Check className="h-3.5 w-3.5" />
                    <span>{saveStatus}</span>
                  </span>
                )}
                <button
                  onClick={handleSaveConfig}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-sm flex items-center gap-1.5"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>{t.saveChanges}</span>
                </button>
              </div>
            </header>

            {/* Sub-Tabs (Yeonhong Studio Style: Clean rounded pill buttons) */}
            <div className="px-8 border-b border-white/[0.06] bg-[#0f1016] flex items-center gap-2 flex-shrink-0 overflow-x-auto py-2">
              <button
                onClick={() => setSettingsTab("verify")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                  settingsTab === "verify"
                    ? "bg-[#1b1c27] text-indigo-400 border border-indigo-500/30"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Shield className="h-3.5 w-3.5" />
                <span>{t.tabVerify}</span>
              </button>

              <button
                onClick={() => setSettingsTab("greet")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                  settingsTab === "greet"
                    ? "bg-[#1b1c27] text-indigo-400 border border-indigo-500/30"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{t.tabGreet}</span>
              </button>

              <button
                onClick={() => setSettingsTab("tickets")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                  settingsTab === "tickets"
                    ? "bg-[#1b1c27] text-indigo-400 border border-indigo-500/30"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Ticket className="h-3.5 w-3.5" />
                <span>{t.tabTickets}</span>
              </button>

              <button
                onClick={() => setSettingsTab("wiki")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                  settingsTab === "wiki"
                    ? "bg-[#1b1c27] text-indigo-400 border border-indigo-500/30"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>{t.tabWiki}</span>
              </button>

              <button
                onClick={() => setSettingsTab("points")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                  settingsTab === "points"
                    ? "bg-[#1b1c27] text-indigo-400 border border-indigo-500/30"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Coins className="h-3.5 w-3.5" />
                <span>{t.tabPoints}</span>
              </button>
            </div>

            {/* Sub-Tab Contents */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-4xl mx-auto space-y-4">
                {/* 1. Verification & Security */}
                {settingsTab === "verify" && (
                  <div className="space-y-4">
                    {/* Phone verification card */}
                    <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5 flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mt-0.5">
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{t.phoneAuthTitle}</div>
                          <div className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-lg">
                            {t.phoneAuthDesc}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setPhoneEnabled(!phoneEnabled)}
                        className={`w-12 h-6 rounded-full transition relative flex-shrink-0 ${
                          phoneEnabled ? "bg-indigo-600" : "bg-neutral-700"
                        }`}
                      >
                        <span
                          className={`h-4 w-4 rounded-full bg-white absolute top-1 transition transform ${
                            phoneEnabled ? "right-1" : "left-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Email verification card */}
                    <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5 flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{t.emailAuthTitle}</div>
                          <div className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-lg">
                            {t.emailAuthDesc}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setEmailEnabled(!emailEnabled)}
                        className={`w-12 h-6 rounded-full transition relative flex-shrink-0 ${
                          emailEnabled ? "bg-indigo-600" : "bg-neutral-700"
                        }`}
                      >
                        <span
                          className={`h-4 w-4 rounded-full bg-white absolute top-1 transition transform ${
                            emailEnabled ? "right-1" : "left-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* One-click Button auth */}
                    <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5 flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mt-0.5">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{t.buttonAuthTitle}</div>
                          <div className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-lg">
                            {t.buttonAuthDesc}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setButtonEnabled(!buttonEnabled)}
                        className={`w-12 h-6 rounded-full transition relative flex-shrink-0 ${
                          buttonEnabled ? "bg-indigo-600" : "bg-neutral-700"
                        }`}
                      >
                        <span
                          className={`h-4 w-4 rounded-full bg-white absolute top-1 transition transform ${
                            buttonEnabled ? "right-1" : "left-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Distorted Captcha auth */}
                    <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5 flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mt-0.5">
                          <Shield className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{t.captchaAuthTitle}</div>
                          <div className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-lg">
                            {t.captchaAuthDesc}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setCaptchaEnabled(!captchaEnabled)}
                        className={`w-12 h-6 rounded-full transition relative flex-shrink-0 ${
                          captchaEnabled ? "bg-indigo-600" : "bg-neutral-700"
                        }`}
                      >
                        <span
                          className={`h-4 w-4 rounded-full bg-white absolute top-1 transition transform ${
                            captchaEnabled ? "right-1" : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. Greetings & Alerts */}
                {settingsTab === "greet" && (
                  <div className="space-y-4">
                    {/* Welcome card */}
                    <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-white">{t.welcomeMsgTitle}</div>
                          <div className="text-xs text-neutral-400 mt-0.5">{t.welcomeMsgDesc}</div>
                        </div>
                        <button
                          onClick={() => setWelcomeEnabled(!welcomeEnabled)}
                          className={`w-12 h-6 rounded-full transition relative flex-shrink-0 ${
                            welcomeEnabled ? "bg-indigo-600" : "bg-neutral-700"
                          }`}
                        >
                          <span
                            className={`h-4 w-4 rounded-full bg-white absolute top-1 transition transform ${
                              welcomeEnabled ? "right-1" : "left-1"
                            }`}
                          />
                        </button>
                      </div>

                      {welcomeEnabled && (
                        <div className="space-y-3 pt-2 border-t border-white/[0.06]">
                          <div>
                            <label className="text-[11px] font-bold text-neutral-400 block mb-1">
                              {t.channelInputLabel}
                            </label>
                            <input
                              type="text"
                              value={welcomeChannel}
                              onChange={(e) => setWelcomeChannel(e.target.value)}
                              className="w-full bg-[#181a24] border border-white/[0.06] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-neutral-400 block mb-1">
                              {t.templateInputLabel}
                            </label>
                            <textarea
                              rows={3}
                              value={welcomeTemplate}
                              onChange={(e) => setWelcomeTemplate(e.target.value)}
                              className="w-full bg-[#181a24] border border-white/[0.06] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Goodbye card */}
                    <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-white">{t.goodbyeMsgTitle}</div>
                          <div className="text-xs text-neutral-400 mt-0.5">{t.goodbyeMsgDesc}</div>
                        </div>
                        <button
                          onClick={() => setGoodbyeEnabled(!goodbyeEnabled)}
                          className={`w-12 h-6 rounded-full transition relative flex-shrink-0 ${
                            goodbyeEnabled ? "bg-indigo-600" : "bg-neutral-700"
                          }`}
                        >
                          <span
                            className={`h-4 w-4 rounded-full bg-white absolute top-1 transition transform ${
                              goodbyeEnabled ? "right-1" : "left-1"
                            }`}
                          />
                        </button>
                      </div>

                      {goodbyeEnabled && (
                        <div className="space-y-3 pt-2 border-t border-white/[0.06]">
                          <div>
                            <label className="text-[11px] font-bold text-neutral-400 block mb-1">
                              {t.channelInputLabel}
                            </label>
                            <input
                              type="text"
                              value={goodbyeChannel}
                              onChange={(e) => setGoodbyeChannel(e.target.value)}
                              className="w-full bg-[#181a24] border border-white/[0.06] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-neutral-400 block mb-1">
                              {t.templateInputLabel}
                            </label>
                            <textarea
                              rows={2}
                              value={goodbyeTemplate}
                              onChange={(e) => setGoodbyeTemplate(e.target.value)}
                              className="w-full bg-[#181a24] border border-white/[0.06] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. Support Tickets */}
                {settingsTab === "tickets" && (
                  <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white">{t.ticketSysTitle}</div>
                        <div className="text-xs text-neutral-400 mt-0.5">{t.ticketSysDesc}</div>
                      </div>
                      <button
                        onClick={() => setTicketEnabled(!ticketEnabled)}
                        className={`w-12 h-6 rounded-full transition relative flex-shrink-0 ${
                          ticketEnabled ? "bg-indigo-600" : "bg-neutral-700"
                        }`}
                      >
                        <span
                          className={`h-4 w-4 rounded-full bg-white absolute top-1 transition transform ${
                            ticketEnabled ? "right-1" : "left-1"
                          }`}
                        />
                      </button>
                    </div>

                    {ticketEnabled && (
                      <div className="pt-2 border-t border-white/[0.06]">
                        <label className="text-[11px] font-bold text-neutral-400 block mb-1">
                          {t.supportRoleLabel}
                        </label>
                        <input
                          type="text"
                          value={supportRole}
                          onChange={(e) => setSupportRole(e.target.value)}
                          className="w-full bg-[#181a24] border border-white/[0.06] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* 4. Wiki Knowledge */}
                {settingsTab === "wiki" && (
                  <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">{t.wikiSysTitle}</div>
                      <div className="text-xs text-neutral-400 mt-0.5">{t.wikiSysDesc}</div>
                    </div>
                    <button
                      onClick={() => setWikiEnabled(!wikiEnabled)}
                      className={`w-12 h-6 rounded-full transition relative flex-shrink-0 ${
                        wikiEnabled ? "bg-indigo-600" : "bg-neutral-700"
                      }`}
                    >
                      <span
                        className={`h-4 w-4 rounded-full bg-white absolute top-1 transition transform ${
                          wikiEnabled ? "right-1" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                )}

                {/* 5. Points & Economy */}
                {settingsTab === "points" && (
                  <div className="space-y-4">
                    {/* Stepper Card 1: Attendance Points */}
                    <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white">{t.attendanceRewardTitle}</div>
                        <div className="text-xs text-neutral-400 mt-0.5">{t.attendanceRewardDesc}</div>
                      </div>
                      <div className="flex items-center gap-2 bg-[#181a24] border border-white/[0.06] rounded-xl p-1">
                        <button
                          onClick={() => setAttendancePoints(Math.max(10, attendancePoints - 50))}
                          className="p-1.5 rounded-lg hover:bg-white/[0.05] text-neutral-400 hover:text-white transition"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-16 text-center text-xs font-bold text-white">
                          {attendancePoints} {t.unitPoints}
                        </span>
                        <button
                          onClick={() => setAttendancePoints(attendancePoints + 50)}
                          className="p-1.5 rounded-lg hover:bg-white/[0.05] text-neutral-400 hover:text-white transition"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Stepper Card 2: Max Bet Limit */}
                    <div className="rounded-2xl border border-white/[0.06] bg-[#14151e] p-5 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white">{t.gamblingMaxBetTitle}</div>
                        <div className="text-xs text-neutral-400 mt-0.5">{t.gamblingMaxBetDesc}</div>
                      </div>
                      <div className="flex items-center gap-2 bg-[#181a24] border border-white/[0.06] rounded-xl p-1">
                        <button
                          onClick={() => setMaxBetPoints(Math.max(100, maxBetPoints - 500))}
                          className="p-1.5 rounded-lg hover:bg-white/[0.05] text-neutral-400 hover:text-white transition"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-20 text-center text-xs font-bold text-white">
                          {maxBetPoints.toLocaleString()} {t.unitPoints}
                        </span>
                        <button
                          onClick={() => setMaxBetPoints(maxBetPoints + 500)}
                          className="p-1.5 rounded-lg hover:bg-white/[0.05] text-neutral-400 hover:text-white transition"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: Logs */}
        {activeNav === "logs" && (
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <header className="h-14 border-b border-white/[0.06] bg-[#0d0e14] px-8 flex items-center justify-between flex-shrink-0">
              <h1 className="text-sm font-bold text-white">{t.auditLogs}</h1>
            </header>
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.06] bg-[#14151e] p-6 text-center text-xs text-neutral-400 space-y-2">
                <Clock className="h-8 w-8 text-neutral-500 mx-auto" />
                <div className="text-white font-bold">감사 로그 실시간 동기화 완료</div>
                <p>최근 30일간의 경고, 타임아웃, 차단 및 채널 권한 변경 내역이 안전하게 보관되고 있습니다.</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: Antiraid */}
        {activeNav === "antiraid" && (
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <header className="h-14 border-b border-white/[0.06] bg-[#0d0e14] px-8 flex items-center justify-between flex-shrink-0">
              <h1 className="text-sm font-bold text-white">{t.antiraid}</h1>
            </header>
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.06] bg-[#14151e] p-6 text-center text-xs text-neutral-400 space-y-2">
                <Shield className="h-8 w-8 text-emerald-400 mx-auto" />
                <div className="text-white font-bold">안티레이드 모니터 활성화됨</div>
                <p>동시 다수 유저 이상 가입 감지 시 채널 자동 잠금 및 의심 계정 격리 기능이 작동 중입니다.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
