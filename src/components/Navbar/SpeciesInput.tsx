import * as React from "react";

interface SpeciesInputProps {
    span: string;
    placeholder: string;
}

const SpeciesInput = (props: SpeciesInputProps) => {
    return (
        <div className={"col-span-6 flex-1 justify-center px-2 items-start py-1 lg:col-span-1 lg:flex"}>
            <div className={"flex"}>
                <span
                    className={"inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 sm:text-sm"}>
                    {props.span}
                </span>
                <input
                    type="text"
                    name="species-input"
                    id="species-input"
                    className={"block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                    placeholder={props.placeholder}
                />
            </div>
        </div>
    );
};

export default SpeciesInput;
