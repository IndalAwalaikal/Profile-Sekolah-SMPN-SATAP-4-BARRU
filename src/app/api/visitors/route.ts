import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

interface VisitorData {
  total: number;
  today: number;
  month: number;
  lastDate: string;
  lastMonth: string;
}

const dataFilePath = path.join(process.cwd(), "src", "data", "visitors.json");

function getStoredData(): VisitorData {
  try {
    if (fs.existsSync(dataFilePath)) {
      const content = fs.readFileSync(dataFilePath, "utf8");
      return JSON.parse(content);
    }
  } catch {
    // fallback to fresh counters
  }
  const now = new Date();
  return {
    total: 0,
    today: 0,
    month: 0,
    lastDate: now.toISOString().slice(0, 10),
    lastMonth: now.toISOString().slice(0, 7),
  };
}

function saveData(data: VisitorData): void {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch {
    // ignore in read-only environments
  }
}

/**
 * Reset counter harian / bulanan jika tanggal atau bulan sudah berganti.
 * Counter `today` di-reset ke 0 setiap hari baru.
 * Counter `month` di-reset ke 0 setiap bulan baru.
 */
function normalizeDates(data: VisitorData): VisitorData {
  const now = new Date();
  const currentDate = now.toISOString().slice(0, 10);
  const currentMonth = now.toISOString().slice(0, 7);

  let updated = false;

  if (data.lastMonth !== currentMonth) {
    data.month = 0;
    data.lastMonth = currentMonth;
    updated = true;
  }

  if (data.lastDate !== currentDate) {
    data.today = 0;
    data.lastDate = currentDate;
    updated = true;
  }

  if (updated) {
    saveData(data);
  }

  return data;
}

/** GET — ambil data pengunjung tanpa menambahkan hitungan. */
export async function GET() {
  const data = normalizeDates(getStoredData());

  return NextResponse.json({
    total: data.total,
    today: data.today,
    month: data.month,
  });
}

/**
 * POST — catat 1 kunjungan baru.
 * Dipanggil dari client hanya ketika belum pernah tercatat
 * pada sesi browser yang sama (sessionStorage guard) atau
 * jika sudah lebih dari 10 menit sejak kunjungan terakhir.
 */
export async function POST() {
  const data = normalizeDates(getStoredData());

  data.total += 1;
  data.today += 1;
  data.month += 1;

  saveData(data);

  return NextResponse.json({
    total: data.total,
    today: data.today,
    month: data.month,
  });
}
