"use client"

import React, {useState} from "react"
import {Button} from "@/components/ui/Button";
import {toast} from "react-toastify";
import {inquiryService} from "@/lib/services";
import Link from "next/link";
import {RelatedPosts} from "@/components/sections/view-blog/RelatedPosts";

interface BlogSidebarProps {
    author: string;
    aboutAuthor: string;
    bestTimeToVisit: Record<string, string>;
}

export function BlogSidebar({author, aboutAuthor, bestTimeToVisit}: BlogSidebarProps) {
    const [subscribeEmail, setSubscribeEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!subscribeEmail) {
            toast.error("Please enter an email address!", {
                position: window.innerWidth < 768 ? "top-center" : "bottom-right",
            });
            setLoading(false);
            return;
        }

        try {
            const res = await inquiryService.subscribe(subscribeEmail);

            toast.success(res, {
                position: window.innerWidth < 768 ? "top-center" : "bottom-right",
            });
            setSubscribeEmail("");
        } catch (err: any) {
            toast.error(err.response.data.error, {
                position: window.innerWidth < 768 ? "top-center" : "bottom-right",
            });
            setSubscribeEmail("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 px-4">
            {/* Plan Your Trip Card */}
            <div className="bg-primary-500 rounded-2xl p-6 text-center">
                <h3 className="text-xl !font-extrabold text-white mb-4">Plan Your Sri Lanka Trip With Us</h3>
                <p className="text-sm text-white mb-4 text-center lg:text-justify">
                    Ready to experience Sri Lanka for yourself? <br/> Let our travel experts help you create the perfect
                    itinerary
                    tailored to your interests and budget.
                </p>
                <Link href="/packages">
                    <Button
                        className="w-full py-3 border-2 font-bold rounded-full bg-white text-primary-500 hover:bg-white hover:text-primary-500 cursor-pointer max-w-[300px]">
                        Get Started
                    </Button>
                </Link>
            </div>


            <div className="max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1 gap-8 lg:space-y-8">
                {/* About the Author */}
                <div className="bg-white rounded-2xl p-6 shadow-sm shadow-primary-100 max-lg:text-center">
                    <h3 className="text-lg font-bold text-[#1c1c1c] mb-4">About the Author</h3>
                    <p className="text-sm text-[#707487] leading-relaxed">
                      <span className="text-[#872bff] font-medium">
                        {author}
                      </span>{" "}
                        {aboutAuthor}
                    </p>
                </div>

                {/* Best Time to Visit */}
                <div className="bg-white rounded-2xl p-6 shadow-sm shadow-primary-100 max-lg:text-center">
                    <h3 className="text-lg font-bold text-[#1c1c1c] mb-4">Best Time to Visit</h3>
                    <div className="space-y-3 max-lg:text-center">
                        {Object.entries(bestTimeToVisit).map(([region, time]) => (
                            <TimeToVisitItem key={region} region={region} time={time}/>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subscribe */}
            <div className="bg-white rounded-2xl p-6 shadow-sm shadow-primary-100 max-lg:!text-center">
                <h3 className="text-lg font-bold text-[#1c1c1c] mb-2">Subscribe</h3>
                <p className="text-sm text-[#707487] mb-4">
                    Never miss a travel update! Subscribe to our newsletter for the latest destinations, tips, and
                    exclusive
                    offers.
                </p>
                <div className="space-y-3 flex flex-col items-center">
                    <input
                        type="email"
                        placeholder="Your email address"
                        value={subscribeEmail}
                        onChange={(e) => setSubscribeEmail(e.target.value)}
                        className="w-full px-4 py-3 shadow-sm shadow-primary-100 rounded-lg text-sm focus:outline-none focus:border-[#872bff] transition-colors"
                    />
                    <Button
                        onClick={handleSubscribe}
                        disabled={loading}
                        className="w-full py-3 bg-[#872bff] text-white font-semibold rounded-full hover:bg-[#6a14da] cursor-pointer max-w-[300px]">
                        {loading ? "Subscribing..." : "Subscribe"}
                    </Button>
                </div>
            </div>

            <RelatedPosts/>
        </div>
    )
}

function TimeToVisitItem({region, time}: { region: string; time: string }) {
    return (
        <div className="lg:flex lg:items-start gap-2 max-lg:text-center">
            <span className="text-[#872bff] font-medium text-sm">{region}:</span>
            <span className="text-sm text-[#707487]">{time}</span>
        </div>
    )
}
