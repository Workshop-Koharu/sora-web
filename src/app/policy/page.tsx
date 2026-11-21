"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, ArrowLeft, Phone, Mail, FileText, CheckCircle2, Lock, ExternalLink } from "lucide-react";

export default function PolicyPage() {
  const [activePolicyTab, setActivePolicyTab] = useState<"all" | "phone" | "email" | "terms">("all");

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#dbdee1] selection:bg-indigo-600 selection:text-white">
      {/* Ambient background glows (jxayx / yeonhong style) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent blur-[120px] rounded-full"></div>
        <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] bg-sky-500/10 blur-[140px] rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] bg-purple-500/10 blur-[140px] rounded-full"></div>
      </div>

      <header className="border-b border-white/[0.06] bg-[#0b0d13]/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-sm font-medium text-neutral-400 hover:text-white transition">
            <ArrowLeft className="h-4 w-4" />
            홈으로 돌아가기
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-tight text-white">Sora 공식 정책 센터</span>
            <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400">
              KCS Legal
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 mb-4">
            <Shield className="h-3.5 w-3.5" />
            대한민국 개인정보보호법 및 디스코드 개발자 정책 준수
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            개인정보 처리방침 및 서비스 이용약관
          </h1>
          <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
            Sora (소라) 디스코드 봇 및 웹 서비스 이용 시 수집되는 개인정보와 이용자 권리에 대해 안내해 드립니다.
            <br />
            <strong className="text-white">이 봇의 모든 기능을 이용하시면 아래 개인정보 처리방침 및 이용약관에 동의하시는 것으로 간주합니다.</strong>
          </p>
        </div>

        {/* Policy Segment Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#13151f]/80 border border-white/[0.06] backdrop-blur-xl">
          <button
            onClick={() => setActivePolicyTab("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activePolicyTab === "all" ? "bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/25" : "text-neutral-400 hover:text-white"
            }`}
          >
            <Shield className="h-4 w-4" />
            통합 개인정보처리방침
          </button>
          <button
            onClick={() => setActivePolicyTab("phone")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activePolicyTab === "phone" ? "bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/25" : "text-neutral-400 hover:text-white"
            }`}
          >
            <Phone className="h-4 w-4 text-emerald-400" />
            휴대폰 번호 인증 전용 정책
          </button>
          <button
            onClick={() => setActivePolicyTab("email")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activePolicyTab === "email" ? "bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/25" : "text-neutral-400 hover:text-white"
            }`}
          >
            <Mail className="h-4 w-4 text-sky-400" />
            이메일 인증 전용 정책
          </button>
          <button
            onClick={() => setActivePolicyTab("terms")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activePolicyTab === "terms" ? "bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/25" : "text-neutral-400 hover:text-white"
            }`}
          >
            <FileText className="h-4 w-4" />
            서비스 이용약관
          </button>
        </div>

        {/* Tab 1: ALL / INTEGRATED */}
        {activePolicyTab === "all" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-8 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Shield className="h-5 w-5 text-indigo-400" />
                1. 총칙 및 수집 기본 원칙
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Koharu Coding Server (KCS, 이하 &quot;서버&quot;)는 Sora 봇 및 웹 관리 서비스(sora.koharu.live)를 제공하며,
                이용자의 개인정보를 소중히 다루고 있습니다. 서비스는 불필요한 개인 식별 정보를 일체 보관하지 않으며,
                오직 1인 1계정 보안 인증과 서버 운영 지원 목적에 한정하여 최소한의 데이터를 엄격한 보안 하에 처리합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                  <Phone className="h-4 w-4" />
                  휴대폰 번호 인증 (Sendwich 연동)
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  SMS 문자 발신을 통한 번호 점유 확인을 수행합니다. <strong>인증 성공 확인 즉시 원본 휴대폰 번호는 영구 파기</strong>되며, 다계정 중복 방지용 단방향 SHA-256 해시값만 저장됩니다.
                </p>
                <div className="text-xs text-neutral-500 pt-2 border-t border-white/[0.06]">
                  제3자 제공: (주)샌드위치 (https://sendwich.kr)
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
                  <Mail className="h-4 w-4" />
                  이메일 주소 인증 (Resend 연동)
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  1회용 6자리 인증번호(OTP)를 발송하여 본인 여부를 확인합니다. <strong>인증 완료 즉시 이메일 주소와 코드는 영구 파기</strong>되며, 5분 미입력 시 자동 완전 삭제됩니다.
                </p>
                <div className="text-xs text-neutral-500 pt-2 border-t border-white/[0.06]">
                  발신자: admin@koharu.live (Resend Inc. API 위탁)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: PHONE ONLY */}
        {activePolicyTab === "phone" && (
          <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">휴대폰 번호 인증 전용 개인정보 수집·이용 규정</h2>
                <span className="text-xs text-emerald-400">Sendwich API SMS 점유 확인 연동</span>
              </div>
            </div>

            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed divide-y divide-white/[0.06]">
              <div className="pt-3">
                <h3 className="font-semibold text-white mb-1">1. 수집하는 개인정보 항목</h3>
                <p>• 발신 휴대폰 번호 (010-XXXX-XXXX 형식), 이동통신사 (SKT, KT, LGU+ 또는 알뜰폰), 인증 시도 및 발신 일시, Sendwich 고유 인증 식별자(vrf_id)</p>
              </div>

              <div className="pt-3">
                <h3 className="font-semibold text-white mb-1">2. 수집 및 이용 목적</h3>
                <p>• 디스코드 서버 내 다계정 생성 방지 및 1인 1계정 점유 확인<br />• 인증 완료에 따른 디스코드 역할(Role) 자동 부여</p>
              </div>

              <div className="pt-3">
                <h3 className="font-semibold text-white mb-1">3. 보유 및 파기 절차 (즉시 파기 원칙)</h3>
                <p>
                  • <strong>인증 판정 성공 즉시 이용자의 원본 휴대폰 번호는 영구적으로 파기</strong>됩니다.<br />
                  • 동일 번호로 다른 디스코드 계정을 생성하여 가입하는 어뷰징 행위를 원천 방지하기 위해, 복원이 불가능한 <strong>단방향 비가역 암호화 해시(SHA-256)</strong> 값만 최소한의 기간 동안 분리 보관됩니다.
                </p>
              </div>

              <div className="pt-3">
                <h3 className="font-semibold text-white mb-1">4. 개인정보의 제3자 제공</h3>
                <p>
                  • <strong>제공받는 자:</strong> 주식회사 샌드위치 (https://sendwich.kr)<br />
                  • <strong>제공 목적:</strong> SMS 문자 발신 수신 및 수신 번호와 발신 번호 일치 검증<br />
                  • <strong>제공 항목:</strong> 발신 전화번호, 인증 문자 본문
                </p>
              </div>

              <div className="pt-3">
                <h3 className="font-semibold text-white mb-1">5. 동의 거부권 및 불이익 안내</h3>
                <p>이용자는 휴대폰 번호 수집 및 제공에 대한 동의를 거부할 권리가 있습니다. 단, 동의를 거부하실 경우 휴대폰 번호 기반의 인증 역할 부여가 제한될 수 있으며, 이 경우 대체 인증 수단(이메일, 캡챠)을 이용하실 수 있습니다.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: EMAIL ONLY */}
        {activePolicyTab === "email" && (
          <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">이메일 주소 인증 전용 개인정보 수집·이용 규정</h2>
                <span className="text-xs text-sky-400">Resend Inc. API 트랜잭셔널 메일 연동</span>
              </div>
            </div>

            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed divide-y divide-white/[0.06]">
              <div className="pt-3">
                <h3 className="font-semibold text-white mb-1">1. 수집하는 개인정보 항목</h3>
                <p>• 이용자가 입력한 이메일 주소, 시스템이 생성한 1회용 6자리 인증 코드(OTP)</p>
              </div>

              <div className="pt-3">
                <h3 className="font-semibold text-white mb-1">2. 수집 및 이용 목적</h3>
                <p>• 본인 소유의 이메일 계정인지 확인하기 위한 1회용 인증 번호 발송 및 확인<br />• 확인 완료 시 인증 역할 자동 부여</p>
              </div>

              <div className="pt-3">
                <h3 className="font-semibold text-white mb-1">3. 보유 및 파기 기간</h3>
                <p>• <strong>인증 성공 시 즉시 파기</strong>됩니다.<br />• 발송된 인증 코드는 5분간만 유효하며, 5분 경과 시 인증 세션 및 이메일 정보는 메모리에서 자동 완전 소멸됩니다.</p>
              </div>

              <div className="pt-3">
                <h3 className="font-semibold text-white mb-1">4. 개인정보 처리 위탁 및 제3자 제공</h3>
                <p>
                  • <strong>위탁받는 자:</strong> Resend Inc. (https://resend.com)<br />
                  • <strong>위탁 업무 내용:</strong> 인증 메일 전송 대행<br />
                  • <strong>공식 발신처:</strong> <code>admin@koharu.live</code>
                </p>
              </div>

              <div className="pt-3">
                <h3 className="font-semibold text-white mb-1">5. 동의 거부권 및 불이익</h3>
                <p>이메일 주소 제공을 거부하실 수 있으며, 거부 시 이메일 인증 기능 이용이 제한됩니다.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: TERMS */}
        {activePolicyTab === "terms" && (
          <div className="rounded-2xl border border-white/[0.08] bg-[#13151f]/70 backdrop-blur-xl p-8 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
              <FileText className="h-5 w-5 text-indigo-400" />
              Sora 서비스 이용약관
            </h2>
            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
              <p>
                <strong>제1조 (약관의 적용)</strong> 본 약관은 Koharu Coding Server (KCS)의 디스코드 봇 및 웹 서비스 Sora를 이용하는 모든 이용자에게 적용됩니다.
              </p>
              <p>
                <strong>제2조 (이용자의 의무)</strong> 이용자는 타인의 명의나 전화번호, 이메일을 도용하여 인증을 시도하거나 봇 시스템에 비정상적인 부하를 주는 행위를 하여서는 아니 됩니다. 위반 시 즉시 서버 제재(밴) 및 법적 조치가 취해질 수 있습니다.
              </p>
              <p>
                <strong>제3조 (포괄적 동의 조항)</strong> 이용자가 Sora 봇의 슬래시 명령어, 버튼, 모달 및 웹 대시보드 기능을 사용하는 경우, 본 서비스 이용약관 및 개인정보 처리방침에 포괄적으로 동의한 것으로 간주합니다.
              </p>
              <p>
                <strong>제4조 (준거법)</strong> 본 약관은 대한민국 법률에 따라 규율되고 해석됩니다.
              </p>
            </div>
          </div>
        )}

        {/* Contact Footer Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#111214]/80 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-bold text-white text-base">개인정보 보호책임자 및 문의처</div>
            <div className="text-xs text-neutral-400 mt-1">
              Koharu Coding Server (KCS) 보안총괄팀 • <a href="mailto:admin@koharu.live" className="text-indigo-400 underline">admin@koharu.live</a>
            </div>
          </div>
          <a
            href="mailto:admin@koharu.live"
            className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition"
          >
            문의 메일 보내기
            <ExternalLink className="h-3.5 w-3.5 text-neutral-400" />
          </a>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-8 text-center text-xs text-neutral-500">
        <p>© 2026 Koharu Coding Server (KCS). Sora Discord Bot & Web Dashboard.</p>
      </footer>
    </div>
  );
}
