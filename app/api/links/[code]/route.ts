import { prisma } from "@/app/lib/prisma";

export async function DELETE(
  req: Request,
  props: { params: Promise<{ code: string }> }
) {
  const { code } = await props.params; // 🔥 correct for Next.js 16

  try {
    await prisma.link.delete({
      where: { code },
    });

    return new Response("Deleted", { status: 200 });
  } catch (err) {
    return new Response("Error deleting link", { status: 500 });
  }
}
