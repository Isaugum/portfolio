import './SkillsTabGroup.scss'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useState, useEffect } from 'react'

interface Skill {
  name: string;
  level: number;
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
    tools: []
  });

  useEffect(() => {
    // Animate skill bars on mount
    const timer = setTimeout(() => {
      if (skills) {
        setAnimatedSkills(skills);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [skills]);

  const categories = [
    { key: 'frontend', label: 'Frontend', icon: '🎨' },
    { key: 'backend', label: 'Backend', icon: '⚙️' },
    { key: 'tools', label: 'Tools & Others', icon: '🛠️' }
  ];

  const SkillBar = ({ skill }: { skill: Skill }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), 200);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="skill-item">
        <div className="skill-item__header">
          <div className="skill-item__info">
            <h4 className="skill-item__name">{skill.name}</h4>
            <div className="skill-item__stats">
              <span className="skill-item__years">{skill.years} years</span>
              <span className="skill-item__projects">{skill.projects} projects</span>
            </div>
          </div>
          <div className="skill-item__level">{skill.level}%</div>
        </div>
        
        <div className="skill-item__bar">
          <div 
            className={`skill-item__progress ${isVisible ? 'skill-item__progress--animated' : ''}`}
            style={{ width: isVisible ? `${skill.level}%` : '0%' }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="skills-tab-group">
      <TabGroup>
        <TabList className="skills-tab-group__header">
          {categories.map((category) => (
            <Tab key={category.key} className="skills-tab-group__btn">
              <span className="skills-tab-group__icon">{category.icon}</span>
              {category.label}
            </Tab>
          ))}
        </TabList>
        
        <TabPanels className="skills-tab-group__body">
          {categories.map((category) => (
            <TabPanel key={category.key} className="skills-tab-group__content">
              <div className="skills-grid">
                {animatedSkills[category.key as keyof SkillsData]?.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};
