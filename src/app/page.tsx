import Add from "@/app/add";
import Update from "@/app/update";
import Delete from "@/app/delete";
import prisma from "@/app/prisma/prismaInstance";
import {ProductDto} from "@/app/dto/Product";

export const dynamic = "force-dynamic";

async function getProduct() {
    return prisma.product.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            quantity: true
        },
        orderBy: {
            id: 'asc'
        }
    });
}

function formatAmount(amount: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
}

const Home = async () => {

    const products: ProductDto[] = await getProduct();

    return (
        <>
            <div className="text-center pt-14">
                <h1 className="font-bold text-3xl">Simple CRUD NextJS Prisma</h1>
            </div>
            <div className="py-10 px-10 mx-20" >
                <Add />
                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>PRODUCT NAME</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>ACTION</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => {
                        return (
                            <tr key={product.id}>
                                <td>{index+1}</td>
                                <td>{product.name}</td>
                                <td>{formatAmount(product.price)}</td>
                                <td>{product.quantity.toLocaleString('id-ID')}</td>
                                <td>
                                    <div className="flex space-x-1">
                                        <Update {...product}/>
                                        <Delete {...product}/>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Home;