


"use client"
import { CustomerProps } from "@/utils/customer.type";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CardCustomer({ customer } : { customer: CustomerProps }){
    
    const router = useRouter();

    async function handleDeleteCustomer(){
        try{
            const response = await api.delete('/api/customer', {
                params: {
                    id: customer.id
                }
            });
    
            router.refresh();
        }catch(err){
            throw new Error('Error while delete customer');
        }
    }
    
    return(
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2">
            <h2>
                <a className="font-bold">Nome:</a> {customer.name}
            </h2>
            <p><a className="font-bold">E-mail:</a> {customer.email}</p>
            <p><a className="font-bold">Telefone:</a> {customer.phone}</p>
            <button
                onClick={handleDeleteCustomer}
                className="bg-red-500 px-4 rounded text-white mt-2 self-start"
            >
                Deletar
            </button>
        </article>
    )
}