import { signOut } from "@/auth";

export default function SignOutButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
            }}
        >
            <button
                type="submit"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-parchment transition-colors hover:bg-moss"
            >
                Sign Out
            </button>
        </form>
    );
}