import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useEffect, useState } from 'react';
import './AboutTabGroup.scss';

interface PersonalStats {
  codingYears: string;
  projectsCompleted: number;
  languagesLearned: number;
  certifications: number;
  githubCommits: number;
  linesOfCode: string;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  type: string;
}

interface Achievement {
  title: string;
  description: string;
  year: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

interface AboutTabGroupProps {
  stats?: PersonalStats;
  timeline?: TimelineItem[];
  achievements?: Achievement[];
  testimonials?: Testimonial[];
}

export default ({
  stats,
  timeline,
  achievements,
  testimonials,
}: AboutTabGroupProps) => {
  const [animatedStats, setAnimatedStats] = useState<PersonalStats>({
    codingYears: '0',
    projectsCompleted: 0,
    languagesLearned: 0,
    certifications: 0,
    githubCommits: 0,
    linesOfCode: '0',
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
        animateCounter(stats.projectsCompleted, val =>
          setAnimatedStats(prev => ({ ...prev, projectsCompleted: val }))
        );
        animateCounter(stats.languagesLearned, val =>
          setAnimatedStats(prev => ({ ...prev, languagesLearned: val }))
        );
        animateCounter(stats.certifications, val =>
          setAnimatedStats(prev => ({ ...prev, certifications: val }))
        );
        animateCounter(stats.githubCommits, val =>
          setAnimatedStats(prev => ({ ...prev, githubCommits: val }))
        );

        setAnimatedStats(prev => ({
          ...prev,
          codingYears: stats.codingYears,
          linesOfCode: stats.linesOfCode,
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

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
    <div className='achievement-card'>
      <div className='achievement-card__icon' aria-hidden='true'></div>
      <div className='achievement-card__content'>
        <h4 className='achievement-card__title'>{achievement.title}</h4>
        <p className='achievement-card__description'>
          {achievement.description}
        </p>
        <span className='achievement-card__year'>{achievement.year}</span>
      </div>
    </div>
  );

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className='testimonial-card'>
      <div className='testimonial-card__header'>
        <div className='testimonial-card__avatar' aria-hidden='true'></div>
        <div className='testimonial-card__info'>
          <h4 className='testimonial-card__name'>{testimonial.name}</h4>
          <p className='testimonial-card__role'>
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
        <div
          className='testimonial-card__rating'
          aria-label={`${testimonial.rating} out of 5`}
        ></div>
      </div>
      <blockquote className='testimonial-card__content'>
        "{testimonial.content}"
      </blockquote>
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
          <Tab className='about-tab-group__btn'>
            <span className='about-tab-group__icon' aria-hidden='true'></span>
            Achievements
          </Tab>
          <Tab className='about-tab-group__btn'>
            <span className='about-tab-group__icon' aria-hidden='true'></span>
            Testimonials
          </Tab>
        </TabList>

        <TabPanels className='about-tab-group__body'>
          <TabPanel className='about-tab-group__content'>
            <div className='stats-grid'>
              <StatCard
                label='Years Coding'
                value={animatedStats.codingYears}
              />
              <StatCard
                label='Projects Completed'
                value={animatedStats.projectsCompleted}
              />
              <StatCard
                label='Languages Learned'
                value={animatedStats.languagesLearned}
              />
              <StatCard
                label='Certifications'
                value={animatedStats.certifications}
              />
              <StatCard
                label='GitHub Commits'
                value={animatedStats.githubCommits.toLocaleString()}
              />
              <StatCard
                label='Lines of Code'
                value={animatedStats.linesOfCode}
              />
            </div>
          </TabPanel>

          <TabPanel className='about-tab-group__content'>
            <div className='timeline'>
              {timeline?.map(item => (
                <TimelineItem key={item.year} item={item} />
              ))}
            </div>
          </TabPanel>

          <TabPanel className='about-tab-group__content'>
            <div className='achievements-grid'>
              {achievements?.map(achievement => (
                <AchievementCard
                  key={achievement.title}
                  achievement={achievement}
                />
              ))}
            </div>
          </TabPanel>

          <TabPanel className='about-tab-group__content'>
            <div className='testimonials-grid'>
              {testimonials?.map(testimonial => (
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};
