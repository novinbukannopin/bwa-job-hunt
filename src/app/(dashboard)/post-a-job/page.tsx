"use client"

import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {jobFormSchema} from "@/lib/form-schema";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ArrowLeftIcon} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import FieldInput from "@/components/organism/FieldInput";
import {Input} from "@/components/ui/input";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {JOBTYPES} from "@/constant";
import SkillsInput from "@/components/organism/SkillsInput";
import CKEditor from "@/components/organism/CKEditor";
import BenefitsInput from "@/components/organism/BenefitsInput";
import {Button} from "@/components/ui/button";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import {CategoryJob, Job} from "@prisma/client";
import applicants from "@/components/organism/Applicants";
import {useSession} from "next-auth/react";
import moment from "moment";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

interface PostAJobPageProps {
}

const PostAJobPage: FC<PostAJobPageProps> = () => {

    const [editorLoaded, setEditorLoaded] = useState<boolean>(false)

    const {data, error, isLoading} = useSWR<CategoryJob[]>('/api/job/categories', fetcher)

    const {data: session} = useSession()

    const {toast} = useToast()

    const router = useRouter()

    const form = useForm<z.infer<typeof jobFormSchema>>({
        resolver: zodResolver(jobFormSchema),
        defaultValues: {
            requiredSkills: []
        }
    })

    const onSubmit = async (val: z.infer<typeof jobFormSchema>) => {
        try {
            const body: any = {
                applicants: 0,
                benefits: val.benefits,
                categoryId: val.categoryId,
                companyId: session?.user.id!!,
                datePosted: moment().toDate(),
                description: val.jobDescription,
                dueDate: moment().add(1, 'M').toDate(),
                jobType: val.jobType,
                needs: 20,
                niceToHaves: val.niceToHaves,
                requiredSkill: val.requiredSkills,
                responsibilities: val.responsibilities,
                roles: val.roles,
                salaryFrom: val.salaryFrom,
                salaryTo: val.salaryTo,
                whoYouAre: val.whoYouAre
            }

            await fetch('/api/job', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })

            router.push('/job-listings')

        } catch (e) {
            toast({
                title: "Error",
                description: "Please try again"
            })
            console.log(e)
        }
    }

    useEffect(() => {
        setEditorLoaded(true)
    }, [])

    return (
        <div>
            <div className={"inline-flex items-center gap-2 cursor-pointer hover:text-primary"}>
                <ArrowLeftIcon className={"w-7 h-7"}/>
                <span className={"text-2xl font-semibold"}>Post a Job</span>
            </div>

            <div className={"my-5"}>
                <div className={"text-lg font-semibold"}>
                    Basic Information
                </div>
                <div className={"text-gray-400"}>
                    List out your top perks and benefits
                </div>
            </div>

            <Separator/>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"mt-5 space-y-6 pt-6"}>
                    <FieldInput title={"Job Title"} subtitle={"Job Titles must be describe one position"}>
                        <FormField control={form.control} name={"roles"} render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field}
                                           placeholder={"e.g. Frontend Developer"}
                                           className={"w-[450px]"}
                                    />

                                </FormControl>
                                <FormDescription>
                                    At least 80 characters
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    </FieldInput>

                    <FieldInput title={"Type of Employment"} subtitle={"You can select multiple type of Employment"}>
                        <FormField control={form.control} name={"jobType"} render={({field}) => (
                            <FormItem className={"space-y-3"}>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value}
                                                className={"flex flex-col space-y-1"}>
                                        {JOBTYPES.map((item: string, index: number) => (
                                            <FormItem key={item + index}
                                                      className={"flex items-center space-x-3 space-y-0"}>
                                                <FormControl>
                                                    <RadioGroupItem value={item}/>
                                                </FormControl>
                                                <FormLabel>
                                                    {item}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}/>
                    </FieldInput>

                    <FieldInput title={"Salary"} subtitle={"Please specify the estimated salary range for the role"}>
                        <div className={"w-[450px] flex flex-row justify-between items-center"}>
                            <FormField control={form.control} name={"salaryFrom"} render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field}
                                               placeholder={"$100"}
                                               className={"w-full"}
                                        />

                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <span className={"text-center"}>To</span>
                            <FormField control={form.control} name={"salaryTo"} render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field}
                                               placeholder={"$1000"} className={"w-full"}
                                        />

                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        </div>
                    </FieldInput>

                    <FieldInput title={"Categories"} subtitle={"You can select multiple job categories"}>
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Job Categories</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className={"w-[450px]"}>
                                                <SelectValue placeholder="Select a job categories"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {data?.map((item: any, index: number) => (
                                                    <SelectItem key={item.id + index} value={item.id}>
                                                        {item.name}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        You can manage email addresses in your{" "}
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </FieldInput>

                    <FieldInput title={"Required Skills"} subtitle={"Add required skills for this job"}>
                        <SkillsInput form={form} label={"Add Skills"} name={"requiredSkills"}/>
                    </FieldInput>

                    <FieldInput title={"Job Description"} subtitle={"Job titles must be describe one position"}>
                        <CKEditor form={form} name={"jobDescription"} editorLoaded={editorLoaded}/>
                    </FieldInput>

                    <FieldInput title={"Responsbilities"} subtitle={"Outline the core responsbilities of the position"}>
                        <CKEditor form={form} name={"responsibilities"} editorLoaded={editorLoaded}/>
                    </FieldInput>

                    <FieldInput title={"Who you are ??"} subtitle={"Add your preferred candidate qualifications"}>
                        <CKEditor form={form} name={"whoYouAre"} editorLoaded={editorLoaded}/>
                    </FieldInput>

                    <FieldInput title={"Nice to have"}
                                subtitle={"Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates to apply"}>
                        <CKEditor form={form} name={"niceToHaves"} editorLoaded={editorLoaded}/>
                    </FieldInput>

                    <FieldInput title={"Benefits"} subtitle={"lorem"}>
                        <BenefitsInput form={form}/>
                    </FieldInput>

                    <div className={"flex justify-end"}>
                        <Button size={"lg"}>Do a Review</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default PostAJobPage