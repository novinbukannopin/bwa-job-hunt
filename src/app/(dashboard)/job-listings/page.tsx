import {FC} from "react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {JOB_LISTING_COLUMNS, JOB_LISTING_DATA} from "@/constant";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {MoreVertical} from "lucide-react";
import {useRouter} from "next/navigation";
import ButtonActionTable from "@/components/organism/ButtonActionTable";
import prisma from "../../../../lib/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Job} from "@prisma/client";
import {dateFormat} from "@/lib/utils";
import moment from "moment";

interface JobListingProps {

}

async function getJobListing() {

    const session = await getServerSession(authOptions)

    const jobs = prisma.job.findMany({
        where: {
            companyId: session?.user.id
        }
    })

    return jobs
}

const JobListingPage: FC<JobListingProps> = async ({}) => {

    const data = await getJobListing()

    return (
        <div>
            <div className={"font-semibold text-3xl"}>Job Listings</div>
            <div className={"mt-10"}>
                <Table>
                    <TableCaption>A list of your recent job list.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            {JOB_LISTING_COLUMNS.map((column, index) => (
                                <TableCell key={index} className="font-semibold">{column}</TableCell>
                            ))}
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row: Job, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.roles}</TableCell>
                                <TableCell>
                                    {moment(row.datePosted).isBefore(row.dueDate) ? (
                                        <Badge>Live</Badge>
                                    ) : (
                                        <Badge variant={'destructive'}>Expired</Badge>
                                    )}
                                </TableCell>
                                <TableCell>{dateFormat(row.datePosted)}</TableCell>
                                <TableCell>{dateFormat(row.dueDate)}</TableCell>
                                <TableCell>
                                    <Badge variant={'outline'}>{row.jobType}</Badge>
                                </TableCell>
                                <TableCell>{row.applicants}</TableCell>
                                <TableCell>{row.applicants} / {row.needs}</TableCell>
                                <TableCell>
                                    <ButtonActionTable url={`/job-detail/${row.id}`}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>

    )
}


export default JobListingPage