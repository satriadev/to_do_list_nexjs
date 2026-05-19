import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(reauest: Request, {params}: {params: {id: string}})
{
    try {
        const note = await prisma.note.findUnique({
            where: {id: prisma.id},
        });
        if (!note) {
            return NextResponse.json(
                {error: "Catatan tidak ditemukan"},
                {status: 404},
            );
        }
        return NextResponse.json(note);
    } catch (error) {
        return NextResponse.json(
            {error: "Gagal mengambil catatan"},
            {status: 500},
        );
    }
}

export async function PUT(request: Request, {params}: {params: {id: string}})
{
    try {
        const body = await request.json();
        const {text, isDone} = body;
        const note = await prisma.note.update({
            where: {id: params.id},
            data: {
                ...(text !== undefined && {text}),
                ...(isDone !== undefined && {isDone}),
            },
        });
        return NextResponse.json(note);
    } catch (error) {
        return NextResponse.json(
            {error: "Gagal memperbaharui note"},
            {status: 500},
        );
    }
}

export async function DELETE(request: Request, {params}: {params: {id: string}})
{
    try {
        await prisma.note.delete({
            where: {id: params.id},
        });
        return NextResponse.json({message: "Berhasil menghapus Note"});
    } catch (error) {
        return NextResponse.json(
            {error: "Gagal menghapus note"},
            {status: 500}
        );
    }
}