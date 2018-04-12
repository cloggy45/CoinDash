import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import styleConstants from "../misc/style_constants.js";

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

const TableList = props => {
  let { header } = props;
  let collection = props.collection.slice(0, 10);
  return (
    <Wrapper>
      <Table>
        <thead>
          <TableRow>
            {
              header.map(title => {
                return <TableHeader key={title}>{title}</TableHeader>;
            })
            }
          </TableRow>
        </thead>
        <tbody>
          {collection.map((data, i) => {
            return (
              <TableRow key={i}>
                <TableData key={data.rank}>{data.rank}</TableData>
                <TableData key={data.name}>{data.name}</TableData>
                <TableData key={data.price_usd}>{formatter.format(data.price_usd)}</TableData>
                <TableData key={data.percent_change_24h}>{data.percent_change_24h}</TableData>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default TableList;
