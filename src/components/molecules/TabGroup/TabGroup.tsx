import './TabGroup.scss'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

export default () => {
  return (
    <TabGroup className={'tab-group'}>
      <TabList className={'tab-group__header'}>
        <Tab className={'tab-group__btn'}>Tab 1</Tab>
        <Tab className={'tab-group__btn'}>Tab 2</Tab>
        <Tab className={'tab-group__btn'}>Tab 3</Tab>
      </TabList>
      <TabPanels className={'tab-group__body'}>
        <TabPanel className={'tab-group__content'}>Content 1</TabPanel>
        <TabPanel className={'tab-group__content'}>Content 2</TabPanel>
        <TabPanel className={'tab-group__content'}>Content 3</TabPanel>
      </TabPanels>
    </TabGroup>
  )
}