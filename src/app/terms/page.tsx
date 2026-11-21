import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2 } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0d0e10] text-[#dbdee1]">
      <header className="border-b border-white/5 bg-[#111214]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition">
            <ArrowLeft className="h-4 w-4" />
            홈으로 돌아가기
          </Link>
          <div className="font-bold text-white text-sm">Sora 서비스 이용약관</div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Terms of Service</span>
          <h1 className="text-3xl font-extrabold text-white mt-2">서비스 이용약관</h1>
          <p className="text-sm text-neutral-400 mt-2">
            시행일자: 2026년 11월 20일 | Koharu Coding Server (KCS)
          </p>
        </div>

        <section className="space-y-4 text-sm leading-relaxed text-neutral-300">
          <h2 className="text-xl font-bold text-white">제1조 (목적)</h2>
          <p>
            본 약관은 Koharu Coding Server (이하 &quot;KCS&quot;)가 운영하는 디스코드 봇 및 웹 서비스 &quot;Sora&quot;(이하 &quot;서비스&quot;)의
            이용 조건 및 절차, 이용자와 서비스 제공자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-neutral-300">
          <h2 className="text-xl font-bold text-white">제2조 (용어의 정의)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>&quot;서비스&quot;</strong>란 KCS가 개발하여 디스코드 및 웹 환경에서 제공하는 Sora 봇, 슬래시 커맨드, 웹 대시보드 및 일체의 기능을 의미합니다.</li>
            <li><strong>&quot;이용자&quot;</strong>란 디스코드 플랫폼에서 Sora 봇이 초대된 서버에 참여하거나 본 서비스를 이용하는 모든 멤버를 의미합니다.</li>
            <li><strong>&quot;인증 시스템&quot;</strong>이란 Sendwich SMS, Resend 이메일, 캡챠, 버튼 등을 통해 서버 내 권한을 부여하는 보안 절차를 의미합니다.</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-neutral-300">
          <h2 className="text-xl font-bold text-white">제3조 (약관의 효력 및 변경)</h2>
          <p>
            본 약관은 서비스 웹사이트 및 디스코드 공지를 통해 게시함으로써 효력이 발생합니다.
            KCS는 관련 법령을 위배하지 않는 범위 내에서 본 약관을 개정할 수 있으며, 개정 시 시행일자 최소 7일 전 사전 공지합니다.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-neutral-300">
          <h2 className="text-xl font-bold text-white">제4조 (이용자의 의무 및 금지사항)</h2>
          <p>이용자는 다음 각 호의 행위를 하여서는 아니 됩니다:</p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm">
            <li>타인의 전화번호 또는 이메일 주소를 도용하여 부정하게 인증을 시도하는 행위</li>
            <li>서비스의 취약점 공격, 봇 API 과부하 유발, 리버스 엔지니어링 및 비정상적 자동화 트래픽 발생 행위</li>
            <li>디스코드 공식 커뮤니티 가이드라인 및 서비스 약관을 위반하는 행위</li>
            <li>포인트 시스템, 미니게임, 티켓 시스템을 조작하거나 부당하게 이득을 취하는 행위</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-neutral-300">
          <h2 className="text-xl font-bold text-white">제5조 (인증 서비스 이용 규정)</h2>
          <p>
            1. 휴대폰 번호 인증은 주식회사 샌드위치(Sendwich)의 시스템을 통해 진행되며, 이용자는 유효한 본인 명의의 휴대폰 기기로 문자를 발송해야 합니다.<br />
            2. 이메일 인증 코드는 5분간 유효하며, 1회용으로 즉시 소멸합니다.<br />
            3. 부정 가입이나 도용이 적발될 경우 즉시 해당 계정의 서버 퇴장 및 영구 차단 조치가 취해질 수 있습니다.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-neutral-300">
          <h2 className="text-xl font-bold text-white">제6조 (면책 조항)</h2>
          <p>
            1. KCS는 Discord, Sendwich, Resend 등 외부 제3자 서비스의 장애, 점검 또는 정책 변경으로 인해 발생하는 서비스 일시 중단에 대해 책임을 지지 않습니다.<br />
            2. 천재지변, 불가항력적 기술 결함으로 인한 데이터 손실에 대해 고의 또는 중과실이 없는 한 책임을 부담하지 않습니다.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-neutral-300">
          <h2 className="text-xl font-bold text-white">제7조 (준거법 및 재판관할)</h2>
          <p>
            본 약관의 해석 및 분쟁에 관하여는 대한민국 법률을 준거법으로 하며, 소송이 제기될 경우 민사소송법상의 관할 법원을 제1심 법원으로 합니다.
          </p>
        </section>

        <div className="rounded-2xl border border-white/10 bg-[#1e1f22]/70 p-6 text-sm text-neutral-300 space-y-1">
          <p>• <strong>운영 문의:</strong> <a href="mailto:admin@koharu.live" className="text-indigo-400 underline">admin@koharu.live</a></p>
          <p>• <strong>공식 서버:</strong> Koharu Coding Server (KCS)</p>
        </div>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-neutral-500">
        <p>© 2026 Koharu Coding Server (KCS). All rights reserved.</p>
      </footer>
    </div>
  );
}
