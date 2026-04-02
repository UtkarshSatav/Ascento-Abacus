import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const sections = await prisma.section.findMany({
      include: {
        class: {
          include: { domain: true },
        },
      },
      orderBy: { class: { name: "asc" } },
    });

    return NextResponse.json(
      sections.map((s) => ({
        id: s.id,
        name: `${s.class.name} - ${s.name}`,
        className: s.class.name,
        sectionName: s.name,
        domain: s.class.domain.name,
      }))
    );
  } catch (error) {
    console.error("Failed to fetch sections:", error);
    return NextResponse.json({ error: "Failed to fetch sections" }, { status: 500 });
  }
}
