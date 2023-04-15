// components/PopupContent.tsx
import React from 'react';

interface PopupContentProps {
    genus: string;
    species: string;
    data_source: string;
    specimen_code: string;
    date: string;
}

const PopupContent: React.FC<PopupContentProps> = ({
                                                       genus,
                                                       species,
                                                       data_source,
                                                       specimen_code,
                                                       date,
                                                   }) => {
    return (
        <div className="rounded shadow p-2 bg-white">
            <div className="font-semibold text-lg mb-1">
                {genus} {species}
            </div>
            <div>
                <span className="font-semibold">Data Source:</span> {data_source}
            </div>
            <div>
                <span className="font-semibold">Specimen Code:</span> {specimen_code}
            </div>
            <div>
                <span className="font-semibold">Date:</span> {date}
            </div>
        </div>
    );
};

export default PopupContent;
