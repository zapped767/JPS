import React from "react";
import { FaBed, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { PiMapPinFill } from "react-icons/pi";
import { TbBeach } from "react-icons/tb";
import { ImSpoonKnife } from "react-icons/im";

interface DayCardProps {
  day: string;
  destination: string;
  description: string;
  experiences: string[];
  stayAt?: string;
  roomType?: string;
  foodSpecialty: string;
  align: "left" | "right";
}

export const DayCard: React.FC<DayCardProps> = ({
  day,
  destination,
  description,
  experiences,
  stayAt,
  roomType,
  foodSpecialty,
  align,
}) => {
  return (
    <motion.div
      className={`w-full max-w-[504px] min-h-[420px] bg-[#f1f1f1] relative rounded-t-[75px] ps-14 max-xl:ps-8 pe-10 max-xl:pe-6 py-6 max-xl:py-4 flex flex-col gap-[12px] max-md:gap-[5px] max-xl:max-w-[400px] max-xl:min-h-[320px] max-lg:max-w-[250px] max-lg:min-h-[200px] [@media(min-width:380px)_and_(max-width:767px)]:min-w-[300px] max-md:rounded-t-[40px] max-md:ps-6 max-md:pe-4 max-md:py-4 ${
        align === "right"
          ? "rounded-l-[75px] max-md:rounded-[40px]"
          : "rounded-r-[75px] max-md:rounded-[40px]"
      }`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.02,
        y: -5,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      }}
    >
      {/* Day Title */}
      <motion.div
        className=""
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <span className="font-bold text-[33px] leading-[39px] text-center text-[#4a4a4a] max-xl:text-[20px] max-xl:leading-[24px] max-md:text-[18px] max-md:leading-[22px]">
          {day}
        </span>
        <br />
        <span className="font-medium text-[18px] leading-[19px] text-[#872bff] max-lg:text-[14px] max-lg:leading-[15px]">
          {destination}
        </span>
      </motion.div>

      {/* Description */}
      <motion.div
        className=""
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <p className="font-normal text-[16px] leading-[20px] text-[#616161] max-lg:text-[12px] max-lg:leading-[14px]">
          {description}
        </p>
      </motion.div>

      {/* Info Cards Row 1 */}
      <motion.div
        className="grid grid-cols-2 gap-[9px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Destination Card */}
        <div className="flex items-center gap-[9px] max-xl:gap-[5px]">
          <div className="w-[43px] h-[43px] max-xl:w-8 max-xl:h-8 bg-primary-200 rounded-[15px] max-xl:rounded-[10px] flex items-center justify-center">
            <PiMapPinFill className="w-6 h-6 text-primary-500 max-xl:w-4 max-xl:h-4" />
          </div>
          <div>
            <div className="font-semibold text-[14px] leading-[15px] text-[#3b3b3b] mb-[2px] max-lg:text-[12px] max-lg:leading-[14px]">
              Destination
            </div>
            <div className="font-normal text-[13px] leading-[15px] text-primary-500 max-lg:text-[11px] max-lg:leading-[12px]">
              {destination}
            </div>
          </div>
        </div>

        {/* Stay At Card */}
        {stayAt && (
          <div className="flex items-center gap-[9px] max-xl:gap-[5px]">
            <div className="w-[43px] h-[43px] max-xl:w-8 max-xl:h-8 bg-primary-200 rounded-[15px] max-xl:rounded-[10px] flex items-center justify-center">
              <TbBeach className="w-6 h-6 text-primary-500 max-xl:w-4 max-xl:h-4" />
            </div>
            <div>
              <div className="font-semibold text-[14px] leading-[15px] text-[#3b3b3b] mb-[2px] max-lg:text-[12px] max-lg:leading-[14px]">
                Stay At
              </div>
              <div className="font-normal text-[13px] leading-[15px] text-primary-500 max-lg:text-[11px] max-lg:leading-[12px]">
                {stayAt}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-[9px] max-xl:gap-[5px]">
          <div className="w-[43px] h-[43px] max-xl:w-8 max-xl:h-8 bg-primary-200 rounded-[15px] max-xl:rounded-[10px] flex items-center justify-center">
            <ImSpoonKnife className="w-6 h-6 text-primary-500 max-xl:w-4 max-xl:h-4" />
          </div>

          <div>
            <div className="font-semibold text-[14px] leading-[15px] text-[#3b3b3b] mb-[2px] max-lg:text-[12px] max-lg:leading-[14px]">
              Food Specialty
            </div>
            <div className="font-normal text-[13px] leading-[15px] text-primary-500 max-lg:text-[11px] max-lg:leading-[12px]">
              {foodSpecialty}
            </div>
          </div>
        </div>

        {/* Room Type Card */}
        {roomType && (
          <div className="flex items-center gap-[9px] max-xl:gap-[5px]">
            <div className="w-[43px] h-[43px] max-xl:w-8 max-xl:h-8 bg-primary-200 rounded-[15px] max-xl:rounded-[10px] flex items-center justify-center">
              <FaBed className="w-6 h-6 text-primary-500 max-xl:w-4 max-xl:h-4" />
            </div>

            <div>
              <div className="font-semibold text-[14px] leading-[15px] text-[#3b3b3b] mb-[2px] max-lg:text-[12px] max-lg:leading-[14px]">
                Room Type
              </div>
              <div className="font-normal text-[13px] leading-[15px] text-primary-500 max-lg:text-[11px] max-lg:leading-[12px]">
                {roomType}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* What You'll Experience Section */}
      <motion.div
        className=""
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="flex items-center gap-[132px] mb-[22px] absolute max-xl:gap-[10px] max-xl:mb-[10px]"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          viewport={{ once: true }}
        >
          <div className="bg-[#eb00a5] rounded-[50px] px-6 py-[12px] flex items-center gap-[12px] max-lg:px-[5px] max-lg:py-[5px] max-lg:gap-[5px]">
            <FaStar className="text-[#FCC417] text-2xl" />

            <span className="font-semibold text-[14px] leading-[16px] text-center text-white max-lg:text-[12px] max-lg:leading-[14px]">
              What You'll Experience
            </span>
          </div>
        </motion.div>

        {/* Experience List */}
        <motion.div
          className="bg-[#e7e7e7] rounded-[25px] px-6 mt-7 ms-8 pt-8 pb-6 max-xl:px-3 max-xl:mt-4 max-xl:ms-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="space-y-[11px] max-xl:space-y-[5px]">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-[7px] max-xl:gap-[5px]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="min-w-[8px] min-h-[8px] bg-[#eb00a5] rounded-full mt-[2px]" />
                <span className="font-semibold text-[14px] leading-[15px] text-[#646464] max-lg:text-[12px] max-lg:leading-[14px]">
                  {experience}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
