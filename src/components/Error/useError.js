import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import { selectError, clearError } from '../../store';
import Error from './Error';

export default autoDismiss => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const { addToast } = useToasts();

  useEffect(() => {
    if (error.message) {
      addToast(<Error error={error} />, {
        id: 'error',
        appearance: 'error',
        autoDismiss: autoDismiss && !error.important,
        onDismiss: () => {
          dispatch(clearError());
        },
      });
    }
  }, [addToast, dispatch, error, autoDismiss]);
};
