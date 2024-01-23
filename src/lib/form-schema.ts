import {z} from 'zod';
import {JOBTYPES} from "@/constant";

export const jobFormSchema = z.object({
    roles: z
        .string({required_error: 'Please enter a role'})
        .min(3, {message: 'Role must be at least 3 characters long'}),
    jobType: z.enum(JOBTYPES, {required_error: 'Please select a job type'}),
    salaryFrom: z.string({required_error: 'Please enter a salary'}),
    salaryTo: z.string({required_error: 'Please enter a salary'}),
    categoryId: z.string({required_error: 'Please select a category'}),
    requiredSkills: z.string().array().nonempty({message: 'Please enter at least one skill'}),
    jobDescription: z
        .string({required_error: 'Please enter a job description'})
        .min(10, {message: 'Job description must be at least 10 characters long'}),
    responsibilities: z
        .string({required_error: 'Please enter a responsibility'})
        .min(10, {message: 'Responsibility must be at least 10 characters long'}),
    whoYouAre: z
        .string({required_error: 'Please enter a description of who you are'})
        .min(10, {message: 'Description of who you are must be at least 10 characters long'}),
    niceToHaves: z
        .string({required_error: 'Please enter a nice to have'})
        .min(10, {message: 'Nice to have must be at least 10 characters long'}),
    benefits: z.object({
        benefit: z.string(),
        description: z.string()
    }).array().nonempty({message: 'Please enter at least one benefit'}),
})

export const overviewFormSchema = z.object({
    image: z.any().refine((item: any) => item?.name, {message: 'Please upload an image'}),
    name: z.string({required_error: 'Please enter a name'}),
    website: z.string({required_error: 'Please enter a website'}),
    location: z.string({required_error: 'Please enter a location'}),
    employees: z.string({required_error: 'Please enter the number of employees'}),
    industry: z.string({required_error: 'Please enter an industry'}),
    dateFounded: z.date({required_error: 'Please enter a date founded'}),
    techStack: z.string({required_error: 'Tech stack is required'}).array().nonempty({message: 'Please enter at least one tech stack'}),
    description: z.string({required_error: 'Please enter a description'}),
})

export const socialMediaFormSchema = z.object({
    facebook: z.string({required_error: 'Please enter a facebook url'}),
    instagram: z.string({required_error: 'Please enter an instagram url'}),
    linkedin: z.string({required_error: 'Please enter a linkedin url'}),
    twitter: z.string({required_error: 'Please enter a twitter url'}),
    youtube: z.string({required_error: 'Please enter a youtube url'}),
})

export const teamFormSchema = z.object({
    name: z.string({required_error: 'Please enter a name'}),
    position: z.string({required_error: 'Please enter a position'}),
    instagram: z.string({required_error: 'Please enter an instagram url'}),
    linkedin: z.string({required_error: 'Please enter a linkedin url'})
})

export const signInFormSchema = z.object({
    email: z.string({required_error: 'Please enter an email'}).email({message: 'Please enter a valid email'}),
    password: z.string({required_error: 'Please enter a password'}).min(6, {message: 'Password must be at least 6 characters long'})
})

export const signUpFormSchema = z.object({
    name: z.string({required_error: 'Please enter a name'}),
    email: z.string({required_error: 'Please enter an email'}).email({message: 'Please enter a valid email'}),
    password: z.string({required_error: 'Please enter a password'}).min(6, {message: 'Password must be at least 6 characters long'})
})