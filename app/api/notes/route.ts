import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import next from "next";

export async function GET()
{
    try {
        const notes = await prisma.note.findMany({
            orderBy: {createdAt: "desc"},
        });
        return NextResponse.json(notes);
    } catch (error) {
        return NextResponse.json(
            {error: "Gagal mengambil catatan"},
            {status: 500},
        );
    }
}

export async function POST(request: Request) 
{
    try {
        const body = await request.json();
        const {text} = body;
        if (!text || typeof text !== "string") {
            return NextResponse.json({error: "Text wajib diisi"}, {status: 400});
        }
        const note = await prisma.note.create({
            data: {
                text,
                isDone: false,
            }
        });
        return NextResponse.json(note, {status: 201});
    } catch (error) {
        return NextResponse.json(
            {error: "Gagal menambah catatan"},
            {status: 500}
        );
    }
}