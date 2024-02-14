import type {Product} from "@prisma/client";
import prisma from "@/app/prisma/prismaInstance";
import {NextResponse} from "next/server";

export const PATCH = async (request: Request, {params}: {params: {id: string}}) => {
    const body: Product = await request.json();
    const product: Product = await prisma.product.update({
        where: {
            id: Number(params.id)
        },
        data: {
            name: body.name,
            price: body.price,
            quantity: body.quantity
        }
    });

    return NextResponse.json(product, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) => {
    const product: Product = await prisma.product.delete({
        where: {
            id: Number(params.id)
        }
    })

    return NextResponse.json(product, {status: 200});
}