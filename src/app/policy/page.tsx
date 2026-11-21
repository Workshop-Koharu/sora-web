"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, Shield, FileText, CheckCircle2 } from "lucide-react";

export default function PolicyHub() {
  const [activeTab, setActiveTab] = useState<"phone" | "email" | "privacy" | "terms">("phone");

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-[#dbdee1] font-sans">
      {/* Top Header */}
      <header className="border-b border-white/[0.06] bg-[#0e1017] px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Sora 홈으로 이동
          </Link>
          <div className="flex items-center gap-2 font-bold text-sm text-white">
            <img src="/assets/logo-sora.png" alt="Sora" className="h-5 w-5 object-contain" />
            Sora 공식 법률 준수 & 정책 센터
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* Important Banner */}
        <div className="mb-8 rounded-2xl border border-indigo-500/20 bg-[#121422] p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white text-sm">
                Sora 봇의 모든 기능을 이용하시면 본 정책에 동의하시는 것으로 간주합니다.
              </div>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                대한민국 「개인정보 보호법」 제15조, 제17조, 제22조 및 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」에
                의거하여, 휴대폰 인증과 이메일 인증의 수집 목적, 항목, 보유 기간 및 제3자 제공 내역을 독립적으로 고지합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/[0.06] pb-4">
          <button
            onClick={() => setActiveTab("phone")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "phone"
                ? "bg-white text-neutral-900 shadow-sm"
                : "bg-[#141620] text-neutral-400 hover:text-white border border-white/[0.04]"
            }`}
          >
            <Phone className="h-4 w-4 text-emerald-400" />
            1. 휴대폰 인증 개인정보 수집·이용 동의서
          </button>
          <button
            onClick={() => setActiveTab("email")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "email"
                ? "bg-white text-neutral-900 shadow-sm"
                : "bg-[#141620] text-neutral-400 hover:text-white border border-white/[0.04]"
            }`}
          >
            <Mail className="h-4 w-4 text-sky-400" />
            2. 이메일 인증 개인정보 수집·이용 동의서
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "privacy"
                ? "bg-white text-neutral-900 shadow-sm"
                : "bg-[#141620] text-neutral-400 hover:text-white border border-white/[0.04]"
            }`}
          >
            <Shield className="h-4 w-4 text-purple-400" />
            3. 통합 개인정보처리방침 전문
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "terms"
                ? "bg-white text-neutral-900 shadow-sm"
                : "bg-[#141620] text-neutral-400 hover:text-white border border-white/[0.04]"
            }`}
          >
            <FileText className="h-4 w-4 text-amber-400" />
            4. 서비스 이용약관 전문
          </button>
        </div>

        {/* Tab 1: Phone Privacy */}
        {activeTab === "phone" && (
          <article className="rounded-2xl border border-white/[0.06] bg-[#111218] p-8 text-xs leading-relaxed space-y-6 text-neutral-300">
            <div className="border-b border-white/[0.06] pb-4">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">법률 제22조 의거 고지</span>
              <h1 className="text-xl font-black text-white mt-1">
                휴대전화번호 수집 및 이용 동의서 (휴대폰 점유 확인용)
              </h1>
            </div>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">1. 수집하는 개인정보의 항목</h2>
              <p>
                - 필수 수집 항목: 이용자의 휴대전화번호, 발송 일시, 통신사 식별 번호 (Sendwich API 연계)<br />
                - 자동 수집 항목: 디스코드 고유 사용자 ID (Snowflake), 접속 길드(서버) 식별자
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">2. 개인정보의 수집 및 이용 목적</h2>
              <p>
                - 디스코드 커뮤니티 서버 내 1인 1계정 원칙 준수 및 다계정을 악용한 레이드(Raid), 도배, 테러 사전 방지<br />
                - Sendwich SMS 본인 확인 점유 인증(Discover Mode) 문자 발송 및 결과 검증<br />
                - 서버 규칙 준수를 위한 기본 자격 확인 및 인증 완료 역할 자동 부여
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">3. 개인정보의 보유 및 이용 기간 (철저한 즉시 파기 원칙)</h2>
              <div className="p-4 rounded-xl bg-[#161824] border border-emerald-500/30 text-emerald-300">
                <strong>[즉시 파기 원칙]:</strong> 수집된 휴대전화번호는 인증 절차 완료(성공 또는 유효시간 경과) 즉시 평문 데이터가 서버 메모리 및 디스크에서 영구 삭제됩니다. 중복 가입 방지를 위한 목적으로만 역산이 불가능한 단방향 암호화 해시(SHA-256 + Server Salt) 형태로만 보관되며, 원본 전화번호로의 복원이 절대 불가능합니다.
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">4. 개인정보의 제3자 제공 (위탁)</h2>
              <table className="w-full border-collapse border border-white/[0.08] text-[11px] mt-2">
                <thead>
                  <tr className="bg-[#171924] text-neutral-300">
                    <th className="border border-white/[0.08] p-2 text-left">제공받는 자 (수탁사)</th>
                    <th className="border border-white/[0.08] p-2 text-left">제공 목적</th>
                    <th className="border border-white/[0.08] p-2 text-left">제공 항목</th>
                    <th className="border border-white/[0.08] p-2 text-left">보유 및 이용 기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/[0.08] p-2">(주)샌드위치 (Sendwich)</td>
                    <td className="border border-white/[0.08] p-2">SMS 문자 발송 및 점유 확인</td>
                    <td className="border border-white/[0.08] p-2">휴대전화번호</td>
                    <td className="border border-white/[0.08] p-2">발송 완료 즉시 파기 (관련 법령 보관 제외)</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">5. 동의 거부 권리 및 불이익 안내</h2>
              <p>
                이용자는 휴대전화번호 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 단, 본 동의는 서버의 보안 유지 및 멤버 인증을 위한 필수 항목이므로, 동의를 거부하실 경우 해당 디스코드 서버의 인증 완료 역할 부여 및 일반 채널 이용이 제한될 수 있습니다.
              </p>
            </section>
          </article>
        )}

        {/* Tab 2: Email Privacy */}
        {activeTab === "email" && (
          <article className="rounded-2xl border border-white/[0.06] bg-[#111218] p-8 text-xs leading-relaxed space-y-6 text-neutral-300">
            <div className="border-b border-white/[0.06] pb-4">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">법률 제22조 의거 고지</span>
              <h1 className="text-xl font-black text-white mt-1">
                이메일 주소 수집 및 이용 동의서 (일회용 코드 발송용)
              </h1>
            </div>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">1. 수집하는 개인정보의 항목</h2>
              <p>
                - 필수 수집 항목: 이용자의 이메일 주소<br />
                - 생성 정보: 6자리 일회용 인증 번호(OTP), 인증 요청 일시, 만료 시간(10분)
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">2. 개인정보의 수집 및 이용 목적</h2>
              <p>
                - KCS 공식 발송 메일(admin@koharu.live)을 통한 1회용 인증 코드 전달<br />
                - 허위 계정 및 자동화 매크로 봇 방지 및 실존 계정 점유 확인<br />
                - 디스코드 서버 내 인증 역할 자동 지급
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">3. 개인정보의 보유 및 파기 절차</h2>
              <p>
                수집된 이메일 주소는 발송된 6자리 인증 코드가 성공적으로 검증되거나 10분의 유효시간이 종료되는 즉시 원본 데이터가 영구 파기됩니다. KCS는 인증 완료 후 이용자의 원본 이메일 주소를 데이터베이스에 일체 보관하지 않습니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">4. 개인정보의 처리 위탁</h2>
              <p>
                KCS는 안정적인 이메일 전송을 위해 글로벌 이메일 인프라 기업인 Resend Inc.에 발송 업무를 위탁하고 있으며, 발송 목적 외 다른 용도로 활용되지 않습니다.
              </p>
            </section>
          </article>
        )}

        {/* Tab 3: Full Privacy Policy */}
        {activeTab === "privacy" && (
          <article className="rounded-2xl border border-white/[0.06] bg-[#111218] p-8 text-xs leading-relaxed space-y-6 text-neutral-300">
            <h1 className="text-xl font-black text-white">Sora (소라) 통합 개인정보처리방침</h1>
            <p className="text-neutral-400">
              최종 개정일: 2026년 11월 21일 | 버전: v2.0
            </p>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">제1조 (목적 및 적용 범위)</h2>
              <p>
                Koharu Coding Server (이하 "운영진")가 개발하고 서비스하는 디스코드 봇 'Sora(소라)' 및 웹 대시보드(sora.koharu.live)는 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령을 준수합니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">제2조 (처리하는 개인정보의 항목)</h2>
              <p>
                1. 기본 운영 정보: Discord User ID, Username, Avatar Hash, 서버(Guild) 식별자, 생성된 티켓 내역, 포인트 잔고 및 출석 기록.<br />
                2. 본인 인증 정보: 휴대폰 번호(단방향 SHA-256 해시값), 이메일 주소(인증 성공 즉시 파기).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">제3조 (개인정보의 파기 절차 및 방법)</h2>
              <p>
                운영진은 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 복구할 수 없는 방법으로 영구 파기합니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">제4조 (정보주체와 법정대리인의 권리·의무 및 행사방법)</h2>
              <p>
                이용자는 공식 지원 서버(https://kcs.koharu.live/server) 또는 고객지원 티켓을 통해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
              </p>
            </section>
          </article>
        )}

        {/* Tab 4: Terms of Service */}
        {activeTab === "terms" && (
          <article className="rounded-2xl border border-white/[0.06] bg-[#111218] p-8 text-xs leading-relaxed space-y-6 text-neutral-300">
            <h1 className="text-xl font-black text-white">Sora (소라) 서비스 이용약관</h1>
            <p className="text-neutral-400">
              최종 시행일: 2026년 11월 21일
            </p>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">제1조 (목적)</h2>
              <p>
                본 약관은 Koharu Coding Server(이하 "KCS")가 제공하는 디스코드 봇 'Sora' 및 관련 웹 대시보드의 이용 조건 및 절차, 이용자와 서비스 제공자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">제2조 (약관의 효력 및 동의 간주)</h2>
              <p>
                1. 본 약관은 서비스 내 공지 또는 웹사이트에 게시함으로써 효력이 발생합니다.<br />
                2. 이용자가 디스코드 내에서 Sora 봇의 명령어를 실행하거나, 인증 버튼을 클릭하거나, 웹 대시보드에 로그인하는 경우 본 약관 및 개인정보 처리방침 전체에 적법하게 동의한 것으로 간주합니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">제3조 (이용자의 의무 및 금지행위)</h2>
              <p>
                이용자는 다음 각 호의 행위를 하여서는 안 되며, 적발 시 사전 통보 없이 서비스 이용 제한 또는 영구 밴 조치가 취해질 수 있습니다:<br />
                1. 봇 시스템의 버그 악용, 가상 포인트 비정상 증식 및 복사 행위<br />
                2. 타인의 명의를 도용한 휴대폰/이메일 본인 인증 시도<br />
                3. 서비스 인프라에 대한 DoS/DDoS 공격 및 비정상 트래픽 유발<br />
                4. 디스코드 이용약관(Discord Terms of Service) 및 커뮤니티 가이드라인을 위반하는 행위
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white">제4조 (가상 포인트 및 경제 시스템)</h2>
              <p>
                봇 내에서 획득되는 모든 포인트, 복권, 상점 아이템은 디스코드 서버 내 오락 및 활동 보조를 위한 가상 데이터이며, 실제 현금 또는 유가증권으로의 환전이 엄격히 금지됩니다.
              </p>
            </section>
          </article>
        )}
      </main>
    </div>
  );
}
