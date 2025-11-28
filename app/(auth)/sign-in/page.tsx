"use client";

import InputField from '@/components/forms/inputField';
import { useForm } from 'react-hook-form';
import FooterLink from '@/components/forms/FooterLink';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from "sonner"
import { signInWithEmail } from '@/lib/actions/authActions';

type SignInFormData = {
    email: string;
    password: string;
};

const SignIn = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormData>({
        defaultValues: { email: '', password: '' },
        mode: 'onBlur'
    });

    const onSubmit = async (data: SignInFormData) => {
        try {
            const result = await signInWithEmail(data);
            if (result.success) {
                router.push('/');
            } else {
                toast.error('Please enter a valid email & password', {
                    description: result.error || 'Failed to sign in.'
                });
            }
        } catch (error) {
            console.error(error);
            toast.error('Please enter a valid email & password', {
                description: error instanceof Error ? error.message : 'Failed to sign in'
            });
        }
    }

    return (
        <>
            <h1 className="form-title">Sign In</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@example.com"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email is required', pattern: { value: /^\w+@\w+\.\w+$/, message: 'Enter a valid email' } }}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 6 }}
                />

                <button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Signing in…' : 'Sign In'}
                </button>

                <FooterLink text="Don't have an account? " linkText="Create an account" href="/sign-up" />
            </form>
        </>
    )
}

export default SignIn;