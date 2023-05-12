import { expect, describe, it } from 'vitest';
import { mount  } from '@vue/test-utils';
import Index from '../pages/index.vue';

// Define data to be tested
const stationId = 2358;
const stationName = 'Aker Brygge 3 mot Fergene';
const stationTotal = 15;

describe('index.vue', () => {
  it('Test if the station name is correct', async () => {
    
    const wrapper = mount(Index);
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(wrapper.find(`tr[stationid="${stationId}"] .name`).text()).toBe(stationName);

  })

  it('Test if number of bikes and docks have a correct total', async () => {

    const wrapper = mount(Index);
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const numBikes = wrapper.find(`tr[stationid="${stationId}"] .num_bikes`).text();
    const numDocks = wrapper.find(`tr[stationid="${stationId}"] .num_docks`).text();

    expect(parseInt(numBikes) + parseInt(numDocks)).toEqual(stationTotal)

  })

})