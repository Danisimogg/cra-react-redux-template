import React from 'react'
import CatalogList from "./index";

// This default export determines where you story goes in the story list
export default {
  title: 'Catalog/CatalogList',
  component: CatalogList,
};

const Template = (args) =>
  <CatalogList  {...args} />;

export const CatalogListComponent = Template.bind({});

CatalogListComponent.args = {
  /* the args you need here will depend on your component */
  item: {},
};
