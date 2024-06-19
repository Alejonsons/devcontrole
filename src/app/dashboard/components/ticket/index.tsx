

"use client"

import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { FiCheck, FiCheckCircle, FiCheckSquare, FiFile, FiTrash2 } from "react-icons/fi";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext } from "@/providers/modal";
import toast from "react-hot-toast";

interface TicketItemProps{
    ticket: TicketProps,
    customer: CustomerProps | null
}

export default function TicketItem({ customer, ticket } : TicketItemProps){
    const router = useRouter();
    const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

    async function handleDeleteTicket(e : any){
        e.stopPropagation();

        try{
            await api.patch("/api/ticket", {
                id: ticket.id
            });

            toast.success('Chamado concluído');

            router.refresh();
        }catch(err){
            console.log(err);
        }
    }

    function handleOpenModal(){
        handleModalVisible();
        setDetailTicket({
            customer: customer,
            ticket: ticket
        });
    }

    return(
        <>
            <tr onClick={handleOpenModal} className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300 cursor-pointer">
                <td className="text-left pl-1">
                    {customer?.name}
                </td> 
                <td className="text-left hidden sm:table-cell">
                    {ticket.created_at?.toLocaleDateString('pt-br')}
                </td> 
                <td className="text-left">
                    <span className="bg-green-500 px-2 py-1 rounded">
                        {ticket.status}
                    </span>
                </td> 
                <td>
                    <div className="flex items-center justify-center">
                        <button className="mr-4 hover:scale-110 transition-all">
                            <FiCheckCircle 
                                onClick={handleDeleteTicket}
                                size={28} 
                                color="#63bb80"
                            />
                        </button>
                    </div>
                </td> 
            </tr>
        </>
    )
}