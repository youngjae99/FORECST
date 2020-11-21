import { Button, notification } from 'antd';
import {BrowserRouter, Link} from 'react-router-dom';

const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};

const notificationqnacancel = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
        <BrowserRouter>
            <Link to={"/camp/"}>Ok</Link>
        </BrowserRouter>
    </Button>
  );
  notification.open({
    message: 'Cancel',
    description:
      'You upload has been cancelled.',
    btn,
    key,
    onClose: close,
  });
};

export default notificationqnacancel;