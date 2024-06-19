


import Container from "@/components/container";
import Link from "next/link";
import prismaClient from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

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

                <form className="flex flex-col mt-6" action={handleRegisterTicket}>
                    <label className="mb-1 font-medium text-lg">Nome do chamado</label>
                    <input 
                        placeholder="Digite o nome do chamado"
                        required
                        className="w-full border-2 px-2 rounded-md mb-2 h-11"
                        type="text"
                        name="name"
                    />

                    <label className="mb-1 font-medium text-lg">Descrição</label>
                    <textarea 
                        placeholder="Descreva o problema"
                        required
                        className="w-full border-2 px-2 rounded-md mb-2 h-24 resize-none"
                        name="description"
                    ></textarea>

                    <label className="mb-1 font-medium text-lg">Cliente</label>
                    {clients.length > 0 ? (
                        <select 
                            disabled={clients.length < 1} 
                            className="mb-1 w-full font-medium px-2 text-lg h-11 rounded-md border-2"
                            name="customer"
                        >
                            {clients.map((client) => (
                                <option 
                                    key={client.id} 
                                    value={client.id}
                                >
                                    {client.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <Link href="/dashboard/customer/new">
                            Nenhum cliente cadastrado. <span className="text-blue-500 font-medium underline">Cadastrar</span>
                        </Link>
                    )}

                    <button 
                        disabled={clients.length === 0}
                        className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed" 
                        type="submit"
                    >
                        Cadastrar
                    </button>
                </form>
            </main>
        </Container>
    )
}