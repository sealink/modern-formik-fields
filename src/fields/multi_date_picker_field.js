import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '../stylesheets/modern-formik-fields.css';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import { isFunction } from 'lodash';
import { RenderMonthElement } from '../utils/react_dates_month_year_selector';

export const MultiDatePickerField = ({
  numberOfMonths,
  field,
  form,
  onDatesChange,
  displayFormat,
  hideKeyboardShortcutsPanel,
  id,
  startDateId,
  endDateId,
  disabled,
  isOutsideRange,
  sourceDateFormat,
  showClearDates,
  startYear,
  endYear,
  renderMonthElement,
  value,
  ...props
}) => {
  const [focused, setFocused] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    setStartDate(
      field.value?.startDate
        ? moment(field.value.startDate, sourceDateFormat)
        : null
    );
    setEndDate(
      field.value?.endDate
        ? moment(field.value.endDate, sourceDateFormat)
        : null
    );
  }, [field]);

  // If react-dates receives a null-returning function for renderMonthElement it will just render
  // an empty field, we want to pass a null literal to ensure we get the default behaviour
  let monthElement = null;
  if (isFunction(renderMonthElement)) {
    monthElement = function ({ month, onMonthSelect, onYearSelect }) {
      return renderMonthElement({
        month,
        onMonthSelect,
        onYearSelect,
        startYear,
        endYear,
      });
    };
  }

  return (
    <>
      <div className="multi-date-picker-field-container">
        <DateRangePicker
          focusedInput={focused}
          onFocusChange={(focusedInput) => {
            setFocused(focusedInput);
          }}
          onDatesChange={(dates) => {
            setStartDate(dates.startDate);
            setEndDate(dates.endDate);
            form.setFieldValue(field.name, {
              startDate: dates.startDate?.format(sourceDateFormat),
              endDate: dates.endDate?.format(sourceDateFormat),
            });
            {
              if (isFunction(onDatesChange)) {
                onDatesChange(dates);
              }
            }
          }}
          startDateId={startDateId || `${id}-start-date`}
          startDate={startDate}
          endDateId={endDateId || `${id}-end-date`}
          endDate={endDate}
          enableOutsideDays={true}
          displayFormat={displayFormat}
          isOutsideRange={isOutsideRange}
          disabled={disabled}
          hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
          numberOfMonths={numberOfMonths}
          renderMonthElement={monthElement}
          small={true}
          showClearDates={showClearDates}
          {...props}
        />
      </div>
    </>
  );
};

MultiDatePickerField.defaultProps = {
  displayFormat: 'DD-MM-YYYY',
  sourceDateFormat: 'DD-MM-YYYY',
  numberOfMonths: 1,
  field: null,
  form: null,
  onDatesChange: null,
  hideKeyboardShortcutsPanel: false,
  id: null,
  disabled: false,
  isOutsideRange: (date) => moment(date).isBefore(),
  showClearDates: true,
  startYear: moment().year(),
  endYear: moment().year() + 10,
  renderMonthElement: RenderMonthElement,
  value: {},
};

MultiDatePickerField.propTypes = {
  displayFormat: PropTypes.string,
  sourceDateFormat: PropTypes.string,
  numberOfMonths: PropTypes.number,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  onDatesChange: PropTypes.func,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  id: PropTypes.string.isRequired,
  startDateId: PropTypes.string,
  endDateId: PropTypes.string,
  disabled: PropTypes.bool,
  isOutsideRange: PropTypes.func,
  showClearDates: PropTypes.bool,
  startYear: PropTypes.number,
  endYear: PropTypes.number,
  renderMonthElement: PropTypes.func,
  value: PropTypes.object,
};

export default MultiDatePickerField;
