'use client'

import Button from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Color, Size } from "@/types"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"

interface FilterProps{
    data:(Size|Color)[],
    name:string
    valueKey:string
}

const Filter = ({data,name,valueKey}:FilterProps) => {

    const searchParams = useSearchParams();
    const router = useRouter()
    
    const selectedId = searchParams.get(valueKey)

    const onClick = (id:string) => {

        const current = qs.parse(searchParams.toString())
        // {colorId:'243211411',sizeId:'2421412421'}
    
        const query = {
            ...current,
            [valueKey]:id
        }
        
        // If the user clicks on the same filter again,set the [valueId] value to null
        if(current[valueKey] == id){
            query[valueKey] = null
        }

        const url = qs.stringifyUrl({
            url:window.location.href,
            query
        },{skipNull:true})

        router.push(url)
    }
  return (
    <div className="mb-8">
        <h3 className="text-lg font-semibold">{name}</h3>
        <hr className="my-4" />
        <div className="flex flex-wrap gap-2">
            {data.map((filter) => (
                <div className="flex items-stretch" key={filter.id}>
                    <Button onClick={() => onClick(filter.id)} className={cn("rounded-md text-sm text-gray-800 p-2 bg-white border-gray-300",selectedId === filter.id && "bg-black text-white")}>{filter.name}</Button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Filter