

"use client"
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiRefreshCcw } from 'react-icons/fi';

export function ButtonRefresh(){
    const router = useRouter();

    const handleRefresh = () => {
        toast.success('Atualizado');

        router.refresh()
    }

    return(
        <button className='bg-green-600 px-4 py-1 rounded' onClick={handleRefresh}>
            <FiRefreshCcw size={24} color='#fff'/>
        </button>
    )
}