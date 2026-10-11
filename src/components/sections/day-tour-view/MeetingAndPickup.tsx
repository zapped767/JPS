interface MeetingAndPickupProps {
    start: string,
    happening: string,
    end: string,
}

export const MeetingAndPickup = ({start, end}: MeetingAndPickupProps) => {

    return (
        <div className="">
            <div className="rounded-2xl overflow-hidden">
                {/* Header - Always Visible */}
                <div
                    className="w-full px-2 py-1 flex items-center justify-between text-left"
                >
                    <span className="font-bold text-sm text-black">Pickup and Drop</span>
                </div>

                {/* Expandable Content */}
                <div
                    className={`transition-all rounded-2xl duration-300 ease-in-out max-h-96 opacity-100 shadow-lg overflow-hidden`}
                >
                    <div className="px-4 py-2 rounded-2xl flex items-center justify-start gap-6">
                        <div className="flex items-start">
                            <span className="text-gray-700 leading-relaxed text-sm">• Start : {start}</span>
                        </div>
                        <div className="flex items-start">
                            <span className="text-gray-700 leading-relaxed text-sm">• End : {end}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}