import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useEffect, useState } from 'react';
import './AboutTabGroup.scss';

interface PersonalStats {
  years: string;
  projects: number;
  tools: number;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  type: string;
}

interface AboutTabGroupProps {
  stats?: PersonalStats;
  timeline?: TimelineItem[];
}

export default ({ stats, timeline }: AboutTabGroupProps) => {
  const [animatedStats, setAnimatedStats] = useState<PersonalStats>({
    years: '0',
    projects: 0,
    tools: 0,
  });

  useEffect(() => {
    if (stats) {
      // Animate counters
      const animateCounter = (
        target: number,
        setter: (val: number) => void,
        duration: number = 2000
      ) => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setter(target);
            clearInterval(timer);
          } else {
            setter(Math.floor(start));
          }
        }, 16);
      };

      setTimeout(() => {
        animateCounter(stats.projects, val =>
          setAnimatedStats(prev => ({ ...prev, projects: val }))
        );
        animateCounter(stats.tools, val =>
          setAnimatedStats(prev => ({ ...prev, tools: val }))
        );
        setAnimatedStats(prev => ({
          ...prev,
          years: stats.years,
        }));
      }, 500);
    }
  }, [stats]);

  const StatCard = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div className='stat-card'>
      <div className='stat-card__icon' aria-hidden='true'></div>
      <div className='stat-card__value'>{value}</div>
      <div className='stat-card__label'>{label}</div>
    </div>
  );

  const TimelineItem = ({ item }: { item: TimelineItem }) => (
    <div className={`timeline-item timeline-item--${item.type}`}>
      <div className='timeline-item__marker'>
        <div className='timeline-item__icon' aria-hidden='true'></div>
        <div className='timeline-item__year'>{item.year}</div>
      </div>
      <div className='timeline-item__content'>
        <h4 className='timeline-item__title'>{item.title}</h4>
        <p className='timeline-item__description'>{item.description}</p>
      </div>
    </div>
  );

  return (
    <div className='about-tab-group'>
      <TabGroup>
        <TabList className='about-tab-group__header'>
          <Tab className='about-tab-group__btn'>
            <span className='about-tab-group__icon' aria-hidden='true'></span>
            Stats
          </Tab>
          <Tab className='about-tab-group__btn'>
            <span className='about-tab-group__icon' aria-hidden='true'></span>
            Timeline
          </Tab>
        </TabList>

        <TabPanels className='about-tab-group__body'>
          <TabPanel className='about-tab-group__content'>
            <div className='stats-grid'>
              <StatCard label='Years Coding' value={animatedStats.years} />
              <StatCard
                label='Projects Completed'
                value={animatedStats.projects}
              />
              <StatCard label='Tools used' value={`${animatedStats.tools}+`} />
            </div>
          </TabPanel>

          <TabPanel className='about-tab-group__content'>
            <div className='timeline'>
              {timeline?.map((item, index) => (
                <TimelineItem key={`${index}-${item.year}`} item={item} />
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};
