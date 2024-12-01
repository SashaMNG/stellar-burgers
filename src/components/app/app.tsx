import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate
} from 'react-router-dom';
import '../../index.css';
import { checkUserAuth } from '../../services';
import { getIngredients } from '../../services/slices/ingredients';
import { useDispatch } from '../../services/store';
import { AuthUser, NonAuthUser } from '../protected-route/protected-route';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();
  const feedMatch = useMatch('/feed/:number');
  const profileOrderMatch = useMatch('/profile/orders/:number');
  const orderNumber =
    feedMatch?.params.number || profileOrderMatch?.params.number;

  const onClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<NonAuthUser component={<Login />} />} />
        <Route
          path='/register'
          element={<NonAuthUser component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<NonAuthUser component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<NonAuthUser component={<ResetPassword />} />}
        />
        <Route path='/profile' element={<AuthUser component={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={<AuthUser component={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                children={<IngredientDetails />}
                title='Детали ингредиента'
                onClose={onClose}
              />
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                children={<OrderInfo />}
                title={`Заказ #${orderNumber}`}
                onClose={onClose}
              />
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                children={<OrderInfo />}
                title={`Заказ #${orderNumber}`}
                onClose={onClose}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
