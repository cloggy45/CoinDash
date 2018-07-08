import React from "react";
import Select from "react-select";
import styled from "styled-components";
import PropTypes from "prop-types";

import styleConstants from "../misc/style_constants.js";

import Panel from "../components/Panel";

const MainTable = styled.table`
  color: ${styleConstants.get("Light")};
  margin: 20px 0;
  width: 100%;
`;

const TableData = styled.td`
  padding: 5px;
  border-bottom: #234558 solid 0.1px;
  text-align: center;
`;

const TableRow = styled.tr`
  text-align: center;
`;

const Table = props => {
  const { headers, title } = props;
  return (
    <Panel label={title}>
      <MainTable>
        <thead>
          <TableRow>
            {props.headers.map(header => {
              return <td key={header}>{header}</td>;
            })}
          </TableRow>
        </thead>
        <tbody>{props.children}</tbody>
      </MainTable>
    </Panel>
  );
};

Table.propTypes = {
  headers: PropTypes.array
};

Table.defaultProps = {
  headers: []
};

export default Table;
