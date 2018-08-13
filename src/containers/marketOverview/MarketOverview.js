import MarketOverview, {styles} from './MarketOverviewView';
import {withStyles} from "@material-ui/core/styles";
import {fetchMarketOverview} from "../../actions/marketOverview";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import {fetchStatus, getErrorMessage, getMarketOverview} from '../../reducers/marketOverview/marketOverviewSelectors';



const mapStateToProps = store => {
    return {
        overview: getMarketOverview(store),
        errorMessage: getErrorMessage(store),
        isFetching: fetchStatus(store)
    };
};

const mapDispatchToProps = dispatch => ({
    fetchOverview : () => dispatch(fetchMarketOverview())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MarketOverview)));