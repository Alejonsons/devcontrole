


import Container from "@/components/container";
import Link from "next/link";
import prismaClient from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NewTicketForm } from "./components/form";

export default async function NewTicket(){
    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        redirect('/');
    }

    const clients = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id
        }
    });

    async function handleRegisterTicket(formData : FormData){
        "use server"
        
        const name = formData.get('name');
        const description = formData.get('description');
        const customerId = formData.get('customer');

        if(!name || !description || !customerId){
            return;
        }

        await prismaClient.ticket.create({
            data: {
                name: name as string,
                description: description as string,
                customerId: customerId as string,
                status: "ABERTO",
                userId: session?.user.id
            }
        });

        redirect('/dashboard');
    }

    return(
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="text-white px-4 py-1 rounded bg-gray-900">
                        Voltar
                    </Link>
                    <h1 className="text-2xl font-bold">Novo chamado</h1>
                </div>

                <NewTicketForm clients={clients}/>
            </main>
        </Container>
    )
}