import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import Pagination from '~/components/Pagination.vue';

describe('Pagination', () => {
  let wrapper;
  beforeEach(async () => {
    wrapper = await shallowMount(Pagination, {
      propsData: {
        totalPages: 5,
        isFirstPage: false,
        isLastPage: false,
        currentPage: 3,
      },
    });
  });
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  it('emits "prev" event when previous button is clicked', async () => {
    const button = wrapper.find('#previous');
    await button.trigger('click');
    expect(wrapper.emitted('prev')).toBeTruthy();
  });

  it('emits "next" event when next button is clicked', async () => {
    const button = wrapper.find('#next');
    await button.trigger('click');
    expect(wrapper.emitted('next')).toBeTruthy();
  });
  it('renders the correct number of page buttons, including next and prev buttons', () => {
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(7);
  });
});
