import React from 'react';
import moment from 'moment';
import { range } from 'lodash';

// TODO: TT-9328 rework this component and go back to using react-select for the
// month and year selectors
export const RenderMonthElement = ({
  month,
  onMonthSelect,
  onYearSelect,
  startYear,
  endYear,
}) => {
  return (
    <div className="month_year_select">
      <select
        className="month_select"
        onChange={(e) => onMonthSelect(month, e.target.value)}
        value={month.month()}
      >
        {moment.months().map((label, value) => {
          return <option key={value} value={value}>{label}</option>;
        })}
      </select>
      <select
        className="year_select"
        onChange={(e) => onYearSelect(month, e.target.value)}
        value={month.year()}
      >
        {range(
          Math.min(startYear, month.year()),
          Math.max(endYear, month.year())
        ).map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
};
