"use client"

import {FC} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {teamFormSchema} from "@/lib/form-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Separator} from "@/components/ui/separator";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

interface DialogAddTeamProps {
}

const DialogAddTeam: FC<DialogAddTeamProps> = () => {

    const form = useForm<z.infer<typeof teamFormSchema>>({
        resolver: zodResolver(teamFormSchema),
    })

    const onSubmit = (val: z.infer<typeof teamFormSchema>) => {
        console.log(val)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className={"w-4 h-4 mr-2"}/>
                    Add Member
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new team?</DialogTitle>
                    <DialogDescription>
                        Fill the form below to add new team
                    </DialogDescription>
                </DialogHeader>

                <Separator/>

                <Form {...form}>
                    <form className={"space-y-5"} onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} name={"name"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                           placeholder={"name"}
                                           className={"w-[450px]"}
                                    />

                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>

                        <FormField control={form.control} name={"position"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Position</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                           placeholder={"position"}
                                           className={"w-[450px]"}
                                    />

                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>

                        <div className={"grid grid-cols-2 gap-3"}>
                            <FormField control={form.control} name={"instagram"} render={({field}) => (
                                <FormItem>
                                    <FormLabel>Instagram</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                               placeholder={"https://instagram.com/username"}
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
                                        />

                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        </div>

                        <div className={"flex justify-end"}>
                            <Button size={'lg'}>Save Changes</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}

export default DialogAddTeam