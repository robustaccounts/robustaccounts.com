"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import useOnClickOutside from "@/hooks/useOnClickOutside";

import cn from "@/utils/cn";

/* ------------------------------------------------------------------ */
/* Country list lives right here – code, dial code, and printable name */
/* ------------------------------------------------------------------ */
const countryDialCodeList = [
  {
    code: "US",
    dial_code: "+1",
    name: "United States",
    flag: "/assets/icons/country-flags/4x3/us.svg",
  },
  {
    code: "CA",
    dial_code: "+1",
    name: "Canada",
    flag: "/assets/icons/country-flags/4x3/ca.svg",
  },
  {
    code: "GB",
    dial_code: "+44",
    name: "United Kingdom",
    flag: "/assets/icons/country-flags/4x3/gb.svg",
  },
  {
    code: "FR",
    dial_code: "+33",
    name: "France",
    flag: "/assets/icons/country-flags/4x3/fr.svg",
  },
  {
    code: "DE",
    dial_code: "+49",
    name: "Germany",
    flag: "/assets/icons/country-flags/4x3/de.svg",
  },
  {
    code: "IT",
    dial_code: "+39",
    name: "Italy",
    flag: "/assets/icons/country-flags/4x3/it.svg",
  },
  {
    code: "ES",
    dial_code: "+34",
    name: "Spain",
    flag: "/assets/icons/country-flags/4x3/es.svg",
  },
  {
    code: "NL",
    dial_code: "+31",
    name: "Netherlands",
    flag: "/assets/icons/country-flags/4x3/nl.svg",
  },
  {
    code: "JP",
    dial_code: "+81",
    name: "Japan",
    flag: "/assets/icons/country-flags/4x3/jp.svg",
  },
  {
    code: "CN",
    dial_code: "+86",
    name: "China",
    flag: "/assets/icons/country-flags/4x3/cn.svg",
  },
  {
    code: "SG",
    dial_code: "+65",
    name: "Singapore",
    flag: "/assets/icons/country-flags/4x3/sg.svg",
  },
  {
    code: "TH",
    dial_code: "+66",
    name: "Thailand",
    flag: "/assets/icons/country-flags/4x3/th.svg",
  },
  {
    code: "IN",
    dial_code: "+91",
    name: "India",
    flag: "/assets/icons/country-flags/4x3/in.svg",
  },
  {
    code: "AU",
    dial_code: "+61",
    name: "Australia",
    flag: "/assets/icons/country-flags/4x3/au.svg",
  },
  {
    code: "NZ",
    dial_code: "+64",
    name: "New Zealand",
    flag: "/assets/icons/country-flags/4x3/nz.svg",
  },
  {
    code: "AE",
    dial_code: "+971",
    name: "United Arab Emirates",
    flag: "/assets/icons/country-flags/4x3/ae.svg",
  },
  {
    code: "QA",
    dial_code: "+974",
    name: "Qatar",
    flag: "/assets/icons/country-flags/4x3/qa.svg",
  },
  {
    code: "IL",
    dial_code: "+972",
    name: "Israel",
    flag: "/assets/icons/country-flags/4x3/il.svg",
  },
  {
    code: "ZA",
    dial_code: "+27",
    name: "South Africa",
    flag: "/assets/icons/country-flags/4x3/za.svg",
  },
  {
    code: "KE",
    dial_code: "+254",
    name: "Kenya",
    flag: "/assets/icons/country-flags/4x3/ke.svg",
  },
  {
    code: "MA",
    dial_code: "+212",
    name: "Morocco",
    flag: "/assets/icons/country-flags/4x3/ma.svg",
  },
  /* add / edit as needed */
];

/* ------------------------------------------------------------------ */
/* Validation & formatting helpers                                    */
/* ------------------------------------------------------------------ */
const phoneValidationPatterns: Record<
  string,
  { pattern: RegExp; placeholder: string; maxLength: number }
