'use client';

import { motion } from 'framer-motion';
import { Project } from '@/data/projects';
import Link from 'next/link';
import { ProjectImage } from './ProjectImage';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -5 }}
        className="bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="aspect-video bg-gray-200">
          {project.thumbnail && (
            <ProjectImage
              projectId={project.id}
              name="thumbnail"
              alt={project.title}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
          )} 
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <span className="text-sm text-gray-500">{project.year}</span>
          </div>
          <p className="text-gray-600 mb-4">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 