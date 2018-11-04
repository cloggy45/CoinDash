import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import getSymbolFromCurrency from 'currency-symbol-map';
import format from 'number-format.js';
import { getSelectedFiatCurrency } from '../../reducers/rootReducer';
import { formatterFactory } from '../../misc/helpers';

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});

class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(
                0,
                Math.ceil(this.props.count / this.props.rowsPerPage) - 1,
            ),
        );
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? (
                        <LastPageIcon/>
                    ) : (
                        <FirstPageIcon/>
                    )}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight/>
                    ) : (
                        <KeyboardArrowLeft/>
                    )}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft/>
                    ) : (
                        <KeyboardArrowRight/>
                    )}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? (
                        <FirstPageIcon/>
                    ) : (
                        <LastPageIcon/>
                    )}
                </IconButton>
            </div>
        );
    }
}

TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
    withTheme: true,
})(TablePaginationActions);

export const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class CustomPaginationActionsTable extends React.Component {
    state = {
        page: 0,
        rowsPerPage: 5,
        offSet: 0,
    };

    componentDidMount() {
        this.props.fetchCoinList(0, this.state.rowsPerPage);
    }

    getCurrentOffset() {
        const { page, rowsPerPage } = this.state;
        return page * rowsPerPage;
    }


    handleChangePage = (event, page) => {
        this.setState({ page }, () => {
            const offset = this.getCurrentOffset();
            this.props.fetchCoinList(offset, this.state.rowsPerPage, "rank", this.props.selectedFiat);
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value }, () => {
            const { selectedFiat } = this.props;
            const { rowsPerPage } = this.state;
            const offset = this.getCurrentOffset();
            this.props.fetchCoinList(offset, rowsPerPage, "rank", selectedFiat);
        });
    };

    getFiatSymbol (fiatName) {
        return getSymbolFromCurrency(fiatName);
    }

    isNegativePercent = percent => {
        return Math.sign(percent) === -1;
    };

    render() {
        const { classes, coinListSegment, selectedFiat, isFetching, selectedCrypto } = this.props;
        const { rowsPerPage, page } = this.state;

        const totalAmountOfRows = 2000;
        const emptyRows =
            rowsPerPage -
            Math.min(rowsPerPage, totalAmountOfRows - page * rowsPerPage);

        const fiatSym = this.getFiatSymbol(selectedFiat);
        const formatter = formatterFactory('currency', selectedFiat);

        return (
            <Paper className={classes.root}>
                <Toolbar>
                    <Typography variant="subheading" color="inherit">
                        Cryptocurrencies Listings
                    </Typography>
                </Toolbar>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Rank</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell numeric>
                                    {`Price (${fiatSym})`}
                                </TableCell>
                                <TableCell numeric>
                                    {`Market Cap (${fiatSym})`}
                                </TableCell>

                                <TableCell numeric>{`Total Supply`}</TableCell>
                                <TableCell numeric>{'Percentage Change (24 hours)'}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { isFetching === true ? <CircularProgress /> : coinListSegment.map(row => {
                                const { quotes } = row;
                                const { price, market_cap, percent_change_24h } = quotes[selectedFiat];

                                return (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.rank}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell numeric>
                                            {format(`${fiatSym} #,##0.####`, price)}
                                        </TableCell>
                                        <TableCell numeric>
                                            {formatter.format(market_cap)}
                                        </TableCell>
                                        <TableCell numeric>
                                            {format("#,##0.####",row.total_supply)}
                                        </TableCell>
                                        {
                                            this.isNegativePercent(percent_change_24h) ? (
                                                <TableCell style={{color: 'red'}} numeric>
                                                    {percent_change_24h}%
                                                </TableCell>
                                            ) : (
                                                <TableCell style={{color: 'green'}} numeric>
                                                    {percent_change_24h}%
                                                </TableCell>
                                            )
                                        }
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={3}
                                    count={totalAmountOfRows}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={
                                        this.handleChangeRowsPerPage
                                    }
                                    ActionsComponent={
                                        TablePaginationActionsWrapped
                                    }
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default CustomPaginationActionsTable;
