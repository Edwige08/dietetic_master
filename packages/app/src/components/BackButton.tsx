'use client';

import { useBackNavigation } from "@/hooks/useBackNavigation";
import { ArrowLeftIcon } from "@phosphor-icons/react";

type BackButtonProps = {
    fallbackHref?: string;
    label?: string;
};

export default function BackButton ({
    fallbackHref = '/dashboard',
    label = 'Page précédente',
    }: BackButtonProps) {
        const handleBack = useBackNavigation(fallbackHref);
        return (
            <button type="button" onClick={handleBack} className="arrowLeft">
                <ArrowLeftIcon />
                {label}
            </button>
        )
    }
