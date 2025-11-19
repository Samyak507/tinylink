import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const { url, code } = await req.json();

  if (!isValidUrl(url)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
    return NextResponse.json({ error: "Invalid code format" }, { status: 400 });
  }

  const exists = await prisma.link.findUnique({ where: { code } });
  if (exists) {
    return NextResponse.json({ error: "Code already exists" }, { status: 409 });
  }

  const created = await prisma.link.create({
    data: { url, code },
  });

  return NextResponse.json(created, { status: 201 });
}

export async function GET() {
  const data = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(data);
}
