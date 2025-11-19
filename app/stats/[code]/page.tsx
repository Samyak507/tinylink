import { prisma } from "@/app/lib/prisma";

export default async function StatsPage(props: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await props.params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-semibold">Not Found</h1>
        <p className="text-gray-600 mt-2">No link exists with this code.</p>
      </div>
    );
  }

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">Stats for: {code}</h1>

      <div className="space-y-2">
        <p>
          <strong>Target URL:</strong> {link.url}
        </p>

        <p>
          <strong>Total Clicks:</strong> {link.totalClicks}
        </p>

        <p>
          <strong>Last Clicked:</strong>{" "}
          {link.lastClicked?.toString() || "Never"}
        </p>

        <p>
          <strong>Created At:</strong> {link.createdAt.toString()}
        </p>
      </div>
    </div>
  );
}
