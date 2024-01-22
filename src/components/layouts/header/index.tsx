"use client"
import {FC} from "react";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {useRouter} from "next/navigation";

interface HeaderProps {
}

const Header: FC<HeaderProps> = ({}) => {

    const router = useRouter()

    const navCreateJobPage = () => router.push("/post-a-job")

    return (
        <div className={"pb-3 mb-8 border-b border-border flex flex-row items-center justify-between"}>
            <div>
                <div>
                    company
                </div>
                <div className={"font-semibold"}>
                    Novin
                </div>
            </div>
            <div>
                <Button onClick={navCreateJobPage} className={"rounded-none py-3 px-6"}>
                    <PlusIcon className={"mr-2 h-4 w-4"}/>
                    Post a Job</Button>
            </div>
        </div>
    )
}

export default Header