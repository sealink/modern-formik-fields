import React from 'react';
import moment from 'moment';
import Select from 'react-select';
import { find } from 'lodash';
import classNames from 'classnames';

export const RenderMonthElement = ({
  month,
  onMonthSelect,
  onYearSelect,
  startYear,
  endYear,
}) => {
  const monthOptions = moment.months().map((label, value) => {
    return { label, value };
  });

  let yearOptions = [];
  for (
    let i = Math.min(startYear, month.year());
    i <= Math.max(endYear, month.year());
    i++
  ) {
    yearOptions.push({ label: i, value: i });
  }

  const theme = (theme) => ({
    ...theme,
    spacing: {
      ...theme.spacing,
      controlHeight: 33,
      baseUnit: 1,
    },
  });

  return (
    <div class="month_year_select">
      <Select
        options={monthOptions}
        className="month_select"
        onChange={(e) => onMonthSelect(month, e.value)}
        value={find(monthOptions, ['value', month.month()])}
        maxMenuHeight={240}
        theme={theme}
        styles={{
          menuPortal: (provided) => ({ ...provided, zIndex: 999 }),
        }}
      />
      <Select
        options={yearOptions}
        className="year_select"
        onChange={(e) => onYearSelect(month, e.value)}
        value={find(yearOptions, ['value', month.year()])}
        maxMenuHeight={240}
        theme={theme}
        styles={{
          menuPortal: (provided) => ({ ...provided, zIndex: 999 }),
        }}
      />
    </div>
  );
};
