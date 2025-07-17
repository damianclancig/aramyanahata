import { MandalaIcon } from "@/components/icons/MandalaIcon";

interface SectionSeparatorProps {
    invisible?: boolean;
}

export function SectionSeparator({ invisible = false }: SectionSeparatorProps) {
  return (
    <div className="w-full bg-background py-12 md:py-20">
        {!invisible && (
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-center" aria-hidden="true">
                    <div className="h-px flex-grow bg-muted"></div>
                    <span className="px-4 text-accent">
                        <MandalaIcon className="h-8 w-8" />
                    </span>
                    <div className="h-px flex-grow bg-muted"></div>
                </div>
            </div>
        )}
    </div>
  );
}
