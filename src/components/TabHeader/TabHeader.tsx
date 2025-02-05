import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import React from 'react';
import type { TabsPropsHeader } from '../../types/types';

const tabItems: TabsProps['items'] = [
  {
    key: '1',
    label: 'Search',
  },
  {
    key: '2',
    label: 'Rated',
  },
];
export const TabHeader: React.FC<TabsPropsHeader> = ({ setTabsPage }) => (
  <Tabs
    items={tabItems}
    centered
    size="large"
    destroyInactiveTabPane
    onTabClick={(k) => {
      setTabsPage(Number(k));
    }}
  />
);
