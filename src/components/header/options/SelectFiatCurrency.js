import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { setSelectedCurrency } from '../../../actions/selected';
import { getSelectedCurrency} from '../../../reducers/rootReducer';


import SelectCurrency, { styles } from './SelectFiatCurrencyView';

const mapStateToProps = store => ({
    selectedCurrency: getSelectedCurrency(store)
});

const mapDispatchToProps = dispatch => ({
    setSelectedCurrency: (currency) => dispatch(setSelectedCurrency(currency))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SelectCurrency));
