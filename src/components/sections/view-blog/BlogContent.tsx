import type React from "react"
import {forwardRef} from "react"
import {BlogSection} from "@/components/sections/view-blog/BlogSection";
import {FaFacebook} from "react-icons/fa";
import {BsInstagram, BsWhatsapp} from "react-icons/bs";
import {LiaLinkedinIn} from "react-icons/lia";
import {Share2} from "lucide-react";
import {Button} from "@/components/ui/Button";
import {FaXTwitter} from "react-icons/fa6";

type BlogSectionType = {
    title?: string;
    content?: string;
    image?: string;
}

interface BlogContentProps {
    sections: BlogSectionType[]
}

const BlogContent = forwardRef<HTMLElement, BlogContentProps>(
    ({sections = []}, ref) => {
        return (
            <article
                ref={ref}
                id="content"
                className="prose prose-lg max-w-none shadow-sm shadow-primary-100 rounded-2xl p-6 scroll-offset"
            >
                {sections.map((section, index) => (
                    <BlogSection
                        key={index}
                        title={section.title}
                        content={section.content}
                        image={section.image}
                    />
                ))}

                {/* Share Section */}
                <div className="mt-10 pt-8 border-t border-[#eeeeee] not-prose hidden">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 text-[#872bff] font-medium">
                            <span>Share this Post</span>
                            <Share2 size={18}/>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            <ShareButton icon={<FaFacebook size={20}/>} label="Share on Facebook"/>
                            <ShareButton icon={<BsWhatsapp size={20}/>} label="Share on WhatsApp"/>
                            <ShareButton icon={<FaXTwitter size={20}/>} label="Share on X"/>
                            <ShareButton icon={<BsInstagram size={20}/>} label="Share on Instagram"/>
                            <ShareButton icon={<LiaLinkedinIn size={20}/>} label="Share on LinkedIn"/>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
)

BlogContent.displayName = "BlogContent"

export default BlogContent


function ShareButton({icon, label}: { icon: React.ReactNode; label: string }) {
    return (
        <Button
            className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm text-primary-500 bg-white hover:bg-white cursor-pointer">
            {icon}
            <span className="hidden sm:inline text-black">{label}</span>
        </Button>
    )
}

