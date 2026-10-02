import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon, type IconName } from "@/components/ui/icon";
import {
  programUnggulan,
  budayaLokal,
  kemitraanSekolah,
  visiMisi,
  schoolDataYear,
} from "@/data/profile";

export const metadata: Metadata = {
  title: "Kurikulum & Pembelajaran",
  description:
    `Ringkasan kurikulum dan program UPTD SMPN SATAP 4 BARRU berdasarkan data Tahun Pelajaran ${schoolDataYear}.`,
};

const profilLulusanDimensi: {
  title: string;
  description: string;
  icon: IconName;
}[] = [
  {
    title: "Keimanan & Ketakwaan",
    description: "Beriman dan bertakwa kepada Tuhan Yang Maha Esa serta berakhlak mulia dalam ucapan dan tindakan.",
    icon: "heart",
  },
  {
    title: "Kewargaan",
    description: "Memiliki rasa cinta tanah air, kesadaran hukum, dan tanggung jawab sosial sebagai warga negara.",
    icon: "globe",
  },
  {
    title: "Penalaran Kritis",
    description: "Mampu memproses informasi secara objektif, menganalisis, mengevaluasi, dan menyimpulkan.",
    icon: "award",
  },
  {
    title: "Kreativitas",
    description: "Mampu memodifikasi dan menghasilkan sesuatu yang orisinal, bermakna, bermanfaat, dan berdampak.",
    icon: "sparkles",
  },
  {
    title: "Kolaborasi",
    description: "Mampu bekerja sama, saling melengkapi, bergotong royong, dan peduli terhadap sesama.",
    icon: "users",
  },
  {
    title: "Kemandirian",
    description: "Prakarsa atas pengembangan dirinya yang didasari pada pengenalan kekuatan serta keterbatasan dirinya.",
    icon: "compass",
  },
  {
    title: "Kesehatan Jasmani & Rohani",
    description: "Menjaga kebugaran fisik melalui aktivitas olahraga serta ketenangan jiwa melalui ibadah.",
    icon: "shield",
  },
  {
    title: "Komunikasi",
    description: "Mampu mengekspresikan gagasan secara efektif dan santun dengan tetap menjunjung etika Bugis.",
    icon: "chat",
  },
];

const pilarPembelajaran = [
  {
    title: "Pembelajaran Berdiferensiasi",
    badge: "Personalisasi Belajar",
    description:
      "Guru menyusun materi, proses, dan produk belajar yang disesuaikan dengan kesiapan, minat, serta gaya belajar beragam yang dimiliki peserta didik di Dusun Banga-banga.",
    points: [
      "Pemetaan diagnostik berkala di awal pembelajaran",
      "Penyediaan bahan ajar berjenjang (visual, auditori, kinestetik)",
      "Pendampingan khusus bagi siswa yang membutuhkan motivasi ekstra",
    ],
  },
  {
    title: "Pembelajaran Berbasis Teknologi",
    badge: "Digitalisasi & TIK",
    description:
      "Pemanfaatan sarana laboratorium komputer, Chromebook, dan media interaktif agar peserta didik terbiasa dengan ekosistem digital abad ke-21.",
    points: [
      "Integrasi media presentasi interaktif dan video pembelajaran",
      "Pelatihan literasi digital dan komputasi dasar",
      "Simulasi mandiri untuk asesmen dan pengolahan data sederhana",
    ],
  },
  {
    title: "Pembelajaran Berbasis Projek (PBL)",
    badge: "Solutif & Nyata",
    description:
      "Peserta didik dilatih menyelesaikan masalah nyata di lingkungan sekitar sekolah: pengolahan sampah organik, kreasi pangan lokal, hingga pembuatan hasta karya.",
    points: [
      "Mengangkat permasalahan nyata lingkungan Banga-banga",
      "Kolaborasi tim lintas mata pelajaran",
      "Pameran karya dan gelar karya projek peserta didik",
    ],
  },
  {
    title: "Projek Penguatan Profil Pelajar Pancasila (P5)",
    badge: "Kokurikuler 20-30%",
    description:
      "Kegiatan kokurikuler yang dirancang terpisah dari intrakurikuler untuk memperkuat karakter luhur Pancasila melalui tema kontekstual seperti kearifan lokal dan gaya hidup berkelanjutan.",
    points: [
      "Alokasi waktu fleksibel 20%–30% dari total jam pelajaran reguler",
      "Tema Kearifan Lokal: Melestarikan tradisi Bugis Banga-banga",
      "Tema Gaya Hidup Berkelanjutan: Pengelolaan sampah & penghijauan",
    ],
  },
];

