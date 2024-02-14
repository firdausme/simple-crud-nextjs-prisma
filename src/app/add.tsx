"use client";

import {NumericFormat} from "react-number-format";
import {SyntheticEvent, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import toast from "@/app/components/toast";

const Add = () => {

    const [modal, setModal] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQty] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleModal = () => {
        setName("");
        setPrice(0);
        setQty(0);
        setModal(!modal);
    }

    const handleCreate = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await axios.post('/api/products', {
            name: name,
            price: price,
            quantity: quantity
        });
        setIsLoading(false);
        setName("");
        setPrice(0);
        setQty(0);
        setModal(false);
        router.refresh();
        await toast('Created Successfully');
    }

    return <div>
        <button className="btn" onClick={handleModal}>Add New</button>
        <div className={modal ? "modal modal-open" : "modal"}>
            <div className="modal-box">
                <div className="text-center m-2 p-2 border-b">
                    <h3 className="text-xl font-semibold">Add Product</h3>
                </div>
                <form onSubmit={handleCreate}>
                    <div className="form-control">
                        <label className="label font-bold text-sm">Product Name</label>
                        <input type="text"
                               value={name}
                               onChange={(e) => {
                                   setName(e.target.value)
                               }}
                               className="input w-full input-bordered"
                               placeholder="Product Name"
                               required={true}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold text-sm">Price</label>
                        <NumericFormat className="input w-full input-bordered"
                                       value={price}
                                       onValueChange={({value}) => {
                                           setPrice(Number(value.replace('RP ', '')))
                                       }}
                                       placeholder="RP 0"
                                       prefix="RP "
                                       allowNegative={false}
                                       thousandSeparator={true}
                                       required={true}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold text-sm">Quantity</label>
                        <input type="number"
                               value={quantity}
                               onChange={(e) => {
                                   setQty(Number(e.target.value))
                               }}
                               className="input w-full input-bordered"
                               placeholder="0"
                               required={true}
                        />
                    </div>
                    <div className="modal-action pt-3 border-t">
                        <button type="button" className="btn" onClick={handleModal}>close</button>
                        {!isLoading ? (
                            <button type="submit" className="btn btn-primary text-white">Save</button>
                        ):(
                            <button type="button" className="btn loading">Saving...</button>
                        )}
                    </div>
                </form>

            </div>
        </div>
    </div>
}

export default Add;