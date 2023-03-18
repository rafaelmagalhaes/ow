import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import TableHeader from '~/components/TableHeader.vue';
import { TableHeaderSorting } from '~/types';

describe('TableHeader', () => {
  let wrapper;
  const headers = [
    {
      id: 'titleNumber',
      label: 'Title Number',
      isSortable: true,
      activeSort: false,
      sorting: TableHeaderSorting.None,
    },
    {
      id: 'propertyAddress',
      label: 'Property Address',
      isSortable: false,
      activeSort: false,
      sorting: TableHeaderSorting.None,
    },
  ];

  beforeEach(() => {
    wrapper = shallowMount(TableHeader, {
      props: {
        headers,
      },
    });
  });

  it('renders the correct number of columns', () => {
    expect(wrapper.findAll('th')).toHaveLength(2);
  });
  it('emits a selected-sorting event when a column is clicked', async () => {
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('selectedSorting')).toBeTruthy();
    expect(wrapper.emitted('selectedSorting')[0][0]).toEqual(headers[0]);
  });
});
