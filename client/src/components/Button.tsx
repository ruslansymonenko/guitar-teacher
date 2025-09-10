"use client";

import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";

export type ButtonProps = {
	children: ReactNode;
	href?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	type?: "button" | "submit" | "reset";
	className?: string;
	variant?: "primary" | "secondary" | "ghost" | "link";
	disabled?: boolean;
};

const baseClasses = "inline-flex items-center gap-1 rounded-md text-sm px-3 py-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
	primary: "bg-primary text-primary-foreground hover:brightness-95 focus:ring-primary",
	secondary: "bg-secondary text-secondary-foreground hover:brightness-95 focus:ring-secondary",
	ghost: "bg-transparent text-foreground hover:bg-gray-100 focus:ring-gray-300",
	link: "bg-transparent text-primary hover:underline focus:ring-primary px-0 py-0",
};

export function Button({ children, href, onClick, type = "button", className = "", variant = "primary", disabled }: ButtonProps) {
	const classes = `${baseClasses} ${variants[variant]} ${className}`.trim();

	if (href) {
		return (
			<Link href={href} className={classes} aria-disabled={disabled}>
				{children}
			</Link>
		);
	}

	return (
		<button type={type} onClick={onClick} className={classes} disabled={disabled}>
			{children}
		</button>
	);
}

export default Button;
