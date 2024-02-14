"use client";

import Swal from "sweetalert2";
import toast from "@/app/components/toast";
import axios from "axios";
import {ProductDto} from "@/app/dto/Product";
import {useRouter} from "next/navigation";

const Delete = (product : ProductDto) => {
    const router = useRouter();

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`/api/products/${id}`);
                router.refresh();
                await toast('Deleted Successfully!!');
            }
        });
    }

    return(
        <button className="btn btn-error btn-sm" onClick={() => {handleDelete(product.id)}}>DELETE</button>
    );
}

export default Delete;