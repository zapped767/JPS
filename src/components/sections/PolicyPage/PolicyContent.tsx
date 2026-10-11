import React from 'react';
import TermsContent from './TermsContent';
import PrivacyContent from './PrivacyContent';
import RefundContent from './RefundContent';
import CookieContent from "@/components/sections/PolicyPage/CookieContent";

interface PolicyContentProps {
    activeTab: string;
    setActiveTab: (tab: string) => void; // <-- accept setter
}

const PolicyContent: React.FC<PolicyContentProps> = ({activeTab, setActiveTab}) => {
    return (
        <div
            className="bg-white rounded-[24px] sm:rounded-3xl border border-purple-600 p-5 sm:p-8 md:p-12 max-w-5xl mx-auto">
            {activeTab === 'terms-and-conditions' && <TermsContent setActiveTab={setActiveTab}/>}
            {activeTab === 'privacy-policy' && <PrivacyContent/>}
            {activeTab === 'refund-cancellation-policy' && <RefundContent/>}
            {activeTab === 'cookie-policy' && <CookieContent setActiveTab={setActiveTab}/>}
        </div>
    );
};

export default PolicyContent;
