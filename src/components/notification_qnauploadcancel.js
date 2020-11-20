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
            <Link to={"/campqna"}>Cancel</Link>
        </BrowserRouter>
    </Button>
  );
  notification.open({
    message: 'Cancel?',
    description:
      'Are you sure that you want to cancel your question upload?',
    btn,
    key,
    onClose: close,
  });
};

export default notificationqnacancel;