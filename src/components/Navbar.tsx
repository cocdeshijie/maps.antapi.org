import * as React from 'react';
import Image from "next/image";

function Navbar() {
    return (
        <div className={"z-50 fixed bg-red-100/75 inset-0 h-max p-2 my-4 mx-8"}>
            <div className={"grid grid-cols-6 mx-auto items-center"}>
                <div className={"col-span-6 flex items-center gap-2 h-12 justify-center"}>
                    <Image
                        className={"h-full w-auto"}
                        src="/img.png"
                        width={500}
                        height={500}
                        alt="Placeholder"
                    />
                    <span
                        className={"w-auto text-2xl font-semibold"}>
                        Ant API Maps
                    </span>
                </div>
                <div className={"col-span-6 flex flex-1 justify-center px-2 items-start"}>
                    <div className={"flex"}>
                        <span
                            className={"inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 sm:text-sm"}>
                            Species
                        </span>
                        <input
                            type="text"
                            name="species-input"
                            id="species-input"
                            className={"block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                            placeholder="Camponotus"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;