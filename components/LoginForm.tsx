"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions";

const inputClass =
    "w-full rounded-md border border-bark/40 bg-card px-3 py-2 text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/40";

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <form action={formAction} className="space-y-4">
            <input type="hidden" name="redirectTo" value={redirectTo} />

            <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-deep-bark">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={inputClass}
                />
            </div>

            <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-deep-bark">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    minLength={6}
                    required
                    className={inputClass}
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-md bg-forest px-5 py-2.5 text-sm font-medium text-parchment transition-colors hover:bg-deep-forest disabled:opacity-60"
            >
                {isPending ? "Signing in…" : "Sign In"}
            </button>

            <div aria-live="polite">
                {errorMessage ? (
                    <p role="alert" className="text-sm text-red-800">
                        {errorMessage}
                    </p>
                ) : null}
            </div>
        </form>
    );
}