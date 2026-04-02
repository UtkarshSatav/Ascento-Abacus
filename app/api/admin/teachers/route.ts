import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        user: {
          select: {
            email: true,
            name: true,
            avatarUrl: true,
          },
        },
        subjects: {
          include: {
            subject: {
              select: {
                id: true,
                code: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(teachers);
  } catch (error) {
    console.error("List teachers error:", error);
    return NextResponse.json(
      { error: "Failed to fetch teachers" },
      { status: 500 }
    );
  }
}
