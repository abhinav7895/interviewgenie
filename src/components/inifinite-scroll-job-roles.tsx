import React, { Dispatch } from 'react';
import { motion } from 'framer-motion';
import { Fraunces } from 'next/font/google';
import { JobRoles } from '@/types/types';

const fraunces = Fraunces({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"]
});


interface InfiniteScrollJobRolesProps {
  jobRoles : JobRoles[],
  handleJobRoleSelect : Dispatch<JobRoles>
}

const InfiniteScrollJobRoles:React.FC<InfiniteScrollJobRolesProps> = ({ jobRoles, handleJobRoleSelect }) => {
  return (
    <div className="w-full overflow-hidden pb-10">
      <motion.div
        className="flex gap-3"
        animate={{
          x: [0, -1200],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[...jobRoles, ...jobRoles].map((job, index) => (
          <motion.div
            key={index}
            className='flex-shrink-0 flex flex-col text-sm rounded-xl w-[200px] bg-neutral-800 border text-neutral-400 border-neutral-700 p-3 cursor-pointer hover:bg-neutral-700 transition-colors'
            onClick={() => handleJobRoleSelect(job)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 className={`${fraunces.className} font-light justify-center text-base text-neutral-100 flex items-center truncate gap-1`}>
              <job.icon className={job.iconColor} /> {job.title}
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteScrollJobRoles;