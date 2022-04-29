import { Input, Form } from 'antd';

const FormBuilder = (data: PageApi.Datum[] | undefined) => {
  return (data || []).map((field) => {
    return (
      <Form.Item label={field.title} name={field.key} key={field.title}>
        <Input />
      </Form.Item>
    );
  });
};

export default FormBuilder;
