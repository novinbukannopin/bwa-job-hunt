import {FC} from "react";
import {Progress} from "@/components/ui/progress";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import {PartyPopperIcon} from "lucide-react";

interface JobDetailProps {
}

const JobDetailPage: FC<JobDetailProps> = () => {
    return (
        <div>
            <div className={"grid grid-cols-3 w-full gap-5"}>
                <div className={"col-span-2 space-y-10"}>
                    <div>
                        <div className={"text-3xl font-semibold"}>
                            Description
                        </div>
                        <div className={"text-gray-400 mt-3"}>
                            <p className={""}>
                                lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className={"text-3xl font-semibold"}>
                            Responsibilities
                        </div>
                        <div className={"text-gray-400 mt-3"}>
                            <p className={""}>
                                lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className={"text-3xl font-semibold"}>
                            Who are you
                        </div>
                        <div className={"text-gray-400 mt-3"}>
                            <p className={""}>
                                lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={"text-3xl font-semibold"}>
                        About this role
                    </div>

                    <div className={"shadow p-3 text-center my-6"}>
                        1 <span className={"text-gray-400"}>/ 10 hired</span>
                        <Progress value={10} max={100} className={"mt-3"}/>
                    </div>

                    <div className={"mb-10 space-y-5"}>
                        <div className={"flex justify-between"}>
                            <div className={"text-gray-500"}>Apply before</div>
                            <div className={"font-semibold"}>12 Aug 2023</div>
                        </div>
                        <div className={"flex justify-between"}>
                            <div className={"text-gray-500"}>Job Posted on</div>
                            <div className={"font-semibold"}>12 Aug 2023</div>
                        </div>
                        <div className={"flex justify-between"}>
                            <div className={"text-gray-500"}>Job Type</div>
                            <div className={"font-semibold"}>Full Time</div>
                        </div>
                        <div className={"flex justify-between"}>
                            <div className={"text-gray-500"}>Salary</div>
                            <div className={"font-semibold"}>$100 - $1000 USD</div>
                        </div>
                    </div>


                    <Separator/>

                    <div className={"my-10"}>
                        <div className={"text-3xl font-semibold mb-4"}>
                            Categories
                        </div>

                        <div className={"space-x-5"}>
                            {['Programming'].map((skill, index) => (
                                <Badge key={index}>
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <Separator/>

                    <div className={"my-10"}>
                        <div className={"text-3xl font-semibold mb-4"}>
                            Required Skill
                        </div>

                        <div className={"space-x-5"}>
                            {['Javascript', 'React', 'NextJS', 'TailwindCSS'].map((skill, index) => (
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
                    {[0, 1, 2].map((item, index) => (
                        <div key={index}>
                            <PartyPopperIcon className={"w-10 h-10 text-primary mb-6"}/>
                            <div className={"text-lg font-semibold"}>Full Healthcare</div>
                            <div className={"text-gray-500"}>
                                we believe in healthy living and that starts with our benefits
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default JobDetailPage