> = {
  "+1": { pattern: /^\d{10}$/, placeholder: "(XXX) XXX-XXXX", maxLength: 14 },
  "+44": {
    pattern: /^\d{10,11}$/,
    placeholder: "XXXX XXXXXX",
    maxLength: 13,
  },
  "+33": {
    pattern: /^\d{9,10}$/,
    placeholder: "X XX XX XX XX",
    maxLength: 12,
  },
  "+49": {
    pattern: /^\d{10,12}$/,
    placeholder: "XX XXXXXXXX",
    maxLength: 13,
  },
  "+39": {
    pattern: /^\d{9,11}$/,
    placeholder: "XXX XXX XXXX",
    maxLength: 13,
  },
  "+34": { pattern: /^\d{9}$/, placeholder: "XXX XX XX XX", maxLength: 11 },
  "+31": { pattern: /^\d{9}$/, placeholder: "X XXXXXXXX", maxLength: 11 },
  "+81": {
    pattern: /^\d{10,11}$/,
    placeholder: "XX XXXX XXXX",
    maxLength: 13,
  },
  "+86": { pattern: /^\d{11}$/, placeholder: "XXX XXXX XXXX", maxLength: 13 },
  "+65": { pattern: /^\d{8}$/, placeholder: "XXXX XXXX", maxLength: 9 },
  "+66": { pattern: /^\d{9,10}$/, placeholder: "XX XXX XXXX", maxLength: 12 },
  "+91": { pattern: /^\d{10}$/, placeholder: "XXXXX XXXXX", maxLength: 12 },
  "+61": { pattern: /^\d{9}$/, placeholder: "XXX XXX XXX", maxLength: 11 },
  "+64": { pattern: /^\d{8,9}$/, placeholder: "XX XXX XXXX", maxLength: 11 },
  "+971": { pattern: /^\d{8,9}$/, placeholder: "XX XXX XXXX", maxLength: 11 },
  "+974": { pattern: /^\d{8}$/, placeholder: "XXXX XXXX", maxLength: 9 },
  "+972": { pattern: /^\d{8,9}$/, placeholder: "XX XXX XXXX", maxLength: 11 },
  "+27": { pattern: /^\d{9}$/, placeholder: "XX XXX XXXX", maxLength: 11 },
  "+254": { pattern: /^\d{9}$/, placeholder: "XXX XXXXXX", maxLength: 11 },
  "+212": { pattern: /^\d{9}$/, placeholder: "XXX XXXXXX", maxLength: 11 },
};

const formatPhoneNumber = (v: string, cc: string) => {
  const d = v.replace(/\D/g, "");
  switch (cc) {
    case "+1":
      return d.replace(/(\d{0,3})(\d{0,3})(\d{0,4})/, (_, a, b, c) =>
        [a && `(${a}`, b && `) ${b}`, c && `-${c}`].filter(Boolean).join("")
      );
    case "+44":
      return d.replace(/(\d{0,4})(\d{0,6})/, "$1 $2");
    case "+91":
      return d.replace(/(\d{0,5})(\d{0,5})/, "$1 $2");
    default:
      return v;
  }
};

const validatePhoneNumber = (v: string, cc: string) => {
  const digits = v.replace(/\D/g, "");
  const cfg = phoneValidationPatterns[cc];
  if (!digits) return { ok: true, msg: "" }; // Don't show error for empty field
  if (!cfg?.pattern.test(digits))
    return { ok: false, msg: `Invalid phone for ${cc}` };
  return { ok: true };
};

