import LinkForm from "./components/LinkForm";
import LinksTable from "./components/LinksTable";
import { prisma } from "./lib/prisma";

export default async function Dashboard() {
  const links = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold">TinyLink</h1>
      <LinkForm />
      <LinksTable links={links} />
    </div>
  );
}
