import Link from "next/link";
import React from "react";
import { ArrowIcon } from "@/lib/icons";

type ButtonSize = "sm" | "md" | "lg";

interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: ButtonSize;
}

const sizeStyles: Record<ButtonSize, { text: string; icon: string; iconSize: number }> = {
  sm: { text: "py-2.5 px-4 text-xs", icon: "p-2.5", iconSize: 10 },
  md: { text: "py-3.5 px-6 text-sm", icon: "p-3.5", iconSize: 14 },
  lg: { text: "py-4 px-8 text-sm", icon: "p-4", iconSize: 14 },
};

/**
 * Primary green CTA button with arrow icon
 * Used across the site for main call-to-action buttons
 */
export const PrimaryButton = ({ 
  href, 
  children, 
  className = "", 
  size = "md" 
}: PrimaryButtonProps) => {
  const styles = sizeStyles[size];
  
  return (
    <Link href={href} className={`inline-flex items-center gap-0 group ${className}`}>
      <span className={`bg-primary text-white ${styles.text} font-medium transition-colors group-hover:bg-primary/90`}>
        {children}
      </span>
      <span className={`bg-primary text-white ${styles.icon} flex items-center justify-center transition-colors group-hover:bg-primary/90 border-l border-white/20`}>
        <ArrowIcon size={styles.iconSize} className="text-white" />
      </span>
    </Link>
  );
};

/**
 * Outline button variant
 */
export const OutlineButton = ({ 
  href, 
  children, 
  className = "", 
  size = "md" 
}: PrimaryButtonProps) => {
  const styles = sizeStyles[size];
  
  return (
    <Link 
      href={href} 
      className={`inline-flex items-center ${styles.text} border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 ${className}`}
    >
      {children}
    </Link>
  );
};

export default PrimaryButton;
