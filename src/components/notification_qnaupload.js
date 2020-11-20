import { Button, notification } from 'antd';
import {BrowserRouter, Link} from 'react-router-dom';

const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};

const notificationqna = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
        <BrowserRouter>
            <Link to={"/campqna"}>Confirm</Link>
        </BrowserRouter>
    </Button>
  );
  notification.open({
    message: 'Confirmation of your writing',
    description:
      'Are you sure that you want to upload the question?',
    btn,
    key,
    onClose: close,
  });
};

export default notificationqna;