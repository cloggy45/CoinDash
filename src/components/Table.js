import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import styleConstants from "../misc/style_constants.js";

const Table = props => {
  let { header } = props;
  let collection = props.collection.slice(0, 10);

  const Wrapper = styled.section`
    color: ${styleConstants.get("Light")};
    margin: 20px 0;
  `;

  const Table = styled.table`
    width: 100%;
  `;

  const TableRow = styled.tr`

  `;

  const TableData = styled.td`
    text-align: center;
    padding: 5px;
    border-bottom: ${styleConstants.get("Medium")} solid 0.02px;
  `;

  const TableHeader = styled.td`
    color: ${styleConstants.get("Light")}
    font-weight: 600;
    text-align: center;
    border-bottom: ${styleConstants.get("Light")} solid 0.5px;
  `;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  });

  return (
    <Wrapper>
      <Table>
        <thead>
          <TableRow>
            {header.map(title => {
              return <TableHeader>{title}</TableHeader>;
            })}
          </TableRow>
        </thead>
        <tbody>
          {collection.map(data => {
            return (
              <TableRow>
                <TableData key={data._id}>{data.rank}</TableData>
                <TableData key={data._id}>{data.name}</TableData>
                <TableData key={data._id}>{data.price_usd}</TableData>
                <TableData key={data._id}>{data.percent_change_24h}</TableData>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default Table;
