import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useEffect, useMemo, useState } from 'react';
import './SkillsTabGroup.scss';

interface Skill {
  name: string;
  level?: number;
  years: string;
  projects: number | string;
  icon: string;
}

interface SkillsData {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
}

interface SkillsTabGroupProps {
  skills?: SkillsData;
}

export default ({ skills }: SkillsTabGroupProps) => {
  const [animatedSkills, setAnimatedSkills] = useState<SkillsData>({
    frontend: [],
    backend: [],
    tools: [],
  });

  const categories = useMemo(() => {
    return Object.keys(skills ?? {}).map(key => {
      let label = key.charAt(0).toUpperCase() + key.slice(1);

      if (key === 'frontend') label = 'Frontend';
      if (key === 'backend') label = 'Backend';
      if (key === 'tools') label = 'Tools & Others';

      return {
        key,
        label,
        icon: '',
      };
    });
  }, []);

  function calculateProficiency(
    years: number,
    projects: string | number
  ): number {
    const projectCount = projects === 'All' ? 20 : Number(projects);
    const score = years * 10 + projectCount * 2;
    return Math.min(score, 90);
  }

  const enrichedSkills = useMemo(() => {
    return Object.fromEntries(
      Object.entries(skills ?? {}).map(([category, items]) => [
        category,
        items.map(item => ({
          ...item,
          level: calculateProficiency(item.years, item.projects),
        })),
      ])
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enrichedSkills) {
        setAnimatedSkills(enrichedSkills);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [enrichedSkills]);

  const SkillBar = ({ skill }: { skill: Skill }) => {
    return (
      <div className='skill-item'>
        <div className='skill-item__header'>
          <div className='skill-item__info'>
            <h4 className='skill-item__name'>{skill.name}</h4>
            <div className='skill-item__stats'>
              <span className='skill-item__years'>{skill.years}+ years</span>
              <span className='skill-item__projects'>
                {skill.projects} projects
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='skills-tab-group'>
      <TabGroup>
        <TabList className='skills-tab-group__header'>
          {categories.map(category => (
            <Tab key={category.key} className='skills-tab-group__btn'>
              {category.label}
            </Tab>
          ))}
        </TabList>

        <TabPanels className='skills-tab-group__body'>
          {categories.map(category => (
            <TabPanel key={category.key} className='skills-tab-group__content'>
              <div className='skills-grid'>
                {animatedSkills[category.key as keyof SkillsData]?.map(
                  skill => (
                    <SkillBar key={skill.name} skill={skill} />
                  )
                )}
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};
