import { Button, notification } from 'antd';
import {BrowserRouter, Link, withRouter} from 'react-router-dom';

const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};

// const handleQnA = () => {
//   this.props.history.push('/campqna');
// }

const notificationqna = withRouter(({history}) => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key), history.push('/campqna')}>
        {/* <BrowserRouter>
            <Link to={"/campqna"}>Confirm</Link>
        </BrowserRouter> */}
        Confirm
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
});

export default notificationqna;