/* ------------------------------------------------------------------ */
/* Small helper for flag rendering                                    */
/* ------------------------------------------------------------------ */
const CountryFlag = ({
  code,
  className = "w-5 h-5",
}: {
  code: string;
  className?: string;
}) => {
  const country = countryDialCodeList.find((c) => c.code === code);
  const flagSrc =
    country?.flag || `/icons/country-flags/4x3/${code.toLowerCase()}.svg`;

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl bg-white",
        className
      )}
    >
      <Image
        src={flagSrc}
        alt={`${code} flag`}
        width={20}
        height={20}
        className="rounded-sm object-cover"
        onError={(e) => {
          // Fallback to a simple colored div if flag image fails
          const target = e.currentTarget;
          target.style.display = "none";
          const fallback = document.createElement("div");
          fallback.className =
            "w-5 h-5 bg-gray-300 rounded-sm flex items-center justify-center text-xs font-bold text-gray-600";
          fallback.textContent = code;
          target.parentNode?.appendChild(fallback);
        }}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export interface PhoneInputProps {
  label?: string;
  value: string;
  countryCode: string;
  onChange: (phone: string) => void;
  onCountryChange: (countryCode: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export default function PhoneInput({
  label = "Phone",
  value,
  countryCode,
  onChange,
  onCountryChange,
  required = false,
  disabled = false,
  error,
  className,
}: Readonly<PhoneInputProps>) {
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const { ok, msg } = validatePhoneNumber(value, countryCode);
  const shouldShowError = error || (!ok && touched && value.length > 0);
  const errorMessage = error || msg;

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative w-full">
      {/* input wrapper - matching InputField pattern */}
      <div
        className={cn(
          "flex h-[60px] w-full items-center gap-2 rounded-xl border-2 bg-white px-4 py-2.5 transition-colors",
          isFocused
            ? "border-accent"
            : shouldShowError
              ? "border-red-500"
              : "border-gray-200",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        {/* country selector */}
        <button
          type="button"
          onClick={() => {
            console.log(
              "Button clicked, disabled:",
              disabled,
              "current open:",
              open
            );
            if (!disabled) {
              setOpen(!open);
              console.log("Setting open to:", !open);
            }
          }}
          disabled={disabled}
          className="flex cursor-pointer items-center gap-2 rounded border border-transparent px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CountryFlag
            code={
              countryDialCodeList.find((c) => c.dial_code === countryCode)
                ?.code || "US"
            }
            className="h-4 w-6"
          />
          <span className="text-sm font-medium">{countryCode}</span>
          <svg
            className={cn("h-3 w-3 transition-transform", open && "rotate-180")}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>

        {/* phone input field - matching InputField pattern */}
        <div className="flex w-full flex-col">
          <label
            className={cn(
              "text-xs leading-4 transition-colors duration-150 text-start",
              isFocused && "",
              shouldShowError && "text-red-500"
            )}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>

          <input
            type="tel"
            className={cn(
              "w-full bg-transparent text-base font-medium outline-none placeholder:text-gray-400 [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!text-foreground [&:-webkit-autofill]:!shadow-[0_0_0_1000px_white_inset] [&:-webkit-autofill]:!transition-[background-color_5000s_ease-in-out_0s]",
              shouldShowError && "text-red-600"
            )}
            placeholder={
              phoneValidationPatterns[countryCode]?.placeholder ||
              "Enter phone number"
            }
            maxLength={phoneValidationPatterns[countryCode]?.maxLength || 15}
            value={value}
            onChange={(e) =>
              onChange(formatPhoneNumber(e.target.value, countryCode))
            }
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              if (value.length > 0) {
                setTouched(true);
              }
            }}
            disabled={disabled}
          />
        </div>
      </div>

      {/* dropdown */}
      {open && !disabled && (
        <div className="absolute z-[9999] mt-1 max-h-60 w-full overflow-y-auto rounded-xl border-2 border-gray-200 bg-white shadow-xl">
          {countryDialCodeList.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                setOpen(false);
                onCountryChange(c.dial_code);
                onChange(""); // Clear phone when country changes
              }}
              className={cn(
                "hover: flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-left",
                c.dial_code === countryCode && "bg-secondary"
              )}
            >
              <CountryFlag code={c.code} className="h-4 w-6" />
              <span className="min-w-[3rem] font-medium">{c.dial_code}</span>
              <span className="truncate text-sm">{c.name}</span>
            </button>
          ))}
        </div>
      )}

      {shouldShowError && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