const pembiasaanKeagamaan = [
  {
    title: "Baca Tulis Al-Qur'an (BTQ) Terpadu",
    schedule: "Setiap Hari Sebelum KBM",
    description:
      "Pembiasaan membaca dan menulis Al-Qur'an secara tartil untuk memperkuat literasi keislaman dan pemahaman makhrajul huruf seluruh peserta didik.",
  },
  {
    title: "Shalat Berjamaah Akhir Jam Pelajaran",
    schedule: "Senin s.d. Kamis Siang",
    description:
      "Seluruh warga sekolah menunaikan shalat Zhuhur berjamaah di musholla sekolah, melatih kedisiplinan waktu, kekompakan, dan ketundukan kepada Allah SWT.",
  },
  {
    title: "Jumat Religi & Sedekah Berbagi",
    schedule: "Setiap Hari Jumat Pagi",
    description:
      "Kegiatan zikir, yasinan bersama, tausiyah singkat karakter, serta pengumpulan infaq sukarela untuk membantu warga atau siswa yang membutuhkan.",
  },
  {
    title: "Peringatan Hari Besar Islam (PHBI)",
    schedule: "Sesuai Kalender Hijriah",
    description:
      "Peringatan Maulid Nabi Muhammad SAW, Isra Mi'raj, dan Tahun Baru Hijriah dengan melibatkan partisipasi aktif orang tua dan pengurus masjid desa.",
  },
];

