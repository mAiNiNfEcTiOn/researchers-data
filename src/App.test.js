import axios from 'axios';
import React from 'react';
import { render, waitForElement, fireEvent, wait, queryByText } from '@testing-library/react';
import { Line } from 'react-chartjs-2';

import App from './App';
import mockedData from './mockedData.json'
import styles from './App.module.css';
import navigationStyles from './components/Navigation/Navigation.module.css';
import researcherDataStyles from './components/ResearcherData/ResearcherData.module.css';

jest.mock('axios');
jest.mock('react-chartjs-2', () => ({
  Line: jest.fn(),
}));

describe('App', () => {
  afterEach(() => {
    delete process.env.REACT_APP_API_URL;
  });

  it('renders default layout without the chart', async () => {
    const { container } = render(<App />);

    const main = await waitForElement(() => container.querySelector(`.${styles.main}`));
    const researchers = main.querySelectorAll(`.${navigationStyles.researcherCardLink}`);
    const chart = main.querySelector(`.${researcherDataStyles.researcherData}`);

    expect(container).toMatchSnapshot();
    expect(researchers.length).toBe(5);
    expect(chart).toBeFalsy();
  });

  it('when selecting the a researcher it displays his/her data in the chart', async () => {
    let receivedDataset;
    Line.mockImplementation(({ data }) => {
      receivedDataset = data;
      return <canvas />;
    });
    const { container } = render(<App />);

    const main = await waitForElement(() => container.querySelector(`.${styles.main}`));
    const researchers = main.querySelectorAll(`.${navigationStyles.researcherCardLink}`);

    fireEvent.click(researchers[2]);
    await wait(() => researchers[2].classList.contains(navigationStyles.researcherCardSelected));

    expect(container).toMatchSnapshot();
    expect(receivedDataset).toMatchObject({
      labels: [2016, 2017, 2018, 2019, 2020],
      datasets: [
        {
          borderColor: '#A7761C',
          data: [199, 301, 198, 176, 252],
          fill: false,
          label: 'Citations',
          lineTension: 0,
          pointBackgroundColor: '#FFF',
          pointBorderWidth: 3,
          pointHoverBackgroundColor: '#FFF',
          pointHoverRadius: 7,
          pointRadius: 5,
          spanGaps: true,
        },
        {
          borderColor: '#666666',
          data: [77, 103, 47, 81, 85],
          fill: false,
          label: 'Publications',
          lineTension: 0,
          pointBackgroundColor: '#FFF',
          pointBorderWidth: 3,
          pointHoverBackgroundColor: '#FFF',
          pointHoverRadius: 7,
          pointRadius: 5,
        },
      ],
    });
  });

  it('uses axios if the REACT_APP_API_URL is set', async () => {
    process.env.REACT_APP_API_URL = 'https://fake.api.dom';
    axios.CancelToken = { source: () => ({ token: 'fake token', cancel: jest.fn() }) }
    axios.mockResolvedValueOnce({ data: mockedData });

    const { container } = render(<App />);

    await waitForElement(() => container.querySelector(`.${styles.main}`));

    expect(container).toMatchSnapshot();
  });

  it('renders empty when axios returns an error', async () => {
    process.env.REACT_APP_API_URL = 'https://fake.api.dom';
    axios.CancelToken = { source: () => ({ token: 'fake token', cancel: jest.fn() }) }
    axios.mockRejectedValueOnce(new Error('Oops error... not a cancellation'));

    const { container } = render(<App />);

    await waitForElement(() => queryByText(container, 'An error has occurred!'));

    expect(container).toMatchSnapshot();
  });
});
