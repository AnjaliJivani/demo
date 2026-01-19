import { NextResponse } from "next/server";
import prisma from "@/prisma";

export async function GET() {
  const students = await prisma.student.findMany();
  return NextResponse.json(students);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newStudent = await prisma.student.create({
    data: {
      name: body.name,
      enrollno: body.enrollno,
    },
  });

  return NextResponse.json(newStudent);
}
