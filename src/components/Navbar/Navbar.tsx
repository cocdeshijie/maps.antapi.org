import * as React from 'react';
import Image from "next/image";
import SpeciesInput from "@/components/Navbar/SpeciesInput";

interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <div className={"z-50 fixed bg-red-100/75 inset-0 h-max p-2 my-4 mx-8"}>
            <div className={"grid grid-cols-6 mx-auto items-center"}>
                <div className={"col-span-6 flex items-center gap-2 h-12 justify-center lg:col-span-2"}>
                    <Image
                        className={"h-full w-auto"}
                        src="/img.png"
                        width={500}
                        height={500}
                        alt="Placeholder"
                    />
                    <span
                        className={"w-auto text-2xl font-semibold"}>
                        maps.antapi.org
                    </span>
                </div>
                <SpeciesInput
                    span={"Genus"}
                    placeholder={"Camponotus"}
                />
                <SpeciesInput
                    span={"Species"}
                    placeholder={"fragilis"}
                />
            </div>
        </div>
    );
};

export default Navbar;
