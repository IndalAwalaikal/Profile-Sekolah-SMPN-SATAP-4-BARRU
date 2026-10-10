import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tanya Jawab",
  description: "Jawaban atas pertanyaan umum tentang PPDB, pembelajaran, dan layanan UPTD SMPN SATAP 4 BARRU.",
};

const faqGroups = [
  {
    id: "ppdb",
    title: "Penerimaan Peserta Didik Baru",
    items: [
      {
        question: "Bagaimana mendapatkan informasi PPDB terbaru?",
        answer: "Jadwal dan persyaratan dapat berubah setiap tahun. Periksa halaman PPDB atau hubungi sekolah untuk mendapatkan informasi resmi terbaru.",
        href: "/ppdb",
        linkLabel: "Lihat informasi PPDB",
      },
      {
        question: "Bagaimana menghubungi panitia PPDB?",
        answer: "Gunakan informasi kontak sekolah pada halaman Kontak untuk menanyakan jadwal, persyaratan, dan proses pendaftaran.",
        href: "/kontak",
        linkLabel: "Buka halaman Kontak",
      },
    ],
  },
  {
    id: "pembelajaran",
    title: "Pembelajaran & Kegiatan",
    items: [
      {
        question: "Kurikulum apa yang digunakan sekolah?",
        answer: "Sekolah menyelenggarakan Kurikulum Merdeka Fase D untuk kelas VII, VIII, dan IX. Informasi program pembelajaran tersedia di halaman Kurikulum.",
        href: "/kurikulum",
        linkLabel: "Lihat Kurikulum & Pembelajaran",
      },
      {
        question: "Di mana melihat jadwal kegiatan sekolah?",
        answer: "Agenda akademik dan kegiatan sekolah dapat dilihat pada halaman Agenda. Periksa kembali halaman tersebut untuk informasi terbaru.",
        href: "/agenda",
        linkLabel: "Lihat Agenda",
      },
    ],
  },
  {
    id: "layanan",
    title: "Kunjungan & Dokumen",
    items: [
      {
        question: "Di mana lokasi sekolah dan kapan jam layanannya?",
        answer: `${siteConfig.address}. Jam layanan: ${siteConfig.officeHours}. Hubungi sekolah sebelum berkunjung untuk memastikan layanan yang tersedia.`,
        href: "/kontak",
        linkLabel: "Lihat peta dan kontak",
      },
      {
        question: "Bagaimana mendapatkan dokumen publik sekolah?",
        answer: "Dokumen yang telah diverifikasi untuk dibagikan akan dikelompokkan di halaman Unduhan. Jika berkas yang dicari belum tersedia, silakan hubungi sekolah.",
        href: "/unduhan",
        linkLabel: "Buka Pusat Dokumen",
      },
    ],
  },
] as const;

export default function FAQPage() {
  return (
    <>
      <PageHeader
        title="Tanya Jawab"
        description="Informasi singkat tentang penerimaan, pembelajaran, dan layanan sekolah."
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Tanya Jawab" }]}
      />
      <Section>
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Pusat Bantuan"
            title="Pertanyaan yang Sering Diajukan"
            description="Pilih pertanyaan untuk membaca jawabannya. Untuk kepastian informasi, silakan hubungi sekolah."
          />
          <div className="mt-10 space-y-9">
            {faqGroups.map((group) => (
              <section key={group.id} aria-labelledby={`faq-${group.id}`}>
                <h2 id={`faq-${group.id}`} className="mb-4 text-lg font-extrabold text-heading">{group.title}</h2>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <details key={item.question} className="content-card group p-5 sm:p-6">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-bold leading-6 text-heading focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                        {item.question}
                        <span aria-hidden="true" className="shrink-0 rounded-full bg-tint px-2 py-0.5 text-accent group-open:rotate-45">＋</span>
                      </summary>
                      <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">{item.answer}</p>
                      <Link href={item.href} className="mt-3 inline-flex min-h-11 items-center font-bold text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                        {item.linkLabel}
                      </Link>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-line bg-tint p-6 text-center sm:p-8">
            <h2 className="text-xl font-extrabold text-heading">Belum menemukan jawaban?</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Hubungi sekolah untuk menanyakan informasi lebih lanjut.</p>
            <div className="mt-5 flex justify-center"><ButtonLink href="/kontak" withArrow>Hubungi Sekolah</ButtonLink></div>
          </div>
        </div>
      </Section>
    </>
  );
}
