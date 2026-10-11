import React from 'react'
import BookThisPackageButton from "@/components/sections/explore/BookThisPackageButton";

type BookThisPackageSectionProps = {
    slug: string
}

const BookThisPackageSection = ({slug}: BookThisPackageSectionProps) => {
    return (
        <div
            className="relative max-w-7xl mx-auto max-xl:mx-10 max-sm:mx-0 pt-5 pb-10 md:pb-16 flex justify-center px-15">
            <BookThisPackageButton slug={slug}/>
        </div>
    )
}

export default BookThisPackageSection
