"use client"

import {FC} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {socialMediaFormSchema} from "@/lib/form-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import FieldInput from "@/components/organism/FieldInput";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface SocialMediaFormsProps {
}

const SocialMediaForms: FC<SocialMediaFormsProps> = () => {

    const form = useForm<z.infer<typeof socialMediaFormSchema>>({
        resolver: zodResolver(socialMediaFormSchema),
    })

    const onSubmit = (val: z.infer<typeof socialMediaFormSchema>) => {
        console.log(val)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-7"}>
                <FieldInput title={"Basic Information"}
                            subtitle={"Add elsewhere links to your company profile. You can add only username without full http links"}>

                    <div className={"space-y-7"}>
                        <FormField control={form.control} name={"facebook"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Facebook</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                           placeholder={"https://facebook.com/username"}
                                           className={"w-[450px]"}
                                    />

                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>

                        <FormField control={form.control} name={"instagram"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Instagram</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                           placeholder={"https://instagram.com/username"}
                                           className={"w-[450px]"}
                                    />

                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>

                        <FormField control={form.control} name={"twitter"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Twitter</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                           placeholder={"https://twitter.com/username"}
                                           className={"w-[450px]"}
                                    />

                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>

                        <FormField control={form.control} name={"linkedin"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Linkedin</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                           placeholder={"https://linkedin.com/username"}
                                           className={"w-[450px]"}
                                    />

                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>

                        <FormField control={form.control} name={"youtube"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Youtube</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                           placeholder={"https://youtube.com/username"}
                                           className={"w-[450px]"}
                                    />

                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    </div>


                </FieldInput>
                <div className={"flex justify-end"}>
                    <Button size={'lg'}>Save Changes</Button>
                </div>
            </form>
        </Form>
    )
}

export default SocialMediaForms