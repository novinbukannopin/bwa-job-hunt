import {FC} from "react";
import Link from "next/link";
import {ArrowLeftIcon} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import Applicants from "@/components/organism/Applicants";
import JobDetails from "@/components/organism/JobDetails";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth";
import prisma from "../../../../../lib/prisma";
import applicants from "@/components/organism/Applicants";

type paramsType = {
    id: string
}

interface JobDetailProps {
    params: paramsType
}

async function getDetailJob(id: string) {
    return prisma.job.findFirst({
        where: {
            id: id
        }, include: {
            Applicant: {
                include: {
                    User: true
                }
            },
            CategoryJob: true,
        }
    })

}

const JobDetailPage: FC<JobDetailProps> = async ({params}) => {

    const session = await getServerSession(authOptions)

    const job = await getDetailJob(params.id)

    return (
        <div>
            <div className={"inline-flex items-center gap-5 mb-5"}>
                <div>
                    <Link href={'/job-listings'}>
                        <ArrowLeftIcon className={"w-9 h-9 cursor-pointer"}/>
                    </Link>
                </div>
                <div>
                    <div className={"text-2xl font-semibold mb-1"}>{job?.roles}</div>
                    <div>
                        {job?.CategoryJob?.name} . {job?.jobType} . {job?.applicants}/{job?.needs} Hired
                    </div>


                </div>
            </div>
            <Tabs defaultValue="account">
                <TabsList className={"mb-8"}>
                    <TabsTrigger value="applicants">Applicants</TabsTrigger>
                    <TabsTrigger value="jobDetails">Job Details</TabsTrigger>
                </TabsList>
                <TabsContent value="applicants"><
                    Applicants applicants={job?.Applicant}/>
                </TabsContent>
                <TabsContent value="jobDetails">
                    <JobDetails detail={job}/>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default JobDetailPage