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