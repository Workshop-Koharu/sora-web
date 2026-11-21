import Link from "next/link";
import { Shield, ArrowLeft, Lock, Mail, Phone, Server, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0d0e10] text-[#dbdee1]">
      <header className="border-b border-white/5 bg-[#111214]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition">
            <ArrowLeft className="h-4 w-4" />
            홈으로 돌아가기
          </Link>
          <div className="font-bold text-white text-sm">Sora 개인정보처리방침</div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Legal & Privacy</span>
          <h1 className="text-3xl font-extrabold text-white mt-2">개인정보처리방침</h1>
          <p className="text-sm text-neutral-400 mt-2">
            시행일자: 2026년 11월 20일 | Koharu Coding Server (KCS) — Sora 서비스
          </p>
        </div>

        <section className="space-y-4 text-sm leading-relaxed text-neutral-300">
          <p>
            KCS (Koharu Coding Server, 이하 &quot;서버&quot;)는 Sora 디스코드 봇 및 웹 관리 서비스(이하 &quot;서비스&quot;)를 제공함에 있어
            『개인정보 보호법』, 『정보통신망 이용촉진 및 정보보호 등에 관한 법률』 등 관련 법령을 엄격히 준수하며,
            이용자의 개인정보와 권익을 보호하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>
        </section>

        {/* 1. 수집 항목 및 목적 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-400" />
            1. 수집하는 개인정보 항목 및 이용 목적
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-neutral-300">
            <p>
              서비스는 이용자의 최소한의 개인정보만을 수집하며, 서비스 내 특정 인증 수단 또는 관리자 기능을 사용할 때에만 한정적으로 처리됩니다.
            </p>

            {/* 휴대폰 번호 */}
            <div className="rounded-2xl border border-white/10 bg-[#1e1f22]/70 p-6 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                가. 휴대폰 번호 인증 (주식회사 샌드위치 / Sendwich API 연동)
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-neutral-300 text-xs sm:text-sm">
                <li><strong>수집 항목:</strong> 발신 휴대폰 번호(010-XXXX-XXXX), 통신사(SKT, KT, LGU+ 등), 인증 요청 시각 및 Sendwich 고유 인증 식별자(vrf_id)</li>
                <li><strong>수집 및 이용 목적:</strong> 서버 내 악성 유저 방지, 1인 1계정 본인 점유 확인, 다계정 생성 방지 및 자동 역할 부여</li>
                <li><strong>보유 및 처리 기간:</strong> <strong>인증 판정 완료 즉시 원본 휴대폰 번호는 영구 파기</strong>됩니다. 단, 동일 번호의 중복 어뷰징 재가입 방지를 위해 복원 불가능한 단방향 암호화 해시(SHA-256) 값만 최소한의 기간 동안 분리 보관됩니다.</li>
                <li><strong>제3자 제공 고지:</strong> 번호 점유 확인을 위해 <code>(주)샌드위치 (https://sendwich.kr)</code>에 인증 발신 문자 및 번호가 전송되며, 점유 확인 목적 외에는 일체 사용되지 않습니다.</li>
                <li><strong>동의 거부권:</strong> 이용자는 휴대폰 번호 인증을 거부할 권리가 있으며, 거부 시 휴대폰 인증 전용 역할 부여가 제한될 수 있으나 타 인증 수단(이메일, 캡챠 등)을 이용하실 수 있습니다.</li>
              </ul>
            </div>

            {/* 이메일 */}
            <div className="rounded-2xl border border-white/10 bg-[#1e1f22]/70 p-6 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Mail className="h-4 w-4 text-sky-400" />
                나. 이메일 주소 인증 (Resend API 연동)
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-neutral-300 text-xs sm:text-sm">
                <li><strong>수집 항목:</strong> 이메일 주소, 1회용 6자리 인증 코드(OTP)</li>
                <li><strong>수집 및 이용 목적:</strong> 이메일 소유권 확인을 위한 1회용 인증 번호 발송 및 확인</li>
                <li><strong>보유 및 처리 기간:</strong> <strong>인증 성공 시 즉시 파기</strong>되며, 미인증 시 5분 후 세션 만료와 함께 자동 완전 삭제됩니다.</li>
                <li><strong>제3자 제공 고지:</strong> 인증 메일 발송 대행을 위해 <code>Resend Inc. (https://resend.com)</code>에 수신자 이메일 주소가 전달됩니다. 발신자 주소: <code>admin@koharu.live</code></li>
                <li><strong>동의 거부권:</strong> 이용자는 이메일 입력을 거부할 수 있으며, 이 경우 이메일 인증 기반 역할 부여가 제한됩니다.</li>
              </ul>
            </div>

            {/* 디스코드 기본 정보 */}
            <div className="rounded-2xl border border-white/10 bg-[#1e1f22]/70 p-6 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Server className="h-4 w-4 text-indigo-400" />
                다. 디스코드 계정 기본 정보 (OAuth2 및 Gateway)
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-neutral-300 text-xs sm:text-sm">
                <li><strong>수집 항목:</strong> 디스코드 유저 ID(Snowflake), 유저명(Username), 프로필 아바타 식별자, 서버 내 보유 역할 및 관리자 권한</li>
                <li><strong>수집 및 이용 목적:</strong> 서버 멤버 식별, 슬래시 커맨드 권한 검증, 포인트 경제 기록, 위키 작성자 표기, 티켓 문의자 연결</li>
                <li><strong>보유 기간:</strong> 이용자가 디스코드 서버를 탈퇴하거나 서비스 데이터 초기화 요청 시까지 보관</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. 개인정보의 제3자 제공 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="h-5 w-5 text-indigo-400" />
            2. 개인정보의 제3자 제공에 관한 사항
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border border-white/10 rounded-xl overflow-hidden">
              <thead className="bg-white/5 text-neutral-300 border-b border-white/10">
                <tr>
                  <th className="p-3">제공받는 자</th>
                  <th className="p-3">제공 목적</th>
                  <th className="p-3">제공 항목</th>
                  <th className="p-3">보유 및 이용 기간</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-400">
                <tr>
                  <td className="p-3 text-white font-medium">(주)샌드위치 (Sendwich)</td>
                  <td className="p-3">SMS 문자 발신 및 번호 점유 확인</td>
                  <td className="p-3">휴대폰 번호, 인증 문자 내용</td>
                  <td className="p-3">Sendwich 처리 규정에 따름 (확인 후 즉시 파기)</td>
                </tr>
                <tr>
                  <td className="p-3 text-white font-medium">Resend Inc.</td>
                  <td className="p-3">이메일 인증 코드 발송 대행</td>
                  <td className="p-3">수신 이메일 주소</td>
                  <td className="p-3">메일 전송 완료 시점까지</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. 파기 절차 및 파기 방법 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-indigo-400" />
            3. 개인정보 파기 절차 및 방법
          </h2>
          <div className="space-y-2 text-sm leading-relaxed text-neutral-300">
            <p>
              원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
              <li><strong>파기 절차:</strong> 이용자가 인증을 완료하거나 세션이 만료된 즉시 해당 메모리 및 임시 데이터베이스에서 영구 삭제됩니다.</li>
              <li><strong>파기 방법:</strong> 전자적 파일 형태로 저장된 개인정보는 재생할 수 없는 기술적 방법을 사용하여 영구 삭제합니다.</li>
            </ul>
          </div>
        </section>

        {/* 4. 정보주체의 권리 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-400" />
            4. 정보주체와 법정대리인의 권리 및 행사 방법
          </h2>
          <p className="text-sm leading-relaxed text-neutral-300">
            이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리 정지를 요구할 수 있습니다.
            디스코드 서버 탈퇴 시 관련 세션 데이터는 파기되며, 추가적인 데이터 삭제 요청은 아래 개인정보 보호책임자 이메일을 통해 접수하실 수 있습니다.
          </p>
        </section>

        {/* 5. 개인정보 보호책임자 */}
        <section className="rounded-2xl border border-white/10 bg-[#1e1f22]/70 p-6 space-y-3">
          <h2 className="text-lg font-bold text-white">5. 개인정보 보호책임자 및 문의처</h2>
          <div className="text-sm text-neutral-300 space-y-1">
            <p>• <strong>서비스명:</strong> Sora (소라) — Koharu Coding Server</p>
            <p>• <strong>책임자 / 담당 부서:</strong> KCS 개인정보보호팀</p>
            <p>• <strong>전자우편 문의:</strong> <a href="mailto:admin@koharu.live" className="text-indigo-400 underline font-medium">admin@koharu.live</a></p>
            <p className="text-xs text-neutral-500 mt-2">
              개인정보 보호 관련 고충이나 침해 신고에 대해 성실하고 신속하게 답변해 드립니다.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-neutral-500">
        <p>© 2026 Koharu Coding Server (KCS). All rights reserved.</p>
      </footer>
    </div>
  );
}
