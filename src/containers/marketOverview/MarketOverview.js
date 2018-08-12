import MarketOverview, { styles } from './MarketOverviewView';
import {withStyles} from "@material-ui/core/styles";
import {fetchMarketOverviewData} from "../../actions/api";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

const mapStateToProps = state => {
    return {
        overview: state
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMarketOverview: () => {}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MarketOverview)));