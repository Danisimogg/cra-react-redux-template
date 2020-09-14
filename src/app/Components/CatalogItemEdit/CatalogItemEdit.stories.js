import React from 'react'
import CatalogItemEdit from "./index";

// This default export determines where you story goes in the story list
export default {
  title: 'Catalog/Catalog',
  component: CatalogItemEdit,
};

const Template = (args) =>
  <CatalogItemEdit  {...args} />;

export const CatalogItemEditComponent = Template.bind({});

CatalogItemEditComponent.args = {
  onSubmit: alert('test'),
  /* the args you need here will depend on your component */
  item: {},
};
