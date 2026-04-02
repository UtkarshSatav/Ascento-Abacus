import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const examId = searchParams.get("examId");

    if (!examId) {
      return NextResponse.json(
        { error: "examId query parameter is required" },
        { status: 400 }
      );
    }

    const marks = await prisma.mark.findMany({
      where: { examId },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            rollNumber: true,
            studentId: true,
          },
        },
        subject: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
        exam: {
          select: {
            id: true,
            examName: true,
          },
        },
      },
      orderBy: [
        { student: { fullName: "asc" } },
        { subject: { name: "asc" } },
      ],
    });

    return NextResponse.json(marks);
  } catch (error) {
    console.error("Get marks error:", error);
    return NextResponse.json(
      { error: "Failed to fetch marks" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, examId, subjectId, marksObtained, totalMarks } = body;

    if (!studentId || !examId || !subjectId || totalMarks === undefined) {
      return NextResponse.json(
        { error: "studentId, examId, subjectId, and totalMarks are required" },
        { status: 400 }
      );
    }

    const mark = await prisma.mark.upsert({
      where: {
        studentId_examId_subjectId: {
          studentId,
          examId,
          subjectId,
        },
      },
      update: {
        marksObtained,
        totalMarks,
      },
      create: {
        studentId,
        examId,
        subjectId,
        marksObtained,
        totalMarks,
      },
    });

    return NextResponse.json(mark);
  } catch (error) {
    console.error("Upsert marks error:", error);
    return NextResponse.json(
      { error: "Failed to save marks" },
      { status: 500 }
    );
  }
}
