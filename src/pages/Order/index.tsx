import { Button } from 'antd';
import React from 'react';
import { useModel } from 'umi';
const Order: React.FC = () => {
  const message = useModel('demo');

  const { counter, increment, decrement } = useModel('counter', (ret) => {
    console.log('console::::::=========>1', ret);
    return { counter: ret.counter, increment: ret.increment, decrement: 1 };
  });

  return (
    <div>
      <p>Order</p>
      <p>{message}</p>
      <p>{counter}</p>
      <p>{decrement}</p>

      <div>
        <Button
          type="primary"
          onClick={() => {
            increment();
          }}
        >
          increment
        </Button>
      </div>
    </div>
  );
};
export default Order;
