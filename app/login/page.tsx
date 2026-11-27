import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to manage the Sunrise Ward sacrament meeting schedule.",
    robots: { index: false },
};

export default async function LoginPage(props: {
    searchParams?: Promise<{ callbackUrl?: string }>;
}) {
    const searchParams = await props.searchParams;
    const redirectTo = searchParams?.callbackUrl ?? "/meetings";

    return (
        <div className="mx-auto w-full max-w-sm py-8">
            <h1 className="mb-2 text-3xl font-bold text-deep-forest">Sign In</h1>
            <p className="mb-6 text-sm text-bark">
                For bishopric members managing the meeting schedule.
            </p>
            <LoginForm redirectTo={redirectTo} />
        </div>
    );
}