import thunk from 'redux-thunk';
import logger from './logger';
import { applyMiddleware } from '@reduxjs/toolkit';

export default applyMiddleware(thunk, logger);