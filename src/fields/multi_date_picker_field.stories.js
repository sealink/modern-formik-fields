import React from 'react';
import { MultiDatePickerField } from './index';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';

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
  labelName: 'Example Datepicker',
};

export const AllowPastDates = Template.bind();

AllowPastDates.args = {
  ...Default.args,
  labelName: 'Example Datepicker with all dates allowed',
  isOutsideRange: () => false,
};
