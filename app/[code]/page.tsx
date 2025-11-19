import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

export default async function RedirectPage(props: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await props.params; // 🔥 Turbopack requires this

  const link = await prisma.link.findUnique({ where: { code } });

  if (!link) {
    return <h1 className="text-center p-20 text-2xl">404 - Link not found</h1>;
  }

  await prisma.link.update({
    where: { code },
    data: {
      totalClicks: { increment: 1 },
      lastClicked: new Date(),
    },
  });

  redirect(link.url);
}
