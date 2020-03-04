import PropTypes from 'prop-types';

export default PropTypes.shape({
  affiliation: PropTypes.string,
  citations: PropTypes.arrayOf(PropTypes.number),
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  publications: PropTypes.arrayOf(PropTypes.number),
  id: PropTypes.number,
});
