import {MeetingAndPickup} from "@/components/sections/day-tour-view/MeetingAndPickup";
import {DropDownDetails} from "@/components/sections/day-tour-view/DropDownDetails";

interface DetailsSectionProps {
    tourDetails : any
}

export const DetailsSection = ({tourDetails}: DetailsSectionProps) => {
    return (
        <section className="px-4">
            <div className="mb-2">
                <MeetingAndPickup start={tourDetails.start.city} happening={tourDetails.happening.city} end={tourDetails.end.city} />
                <DropDownDetails listName="Accessibility" details={tourDetails.accessibility || ""}/>
                <DropDownDetails listName="Additional Info" details={tourDetails.additionalInfo || ""}/>
            </div>
        </section>
    )
}