import {FC} from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {JOB_APPLICANT_COLUMNS, JOB_APPLICANT_DATA, JOB_LISTING_COLUMNS, JOB_LISTING_DATA} from "@/constant";
import {Badge} from "@/components/ui/badge";
import ButtonActionTable from "@/components/organism/ButtonActionTable";
import {Applicant} from ".prisma/client";

interface ApplicantsProps {
    applicants: any
}

const Applicants: FC<ApplicantsProps> = ({applicants}) => {
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
                {
                    applicants && (
                        <>
                            {applicants.map((item: any, index: number) => (
                                <TableRow key={item.id + 1}>
                                    <TableCell>{item.user.name}</TableCell>
                                    <TableCell>
                                        <ButtonActionTable url=""/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </>
                    )
                }
            </TableBody>
        </Table>
    )
}

export default Applicants