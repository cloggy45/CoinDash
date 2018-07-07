import React from "react";
import Select from "react-select";
import styled from "styled-components";
import PropTypes from "prop-types";

import styleConstants from "../misc/style_constants.js";

const Wrapper = styled.section`
  color: ${styleConstants.get("Light")};
  margin: 20px 0;
`;

const MainTable = styled.table`
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
  const { headers } = props;
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default Table;
