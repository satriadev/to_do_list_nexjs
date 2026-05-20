import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const note = await prisma.note.findUnique({ where: { id } });
    if (!note) {
      return NextResponse.json({ error: "Catatan tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(note);
  } catch (error) {
    console.error("GET /api/notes/[id] error:", error);
    return NextResponse.json({ error: "Gagal mengambil catatan" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { text, isDone } = body;
    const note = await prisma.note.update({
      where: { id },
      data: {
        ...(text !== undefined && { text }),
        ...(isDone !== undefined && { isDone }),
      },
    });
    return NextResponse.json(note);
  } catch (error) {
    console.error("PUT /api/notes/[id] error:", error); 
    return NextResponse.json({ error: "Gagal mengupdate catatan" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.note.delete({ where: { id } });
    return NextResponse.json({ message: "Catatan dihapus" });
  } catch (error) {
    console.error("DELETE /api/notes/[id] error:", error); 
    return NextResponse.json({ error: "Gagal menghapus catatan" }, { status: 500 });
  }
}