import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Pagination, Row, Space, Table } from 'antd';
import type { TablePaginationConfig, FilterValue } from 'antd/lib/table/interface';

import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import ActionBuilder from './builder/ActionBuilder';
import ColumnBuilder from './builder/ColumnBuilder';
import Modal from './component/Modal';
import styles from './index.less';
const Index: React.FC = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const [sortQuery, setSortQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUri, setModalUri] = useState('');
  const init = useRequest<{ data: BasicListApi.Data }>(
    `https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}${sortQuery}`,
  );
  // console.log('console::::::=========>', init.data);
  useEffect(() => {
    init.run();
  }, [page, per_page, sortQuery]);

  const handleChangePage = (_page: number, _pageSize: number) => {
    setPage(_page);
    setPerPage(_pageSize);
  };

  const searchLayout = () => {};
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Space>{ActionBuilder(init?.data?.layout?.tableToolBar)}</Space>
        </Col>
      </Row>
    );
  };
  const afterTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Pagination
            current={init?.data?.meta?.page || 1}
            pageSize={init?.data?.meta?.per_page || 0}
            total={init?.data?.meta?.total || 0}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
            onChange={handleChangePage}
          />
        </Col>
      </Row>
    );
  };

  function onChange(
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: any,
  ) {
    if (sorter.order === undefined) {
      setSortQuery('');
    } else {
      const orderBy = sorter.order === 'ascend' ? 'asc' : 'desc';
      setSortQuery(`&sort=${sorter.field}&order=${orderBy}`);
    }
  }

  return (
    <PageContainer>
      <Button
        type="primary"
        onClick={() => {
          setModalUri('https://public-api-v2.aspirantzhang.com/api/admins/add?X-API-KEY=antd');
          setModalVisible(true);
        }}
      >
        Add
      </Button>
      <Button
        type="primary"
        onClick={() => {
          setModalUri('https://public-api-v2.aspirantzhang.com/api/admins/206?X-API-KEY=antd');
          setModalVisible(true);
        }}
      >
        Edit
      </Button>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          rowKey="id"
          dataSource={init?.data?.dataSource}
          columns={ColumnBuilder(init?.data?.layout?.tableColumn)}
          pagination={false}
          loading={init?.loading}
          onChange={onChange}
        />
        {afterTableLayout()}
      </Card>
      <Modal
        modalVisible={modalVisible}
        hideModal={() => setModalVisible(false)}
        modalUri={modalUri}
      />
    </PageContainer>
  );
};
export default Index;
