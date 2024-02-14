import prisma from "@/app/prisma/prismaInstance";
import type {Product} from "@prisma/client";
import {NextResponse} from "next/server";

export const GET = async () => {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            quantity: true
        }
    });

    return NextResponse.json(products, {status: 200})
}

export const POST = async (request: Request) => {
    const body: Product = await request.json()
    const product = await prisma.product.create({
       data: {
           name: body.name,
           price: body.price,
           quantity: body.quantity
       }
    });

    return NextResponse.json(product, {status: 201});
}
