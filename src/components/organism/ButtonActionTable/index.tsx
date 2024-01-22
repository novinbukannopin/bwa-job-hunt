"use client"

import {FC} from "react";
import {MoreVertical} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

interface ButtonActionTableProps {
    url: string
}

const ButtonActionTable: FC<ButtonActionTableProps> = ({url}) => {

    const router = useRouter()

    return (
        <Button onClick={() => router.push(url)} size={'icon'}
                variant={"outline"}>
            <MoreVertical className={"w-4 h-4"}/>
        </Button>
    )
}

export default ButtonActionTable