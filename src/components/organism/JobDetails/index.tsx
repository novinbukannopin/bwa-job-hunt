import {FC} from "react";
import {Progress} from "@/components/ui/progress";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import {PartyPopperIcon} from "lucide-react";
import {CategoryJob, Job} from "@prisma/client";
import {dateFormat} from "@/lib/utils";

type JobDetailType = {
    CategoryJob: CategoryJob | null
} & Job

interface JobDetailProps {
    detail: JobDetailType | null
}

const JobDetailPage: FC<JobDetailProps> = ({detail}) => {

    const benefits: any = detail?.benefits

    return (
        <div>
            <div className={"grid grid-cols-3 w-full gap-5"}>
                <div className={"col-span-2 space-y-10"}>
                    <div>
                        <div className={"text-3xl font-semibold"}>
                            Description
                        </div>
                        <div className={"text-gray-400 mt-3"}>
                            <div dangerouslySetInnerHTML={{__html: detail?.description!!}}>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={"text-3xl font-semibold"}>
                            Responsibilities
                        </div>
                        <div className={"text-gray-400 mt-3"}>
                            <div dangerouslySetInnerHTML={{__html: detail?.responsibilities!!}}>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={"text-3xl font-semibold"}>
                            Who are you
                        </div>
                        <div className={"text-gray-400 mt-3"}>
                            <div dangerouslySetInnerHTML={{__html: detail?.whoYouAre!!}}>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={"text-3xl font-semibold"}>
                            Nice to Haves
                        </div>
                        <div className={"text-gray-400 mt-3"}>
                            <div dangerouslySetInnerHTML={{__html: detail?.niceToHaves!!}}>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={"text-3xl font-semibold"}>
                        About this role
                    </div>

                    <div className={"shadow p-3 text-center my-6"}>
                        {detail?.applicants} <span className={"text-gray-400"}>of {detail?.needs} hired</span>
                        <Progress value={(detail?.applicants || 0 / detail?.needs!!) / 100} className={"mt-3"}/>
                    </div>

                    <div className={"mb-10 space-y-5"}>
                        <div className={"flex justify-between"}>
                            <div className={"text-gray-500"}>Apply before</div>
                            <div className={"font-semibold"}>{dateFormat(detail?.dueDate)}</div>
                        </div>
                        <div className={"flex justify-between"}>
                            <div className={"text-gray-500"}>Job Posted on</div>
                            <div className={"font-semibold"}>{dateFormat(detail?.datePosted)}</div>
                        </div>
                        <div className={"flex justify-between"}>
                            <div className={"text-gray-500"}>Job Type</div>
                            <div className={"font-semibold"}>{dateFormat(detail?.jobType)}</div>
                        </div>
                        <div className={"flex justify-between"}>
                            <div className={"text-gray-500"}>Salary</div>
                            <div className={"font-semibold"}>${detail?.salaryFrom} - ${detail?.salaryTo} USD</div>
                        </div>
                    </div>


                    <Separator/>

                    <div className={"my-10"}>
                        <div className={"text-3xl font-semibold mb-4"}>
                            Categories
                        </div>

                        <div className={"space-x-5"}>
                            <Badge>
                                {detail?.CategoryJob?.name}
                            </Badge>
                        </div>
                    </div>

                    <Separator/>

                    <div className={"my-10"}>
                        <div className={"text-3xl font-semibold mb-4"}>
                            Required Skill
                        </div>

                        <div className={"space-x-5"}>
                            {detail?.requiredSkill.map((skill, index) => (
                                <Badge variant={'outline'} key={index}>
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Separator className={"my-8"}/>

            <div>
                <div className={"text-3xl font-semibold"}>
                    Perks and Benefit
                </div>
                <div className={"text-gray-500"}>
                    This job comes with several perks and benefits
                </div>

                <div className={"grid grid-cols-4 gap-5 mt-9"}>
                    {benefits.map((item: any, index: number) => (
                        <div key={index}>
                            <PartyPopperIcon className={"w-10 h-10 text-primary mb-6"}/>
                            <div className={"text-lg font-semibold"}>{item.benefit}</div>
                            <div className={"text-gray-500"}>
                                {item.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default JobDetailPage