import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import ResearcherShape from '../../shapes/Researcher.shape';

import styles from './Navigation.module.css';

const Navigation = ({ researchers, selectedResearcherId = null }) => (
  <section className={styles.researchers}>
    <nav>
      <ul>
        {researchers.map((researcher) => {
          const linkTo = researcher.id === selectedResearcherId ? `/` : `/researcher/${researcher.id}`;
          return (
            <li className={styles.researcherCard} key={researcher.id}>
              <Link
                className={classnames(styles.researcherCardLink, {
                  [styles.researcherCardSelected]: researcher.id === selectedResearcherId,
                })}
                to={linkTo}
              >
                <div className={styles.researcherCardAvatar} />
                <div className={styles.researcherCardData}>
                  <h2>{`${researcher.firstName} ${researcher.lastName}`}</h2>
                  <p className={styles.affiliation}>{researcher.affiliation}</p>
                  <p className={styles.stats}>
                    {researcher.totalPublications} Outputs · {researcher.totalCitations} Citations
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  </section>
);

Navigation.displayName = 'Navigation';
Navigation.propTypes = {
  researchers: PropTypes.arrayOf(ResearcherShape),
  selectedResearcherId: PropTypes.number,
};


export default React.memo(Navigation);
