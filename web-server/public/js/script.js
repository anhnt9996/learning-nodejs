document.addEventListener('DOMContentLoaded', () => {
  console.log('Client side javascript file is loaded!');

  const Weather = {
    async current(address) {
      const res = await fetch(
        `http://127.0.0.1:3000/weather?address=${address}`
      );

      return await res.json();
    },
  };

  const text = document.querySelector('p');

  const loading = (isFetching = false) => {
    const searchBtn = document.getElementById('search-btn');
    const spinner = document.getElementById('spinner');

    text.innerText = '';
    searchBtn.style.display = isFetching ? 'none' : 'block';
    spinner.style.display = isFetching ? 'block' : 'none';
  };

  const weatherForm = document.querySelector('form');

  weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const address = document.getElementById('address');

    loading(true);

    const response = await Weather.current(address.value);

    loading();

    if (response.error) {
      return (text.innerText = response.message);
    }

    const { location, current } = response;

    text.innerText = `${location} is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`;
  });
});
