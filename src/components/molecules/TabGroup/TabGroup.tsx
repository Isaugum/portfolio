import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useMemo } from 'react';
import './TabGroup.scss';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: string;
}

interface TabGroupProps {
  projects?: Project[];
}

export default ({ projects = [] }: TabGroupProps) => {
  const displayCategories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(projects.map(p => p.category).filter(Boolean))
    );

    return ['All', ...uniqueCategories];
  }, []);

  return (
    <TabGroup className={'tab-group'}>
      <TabList className={'tab-group__header'}>
        {displayCategories.map(category => (
          <Tab key={category} className={'tab-group__btn'}>
            {category}
          </Tab>
        ))}
      </TabList>
      <TabPanels className={'tab-group__body'}>
        {displayCategories.map(category => (
          <TabPanel key={category} className={'tab-group__content'}>
            <div className='projects-grid'>
              {projects
                .filter(
                  project => category === 'All' || project.category === category
                )
                .map(project => (
                  <div key={project.id} className='project-card'>
                    {project.imageUrl && (
                      <div className='project-card__image'>
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          loading='lazy'
                        />
                        <div className='project-card__overlay'>
                          <div className='project-card__links'>
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='project-card__link project-card__link--live'
                              >
                                <svg
                                  width='20'
                                  height='20'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  stroke='currentColor'
                                  strokeWidth='2'
                                >
                                  <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'></path>
                                  <polyline points='15,3 21,3 21,9'></polyline>
                                  <line x1='10' y1='14' x2='21' y2='3'></line>
                                </svg>
                                Live Demo
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='project-card__link project-card__link--github'
                              >
                                <svg
                                  width='20'
                                  height='20'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  stroke='currentColor'
                                  strokeWidth='2'
                                >
                                  <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path>
                                </svg>
                                GitHub
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className='project-card__content'>
                      <h3 className='project-card__title'>{project.title}</h3>
                      <p className='project-card__description'>
                        {project.description}
                      </p>

                      <div className='project-card__technologies'>
                        {project.technologies.map(tech => (
                          <span key={tech} className='project-card__tech'>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};
