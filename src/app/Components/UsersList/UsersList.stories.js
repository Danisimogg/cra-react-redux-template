import React from 'react'
import CatalogItem from "./index";

// This default export determines where you story goes in the story list
export default {
  title: 'Catalog/CatalogItem',
  component: CatalogItem,
};

const Template = (args) =>
  <CatalogItem  {...args} />;

export const CatalogItemComponent = Template.bind({});

CatalogItemComponent.args = {
  /* the args you need here will depend on your component */
  item: {},
};
