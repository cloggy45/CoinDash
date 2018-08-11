import {fetchCoinHistory} from "../../actions/api";
// import connect from "react-redux/es/connect/connect";
import Graph from "./GraphView";
import { connect, store } from "react-redux";

const mapStateToProps = state => {
    const { Data } = state.api.coinHistoryData;
    return {
        requestingData: state.api.requesting,
        dataset: Data,
        selected: state.option.selected
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetch: ticker => dispatch(fetchCoinHistory(ticker))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);