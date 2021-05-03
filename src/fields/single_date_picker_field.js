import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { isFunction } from 'lodash';
import { RenderMonthElement } from '../utils/react_dates_month_year_selector';

export const SingleDatePickerField = ({
  numberOfMonths,
  field,
  form,
  onDateChange,
  displayFormat,
  hideKeyboardShortcutsPanel,
  id,
  disabled,
  renderDayContents,
  isOutsideRange,
  sourceDateFormat,
  showClearDate,
  startYear,
  endYear,
  renderMonthElement,
  children,
  value,
  ...otherProps
}) => {
  const [focused, setFocused] = useState(false);
  const [date, setDate] = useState();

  useEffect(() => {
    setDate(field.value ? moment(field.value, sourceDateFormat) : null);
  }, [field]);

  // If react-dates receives a null-returning function for renderMonthElement it will just render
  // an empty field, we want to pass a null literal to ensure we get the default behaviour
  let monthElement = null;
  if (isFunction(renderMonthElement)) {
    monthElement = ({ month, onMonthSelect, onYearSelect }) =>
      renderMonthElement({
        month,
        onMonthSelect,
        onYearSelect,
        startYear,
        endYear,
      });
  }

  return (
    <div className="single-date-picker-field-container">
      <SingleDatePicker
        id={id}
        numberOfMonths={numberOfMonths}
        date={date}
        onDateChange={(option) => {
          if (option instanceof moment || option === null) {
            form.setFieldValue(field.name, option?.format(sourceDateFormat));
            setDate(option);
            if (onDateChange) {
              onDateChange(field.name, option);
            }
          }
        }}
        onFocusChange={(e) => setFocused(e.focused)}
        focused={focused}
        displayFormat={displayFormat}
        hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
        disabled={disabled}
        renderDayContents={(val, options) => {
          if (isFunction(renderDayContents)) {
            return renderDayContents(val);
          }
        }}
        isOutsideRange={isOutsideRange}
        renderMonthElement={monthElement}
        small={true}
        showClearDate={showClearDate}
        children={children}
        {...otherProps}
      />
    </div>
  );
};

SingleDatePickerField.defaultProps = {
  displayFormat: 'DD-MM-YYYY',
  sourceDateFormat: 'DD-MM-YYYY',
  numberOfMonths: 1,
  field: null,
  form: null,
  onDateChange: null,
  hideKeyboardShortcutsPanel: false,
  id: null,
  disabled: false,
  renderDayContents: (date) => date.format('D'),
  isOutsideRange: (date) => moment(date).isBefore(),
  showClearDate: true,
  startYear: moment().year(),
  endYear: moment().year() + 10,
  renderMonthElement: RenderMonthElement,
  children: [],
  value: {},
};

SingleDatePickerField.propTypes = {
  displayFormat: PropTypes.string,
  sourceDateFormat: PropTypes.string,
  numberOfMonths: PropTypes.number,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  onDateChange: PropTypes.func,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  renderDayContents: PropTypes.func,
  isOutsideRange: PropTypes.func,
  showClearDate: PropTypes.bool,
  startYear: PropTypes.number,
  endYear: PropTypes.number,
  renderMonthElement: PropTypes.func,
  children: PropTypes.array,
  value: PropTypes.object,
};

export default SingleDatePickerField;
