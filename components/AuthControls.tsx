import Link from "next/link";
import { auth } from "@/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function AuthControls() {
    const session = await auth();

    if (!session?.user) {
        return (
            <Link
                href="/login"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-parchment transition-colors hover:bg-moss"
            >
                Sign In
            </Link>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-parchment-deep">{session.user.name}</span>
            <SignOutButton />
        </div>
    );
}