export default function KurikulumPage() {
  return (
    <>
      <PageHeader
        title="Kurikulum & Pembelajaran"
        description={`Ringkasan ini berdasarkan data sekolah Tahun Pelajaran ${schoolDataYear}. Pelaksanaan program tahun berjalan dapat berubah; hubungi sekolah untuk konfirmasi.`}
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Kurikulum & Pembelajaran" }]}
      />

      {/* Rangkuman Kurikulum Merdeka Fase D */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Kerangka Pendidikan"
              title="Implementasi Kurikulum Merdeka Fase D"
              description="Kurikulum operasional yang diselaraskan dengan potensi lokal, kondisi peserta didik, dan kearifan masyarakat Banga-banga Desa Anabanua."
            />
            <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">
              UPTD SMPN SATAP 4 BARRU menerapkan Kurikulum Merdeka pada jenjang <strong>Fase D
              (Kelas VII, VIII, dan IX)</strong>.
              Kurikulum ini dirancang berakar pada filosofi merdeka belajar: mengutamakan pemahaman mendalam,
              pengembangan karakter, serta kecakapan praktis (life skills) peserta didik.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/kontak" withArrow>
                Tanya Informasi Kurikulum
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-line bg-surface p-7 shadow-xl shadow-brand-950/5">
              <span className="inline-block rounded-full bg-tint px-3.5 py-1 text-xs font-bold text-accent">
                Visi Kurikulum
              </span>
              <blockquote className="mt-4 text-lg font-extrabold leading-snug tracking-tight text-heading">
                “{visiMisi.visi}”
              </blockquote>
              <div className="mt-6 space-y-4 border-t border-line pt-6 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-muted">Sasaran Jenjang</span>
                  <span className="font-bold text-heading">Fase D (Kelas 7, 8, 9)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-muted">Alokasi P5 Kokurikuler</span>
                  <span className="font-bold text-heading">20% – 30% Jam Pelajaran</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-muted">Pendekatan Belajar</span>
                  <span className="font-bold text-heading">Berdiferensiasi & Kontekstual</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-muted">Budaya Pembiasaan</span>
                  <span className="font-bold text-heading">5S, BTQ, Shalat Berjamaah</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 8 Dimensi Profil Lulusan */}
      <Section tint>
        <SectionHeading
          eyebrow="Profil Lulusan"
          title="Delapan Dimensi Profil Lulusan Abad ke-21"
          description="Arah pembentukan karakter dan kompetensi peserta didik UPTD SMPN SATAP 4 BARRU."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {profilLulusanDimensi.map((dimensi, i) => (
            <div
              key={dimensi.title}
              className="group flex flex-col rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tint text-accent">
                <Icon name={dimensi.icon} size={20} />
              </div>
              <span className="mt-4 text-xs font-bold uppercase tracking-wider text-muted">
                Dimensi 0{i + 1}
              </span>
              <h3 className="mt-1 text-base font-bold text-heading">{dimensi.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{dimensi.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pilar Pembelajaran Berdiferensiasi & Berbasis Projek */}
      <Section>
        <SectionHeading
          eyebrow="Strategi Pembelajaran"
          title="Pendekatan Pembelajaran Bermakna"
          description="Menjawab keragaman minat, potensi fisik, dan latar belakang keluarga peserta didik."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {pilarPembelajaran.map((pilar) => (
            <div
              key={pilar.title}
              className="flex flex-col justify-between rounded-3xl border border-line bg-surface p-7 shadow-sm transition-all hover:border-accent/40"
            >
              <div>
                <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-accent">
                  {pilar.badge}
                </span>
                <h3 className="mt-4 text-xl font-bold text-heading">{pilar.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{pilar.description}</p>
              </div>
              <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                {pilar.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-body">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-gold-500" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* 7 Program Unggulan Sekolah */}
      <Section tint id="program-unggulan">
        <SectionHeading
          eyebrow="Keunggulan Sekolah"
          title="Tujuh Program Unggulan UPTD SMPN SATAP 4 BARRU"
          description="Inisiatif terdepan yang membedakan layanan pendidikan di Dusun Banga-banga."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programUnggulan.map((prog) => (
            <div
              key={prog.no}
              className="flex flex-col rounded-3xl border border-line bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-gold-500">{prog.no}</span>
                <span className="rounded-full bg-tint px-2.5 py-0.5 text-[11px] font-bold text-accent">
                  {prog.category}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-heading">{prog.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{prog.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Kegiatan Keagamaan Intensif */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Kegiatan Keagamaan"
              title="Pembiasaan Karakter Religius & Baca Tulis Al-Qur'an"
              description="Pembiasaan keagamaan mendukung pendidikan akhlak dan nilai spiritual di lingkungan sekolah."
            />
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              Meskipun berstatus sekolah negeri umum, UPTD SMPN SATAP 4 BARRU memberikan porsi
              pembiasaan religius yang konsisten setiap hari. Melalui bimbingan guru PAI dan seluruh dewan guru,
              peserta didik dibimbing membaca Al-Qur&apos;an secara benar, berakhlak mulia, dan istiqamah menjalankan ibadah.
            </p>
            <div className="mt-6 rounded-2xl bg-tint p-5">
              <h4 className="flex items-center gap-2 text-sm font-bold text-accent">
                <Icon name="heart" size={16} />
                Budaya 5S Sekolah
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-body">
                Warga sekolah mempraktikkan <strong>Senyum, Sapa, Salam, Sopan, dan Santun</strong> kepada guru,
                orang tua, teman, dan setiap tamu yang berkunjung ke sekolah.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {pembiasaanKeagamaan.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">
                    {item.schedule}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-heading">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Pelestarian Budaya Lokal Banga-banga */}
      <Section>
        <SectionHeading
          eyebrow="Kearifan Lokal"
          title="Budaya Lokal Banga-banga & Anabanua"
          description="Mengintegrasikan kekayaan tradisi Bugis ke dalam nafas kurikulum dan pendidikan karakter."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {budayaLokal.map((budaya) => (
            <div
              key={budaya.title}
              className="rounded-3xl border border-line bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-tint text-accent">
                <Icon name={budaya.icon} size={20} />
              </div>
              <h3 className="mt-5 text-base font-bold text-heading">{budaya.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{budaya.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Kemitraan Sekolah */}
      <Section tint>
        <SectionHeading
          eyebrow="Kolaborasi"
          title="Kemitraan Pendukung Layanan Pendidikan"
          description="Membangun ekosistem belajar yang kuat bersama institusi pelayanan publik dan masyarakat."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {kemitraanSekolah.map((mitra) => (
            <div
              key={mitra.name}
              className="rounded-3xl border border-line bg-surface p-7 shadow-sm transition-all hover:border-accent/40"
            >
              <span className="inline-block rounded-full bg-tint px-3 py-1 text-xs font-bold text-accent">
                {mitra.role}
              </span>
              <h3 className="mt-4 text-xl font-bold text-heading">{mitra.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{mitra.description}</p>
            </div>
          ))}
        </div>
      </Section>

    </>
  );
}
