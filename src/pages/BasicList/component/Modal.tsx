import React, { useEffect } from 'react';
import { Form, Modal as AntdModal } from 'antd';
import { useRequest } from 'umi';
import ActionBuilder from '../builder/ActionBuilder';
import FormBuilder from '../builder/FormBuilder';
interface IProps {
  modalVisible: boolean;
  hideModal: () => void;
  modalUri: string;
}
const Modal: React.FC<IProps> = (props) => {
  const { modalVisible, hideModal, modalUri } = props;

  const init = useRequest<{ data: PageApi.Data }>(modalUri);
  useEffect(() => {
    if (modalVisible) {
      init.run();
    }
  }, [modalVisible]);

  const handleCancel = () => {
    hideModal();
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <>
      <AntdModal
        title={init?.data?.page?.title}
        visible={modalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={ActionBuilder(init?.data?.layout[0]?.data)}
      >
        <Form {...layout}>{FormBuilder(init?.data?.layout?.tabs[0]?.data)}</Form>
      </AntdModal>
    </>
  );
};
export default Modal;
