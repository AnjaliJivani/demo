import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const student = await prisma.student.findMany();
  return NextResponse.json(student);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newStudent = await prisma.student.create({
    data: {
      name: body.name,
      enrollno:body.enrollno,
    },
  });

  return NextResponse.json(newStudent);
}
