import DataTable from '~/components/DataTable.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';

describe('DataTable', () => {
  let wrapper;
  const headers = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
  ];
  const items = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
  ];
  beforeEach(() => {
    wrapper = shallowMount(DataTable, {
      props: {
        headers,
        items,
      },
    });
  });

  it('emits a rowClick event when a row is clicked', async () => {
    await wrapper.find('tr:nth-child(2)').trigger('click');
    expect(wrapper.emitted('rowClick')).toBeTruthy();
    expect(wrapper.emitted('rowClick')[0][0]).toEqual(items[1]);
  });
});
