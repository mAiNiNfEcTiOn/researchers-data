import React from 'react';
import { Line } from 'react-chartjs-2';
import ResearcherShape from '../../shapes/Researcher.shape';

import styles from './ResearcherData.module.css';

const CHART_LABELS = new Array(5)
  .fill(new Date().getFullYear())
  .map((item, index) => item - index)
  .reverse();

const ResearcherData = ({ researcher }) => {
  const { citations, publications } = researcher;

  const data = {
    labels: CHART_LABELS,
    datasets: [
      {
        borderColor: '#A7761C',
        data: citations,
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
        data: publications,
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
  };

  return (
    <section key={researcher.id} className={styles.researcherData}>
      <Line data={data} />
    </section>
  );
};

ResearcherData.displayName = 'ResearcherData';
ResearcherData.propTypes = {
  researcher: ResearcherShape,
};

export default React.memo(ResearcherData);
