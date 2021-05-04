import React from 'react';
import { MultiDatePickerField } from './index';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import moment from 'moment';

export default {
  title: 'Fields/MultiDatePickerField',
  component: MultiDatePickerField,
  argTypes: {},
  decorators: [],
  parameters: {
    formimk: {
      initialValues: {
        testField: '',
      },
    },
  },
};

const Template = (args) => {
  return (
    <Formik>
      <Form>
        <MultiDatePickerField {...args} />
      </Form>
    </Formik>
  );
};

class exampleForm {
  setFieldValue(fieldName, fieldValue) {}
}

export const Default = Template.bind();

Default.args = {
  field: {
    name: 'testField',
  },
  form: new exampleForm(),
  id: 'example-datepicker',
};

export const AllowPastDates = Template.bind();

AllowPastDates.args = {
  ...Default.args,
  isOutsideRange: () => false,
  id: 'allow-past-dates',
};

export const PastDatesWithCustomStartEndYears = Template.bind();

PastDatesWithCustomStartEndYears.args = {
  ...Default.args,
  isOutsideRange: () => false,
  id: 'past-dates-custom-start-end-years',
  startYear: 1900,
  endYear: moment().year(),
};

export const WithoutMonthYearSelects = Template.bind();

WithoutMonthYearSelects.args = {
  ...Default.args,
  id: 'without-month-year-selects',
  renderMonthElement: null,
};
