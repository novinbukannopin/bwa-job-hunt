"use client"

import {FC} from "react";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {jobFormSchema, signInFormSchema, signUpFormSchema} from "@/lib/form-schema";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import FieldInput from "@/components/organism/FieldInput";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";

interface SignInPageProps {
}

const SignInPage: FC<SignInPageProps> = () => {

    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
    })

    const router = useRouter()
    const {toast} = useToast()

    const onSubmit = async (val: z.infer<typeof signUpFormSchema>) => {
        try {
            await fetch('/api/company/new-user', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(val)
            })

            router.push('/auth/sign-in')
        } catch (e) {
            toast(
                {
                    title: "Error",
                    description: "Please try again"
                }
            )
        }
    }


    return (
        <div className="relative w-full h-screen">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="border border-border p-5">
                    <div className="font-semibold text-center text-2xl mb-2">
                        Login your account
                    </div>
                    <div className="text-sm text-gray-500">
                        Enter your email to access dashboard
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="mt-5 space-y-5"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your name..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your email..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <Button className="w-full">Sign In</Button>

                            <div className="text-sm">
                                Already have an account{" "}
                                <Link
                                    href="/auth/sign-in"
                                    className="text-primary"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
export default SignInPage