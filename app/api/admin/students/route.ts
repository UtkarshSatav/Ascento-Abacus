import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const students = await prisma.student.findMany({
      include: {
        user: {
          select: { email: true, avatarUrl: true },
        },
        enrollments: {
          include: {
            section: {
              include: {
                class: {
                  include: { domain: true },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error("List students error:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      name,
      studentId,
      rollNumber,
      fullName,
      dateOfBirth,
      gender,
      bloodGroup,
      phone,
      address,
      city,
      state,
      parentName,
      parentPhone,
      parentEmail,
      sectionId,
      academicYear,
    } = body;

    if (!email || !fullName) {
      return NextResponse.json(
        { error: "Email and fullName are required" },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          name: name || fullName,
          role: "student",
        },
      });

      const student = await tx.student.create({
        data: {
          userId: user.id,
          studentId,
          rollNumber,
          fullName,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
          gender,
          bloodGroup,
          phone,
          address,
          city,
          state,
          parentName,
          parentPhone,
          parentEmail,
        },
      });

      let enrollment = null;
      if (sectionId) {
        enrollment = await tx.enrollment.create({
          data: {
            studentId: student.id,
            sectionId,
            academicYear: academicYear || new Date().getFullYear().toString(),
          },
        });
      }

      return { user, student, enrollment };
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Create student error:", error);
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}
