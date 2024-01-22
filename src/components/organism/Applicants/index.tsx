import {FC} from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {JOB_APPLICANT_COLUMNS, JOB_APPLICANT_DATA, JOB_LISTING_COLUMNS, JOB_LISTING_DATA} from "@/constant";
import {Badge} from "@/components/ui/badge";
import ButtonActionTable from "@/components/organism/ButtonActionTable";

interface ApplicantsProps {
}

const Applicants: FC<ApplicantsProps> = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {JOB_APPLICANT_COLUMNS.map((column, index) => (
                        <TableCell key={index} className="font-semibold">{column}</TableCell>
                    ))}
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {JOB_APPLICANT_DATA.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.appliedDate}</TableCell>
                        <TableCell>
                            <ButtonActionTable url={'/job-detail/1'}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default Applicants