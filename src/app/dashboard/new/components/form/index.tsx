

"use client"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast'
import { CustomerProps } from '@/utils/customer.type';
import Link from 'next/link';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';

const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório"),
    description: z.string().min(1, "O campo descrição é obrigatório"),
    customer: z.string().min(1, 'Selecione um cliente')
})

type FormData = z.infer<typeof schema>

export function NewTicketForm({ clients } : { clients: CustomerProps[] }){
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const router = useRouter();

    async function handleRegisterTicket(data : FormData){
        await api.post("/api/ticket", {
            customerId: data.customer,
            name: data.name,
            description: data.description
        });

        toast.success('Chamado criado');

        router.replace("/dashboard");
        router.refresh();
    }

    return(
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterTicket)}>
            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
            <Input 
                type="text"
                name="name"
                placeholder='Digite o nome do chamado'
                error={errors.name?.message}
                register={register}
            />

            <label className="mb-1 mt-2 font-medium text-lg">Descrição</label>
            <Textarea 
                type="text"
                name="description"
                placeholder='Descreva o problema'
                error={errors.description?.message}
                register={register}
            />

            <label className="mb-1 font-medium text-lg">Cliente</label>
            {clients.length > 0 ? (
                <select 
                    disabled={clients.length < 1} 
                    className="mb-1 w-full font-medium px-2 text-lg h-11 rounded-md border-2"
                    {...register('customer', undefined)}
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
    )
}