import React from 'react';

interface SectionHeadingProps {
    children: React.ReactNode;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({children}) => (
    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 border-l-4 border-[#872BFF] pl-3 sm:pl-4">
        {children}
    </h3>
);

export default SectionHeading;