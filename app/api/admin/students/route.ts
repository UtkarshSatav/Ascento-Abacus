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

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { students } = body;

    if (!students || !Array.isArray(students) || students.length === 0) {
      return NextResponse.json(
        { error: "A non-empty students array is required" },
        { status: 400 }
      );
    }

    const year = new Date().getFullYear();

    const result = await prisma.$transaction(async (tx) => {
      const lastStudent = await tx.student.findFirst({
        where: {
          studentId: { startsWith: `AA-${year}-` },
        },
        orderBy: { studentId: "desc" },
      });

      let seq = 1;
      if (lastStudent?.studentId) {
        const parts = lastStudent.studentId.split("-");
        const lastSeq = parseInt(parts[2], 10);
        if (!isNaN(lastSeq)) {
          seq = lastSeq + 1;
        }
      }

      let count = 0;

      for (const s of students) {
        const email =
          s.email || `student.${year}.${seq}@ascento-abacus.local`;
        const studentId = `AA-${year}-${String(seq).padStart(4, "0")}`;

        const user = await tx.user.create({
          data: {
            email,
            name: s.fullName,
            role: "student",
          },
        });

        const student = await tx.student.create({
          data: {
            userId: user.id,
            studentId,
            rollNumber: s.rollNumber,
            fullName: s.fullName,
            dateOfBirth: s.dateOfBirth ? new Date(s.dateOfBirth) : undefined,
            gender: s.gender,
            bloodGroup: s.bloodGroup,
            phone: s.phone,
            address: s.address,
            city: s.city,
            state: s.state,
            parentName: s.parentName,
            parentPhone: s.parentPhone,
            parentEmail: s.parentEmail,
          },
        });

        if (s.sectionId) {
          await tx.enrollment.create({
            data: {
              studentId: student.id,
              sectionId: s.sectionId,
              academicYear:
                s.academicYear || new Date().getFullYear().toString(),
            },
          });
        }

        seq++;
        count++;
      }

      return count;
    });

    return NextResponse.json({ success: true, count: result }, { status: 201 });
  } catch (error) {
    console.error("Bulk create students error:", error);
    return NextResponse.json(
      { error: "Failed to bulk create students" },
      { status: 500 }
    );
  }
}
