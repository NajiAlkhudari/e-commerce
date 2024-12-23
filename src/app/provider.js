'use client'; // هذا مهم لجعل المكون عميلًا

import { Provider } from 'react-redux';
import store from '@/store'; // تأكد من أنك تستورد المخزن بشكل صحيح

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}