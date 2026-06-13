"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

const locales = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
] as const;

export function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;

    startTransition(() => {
      router.replace(pathname, { locale: newLocale as any });
    });
  };

  return (
    <div className="flex items-center gap-0.5 bg-gray-100 rounded-full p-0.5">
      {locales.map((loc, index) => (
        <button
          key={loc.code}
          onClick={() => handleLocaleChange(loc.code)}
          disabled={isPending}
          className={`relative px-3 py-1.5 text-xs font-black tracking-wider rounded-full transition-all duration-300 ${
            locale === loc.code
              ? "bg-[#CBA135] text-white shadow-md shadow-[#CBA135]/30"
              : "text-gray-500 hover:text-[#2B2B2B] hover:bg-white/80"
          } ${isPending ? "opacity-60 cursor-wait" : "cursor-pointer"}`}
          aria-label={`Switch to ${loc.code}`}
        >
          {loc.label}
        </button>
      ))}
    </div>
  );
}
