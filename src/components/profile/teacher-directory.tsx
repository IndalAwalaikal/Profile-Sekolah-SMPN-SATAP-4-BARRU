"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { teachers } from "@/data/profile";
import type { Teacher, TeacherGroup } from "@/types";
import { Icon } from "@/components/ui/icon";
import { ShimmerImage } from "@/components/ui/shimmer-image";

const groupMeta: Record<TeacherGroup, { title: string; eyebrow: string }> = {
  kepala: { title: "Kepala Sekolah", eyebrow: "Pimpinan" },
  waka: { title: "Wakil Kepala Sekolah", eyebrow: "Manajemen" },
  guru: { title: "Guru Mata Pelajaran", eyebrow: "Pendidik" },
  staf: { title: "Staf Tata Usaha", eyebrow: "Kependidikan" },
};

const groups: TeacherGroup[] = ["kepala", "waka", "guru", "staf"];

/** Direktori guru & staf: klik kartu untuk membuka modal profil detail. */
export function TeacherDirectory() {
  const [selected, setSelected] = useState<Teacher | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  return (
    <>
      <div className="space-y-16">
        {groups.map((group) => {
          const members = teachers.filter((t) => t.group === group);
          const meta = groupMeta[group];
          return (
            <div key={group}>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-accent">
                  {meta.eyebrow}
                </p>
                <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-heading">
                  {meta.title}
                </h2>
              </div>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {members.map((teacher) => (
                  <li key={teacher.name}>
                    <button
                      type="button"
                      onClick={() => setSelected(teacher)}
                      aria-label={`Lihat profil ${teacher.name}`}
                      className="group w-full overflow-hidden rounded-2xl border border-line bg-surface text-left transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-950/10"
                    >
                      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-tint">
                        {teacher.image ? (
                          <ShimmerImage
                            src={teacher.image}
                            alt={teacher.name}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <span aria-hidden="true" className="text-6xl font-extrabold text-accent">
                            {teacher.name.trim().charAt(0)}
                          </span>
                        )}
                        <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-brand-950/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[12px] font-bold text-white ring-1 ring-white/25 backdrop-blur-sm">
                            <Icon name="users" size={13} />
                            Lihat Profil
                          </span>
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="text-[15px] font-bold leading-snug text-heading">
                          {teacher.name}
                        </h3>
                        <p className="mt-1 text-[13px] font-semibold text-accent">
                          {teacher.role}
                        </p>
                        {teacher.subjects ? (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {teacher.subjects.map((subject) => (
                              <span
                                key={subject}
                                className="rounded-full bg-tint px-2.5 py-0.5 text-[11px] font-bold text-accent"
                              >
                                {subject}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* modal profil guru */}
      {selected ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Profil ${selected.name}`}
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-brand-950/70 backdrop-blur-sm animate-fade-in" />
          <div
            className="relative w-full max-w-md animate-scale-in overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Tutup profil"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand-950/60 text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-brand-950"
            >
              <Icon name="close" size={16} />
            </button>
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-tint">
              {selected.image ? (
                <>
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    fill
                    sizes="448px"
                    quality={90}
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
                </>
              ) : (
                <span aria-hidden="true" className="text-7xl font-extrabold text-accent">
                  {selected.name.trim().charAt(0)}
                </span>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-extrabold tracking-tight text-heading">
                {selected.name}
              </h3>
              <p className="mt-1 text-sm font-bold text-accent">{selected.role}</p>
              {selected.subjects ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selected.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="rounded-full bg-tint px-3 py-1 text-[12px] font-bold text-accent"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              ) : null}
              <dl className="mt-5 space-y-2.5 border-t border-line pt-5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 font-semibold text-muted">
                    <Icon name="book-open" size={14} className="text-brand-400" />
                    Jam Mengajar
                  </dt>
                  <dd className="font-bold text-heading">{selected.hours ?? "–"}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
