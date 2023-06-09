<script setup>

import axios from 'axios';
import { onMounted, reactive, computed } from 'vue';

const stationsDataResponse = reactive({
  lastUpdated: null,
  stations: [],
});

const API_URL = 'https://bysykkel-api.edy.io';

// Fetch stations status and information, store data locally in browser. 
// In the future this could be extened to offline usage of the application.
// Set the required header as requested by APIs documentation.
onMounted(async () => {
  try {
    const response = await axios.get(`${API_URL}/stations`);
    const data = response.data;
    stationsDataResponse.stations = data.stations;
    stationsDataResponse.lastUpdated = data.last_updated;
    localStorage.setItem('stations_status', JSON.stringify(data.stations));
    localStorage.setItem('last_updated', data.last_updated);
  } catch (error) {
    console.error(error);
  }
});

// Wait till unix time value is fetched, convert to human readable date and time. 
// Displays when the data was last updated, could be especially useful for offline usage of the application. 
const lastUpdatedDate = computed(() => {
  const timestamp = stationsDataResponse.lastUpdated;
  return new Date(timestamp * 1000).toLocaleString('nb-NO', { timeZone: 'Europe/Oslo' });
});

</script>
<template>

  <Header
    title="Oslo Bysykkel 🚴"
    :subtitle="`Sist oppdatert: ${lastUpdatedDate}`"
  />

  <div class="px-4 sm:px-6 lg:px-8 bg-gray-100">
    <div class="sm:flex sm:items-center">
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 mx-auto max-w-7xl">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Stativet</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ledige sykler</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tilgjengelige låser</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="station in stationsDataResponse.stations" :key="station.station_id" :stationId="station.station_id">
                  <td class="name whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">{{ station.name }}</td>
                  <td class="num_bikes whitespace-nowrap px-3 py-4 text-sm text-gray-700">{{ station.num_bikes_available }}</td>
                  <td class="num_docks whitespace-nowrap px-3 py-4 text-sm text-gray-700">{{ station.num_docks_available }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>