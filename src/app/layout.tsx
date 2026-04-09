"use client";
import { Albert_Sans } from "next/font/google";
import "../../public/scss/main.scss";
import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

const albertSans = Albert_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-main-family",
});

export default function RootLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Import the script only on the client side
            import("bootstrap/dist/js/bootstrap.esm").then(() => {
                // Module is imported, you can access any exported functionality if
            });
        }
    }, []);

    useEffect(() => {
        const closeUI = async () => {
            const bootstrap = await import("bootstrap");

            document.querySelectorAll(".modal.show").forEach((modalEl) => {
                const el = modalEl as HTMLElement;
                const modalInstance = bootstrap.Modal.getInstance(el);
                if (modalInstance) modalInstance.hide();
            });

            document
                .querySelectorAll(".offcanvas.show")
                .forEach((offcanvasEl) => {
                    const el = offcanvasEl as HTMLElement;
                    const offcanvasInstance =
                        bootstrap.Offcanvas.getInstance(el);
                    if (offcanvasInstance) offcanvasInstance.hide();
                });
        };

        closeUI();
    }, [pathname]);

    return (
        <html lang="en">
            <body className={albertSans.variable}>{children}</body>
        </html>
    );
}


