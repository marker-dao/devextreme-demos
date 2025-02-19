import React from 'react';
import { Form, Item, Label } from 'devextreme-react/form';
import ProductSelectBox from './ProductSelectBox.js';
import OrderHistory from './OrderHistory.js';

const OrdersTab = (props) => {
  const [chosenProductId, setChosenProductId] = React.useState(null);
  const renderSelectBox = React.useCallback(
    () => (
      <ProductSelectBox
        supplierId={props.supplierId}
        productId={chosenProductId}
        onProductChanged={setChosenProductId}
      />
    ),
    [chosenProductId, props.supplierId],
  );
  const renderOrderHistory = React.useCallback(
    () => <OrderHistory productId={chosenProductId} />,
    [chosenProductId],
  );
  return (
    <Form
      labelLocation="top"
      className="form-container"
    >
      <Item render={renderSelectBox}>
        <Label text="Product" />
      </Item>
      <Item render={renderOrderHistory}>
        <Label text="Order History" />
      </Item>
    </Form>
  );
};
export default OrdersTab;
