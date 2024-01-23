import {FC} from "react";
import Link from "next/link";
import {ArrowLeftIcon} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import Applicants from "@/components/organism/Applicants";
import JobDetails from "@/components/organism/JobDetails";


interface JobDetailProps {
}


const JobDetailPage: FC<JobDetailProps> = () => {
    return (
        <div>
            <div className={"inline-flex items-center gap-5 mb-5"}>
                <div>
                    <Link href={'/job-listings'}>
                        <ArrowLeftIcon className={"w-9 h-9 cursor-pointer"}/>
                    </Link>
                </div>
                <div>
                    <div className={"text-2xl font-semibold mb-1"}>Brand Designer</div>
                    <div>
                        Design . Full Time . 1/10 Hired
                    </div>


                </div>
            </div>
            <Tabs defaultValue="account">
                <TabsList className={"mb-8"}>
                    <TabsTrigger value="applicants">Applicants</TabsTrigger>
                    <TabsTrigger value="jobDetails">Job Details</TabsTrigger>
                </TabsList>
                <TabsContent value="applicants"><
                    Applicants/>
                </TabsContent>
                <TabsContent value="jobDetails">
                    <JobDetails/>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default JobDetailPage