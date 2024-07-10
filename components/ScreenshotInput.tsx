"use client";

import { StdResponse } from "@/types/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FiCornerDownRight, FiX } from "react-icons/fi";

export default function ScreenshotInput() {

    const [screenshot, set_screenshot] = useState<File | null>(null);
    const [modal_open, set_modal_open] = useState(false);

    function process_paste(event: ClipboardEvent) {

        const items = event.clipboardData?.items;

        if (items) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    const blob = items[i].getAsFile();
                    if (blob) {
                        set_screenshot(blob);
                        set_modal_open(true);
                    }
                }
            }
        }
    }

    useEffect(() => {
        document.addEventListener("paste", (event) => process_paste(event));
        return () => {
            document.removeEventListener("paste", (event) => { process_paste(event); });
        };
    });

    async function upload_screenshot() {


        if (screenshot) {

            const formData = new FormData();
            formData.append("screenshot", screenshot);

            toast.promise(

                fetch(process.env.NEXT_PUBLIC_API_URL + "/upload-screenshot", {
                    method: "POST",
                    body: formData
                })
                    .then((response) => response.json())
                    .then((data: StdResponse) => {

                        if ("error" in data) {
                            throw new Error(data.error);
                        }

                        return data;

                    }),

                {
                    loading: 'Processing...',
                    success: (data) => {
                        set_modal_open(false);
                        set_screenshot(null);
                        return `Screenshot Processed in ${data.processing_time}ms`;
                    },
                    error: (error) => {
                        console.error(error);
                        return error.message;
                    }
                }

            );
        }
    }

    return (
        <>

            <Toaster />

            <div
                onClick={ () => set_modal_open(false) }
                style={ { visibility: modal_open ? "visible" : "hidden" } }
                className="w-screen h-screen fixed inset-0 bg-black/50 backdrop-blur-sm grid place-items-center"
            >

                <dialog
                    open={ modal_open }
                    className="w-1/2 bg-white/25 relative p-8"
                    onClick={ (e) => e.stopPropagation() }
                >

                    <div className="relative w-full aspect-video">
                        {
                            screenshot && <Image src={ URL.createObjectURL(screenshot) } fill alt="Screenshot" />
                        }
                    </div>

                    <div className="flex justify-end mt-8 gap-x-8 text-white text-4xl">

                        <button
                            onClick={ () => set_modal_open(false) }
                            className="p-2 rounded bg-red-500 hover:outline"
                        >
                            <FiX />
                        </button>

                        <button
                            onClick={ upload_screenshot }
                            className="p-2 rounded bg-green-500 hover:outline"
                        >
                            <FiCornerDownRight />
                        </button>

                    </div>

                </dialog >

            </div >

        </>
    );

}
