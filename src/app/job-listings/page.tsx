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

interface JobListingProps {

}

const JobListingPage: FC<JobListingProps> = () => {

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
                        {JOB_LISTING_DATA.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.roles}</TableCell>
                                <TableCell>
                                    <Badge>
                                        {row.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{row.datePosted}</TableCell>
                                <TableCell>{row.dueDate}</TableCell>
                                <TableCell>
                                    <Badge variant={'outline'}>{row.jobType}</Badge>
                                </TableCell>
                                <TableCell>{row.applicants}</TableCell>
                                <TableCell>{row.applicants} / {row.needs}</TableCell>
                                <TableCell>
                                    <ButtonActionTable url={'/job-detail/1'}/>
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