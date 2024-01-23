"use client"

import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {overviewFormSchema} from "@/lib/form-schema";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import TitleForms from "@/components/atoms/TitleForms";
import {Separator} from "@/components/ui/separator";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import FieldInput from "@/components/organism/FieldInput";
import CustomUpload from "@/components/organism/UploadCustom";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {EMPLOYEE_OPTIONS, LOCATION_OPTIONS} from "@/constant";
import {Button} from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Calendar} from "@/components/ui/calendar";
import {CalendarIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import SkillsInput from "@/components/organism/SkillsInput";
import CKEditor from "@/components/organism/CKEditor";

interface OverviewFormsProps {
}

const OverviewForms: FC<OverviewFormsProps> = () => {

    const [editorLoaded, setEditorLoaded] = useState<boolean>(false)

    const form = useForm<z.infer<typeof overviewFormSchema>>({
        resolver: zodResolver(overviewFormSchema),
    })

    const onSubmit = (val: z.infer<typeof overviewFormSchema>) => {
        console.log(val)
    }

    useEffect(() => {
        setEditorLoaded(true)
    }, []);

    return (
        <div>
            <div className={"my-5"}>
                <TitleForms title={"Basic Information"}
                            subtitle={"Write a brief overview of the job that is being offered."}/>
            </div>

            <Separator className={"mb-7"}/>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-7"}>
                    <FieldInput title={"Company Logo"}
                                subtitle={"This image will be shown publicly as company logo"}>
                        <CustomUpload form={form} name={"image"}></CustomUpload>
                    </FieldInput>

                    <FieldInput title={"Company Details"}
                                subtitle={"Introduce your company core info quickly to users by fill up company details"}>
                        <div className={"space-y-7"}>
                            <FormField control={form.control} name={"name"} render={({field}) => (
                                <FormItem>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                               placeholder={"e.g. Nityasa Group"}
                                               className={"w-[450px]"}
                                        />

                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name={"website"} render={({field}) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                               placeholder={"e.g. www.nityasa.id"}
                                               className={"w-[450px]"}
                                        />

                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>

                            <FormField
                                control={form.control}
                                name="location"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className={"w-[450px]"}>
                                                    <SelectValue placeholder="Select a Location"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {LOCATION_OPTIONS.map((item, index) => (
                                                    <SelectItem key={index} value={item.label}>{item.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div className={"w-[450px] grid grid-cols-2 gap-4"}>
                                <FormField
                                    control={form.control}
                                    name="employees"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Employee</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Employee"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {EMPLOYEE_OPTIONS.map((item, index) => (
                                                        <SelectItem key={index}
                                                                    value={item.label}>{item.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="industry"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Industry</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Industry"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {LOCATION_OPTIONS.map((item, index) => (
                                                        <SelectItem key={index}
                                                                    value={item.label}>{item.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="dateFounded"
                                render={({field}) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date Founded</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[450px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <SkillsInput form={form} label={"Add Tech Stack"} name={"techStack"}/>

                        </div>
                    </FieldInput>
                    <FieldInput title={"About Company"}
                                subtitle={"Brief description for your company. URL are hyperlinked"}>
                        <CKEditor form={form} name={"responsibilities"} editorLoaded={editorLoaded}/>
                    </FieldInput>

                    <div className={"flex justify-end"}>
                        <Button size={'lg'}>Save Changes</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default OverviewForms