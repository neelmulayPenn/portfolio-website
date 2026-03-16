'use client';

import { motion } from 'framer-motion';

interface AboutProps {
	id?: string;
}

const About: React.FC<AboutProps> = ({ id }) => {
	return (
		<section id={id} className='py-20 bg-black text-white'>
			<div className='container mx-auto px-8'>
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}
					viewport={{ once: true }}
					className='mb-8'
				>
					<h2 className='text-6xl font-bold'>ABOUT ME</h2>
					<div className='w-full h-0.5 bg-zinc-800 mt-4'></div>
				</motion.div>

				<div className='flex flex-col md:flex-row gap-12'>
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						viewport={{ once: true }}
						className='md:w-1/2 space-y-8 flex-shrink-0' // ADDED flex-shrink-0
					>
						<h3 id='education' className='text-5xl font-bold mb-4'>
							EDUCATION
						</h3>

						<div className='space-y-1'>
							<div className='flex items-start'>
								<div className='w-1 h-16 bg-blue-400 mr-4 flex-shrink-0'></div>
								<div>
									<h4 className='text-xl font-semibold'>
										MS Mechatronics & Robotics
									</h4>
									<p className='text-gray-400'>
										2026, University of Pennsylvania
									</p>
								</div>
							</div>
						</div>

						<div className='space-y-1'>
							<div className='flex items-start'>
								<div className='w-1 h-16 bg-blue-400 mr-4 flex-shrink-0'></div>
								<div>
									<h4 className='text-xl font-semibold'>
										BE Mechanical Engineering
									</h4>
									<p className='text-gray-400'>
										2024, Birla Institute of Technology and
										Science, Pilani
									</p>
								</div>
							</div>
						</div>

						<p className='text-gray-300 mt-6'>
							I'm a full-stack roboticist with hands-on experience across the entire stack — from embedded firmware and hardware integration to autonomy algorithms, SLAM, and production-grade deployment. I'm drawn to problems where robots need to work reliably in unstructured, real-world environments, and I care deeply about building systems that are safe, testable, and ready for deployment at scale.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						viewport={{ once: true }}
						className='md:w-1/2'
					>
						<div>
							<img
								src='/profile.png'
								alt='Profile'
								className='w-full h-auto rounded-lg mb-8'
							/>
						</div>
					</motion.div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						viewport={{ once: true }}
						className='bg-zinc-900 p-6 rounded-lg'
					>
						<div className='flex items-center mb-2'>
							<div className='text-2xl mr-2'>💡</div>
							<h3 className='text-xl font-semibold'>
								First-principles Thinker
							</h3>
						</div>
						<div className='w-24 h-1 bg-green-400 mb-4'></div>
						<p className='text-gray-300 text-sm'>
							I love breaking hard problems down to their fundamentals — whether it's debugging a mislocalization in a hospital corridor or modeling sensor noise from scratch. I do my best work collaborating closely with a team.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						viewport={{ once: true }}
						className='bg-zinc-900 p-6 rounded-lg'
					>
						<div className='flex items-center mb-2'>
							<div className='text-2xl mr-2'>💡</div>
							<h3 className='text-xl font-semibold'>
								Full-stack Robotics
							</h3>
						</div>
						<div className='w-24 h-1 bg-green-400 mb-4'></div>
						<p className='text-gray-300 text-sm'>
							Experienced across the full robotics stack — from SLAM, localization, and motion planning to embedded firmware, sensor fusion, and hardware integration.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						viewport={{ once: true }}
						className='bg-zinc-900 p-6 rounded-lg'
					>
						<div className='flex items-center mb-2'>
							<div className='text-2xl mr-2'>💡</div>
							<h3 className='text-xl font-semibold'>
								Deployment Mindset
							</h3>
						</div>
						<div className='w-24 h-1 bg-green-400 mb-4'></div>
						<p className='text-gray-300 text-sm'>
							I build systems with production in mind — writing testable, modular autonomy software, validating through Sim2Real pipelines, and tuning for robustness across heterogeneous robot fleets.
						</p>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default About;
